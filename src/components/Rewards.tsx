import type { Copy } from "@/content/types";
import { RichText } from "./RichText";
import { Section } from "./Section";

export function Rewards({ copy }: { copy: Copy["rewards"] }) {
  const cards = [
    { label: copy.earnLabel, body: copy.earnBody },
    { label: copy.redeemLabel, body: copy.redeemBody },
    { label: copy.priceLabel, body: copy.priceBody },
  ];

  return (
    <Section id="rewards" className="bg-paper">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red" />
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {copy.heading}
        </h2>
      </div>
      <p className="mt-4 max-w-xl text-ink/75">{copy.intro}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-lg border border-mist/40 bg-lilac/10 p-6">
            <h3 className="font-mono text-xs uppercase tracking-wide text-ink/60">{card.label}</h3>
            <p className="mt-3 text-ink/85">
              <RichText text={card.body} />
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
