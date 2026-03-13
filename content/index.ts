import { aiNoteLanding } from "@/content/ai-note";
import { resumeHelperLanding } from "@/content/resume-helper";
import { LandingContent } from "@/content/types";

export const MAIN_LANDING_SLUG = "ai-note";

const LANDINGS: LandingContent[] = [aiNoteLanding, resumeHelperLanding];

export function listActiveLandings() {
  return LANDINGS.filter((landing) => landing.status === "active");
}

export function getLandingContent(slug: string) {
  return LANDINGS.find((landing) => landing.slug === slug);
}

export { LANDINGS };
export type { LandingContent } from "@/content/types";
