import Image from "next/image";

import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { HeroPreviewShell } from "@/components/main-page/hero-preview-shell";
import { MainLeadForm } from "@/components/main-page/main-lead-form";
import { MainPageContent } from "@/content/main-page";
import { getMainPageThemeStyle } from "@/lib/main-page-theme";

type MainPageViewProps = {
  content: MainPageContent;
};

function getSolutionToneClass(tone: "soft" | "dark" | "default" | "primary") {
  if (tone === "soft") {
    return "rounded-3xl border border-[var(--accent)]/20 bg-[var(--accent)]/10 p-6 text-slate-900";
  }

  if (tone === "dark") {
    return "rounded-3xl bg-slate-900 p-6 text-white";
  }

  if (tone === "primary") {
    return "rounded-3xl bg-[var(--accent)] p-6 text-white shadow-lg shadow-[var(--glow)]";
  }

  return "rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm";
}

export function MainPageView({ content }: MainPageViewProps) {
  const brandLogo = content.brand.logo;

  return (
    <div
      style={getMainPageThemeStyle(content.theme)}
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
    >
      <PageViewTracker
        eventName="page_view"
        props={{ landingSlug: content.tracking.landingSlug }}
      />

      <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            {brandLogo ? (
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white/80">
                <Image
                  src={brandLogo.src}
                  alt={brandLogo.alt}
                  width={brandLogo.width}
                  height={brandLogo.height}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-sm font-bold text-[var(--accent-strong)]">
                {content.brand.mark}
              </div>
            )}
            <p className="text-base font-bold tracking-tight">{content.brand.name}</p>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            {content.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[var(--accent-strong)]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <TrackedAnchor
            href={`#${content.leadCapture.id}`}
            eventName="hero_cta_click"
            trackingProps={{
              landingSlug: content.tracking.landingSlug,
              ctaVariant: "nav-primary"
            }}
            className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-bold !text-white visited:!text-white hover:!text-white transition hover:bg-[var(--accent-strong)]"
          >
            {content.nav.ctaLabel}
          </TrackedAnchor>
        </div>
      </nav>

      <main className="pb-16">
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_460px]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--accent-strong)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                {content.hero.badge}
              </div>

              <h1 className="mt-6 max-w-4xl font-[var(--font-heading)] text-4xl font-black leading-[1.15] tracking-tight md:text-5xl lg:text-6xl">
                {content.hero.headline}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
                {content.hero.subheadline}
              </p>

              <MainLeadForm
                landingSlug={content.tracking.landingSlug}
                form={content.hero.form}
                ctaVariant="hero-inline-form"
                variant="hero"
              />
            </div>

            <div className="relative">
              <HeroPreviewShell preview={content.hero.preview} />
            </div>
          </div>
        </section>

        <section id={content.problem.id} className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <p className="text-sm font-semibold text-[var(--accent-strong)]">
              {content.problem.eyebrow}
            </p>
            <h2 className="mt-3 font-[var(--font-heading)] text-2xl font-bold leading-tight md:text-3xl">
              {content.problem.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--muted)] md:mx-auto md:text-lg">
              {content.problem.description}
            </p>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {content.problem.cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl border border-slate-100 bg-[var(--background)] p-8 text-left"
                >
                  <div className="mb-4 text-2xl text-red-400">{card.icon}</div>
                  <p className="text-base font-bold text-slate-900">{card.title}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id={content.solution.id} className="px-6 py-20">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div className="grid grid-cols-2 gap-4">
              {content.solution.gridItems.map((item) => (
                <div key={item.label} className={getSolutionToneClass(item.tone)}>
                  <p
                    className={
                      item.tone === "dark" || item.tone === "primary"
                        ? "text-sm font-bold text-white"
                        : "text-sm font-bold text-[var(--accent-strong)]"
                    }
                  >
                    {item.label}
                  </p>
                  <p
                    className={
                      item.tone === "dark" || item.tone === "primary"
                        ? "mt-3 text-sm leading-7 text-slate-200"
                        : "mt-3 text-sm leading-7 text-slate-500"
                    }
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--accent-strong)]">
                {content.solution.eyebrow}
              </p>
              <h2 className="mt-3 font-[var(--font-heading)] text-2xl font-bold leading-tight md:text-3xl">
                {content.solution.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-[var(--muted)] md:text-lg">
                {content.solution.description}
              </p>
              <ul className="mt-8 space-y-4">
                {content.solution.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full text-sm text-[var(--accent)]">
                      ✓
                    </div>
                    <p className="text-sm leading-7 text-slate-500 md:text-base">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id={content.benefits.id} className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-semibold text-[var(--accent-strong)]">
              {content.benefits.eyebrow}
            </p>
            <h2 className="mt-3 font-[var(--font-heading)] text-2xl font-bold leading-tight md:text-3xl">
              {content.benefits.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--muted)] md:text-lg">
              {content.benefits.description}
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {content.benefits.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm"
                >
                  <p className="text-sm font-bold text-[var(--accent-strong)]">
                    {content.benefits.itemLabel}
                  </p>
                  <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--accent)]/10 bg-[var(--accent)]/5 py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="text-sm font-semibold text-[var(--accent-strong)]">
              {content.socialProof.eyebrow}
            </p>
            <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-bold tracking-tight">
              {content.socialProof.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-500">
              {content.socialProof.description}
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {content.socialProof.items.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-4xl font-extrabold text-slate-900">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    {item.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id={content.leadCapture.id}
          className="border-y border-[var(--accent)]/10 bg-[var(--accent)]/5 py-24"
        >
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="text-sm font-semibold text-[var(--accent-strong)]">
              {content.leadCapture.eyebrow}
            </p>
            <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-bold tracking-tight">
              {content.leadCapture.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-500">
              {content.leadCapture.description}
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl px-6">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
              {content.leadCapture.form.title ? (
                <p className="text-sm font-semibold text-[var(--accent-strong)]">
                  {content.leadCapture.form.title}
                </p>
              ) : null}
              {content.leadCapture.form.description ? (
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {content.leadCapture.form.description}
                </p>
              ) : null}
              <MainLeadForm
                landingSlug={content.tracking.landingSlug}
                form={content.leadCapture.form}
                ctaVariant="lead-capture-panel"
                variant="panel"
                anchorId="lead-form"
              />
            </div>
          </div>
        </section>

        <section id={content.faq.id} className="bg-white px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center font-[var(--font-heading)] text-3xl font-bold">
              {content.faq.title}
            </h2>
            <div className="mt-12 space-y-4">
              {content.faq.items.map((item, index) => (
                <details
                  key={item.question}
                  className="overflow-hidden rounded-3xl border border-[var(--border)]"
                  open={index === 0}
                >
                  <summary className="cursor-pointer list-none px-6 py-6 text-base font-bold hover:bg-slate-50">
                    {item.question}
                  </summary>
                  <p className="border-t border-[var(--border)] px-6 pb-6 pt-4 text-sm leading-7 text-slate-500">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24">
          <div className="mx-auto max-w-3xl space-y-10 text-center">
            <div className="space-y-4">
              <h2 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight">
                {content.finalCta.title}
              </h2>
              <p className="text-lg leading-8 text-slate-500">
                {content.finalCta.description}
              </p>
            </div>

            <TrackedAnchor
              href={`#${content.leadCapture.id}`}
              eventName="hero_cta_click"
              trackingProps={{
                landingSlug: content.tracking.landingSlug,
                ctaVariant: "final-cta"
              }}
              className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-4 text-lg font-bold !text-white visited:!text-white hover:!text-white transition hover:bg-[var(--accent-strong)] hover:shadow-lg hover:shadow-[var(--glow)]"
            >
              {content.finalCta.ctaLabel}
            </TrackedAnchor>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] bg-white">
        <div className="mx-auto max-w-5xl px-6 py-12 text-center">
          <div className="mb-6 flex items-center justify-center gap-2 opacity-60">
            {brandLogo ? (
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-white/80">
                <Image
                  src={brandLogo.src}
                  alt={brandLogo.alt}
                  width={brandLogo.width}
                  height={brandLogo.height}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-sm font-bold text-[var(--accent-strong)]">
                {content.brand.mark}
              </div>
            )}
            <span className="text-lg font-bold tracking-tight">
              {content.brand.name}
            </span>
          </div>
          <p className="text-sm text-slate-400">{content.footer.copyright}</p>
          <p className="mx-auto mt-2 max-w-xl text-[11px] leading-6 text-slate-400">
            {content.footer.disclaimer}
          </p>
        </div>
      </footer>
    </div>
  );
}
