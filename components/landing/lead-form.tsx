"use client";

import { useEffect, useRef, useState } from "react";

import { LandingContent } from "@/content/types";
import { trackEvent } from "@/lib/analytics";
import {
  extractUtmFromLocation,
  loadStoredUtmParams,
  storeUtmParams,
  type UTMParams
} from "@/lib/utm";

type LeadFormProps = {
  landing: LandingContent;
  variant?: "hero" | "panel";
  anchorId?: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string;
  jobTitle: string;
  honeypot: string;
};

const INITIAL_FORM_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  company: "",
  jobTitle: "",
  honeypot: ""
};

export function LeadForm({
  landing,
  variant = "panel",
  anchorId
}: LeadFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE);
  const [utm] = useState<UTMParams>(() => {
    const stored = loadStoredUtmParams();
    const fromLocation = extractUtmFromLocation();

    return {
      source: fromLocation.source || stored.source,
      medium: fromLocation.medium || stored.medium,
      campaign: fromLocation.campaign || stored.campaign,
      term: fromLocation.term || stored.term,
      content: fromLocation.content || stored.content
    };
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const trackedStart = useRef(false);

  useEffect(() => {
    storeUtmParams(utm);
  }, [utm]);

  function updateField<Key extends keyof FormState>(field: Key, value: FormState[Key]) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleFieldFocus() {
    if (trackedStart.current) {
      return;
    }

    trackedStart.current = true;
    trackEvent("form_start", { landingSlug: landing.slug });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          landingSlug: landing.slug,
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          company: form.company,
          jobTitle: form.jobTitle,
          honeypot: form.honeypot,
          ctaVariant: "hero-primary",
          utm,
          referrer: document.referrer
        })
      });

      const result = (await response.json()) as {
        message?: string;
        redirectTo?: string;
      };

      if (!response.ok || !result.redirectTo) {
        setStatus("error");
        setErrorMessage(result.message ?? "제출 중 문제가 발생했습니다.");
        return;
      }

      trackEvent("form_submit_success", { landingSlug: landing.slug });
      window.location.assign(result.redirectTo);
    } catch {
      setStatus("error");
      setErrorMessage("네트워크 오류로 제출하지 못했습니다.");
    }
  }

  return (
    <aside
      id={anchorId}
      className={
        variant === "hero"
          ? "mt-8 max-w-xl"
          : "section-shell rounded-[28px] bg-white p-6 md:p-8"
      }
    >
      {variant === "panel" ? (
        <>
          <p className="text-sm font-semibold text-[var(--accent-strong)]">
            관심 등록
          </p>
          <h2 className="mt-3 font-[var(--font-heading)] text-2xl font-bold leading-tight md:text-3xl">
            {landing.form.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            {landing.form.description}
          </p>
        </>
      ) : null}

      <form
        className={variant === "hero" ? "mt-6 space-y-3" : "mt-6 space-y-4"}
        onSubmit={handleSubmit}
      >
        {variant === "panel" ? (
          <label className="block">
            <span className="mb-2 block text-sm font-medium">이름</span>
            <input
              type="text"
              value={form.name}
              onFocus={handleFieldFocus}
              onChange={(event) => updateField("name", event.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)] focus:bg-white"
              placeholder="성함을 입력해주세요"
            />
          </label>
        ) : null}

        <label className="block">
          {variant === "hero" ? null : (
            <span className="mb-2 block text-sm font-medium">이메일</span>
          )}
          {variant === "hero" ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={form.email}
                onFocus={handleFieldFocus}
                onChange={(event) => updateField("email", event.target.value)}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                placeholder="이메일 주소를 입력해주세요"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-[var(--accent)] px-6 py-4 text-sm font-bold text-white transition hover:shadow-lg hover:shadow-[var(--glow)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "제출 중..." : landing.form.submitLabel}
              </button>
            </div>
          ) : (
            <input
              type="email"
              required
              value={form.email}
              onFocus={handleFieldFocus}
              onChange={(event) => updateField("email", event.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)] focus:bg-white"
              placeholder="example@email.com"
            />
          )}
        </label>

        <label className="hidden">
          <span>Leave this field empty</span>
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.honeypot}
            onChange={(event) => updateField("honeypot", event.target.value)}
          />
        </label>

        {variant === "panel" ? (
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-4 text-lg font-bold text-white transition hover:bg-[var(--accent-strong)] hover:shadow-lg hover:shadow-[var(--glow)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "제출 중..." : "얼리 액세스 신청하기"}
          </button>
        ) : null}

        <p className="text-xs leading-6 text-[var(--muted)]">
          {variant === "hero"
            ? "등록 시 출시 소식과 얼리버드 혜택을 가장 먼저 보내드립니다."
            : "신청하신 정보는 출시 소식 안내 및 서비스 개선을 위한 용도로만 사용됩니다."}
        </p>

        {status === "error" ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </aside>
  );
}
