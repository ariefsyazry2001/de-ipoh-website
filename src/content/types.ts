export type Locale = "ms" | "en";

export interface FaqItem {
  q: string;
  a: string;
}

export interface StepItem {
  number: string;
  title: string;
  body: string;
}

export interface FeatureItem {
  title: string;
  body: string;
}

export interface SocialLink {
  platform: string;
  status: string;
}

export interface PrivacySection {
  heading: string;
  body: string;
}

export interface Copy {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    logo: string;
    howItWorks: string;
    rewards: string;
    forBusinesses: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
    primaryCta: string;
    secondaryHint: string;
  };
  problem: {
    eyebrow: string;
    heading: string;
    body: string;
    line2: string;
  };
  howItWorks: {
    heading: string;
    steps: StepItem[];
  };
  rewards: {
    heading: string;
    intro: string;
    earnLabel: string;
    earnBody: string;
    redeemLabel: string;
    redeemBody: string;
    priceLabel: string;
    priceBody: string;
  };
  guide: {
    heading: string;
    body: string;
    features: FeatureItem[];
  };
  businesses: {
    eyebrow: string;
    heading: string;
    body: string;
    termsLabel: string;
    termsBody: string;
    cta: string;
  };
  faq: {
    heading: string;
    items: FaqItem[];
  };
  waitlistForm: {
    heading: string;
    emailLabel: string;
    emailPlaceholder: string;
    consentLabel: string;
    submitLabel: string;
    successMessage: string;
    errorMessage: string;
    privacyLinkText: string;
  };
  partnerForm: {
    heading: string;
    nameLabel: string;
    businessLabel: string;
    contactLabel: string;
    categoryLabel: string;
    categoryOptions: string[];
    consentLabel: string;
    submitLabel: string;
    successMessage: string;
    errorMessage: string;
    privacyLinkText: string;
  };
  footer: {
    tagline: string;
    contactLabel: string;
    contactValue: string;
    socials: SocialLink[];
    privacyLinkText: string;
    pdpaLine: string;
    langSwitchLabel: string;
    langSwitchHref: string;
  };
  privacy: {
    title: string;
    updated: string;
    intro: string;
    sections: PrivacySection[];
    backLinkText: string;
  };
}
