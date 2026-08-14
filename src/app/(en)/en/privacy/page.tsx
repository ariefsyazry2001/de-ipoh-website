import type { Metadata } from "next";
import { PrivacyPage } from "@/components/PrivacyPage";
import { getCopy } from "@/content";

const copy = getCopy("en");

export const metadata: Metadata = {
  title: `${copy.privacy.title} — ${copy.nav.logo}`,
  description: copy.privacy.intro,
  alternates: {
    canonical: "/en/privacy",
    languages: { ms: "/privacy", en: "/en/privacy", "x-default": "/privacy" },
  },
};

export default function EnPrivacyPage() {
  return <PrivacyPage locale="en" copy={copy} />;
}
