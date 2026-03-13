import { MainPageHeroPreview } from "@/content/main-page";

type HeroPreviewShellProps = {
  preview: MainPageHeroPreview;
};

export function HeroPreviewShell({ preview }: HeroPreviewShellProps) {
  return (
    <div className="rounded-[2rem] border border-[var(--accent)]/10 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 p-8">
      <div className="surface-strong rounded-3xl p-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-base text-slate-500">
            {preview.icon}
          </div>
          <div>
            <p className="text-sm font-bold">{preview.title}</p>
            <p className="text-xs text-slate-400">{preview.meta}</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="h-4 w-3/4 rounded bg-slate-100" />
          <div className="h-4 rounded bg-slate-100" />
          <div className="h-4 w-5/6 rounded bg-slate-100" />
        </div>

        <div className="mt-5 rounded-xl border border-[var(--accent)]/10 bg-[var(--accent)]/5 p-3">
          <p className="text-xs font-bold text-[var(--accent-strong)]">
            {preview.summaryLabel}
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            {preview.summaryText}
          </p>
        </div>

        <div className="mt-5 grid gap-3">
          {preview.cards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent-strong)]">
                {card.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
