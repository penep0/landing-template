import { SectionWithBullets } from "@/content/types";

import { SectionHeading } from "@/components/landing/section-heading";

type SolutionProps = {
  section: SectionWithBullets;
};

export function Solution({ section }: SolutionProps) {
  return (
    <section id="solution" className="px-6 py-20">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="grid grid-cols-2 gap-4">
          {section.bullets.slice(0, 4).map((bullet, index) => (
            <div
              key={bullet}
              className={
                index === 1
                  ? "rounded-3xl bg-slate-900 p-6 text-white"
                  : index === 3
                    ? "rounded-3xl bg-[var(--accent)] p-6 text-white shadow-lg shadow-[var(--glow)]"
                    : index === 0
                      ? "rounded-3xl border border-[var(--accent)]/20 bg-[var(--accent)]/10 p-6 text-slate-900"
                      : "rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm"
              }
            >
              <p
                className={
                  index === 1 || index === 3
                    ? "text-sm font-bold text-white"
                    : "text-sm font-bold text-[var(--accent-strong)]"
                }
              >
                {index === 0
                  ? "실시간 정리"
                  : index === 1
                    ? "지능형 요약"
                    : index === 2
                      ? "자동 액션"
                      : "인사이트 추출"}
              </p>
              <p
                className={
                  index === 1 || index === 3
                    ? "mt-3 text-sm leading-7 text-slate-200"
                    : "mt-3 text-sm leading-7 text-slate-500"
                }
              >
                {bullet}
              </p>
            </div>
          ))}
        </div>

        <div>
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
          />
          <ul className="mt-8 space-y-4">
            {section.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full text-sm text-[var(--accent)]">
                  ✓
                </div>
                <p className="text-sm leading-7 text-slate-500 md:text-base">
                  {bullet}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
