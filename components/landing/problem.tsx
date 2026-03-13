import { SectionWithBullets } from "@/content/types";

import { SectionHeading } from "@/components/landing/section-heading";

type ProblemProps = {
  section: SectionWithBullets;
};

export function Problem({ section }: ProblemProps) {
  const icons = ["⌛", "⌕", "☰"];
  return (
    <section id="problem" className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
        {section.bullets.map((bullet, index) => (
          <div
            key={bullet}
            className="rounded-3xl border border-slate-100 bg-[var(--background)] p-8 text-left"
          >
            <div className="mb-4 text-2xl text-red-400">{icons[index] ?? "•"}</div>
            <p className="text-base font-bold text-slate-900">
              {index === 0
                ? "반복되는 전사 작업"
                : index === 1
                  ? "파편화된 정보"
                  : "실행되지 않는 액션 아이템"}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-500">{bullet}</p>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
