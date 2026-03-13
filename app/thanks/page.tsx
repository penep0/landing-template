import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { mainPageContent } from "@/content/main-page";
import { getMainPageThemeStyle } from "@/lib/main-page-theme";
import { THANKS_ACCESS_COOKIE } from "@/lib/thanks-access";

export default async function ThanksPage() {
  const cookieStore = await cookies();
  const thanksAccess = cookieStore.get(THANKS_ACCESS_COOKIE);

  if (thanksAccess?.value !== mainPageContent.tracking.landingSlug) {
    redirect("/");
  }

  return (
    <div
      style={getMainPageThemeStyle(mainPageContent.theme)}
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
    >
      <main className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-20">
        <PageViewTracker
          eventName="thank_you_view"
          props={{ landingSlug: mainPageContent.tracking.landingSlug }}
        />

        <div className="surface-strong w-full rounded-[36px] p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">
            {mainPageContent.thanks.eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl font-[var(--font-heading)] text-4xl leading-tight md:text-5xl">
            {mainPageContent.thanks.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            {mainPageContent.thanks.description}
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {mainPageContent.thanks.actions.map((action) => (
              <div key={action.title} className="surface rounded-[24px] p-5">
                <p className="font-semibold">{action.title}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {action.description}
                </p>
                {action.href ? (
                  action.external ? (
                    <a
                      href={action.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold !text-white visited:!text-white hover:!text-white"
                    >
                      {action.linkLabel ?? "바로 가기"}
                    </a>
                  ) : (
                    <Link
                      href={action.href}
                      className="mt-5 inline-flex rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold !text-white visited:!text-white hover:!text-white"
                    >
                      {action.linkLabel ?? "바로 가기"}
                    </Link>
                  )
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold !text-white visited:!text-white hover:!text-white"
            >
              {mainPageContent.thanks.backHomeLabel}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
