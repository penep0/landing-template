import { createHash } from "node:crypto";

import { NextResponse } from "next/server";

import { getLandingContent } from "@/content";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
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
  const landing = getLandingContent(lead.landingSlug);

  if (!landing || landing.status !== "active") {
    return NextResponse.json(
      {
        message: "허용되지 않은 landing slug입니다."
      },
      {
        status: 400
      }
    );
  }

  if (lead.honeypot) {
    return NextResponse.json(
      {
        message: "정상적으로 접수되었습니다.",
        redirectTo: `/thanks?slug=${lead.landingSlug}`
      },
      {
        status: 200
      }
    );
  }

  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("leads").insert({
      landing_slug: lead.landingSlug,
      name: lead.name || null,
      email: lead.email.toLowerCase(),
      phone: lead.phone || null,
      message: lead.message || null,
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
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      ok: true,
      redirectTo: `/thanks?slug=${lead.landingSlug}`
    });
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

