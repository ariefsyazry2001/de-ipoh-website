import type { Copy } from "@/content/types";
import { Section } from "./Section";

export function Problem({ copy }: { copy: Copy["problem"] }) {
  return (
    <Section className="relative bg-night text-paper">
      <p className="font-mono text-xs uppercase tracking-widest text-paper/60">{copy.eyebrow}</p>
      <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {copy.heading}
      </h2>
      <p className="mt-6 max-w-xl text-paper/75">{copy.body}</p>
      <p className="mt-6 max-w-xl font-display text-xl font-medium text-paper">{copy.line2}</p>
    </Section>
  );
}
