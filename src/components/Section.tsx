import type { ReactNode } from "react";

export function Section({
  id,
  className = "",
  innerClassName = "",
  children,
}: {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`px-6 py-16 sm:py-24 ${className}`}>
      <div className={`mx-auto max-w-5xl ${innerClassName}`}>{children}</div>
    </section>
  );
}
