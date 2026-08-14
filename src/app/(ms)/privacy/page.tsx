import type { Metadata } from "next";
import { PrivacyPage } from "@/components/PrivacyPage";
import { getCopy } from "@/content";

const copy = getCopy("ms");

export const metadata: Metadata = {
  title: `${copy.privacy.title} — ${copy.nav.logo}`,
  description: copy.privacy.intro,
  alternates: {
    canonical: "/privacy",
    languages: { ms: "/privacy", en: "/en/privacy", "x-default": "/privacy" },
  },
};

export default function MsPrivacyPage() {
  return <PrivacyPage locale="ms" copy={copy} />;
}
