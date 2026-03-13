import { createHash } from "node:crypto";

import { NextResponse } from "next/server";

import { mainPageContent } from "@/content/main-page";
import {
  THANKS_ACCESS_COOKIE,
  THANKS_ACCESS_MAX_AGE_SECONDS
} from "@/lib/thanks-access";
import { checkRateLimit } from "@/lib/rate-limit";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/validation/lead";

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}

function hashIpAddress(ipAddress: string) {
  return createHash("sha256").update(ipAddress).digest("hex");
}

function createThanksRedirectResponse() {
  const response = NextResponse.json({
    ok: true,
    redirectTo: "/thanks"
  });

  response.cookies.set({
    name: THANKS_ACCESS_COOKIE,
    value: mainPageContent.tracking.landingSlug,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: THANKS_ACCESS_MAX_AGE_SECONDS,
    path: "/thanks"
  });

  return response;
}

function createDuplicateLeadResponse() {
  return NextResponse.json(
    {
      message: "이미 신청된 이메일입니다."
    },
    {
      status: 409
    }
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const FEEDBACK_RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const FEEDBACK_RATE_LIMIT_MAX_REQUESTS = 2;

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const ipHash = hashIpAddress(clientIp);
  const rateLimit = checkRateLimit(ipHash);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        message: "잠시 후 다시 시도해 주세요."
      },
      {
        status: 429
      }
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        message: "유효한 JSON 요청이 아닙니다."
      },
      {
        status: 400
      }
    );
  }

  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "입력값 검증에 실패했습니다.",
        issues: parsed.error.flatten()
      },
      {
        status: 400
      }
    );
  }

  const lead = parsed.data;
  const normalizedEmail = lead.email.trim().toLowerCase();
  const normalizedMessage = lead.message.trim();

  if (lead.landingSlug !== mainPageContent.tracking.landingSlug) {
    return NextResponse.json(
      {
        message: "허용되지 않은 landing slug입니다."
      },
      {
        status: 400
      }
    );
  }

  if (lead.submitMode === "signup" && !normalizedEmail) {
    return NextResponse.json(
      {
        message: "이메일을 입력해주세요."
      },
      {
        status: 400
      }
    );
  }

  if (normalizedEmail && !isValidEmail(normalizedEmail)) {
    return NextResponse.json(
      {
        message: "올바른 이메일 주소를 입력해주세요."
      },
      {
        status: 400
      }
    );
  }

  if (lead.submitMode === "feedback" && !normalizedMessage) {
    return NextResponse.json(
      {
        message: "의견을 입력한 뒤 보내주세요."
      },
      {
        status: 400
      }
    );
  }

  if (lead.honeypot) {
    return createThanksRedirectResponse();
  }

  try {
    const supabase = createSupabaseAdminClient();

    if (lead.submitMode === "feedback") {
      const windowStart = new Date(
        Date.now() - FEEDBACK_RATE_LIMIT_WINDOW_MS
      ).toISOString();
      const { count, error: feedbackRateLimitError } = await supabase
        .from("feedbacks")
        .select("id", {
          count: "exact",
          head: true
        })
        .eq("landing_slug", lead.landingSlug)
        .eq("ip_hash", ipHash)
        .gte("created_at", windowStart);

      if (feedbackRateLimitError) {
        throw feedbackRateLimitError;
      }

      if ((count ?? 0) >= FEEDBACK_RATE_LIMIT_MAX_REQUESTS) {
        return NextResponse.json(
          {
            message:
              "의견 제출은 너무 자주 보낼 수 없습니다. 잠시 후 다시 시도해 주세요."
          },
          {
            status: 429
          }
        );
      }
    }

    if (lead.submitMode === "signup" && normalizedEmail) {
      const { data: existingLead, error: existingLeadError } = await supabase
        .from("leads")
        .select("id")
        .eq("landing_slug", lead.landingSlug)
        .eq("email", normalizedEmail)
        .limit(1)
        .maybeSingle();

      if (existingLeadError) {
        throw existingLeadError;
      }

      if (existingLead) {
        return createDuplicateLeadResponse();
      }
    }

    const targetTable = lead.submitMode === "feedback" ? "feedbacks" : "leads";
    const insertPayload =
      lead.submitMode === "feedback"
        ? {
            landing_slug: lead.landingSlug,
            name: lead.name || null,
            email: normalizedEmail || null,
            message: normalizedMessage,
            cta_variant: lead.ctaVariant,
            utm_source: lead.utm.source || null,
            utm_medium: lead.utm.medium || null,
            utm_campaign: lead.utm.campaign || null,
            utm_term: lead.utm.term || null,
            utm_content: lead.utm.content || null,
            referrer: lead.referrer || null,
            user_agent: request.headers.get("user-agent"),
            ip_hash: ipHash
          }
        : {
            landing_slug: lead.landingSlug,
            name: lead.name || null,
            email: normalizedEmail,
            phone: lead.phone || null,
            company: lead.company || null,
            job_title: lead.jobTitle || null,
            cta_variant: lead.ctaVariant,
            utm_source: lead.utm.source || null,
            utm_medium: lead.utm.medium || null,
            utm_campaign: lead.utm.campaign || null,
            utm_term: lead.utm.term || null,
            utm_content: lead.utm.content || null,
            referrer: lead.referrer || null,
            user_agent: request.headers.get("user-agent"),
            ip_hash: ipHash
          };

    const { error } = await supabase.from(targetTable).insert(insertPayload);

    if (error) {
      if (error.code === "23505" && lead.submitMode === "signup" && normalizedEmail) {
        return createDuplicateLeadResponse();
      }

      throw error;
    }

    return createThanksRedirectResponse();
  } catch (error) {
    console.error("Failed to persist lead", error);

    return NextResponse.json(
      {
        message:
          "Supabase 연결이 아직 준비되지 않았거나 저장 중 문제가 발생했습니다."
      },
      {
        status: 503
      }
    );
  }
}
