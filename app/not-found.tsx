import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-20">
      <div className="surface-strong w-full rounded-[32px] p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
          404
        </p>
        <h1 className="mt-4 font-[var(--font-heading)] text-4xl">
          요청한 랜딩을 찾지 못했습니다.
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          slug가 비활성화되었거나 아직 콘텐츠가 생성되지 않았습니다.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-white"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}

