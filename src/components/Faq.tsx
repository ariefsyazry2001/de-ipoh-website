import type { Copy } from "@/content/types";
import { RichText } from "./RichText";
import { Section } from "./Section";

export function Faq({ copy }: { copy: Copy["faq"] }) {
  return (
    <Section id="faq" className="bg-paper">
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {copy.heading}
      </h2>
      <div className="mt-8 divide-y divide-mist/30 border-t border-mist/30">
        {copy.items.map((item) => (
          <details key={item.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple">
              <span>{item.q}</span>
              <span aria-hidden="true" className="text-purple transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 max-w-2xl text-ink/75">
              <RichText text={item.a} />
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
