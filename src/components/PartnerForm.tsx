"use client";

import { FormEvent } from "react";
import type { Copy } from "@/content/types";
import { FORMSPREE_PARTNER_ENDPOINT } from "@/lib/forms";
import { useFormspree } from "@/lib/useFormspree";

export function PartnerForm({
  copy,
  privacyHref,
}: {
  copy: Copy["partnerForm"];
  privacyHref: string;
}) {
  const { status, submit } = useFormspree(FORMSPREE_PARTNER_ENDPOINT);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(e.currentTarget);
  };

  if (status === "success") {
    return (
      <p role="status" className="rounded-lg border border-purple/40 bg-purple/10 p-4 text-paper">
        {copy.successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="partner-name" className="block text-sm font-medium text-paper">
            {copy.nameLabel}
          </label>
          <input
            id="partner-name"
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded-md border border-mist/40 bg-paper/10 px-4 py-3 text-paper placeholder:text-paper/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
          />
        </div>
        <div>
          <label htmlFor="partner-business" className="block text-sm font-medium text-paper">
            {copy.businessLabel}
          </label>
          <input
            id="partner-business"
            name="business"
            type="text"
            required
            className="mt-2 w-full rounded-md border border-mist/40 bg-paper/10 px-4 py-3 text-paper placeholder:text-paper/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
          />
        </div>
        <div>
          <label htmlFor="partner-contact" className="block text-sm font-medium text-paper">
            {copy.contactLabel}
          </label>
          <input
            id="partner-contact"
            name="contact"
            type="text"
            required
            className="mt-2 w-full rounded-md border border-mist/40 bg-paper/10 px-4 py-3 text-paper placeholder:text-paper/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
          />
        </div>
        <div>
          <label htmlFor="partner-category" className="block text-sm font-medium text-paper">
            {copy.categoryLabel}
          </label>
          <select
            id="partner-category"
            name="category"
            required
            defaultValue=""
            className="mt-2 w-full rounded-md border border-mist/40 bg-paper/10 px-4 py-3 text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
          >
            <option value="" disabled>
              {copy.categoryLabel}
            </option>
            {copy.categoryOptions.map((option) => (
              <option key={option} value={option} className="text-ink">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-paper/80">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded border-mist/60 text-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
        />
        <span>
          {copy.consentLabel}{" "}
          <a href={privacyHref} className="underline decoration-mist underline-offset-2 hover:text-red">
            {copy.privacyLinkText}
          </a>
        </span>
      </label>

      {status === "error" && (
        <p role="alert" className="text-sm text-red">
          {copy.errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-purple px-6 py-3 text-base font-medium text-paper transition-colors hover:bg-paper hover:text-ink disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
      >
        {copy.submitLabel}
      </button>
    </form>
  );
}
