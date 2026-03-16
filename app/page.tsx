import type { Metadata } from "next";

import { MainPageView } from "@/components/main-page/main-page-view";
import { mainPageContent } from "@/content/main-page";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const canonicalUrl = new URL("/", siteUrl).toString();
const ogImageUrl = new URL("/opengraph-image", siteUrl).toString();

export const metadata: Metadata = {
  title: mainPageContent.metadata.title,
  description: mainPageContent.metadata.description,
  alternates: {
    canonical: canonicalUrl
  },
  openGraph: {
    title: mainPageContent.metadata.title,
    description: mainPageContent.metadata.description,
    url: canonicalUrl,
    siteName: mainPageContent.brand.name,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: mainPageContent.metadata.title
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: mainPageContent.metadata.title,
    description: mainPageContent.metadata.description,
    images: [ogImageUrl]
  }
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: mainPageContent.brand.name,
        url: canonicalUrl,
        inLanguage: "ko-KR",
        description: mainPageContent.metadata.description
      },
      {
        "@type": "Organization",
        name: mainPageContent.brand.name,
        url: canonicalUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MainPageView content={mainPageContent} />
    </>
  );
}
