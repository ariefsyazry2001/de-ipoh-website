import type { Copy } from "@/content/types";
import { Section } from "./Section";

export function GuideSide({ copy }: { copy: Copy["guide"] }) {
  return (
    <Section className="bg-paper">
      <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {copy.heading}
      </h2>
      <p className="mt-4 max-w-xl text-ink/75">{copy.body}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {copy.features.map((feature) => (
          <div key={feature.title} className="border-l-2 border-purple/60 pl-4">
            <h3 className="font-display text-lg font-semibold text-ink">{feature.title}</h3>
            <p className="mt-2 text-sm text-ink/70">{feature.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
