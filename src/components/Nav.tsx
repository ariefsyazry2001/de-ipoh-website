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
          <span className="flex h-12 w-24 items-center justify-center overflow-hidden rounded-xl bg-[#171717] ring-1 ring-ink/10">
            <Image src="/images/depoh logo.webp" alt={copy.logo} width={96} height={96} className="h-20 w-20 object-contain" priority />
          </span>
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
            className="rounded-full bg-[#171717] px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
