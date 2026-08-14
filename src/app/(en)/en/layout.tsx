import type { Metadata } from "next";
import { getCopy } from "@/content";
import { fontVariables } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";
import "../../globals.css";

const copy = getCopy("en");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: copy.meta.title,
  description: copy.meta.description,
  alternates: {
    canonical: "/en",
    languages: {
      ms: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    url: "/en",
    locale: "en_MY",
    alternateLocale: "ms_MY",
  },
  icons: {
    icon: "/images/logo.png",
  },
};

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper font-body text-ink">{children}</body>
    </html>
  );
}
