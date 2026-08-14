import { Fredoka, Instrument_Sans, JetBrains_Mono } from "next/font/google";

export const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  display: "swap",
});

export const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const fontVariables = `${fredoka.variable} ${instrument.variable} ${jetbrains.variable}`;
