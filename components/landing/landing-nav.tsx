import { TrackedAnchor } from "@/components/analytics/tracked-anchor";

type LandingNavProps = {
  landingName: string;
  landingSlug: string;
};

export function LandingNav({ landingName, landingSlug }: LandingNavProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-sm font-bold text-[var(--accent-strong)]">
            ✦
          </div>
          <div>
            <p className="text-base font-bold tracking-tight">{landingName}</p>
          </div>
        </div>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          <a href="#problem" className="transition-colors hover:text-[var(--accent-strong)]">
            문제점
          </a>
          <a href="#solution" className="transition-colors hover:text-[var(--accent-strong)]">
            해결 방향
          </a>
          <a href="#benefits" className="transition-colors hover:text-[var(--accent-strong)]">
            핵심 가치
          </a>
          <a href="#faq" className="transition-colors hover:text-[var(--accent-strong)]">
            FAQ
          </a>
        </div>

        <TrackedAnchor
          href="#lead-capture"
          eventName="hero_cta_click"
          trackingProps={{ landingSlug, ctaVariant: "nav-primary" }}
          className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--accent-strong)]"
        >
          출시 소식 받기
        </TrackedAnchor>
      </div>
    </nav>
  );
}
