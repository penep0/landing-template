export type LandingStatus = "draft" | "active" | "archived";

export type HighlightItem = {
  title: string;
  description: string;
};

export type SectionWithBullets = {
  eyebrow?: string;
  title: string;
  description: string;
  bullets: string[];
};

export type BenefitItem = {
  title: string;
  description: string;
};

export type SocialProofItem = {
  label: string;
  value: string;
  caption: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type FinalCTASection = {
  title: string;
  description: string;
  ctaLabel: string;
};

export type LandingContent = {
  slug: string;
  name: string;
  status: LandingStatus;
  title: string;
  description: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaSubtext: string;
  heroHighlights: HighlightItem[];
  problem: SectionWithBullets;
  solution: SectionWithBullets;
  benefits: BenefitItem[];
  socialProof: SocialProofItem[];
  faq: FAQItem[];
  form: {
    title: string;
    description: string;
    submitLabel: string;
    successMessage: string;
  };
  finalCta: FinalCTASection;
};

