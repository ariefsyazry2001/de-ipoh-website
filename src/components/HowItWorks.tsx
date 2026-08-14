import type { Copy } from "@/content/types";
import { RichText } from "./RichText";
import { Section } from "./Section";

export function HowItWorks({ copy }: { copy: Copy["howItWorks"] }) {
  return (
    <Section id="how-it-works" className="relative bg-paper">
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {copy.heading}
      </h2>
      <ol className="mt-10 grid gap-8 sm:grid-cols-3">
        {copy.steps.map((step) => (
          <li key={step.number} className="border-t border-mist/50 pt-4">
            <span className="font-mono text-sm text-purple">{step.number}</span>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-ink/75">
              <RichText text={step.body} />
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
