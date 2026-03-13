import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { LandingPageView } from "@/components/landing/landing-page";
import {
  getLandingContent,
  listActiveLandings,
  MAIN_LANDING_SLUG
} from "@/content";

type LandingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return listActiveLandings()
    .filter((landing) => landing.slug !== MAIN_LANDING_SLUG)
    .map((landing) => ({
    slug: landing.slug
    }));
}

export async function generateMetadata({
  params
}: LandingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const landing = getLandingContent(slug);

  if (!landing) {
    return {
      title: "Landing Not Found"
    };
  }

  return {
    title: landing.title,
    description: landing.description
  };
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { slug } = await params;

  if (slug === MAIN_LANDING_SLUG) {
    redirect("/");
  }

  const landing = getLandingContent(slug);

  if (!landing || landing.status !== "active") {
    notFound();
  }

  return <LandingPageView landing={landing} />;
}
