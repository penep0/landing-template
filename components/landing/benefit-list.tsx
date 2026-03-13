import { BenefitItem } from "@/content/types";

import { SectionHeading } from "@/components/landing/section-heading";

type BenefitListProps = {
  benefits: BenefitItem[];
};

export function BenefitList({ benefits }: BenefitListProps) {
  return (
    <section id="benefits" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="기능"
          title="초기 검증 페이지에 필요한 핵심 메시지만 남겼습니다."
          description="지금 단계에서는 완성된 제품을 과장해 보이기보다, 사람들이 실제로 관심을 보이는지 확인하는 구조가 더 중요합니다."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
        {benefits.map((benefit) => (
          <article
            key={benefit.title}
            className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-bold text-[var(--accent-strong)]">
              Benefit
            </p>
            <h3 className="mt-3 text-xl font-bold">{benefit.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              {benefit.description}
            </p>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}
