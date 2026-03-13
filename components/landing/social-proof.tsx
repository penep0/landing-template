import { SocialProofItem } from "@/content/types";

type SocialProofProps = {
  items: SocialProofItem[];
};

export function SocialProof({ items }: SocialProofProps) {
  return (
    <section className="border-y border-[var(--accent)]/10 bg-[var(--accent)]/5 py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div>
          <p className="text-sm font-semibold text-[var(--accent-strong)]">
            관심 지표
          </p>
          <h2 className="mt-3 font-[var(--font-heading)] text-3xl font-bold tracking-tight">
            실제 사용 의향을 확인하기 위한 최소한의 숫자
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-500">
            정식 출시 전에도 인터뷰 수, 대기 등록 수, 기대 효과 같은 지표는 충분히
            설득력 있는 관심 신호가 됩니다.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              {item.label}
            </p>
            <p className="mt-3 text-4xl font-extrabold text-slate-900">{item.value}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.caption}</p>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
