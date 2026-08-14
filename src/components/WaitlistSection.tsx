import type { Copy } from "@/content/types";
import { Section } from "./Section";
import { WaitlistForm } from "./WaitlistForm";

export function WaitlistSection({
  copy,
  privacyHref,
}: {
  copy: Copy["waitlistForm"];
  privacyHref: string;
}) {
  return (
    <Section id="waitlist" className="bg-paper">
      <div className="mx-auto max-w-lg text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {copy.heading}
        </h2>
        <div className="mt-8 text-left">
          <WaitlistForm copy={copy} privacyHref={privacyHref} />
        </div>
      </div>
    </Section>
  );
}
