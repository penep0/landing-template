import { FinalCTASection } from "@/content/types";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";

type FinalCTAProps = {
  section: FinalCTASection;
  landingSlug: string;
};

export function FinalCTA({ section, landingSlug }: FinalCTAProps) {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl space-y-10 text-center">
        <div className="space-y-4">
          <h2 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight">
            {section.title}
          </h2>
          <p className="text-lg leading-8 text-slate-500">
            {section.description}
          </p>
        </div>

        <TrackedAnchor
          href="#lead-capture"
          eventName="hero_cta_click"
          trackingProps={{ landingSlug, ctaVariant: "final-cta" }}
          className="inline-flex items-center justify-center rounded-xl bg-[var(--accent)] px-6 py-4 text-lg font-bold text-white transition hover:bg-[var(--accent-strong)] hover:shadow-lg hover:shadow-[var(--glow)]"
        >
          {section.ctaLabel}
        </TrackedAnchor>
      </div>
    </section>
  );
}
