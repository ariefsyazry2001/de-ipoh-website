import Image from "next/image";
import type { Copy } from "@/content/types";
import { RichText } from "./RichText";

export function Footer({
  copy,
  privacyHref,
}: {
  copy: Copy["footer"];
  privacyHref: string;
}) {
  return (
    <footer className="bg-night px-6 py-12 text-paper/80">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#171717] ring-1 ring-paper/10">
              <Image src="/images/depoh logo.webp" alt="Dipoh" width={96} height={96} className="h-20 w-20 object-contain" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-paper">Dipoh</p>
              <p className="mt-1 text-sm">{copy.tagline}</p>
            </div>
          </div>

          <div className="text-sm">
            <p className="font-mono text-xs uppercase tracking-wide text-paper/50">
              {copy.contactLabel}
            </p>
            <p className="mt-1">
              <RichText text={copy.contactValue} />
            </p>
          </div>

          <div className="text-sm">
            <p className="font-mono text-xs uppercase tracking-wide text-paper/50">Social</p>
            <ul className="mt-1 space-y-1">
              {copy.socials.map((social) => (
                <li key={social.platform}>
                  {social.platform} — {social.status}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm">
            <a href={privacyHref} className="underline decoration-mist underline-offset-4 hover:text-red">
              {copy.privacyLinkText}
            </a>
            <p className="mt-1">
              <a href={copy.langSwitchHref} className="underline decoration-mist underline-offset-4 hover:text-red">
                {copy.langSwitchLabel}
              </a>
            </p>
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-xs text-paper/50">{copy.pdpaLine}</p>
      </div>
    </footer>
  );
}
