import msRaw from "./copy.ms.json";
import enRaw from "./copy.en.json";
import type { Copy, Locale } from "./types";

const ms = msRaw satisfies Copy;
const en = enRaw satisfies Copy;

const registry: Record<Locale, Copy> = { ms, en };

export function getCopy(locale: Locale): Copy {
  return registry[locale];
}

export type { Copy, Locale } from "./types";
