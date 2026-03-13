import { LandingContent } from "@/content/types";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";

type HeroProps = {
  landing: LandingContent;
  children?: React.ReactNode;
};

export function Hero({ landing, children }: HeroProps) {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_460px]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--accent-strong)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            서비스 준비 중
          </div>
          <h1 className="mt-6 max-w-4xl font-[var(--font-heading)] text-4xl font-black leading-[1.15] tracking-tight md:text-5xl lg:text-6xl">
            {landing.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
            {landing.subheadline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedAnchor
              href="#lead-capture"
              eventName="hero_cta_click"
              trackingProps={{ landingSlug: landing.slug, ctaVariant: "hero-primary" }}
              className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-4 text-sm font-bold text-white transition hover:shadow-lg hover:shadow-[var(--glow)]"
            >
              {landing.ctaLabel}
            </TrackedAnchor>
            <p className="text-sm text-[var(--muted)]">{landing.ctaSubtext}</p>
          </div>

          {children}
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-[var(--accent)]/10 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 p-8">
            <div className="surface-strong rounded-3xl p-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-base text-slate-500">
                  ☎
                </div>
                <div>
                  <p className="text-sm font-bold">사용자 인터뷰 #42</p>
                  <p className="text-xs text-slate-400">초기 검증 미리보기</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="h-4 w-3/4 rounded bg-slate-100" />
                <div className="h-4 rounded bg-slate-100" />
                <div className="h-4 w-5/6 rounded bg-slate-100" />
              </div>

              <div className="mt-5 rounded-xl border border-[var(--accent)]/10 bg-[var(--accent)]/5 p-3">
                <p className="text-xs font-bold text-[var(--accent-strong)]">AI 요약</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  사용자들은 검색 필터 과정의 불편을 반복적으로 언급했습니다.
                  모바일 환경의 뒤로가기 경험 개선이 가장 시급한 액션으로 보입니다.
                </p>
              </div>

              <div className="mt-5 grid gap-3">
                {landing.heroHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent-strong)]">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
