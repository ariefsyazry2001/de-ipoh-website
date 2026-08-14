"use client";

import { FormEvent } from "react";
import type { Copy } from "@/content/types";
import { FORMSPREE_WAITLIST_ENDPOINT } from "@/lib/forms";
import { useFormspree } from "@/lib/useFormspree";

export function WaitlistForm({
  copy,
  privacyHref,
}: {
  copy: Copy["waitlistForm"];
  privacyHref: string;
}) {
  const { status, submit } = useFormspree(FORMSPREE_WAITLIST_ENDPOINT);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(e.currentTarget);
  };

  if (status === "success") {
    return (
      <p role="status" className="rounded-lg border border-purple/40 bg-purple/10 p-4 text-ink">
        {copy.successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="waitlist-email" className="block text-sm font-medium text-ink">
          {copy.emailLabel}
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          placeholder={copy.emailPlaceholder}
          className="mt-2 w-full rounded-md border border-mist/50 bg-paper px-4 py-3 text-ink placeholder:text-ink/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink/80">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded border-mist/60 text-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
        />
        <span>
          {copy.consentLabel}{" "}
          <a href={privacyHref} className="underline decoration-mist underline-offset-2 hover:text-purple">
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
        className="rounded-full bg-purple px-6 py-3 text-base font-medium text-paper transition-colors hover:bg-ink disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple"
      >
        {copy.submitLabel}
      </button>
    </form>
  );
}
