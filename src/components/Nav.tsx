import Image from "next/image";
import type { Copy } from "@/content/types";

export function Nav({
  copy,
  homeHref,
  langSwitchHref,
  langSwitchLabel,
}: {
  copy: Copy["nav"];
  homeHref: string;
  langSwitchHref: string;
  langSwitchLabel: string;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-mist/30 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <a href={homeHref} className="flex items-center">
          <Image src="/images/logo.png" alt={copy.logo} width={44} height={44} className="rounded-full" priority />
        </a>

        <nav aria-label="Section" className="hidden items-center gap-6 text-sm md:flex">
          <a href="#how-it-works" className="text-ink/80 transition-colors hover:text-purple">
            {copy.howItWorks}
          </a>
          <a href="#rewards" className="text-ink/80 transition-colors hover:text-purple">
            {copy.rewards}
          </a>
          <a href="#for-businesses" className="text-mist transition-colors hover:text-purple">
            {copy.forBusinesses}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={langSwitchHref}
            className="hidden text-sm text-ink/70 underline decoration-mist underline-offset-4 hover:text-purple sm:inline"
          >
            {langSwitchLabel}
          </a>
          <a
            href="#waitlist"
            className="rounded-full bg-purple px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
