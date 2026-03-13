import type { Metadata } from "next";

import { getLandingContent, MAIN_LANDING_SLUG } from "@/content";
import { LandingPageView } from "@/components/landing/landing-page";

export const metadata: Metadata = (() => {
  const landing = getLandingContent(MAIN_LANDING_SLUG);

  if (!landing) {
    return {
      title: "Landing Template"
    };
  }

  return {
    title: landing.title,
    description: landing.description
  };
})();

export default function HomePage() {
  const landing = getLandingContent(MAIN_LANDING_SLUG);

  if (!landing) {
    return null;
  }

  return <LandingPageView landing={landing} />;
}
