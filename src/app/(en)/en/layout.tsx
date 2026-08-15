import type { Metadata } from "next";
import { PwaRegister } from "@/components/PwaRegister";
import { fontVariables } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";
import "../../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ipoh Discovery",
  description: "A mobile-first Ipoh discovery and rewards PWA.",
  alternates: {
    canonical: "/en",
    languages: {
      ms: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Ipoh Discovery",
    description: "Discover Ipoh based on what you love, scan QR codes, earn points, and redeem local rewards.",
    url: "/en",
    locale: "en_MY",
    alternateLocale: "ms_MY",
  },
  icons: {
    icon: "/images/depoh logo.webp",
  },
  manifest: "/manifest.webmanifest",
};

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper font-body text-ink">
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
