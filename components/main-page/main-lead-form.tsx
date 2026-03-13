"use client";

import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import {
  extractUtmFromLocation,
  loadStoredUtmParams,
  storeUtmParams,
  type UTMParams
} from "@/lib/utm";
import { MainPageFormCopy } from "@/content/main-page";

type MainLeadFormProps = {
  landingSlug: string;
  form: MainPageFormCopy;
  ctaVariant: string;
  variant: "hero" | "panel";
  anchorId?: string;
};

type SubmitMode = "signup" | "feedback";

type FormState = {
  name: string;
  email: string;
  message: string;
  honeypot: string;
};

const INITIAL_FORM_STATE: FormState = {
  name: "",
  email: "",
  message: "",
  honeypot: ""
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function MainLeadForm({
  landingSlug,
  form,
  ctaVariant,
  variant,
  anchorId
}: MainLeadFormProps) {
  const [values, setValues] = useState<FormState>(INITIAL_FORM_STATE);
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
  const [status, setStatus] = useState<
    "idle" | "submitting" | "error" | "success"
  >("idle");
  const [activeSubmitMode, setActiveSubmitMode] = useState<SubmitMode>("signup");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const trackedStart = useRef(false);

  useEffect(() => {
    storeUtmParams(utm);
  }, [utm]);

  function updateField(field: keyof FormState, value: string) {
    setValues((current) => ({
      ...current,
      [field]: value
    }));
  }

  function handleFieldFocus() {
    if (trackedStart.current) {
      return;
    }

    trackedStart.current = true;
    trackEvent("form_start", { landingSlug, ctaVariant });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nativeEvent = event.nativeEvent as SubmitEvent;
    const submitter = nativeEvent.submitter;
    const submitMode =
      submitter instanceof HTMLButtonElement &&
      submitter.value === "feedback"
        ? "feedback"
        : "signup";
    const normalizedEmail = values.email.trim();
    const normalizedMessage = values.message.trim();

    if (submitMode === "signup" && !normalizedEmail) {
      setStatus("error");
      setSuccessMessage("");
      setErrorMessage(form.emailRequiredError ?? "이메일을 입력해주세요.");
      return;
    }

    if (normalizedEmail && !isValidEmail(normalizedEmail)) {
      setStatus("error");
      setSuccessMessage("");
      setErrorMessage(
        form.emailInvalidError ?? "올바른 이메일 주소를 입력해주세요."
      );
      return;
    }

    if (submitMode === "feedback" && !normalizedMessage) {
      setStatus("error");
      setSuccessMessage("");
      setErrorMessage(form.feedbackRequiredError ?? "의견을 입력한 뒤 보내주세요.");
      return;
    }

    setActiveSubmitMode(submitMode);
    setStatus("submitting");
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          landingSlug,
          name: values.name,
          email: normalizedEmail,
          message: normalizedMessage,
          honeypot: values.honeypot,
          ctaVariant: `${ctaVariant}-${submitMode}`,
          submitMode,
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
        setErrorMessage(result.message ?? form.submitErrorFallback);
        return;
      }

      trackEvent(
        submitMode === "feedback" ? "feedback_submit_success" : "form_submit_success",
        {
          landingSlug,
          ctaVariant,
          submitMode
        }
      );

      if (submitMode === "feedback") {
        setStatus("success");
        setSuccessMessage(form.feedbackSuccessMessage ?? "의견이 전송되었습니다.");
        setValues((current) => ({
          ...current,
          message: ""
        }));
        return;
      }

      window.location.assign(result.redirectTo);
    } catch {
      setStatus("error");
      setErrorMessage(form.networkError);
    }
  }

  return (
    <form
      id={anchorId}
      noValidate
      className={variant === "hero" ? "mt-6 space-y-3" : "mt-6 space-y-4"}
      onSubmit={handleSubmit}
    >
      {variant === "panel" ? (
        <label className="block">
          <span className="mb-2 block text-sm font-medium">
            {form.nameLabel}
          </span>
          <input
            type="text"
            value={values.name}
            onFocus={handleFieldFocus}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)] focus:bg-white"
            placeholder={form.namePlaceholder}
          />
        </label>
      ) : null}

      <label className="block">
        {variant === "panel" ? (
          <span className="mb-2 block text-sm font-medium">{form.emailLabel}</span>
        ) : null}

        {variant === "hero" ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={values.email}
              onFocus={handleFieldFocus}
              onChange={(event) => updateField("email", event.target.value)}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
              placeholder={form.emailPlaceholder}
            />
            <button
              type="submit"
              value="signup"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-[var(--accent)] px-6 py-4 text-sm font-bold text-white transition hover:shadow-lg hover:shadow-[var(--glow)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" && activeSubmitMode === "signup"
                ? form.submittingLabel
                : form.submitLabel}
            </button>
          </div>
        ) : (
          <input
            type="email"
            value={values.email}
            onFocus={handleFieldFocus}
            onChange={(event) => updateField("email", event.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)] focus:bg-white"
            placeholder={form.emailPlaceholder}
          />
        )}
      </label>

      {variant === "hero" ? (
        <p className="text-xs leading-6 text-[var(--muted)]">{form.helperText}</p>
      ) : null}

      {form.messageLabel || form.messagePlaceholder ? (
        <label className="block">
          {variant === "panel" || variant === "hero" ? (
            <span className="mb-2 block text-sm font-medium">
              {form.messageLabel ?? "의견 남기기"}
            </span>
          ) : null}

          <textarea
            value={values.message}
            onFocus={handleFieldFocus}
            onChange={(event) => updateField("message", event.target.value)}
            maxLength={2000}
            rows={variant === "hero" ? 4 : 5}
            className={
              variant === "hero"
                ? "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
                : "w-full rounded-xl border border-[var(--border)] bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[var(--accent)] focus:bg-white"
            }
            placeholder={form.messagePlaceholder}
          />
          {form.messageHelperText ? (
            <p className="mt-2 text-xs leading-6 text-[var(--muted)]">
              {form.messageHelperText}
            </p>
          ) : null}
        </label>
      ) : null}

      <label className="hidden">
        <span>Leave this field empty</span>
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={(event) => updateField("honeypot", event.target.value)}
        />
      </label>

      {variant === "panel" ? (
        <button
          type="submit"
          value="signup"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-4 text-lg font-bold text-white transition hover:bg-[var(--accent-strong)] hover:shadow-lg hover:shadow-[var(--glow)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" && activeSubmitMode === "signup"
            ? form.submittingLabel
            : form.submitLabel}
        </button>
      ) : null}

      {form.feedbackSubmitLabel ? (
        <button
          type="submit"
          value="feedback"
          disabled={status === "submitting"}
          className={
            variant === "hero"
              ? "inline-flex items-center justify-center rounded-xl border border-[var(--accent)] bg-white px-5 py-3 text-sm font-semibold text-[var(--accent-strong)] transition hover:bg-[var(--accent)]/5 disabled:cursor-not-allowed disabled:opacity-60"
              : "inline-flex w-full items-center justify-center rounded-xl border border-[var(--accent)] bg-white px-5 py-4 text-base font-semibold text-[var(--accent-strong)] transition hover:bg-[var(--accent)]/5 disabled:cursor-not-allowed disabled:opacity-60"
          }
        >
          {status === "submitting" && activeSubmitMode === "feedback"
            ? form.feedbackSubmittingLabel ?? form.submittingLabel
            : form.feedbackSubmitLabel}
        </button>
      ) : null}

      {variant === "panel" ? (
        <p className="text-xs leading-6 text-[var(--muted)]">{form.helperText}</p>
      ) : null}

      {status === "error" ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}

      {status === "success" ? (
        <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </p>
      ) : null}
    </form>
  );
}
