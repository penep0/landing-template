import Link from "next/link";

import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { getLandingContent } from "@/content";

type SearchParams = Record<string, string | string[] | undefined>;

type ThanksPageProps = {
  searchParams: Promise<SearchParams>;
};

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ThanksPage({ searchParams }: ThanksPageProps) {
  const resolvedSearchParams = await searchParams;
  const slug = getSingleParam(resolvedSearchParams.slug) ?? "";
  const landing = getLandingContent(slug);

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-20">
      <PageViewTracker
        eventName="thank_you_view"
        props={{ landingSlug: slug || "unknown" }}
      />

      <div className="surface-strong w-full rounded-[36px] p-8 md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">
          Thank You
        </p>
        <h1 className="mt-4 max-w-2xl font-[var(--font-heading)] text-4xl leading-tight md:text-5xl">
          {landing?.form.successMessage ?? "제출이 정상적으로 완료되었습니다."}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          검토 후 가장 먼저 연락드릴 채널로 안내를 보내겠습니다. 빠른
          대화가 필요하면 아래 다음 액션을 바로 진행할 수 있습니다.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="surface rounded-[24px] p-5">
            <p className="font-semibold">캘린더 예약</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              데모 또는 인터뷰 콜을 바로 잡는 CTA 영역입니다.
            </p>
          </div>
          <div className="surface rounded-[24px] p-5">
            <p className="font-semibold">커뮤니티 초대</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              오픈채팅, 슬랙, 대기자 명단 후속 채널에 연결합니다.
            </p>
          </div>
          <div className="surface rounded-[24px] p-5">
            <p className="font-semibold">추가 자료</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              제품 소개서, 사례, 데모 영상을 제공할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href={slug ? `/${slug}` : "/"}
            className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-white"
          >
            {slug ? "랜딩으로 돌아가기" : "홈으로 이동"}
          </Link>
        </div>
      </div>
    </main>
  );
}

