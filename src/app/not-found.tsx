import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export default function NotFound() {
  return (
    <html lang="ms" className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col items-center justify-center gap-4 bg-paper px-6 text-center font-body text-ink">
        <p className="font-mono text-xs uppercase tracking-widest text-purple">404</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Halaman tidak dijumpai / Page not found
        </h1>
        <div className="flex gap-4 text-sm">
          <Link href="/" className="underline decoration-mist underline-offset-4 hover:text-purple">
            De Ipoh (Bahasa Melayu)
          </Link>
          <Link href="/en" className="underline decoration-mist underline-offset-4 hover:text-purple">
            De Ipoh (English)
          </Link>
        </div>
      </body>
    </html>
  );
}
