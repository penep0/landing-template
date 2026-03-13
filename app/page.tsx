import type { Metadata } from "next";

import { MainPageView } from "@/components/main-page/main-page-view";
import { mainPageContent } from "@/content/main-page";

export const metadata: Metadata = {
  title: mainPageContent.metadata.title,
  description: mainPageContent.metadata.description
};

export default function HomePage() {
  return <MainPageView content={mainPageContent} />;
}
