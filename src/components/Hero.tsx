import type { Copy } from "@/content/types";

export function Hero({ copy }: { copy: Copy["hero"] }) {
  return (
    <div className="relative px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-purple">{copy.eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          {copy.headline}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink/80">{copy.sub}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#waitlist"
            className="rounded-full bg-purple px-6 py-3 text-base font-medium text-paper transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
          >
            {copy.primaryCta}
          </a>
          <p className="text-sm text-ink/60">{copy.secondaryHint}</p>
        </div>
      </div>
    </div>
  );
}
