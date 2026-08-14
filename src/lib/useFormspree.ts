"use client";

import { useCallback, useState } from "react";

export type FormStatus = "idle" | "submitting" | "success" | "error";

export function useFormspree(endpoint: string) {
  const [status, setStatus] = useState<FormStatus>("idle");

  const submit = useCallback(
    async (form: HTMLFormElement) => {
      setStatus("submitting");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          setStatus("success");
          form.reset();
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    },
    [endpoint]
  );

  return { status, submit };
}
