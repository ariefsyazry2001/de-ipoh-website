import type { Copy } from "@/content/types";
import { PartnerForm } from "./PartnerForm";
import { RichText } from "./RichText";
import { Section } from "./Section";

export function ForBusinesses({
  copy,
  partnerFormCopy,
  privacyHref,
}: {
  copy: Copy["businesses"];
  partnerFormCopy: Copy["partnerForm"];
  privacyHref: string;
}) {
  return (
    <Section id="for-businesses" className="bg-night text-paper">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/60">{copy.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {copy.heading}
          </h2>
          <p className="mt-4 max-w-md text-paper/75">{copy.body}</p>

          <div className="mt-8 rounded-lg border border-mist/30 p-5">
            <h3 className="font-mono text-xs uppercase tracking-wide text-paper/60">
              {copy.termsLabel}
            </h3>
            <p className="mt-2 text-paper/85">
              <RichText text={copy.termsBody} />
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-display text-xl font-semibold text-paper">
            {partnerFormCopy.heading}
          </h3>
          <div className="mt-4">
            <PartnerForm copy={partnerFormCopy} privacyHref={privacyHref} />
          </div>
        </div>
      </div>
    </Section>
  );
}
