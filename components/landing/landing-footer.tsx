type LandingFooterProps = {
  landingName: string;
};

export function LandingFooter({ landingName }: LandingFooterProps) {
  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="mx-auto max-w-5xl px-6 py-12 text-center">
        <div className="mb-6 flex items-center justify-center gap-2 opacity-60">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-sm font-bold text-[var(--accent-strong)]">
            ✦
          </div>
          <span className="text-lg font-bold tracking-tight">{landingName}</span>
        </div>
        <p className="text-sm text-slate-400">© 2026 {landingName} Team. All rights reserved.</p>
        <p className="mx-auto mt-2 max-w-xl text-[11px] leading-6 text-slate-400">
          본 페이지는 서비스의 수요를 파악하기 위한 랜딩 페이지입니다. 실제 서비스
          제공 여부는 신청 현황과 검증 결과에 따라 결정됩니다.
        </p>
      </div>
    </footer>
  );
}
