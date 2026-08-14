import type { Metadata } from "next";
import { getCopy } from "@/content";
import { fontVariables } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const copy = getCopy("ms");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: copy.meta.title,
  description: copy.meta.description,
  alternates: {
    canonical: "/",
    languages: {
      ms: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    url: "/",
    locale: "ms_MY",
    alternateLocale: "en_MY",
  },
  icons: {
    icon: "/images/logo.png",
  },
};

export default function MsRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper font-body text-ink">{children}</body>
    </html>
  );
}
