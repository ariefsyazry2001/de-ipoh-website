import Image from "next/image";
import type { Copy, Locale } from "@/content/types";
import { RichText } from "./RichText";
import { Footer } from "./Footer";

export function PrivacyPage({ locale, copy }: { locale: Locale; copy: Copy }) {
  const homeHref = locale === "ms" ? "/" : "/en";
  const privacyHref = locale === "ms" ? "/privacy" : "/en/privacy";

  return (
    <>
      <header className="border-b border-mist/30 px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <a href={homeHref} className="flex items-center">
            <Image src="/images/logo.png" alt={copy.nav.logo} width={40} height={40} className="rounded-full" />
          </a>
          <a
            href={homeHref}
            className="text-sm text-ink/70 underline decoration-mist underline-offset-4 hover:text-purple"
          >
            {copy.privacy.backLinkText}
          </a>
        </div>
      </header>

      <main className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {copy.privacy.title}
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-wide text-ink/50">
            {copy.privacy.updated}
          </p>
          <p className="mt-6 max-w-xl text-ink/80">{copy.privacy.intro}</p>

          <div className="mt-10 space-y-8">
            {copy.privacy.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-xl font-semibold text-ink">{section.heading}</h2>
                <p className="mt-2 max-w-xl text-ink/75">
                  <RichText text={section.body} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer copy={copy.footer} privacyHref={privacyHref} />
    </>
  );
}
