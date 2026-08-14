const TBC_SPLIT = /(\[TBC-[A-Z-]+\])/g;
const TBC_TEST = /^\[TBC-[A-Z-]+\]$/;

/**
 * Renders copy that may contain `[TBC-*]` placeholder tokens (see de-ipoh-brief.md §1)
 * as a visibly unfinished badge, so open decisions never read as confident claims.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(TBC_SPLIT);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        TBC_TEST.test(part) ? (
          <span
            key={i}
            className="inline-flex items-center rounded-sm border border-dashed border-current/40 bg-current/10 px-1.5 py-0.5 font-mono text-[0.75em] tracking-tight text-current align-middle"
          >
            {part.replace(/\[TBC-|\]/g, "").replace(/-/g, " ").toLowerCase()} tbc
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}
