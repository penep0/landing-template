import { LandingContent } from "@/content";

import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { BenefitList } from "@/components/landing/benefit-list";
import { FAQ } from "@/components/landing/faq";
import { FinalCTA } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNav } from "@/components/landing/landing-nav";
import { LeadForm } from "@/components/landing/lead-form";
import { Problem } from "@/components/landing/problem";
import { SocialProof } from "@/components/landing/social-proof";
import { Solution } from "@/components/landing/solution";

type LandingPageViewProps = {
  landing: LandingContent;
};

export function LandingPageView({ landing }: LandingPageViewProps) {
  return (
    <>
      <PageViewTracker
        eventName="page_view"
        props={{ landingSlug: landing.slug }}
      />
      <LandingNav landingName={landing.name} landingSlug={landing.slug} />

      <main className="pb-16">
        <Hero landing={landing}>
          <LeadForm landing={landing} variant="hero" />
        </Hero>

        <div className="space-y-0">
          <Problem section={landing.problem} />
          <Solution section={landing.solution} />
          <BenefitList benefits={landing.benefits} />
          <SocialProof items={landing.socialProof} />
          <section
            id="lead-capture"
            className="border-y border-[var(--accent)]/10 bg-[var(--accent)]/5 py-24"
          >
            <div className="mx-auto max-w-3xl px-6 text-center">
              <p className="text-sm font-semibold text-[var(--accent-strong)]">
                관심 등록
              </p>
              <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-bold tracking-tight">
                가장 먼저 {landing.name}를 만나보세요
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-500">
                이 프로젝트는 현재 초기 검증 단계입니다. 이메일을 남겨주시면 정식
                출시 시 가장 먼저 알림을 드리고, 얼리버드 혜택을 제공해 드립니다.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-2xl px-6">
              <LeadForm landing={landing} anchorId="lead-form" variant="panel" />
            </div>
          </section>
          <FAQ items={landing.faq} />
          <FinalCTA landingSlug={landing.slug} section={landing.finalCta} />
        </div>
      </main>

      <LandingFooter landingName={landing.name} />
    </>
  );
}

