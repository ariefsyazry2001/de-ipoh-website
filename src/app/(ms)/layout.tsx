import type { Metadata } from "next";
import { PwaRegister } from "@/components/PwaRegister";
import { fontVariables } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ipoh Discovery",
  description: "A mobile-first Ipoh discovery and rewards PWA.",
  alternates: {
    canonical: "/",
    languages: {
      ms: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Ipoh Discovery",
    description: "Discover Ipoh based on what you love, scan QR codes, earn points, and redeem local rewards.",
    url: "/",
    locale: "ms_MY",
    alternateLocale: "en_MY",
  },
  icons: {
    icon: "/images/logo.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function MsRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper font-body text-ink">
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
