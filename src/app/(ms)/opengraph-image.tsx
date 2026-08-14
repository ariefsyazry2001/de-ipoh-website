import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getCopy } from "@/content";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy = getCopy("ms");
export const alt = copy.meta.title;

const logoDataUri = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/images/logo.png")
).toString("base64")}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#FFFFFF",
          color: "#1B1420",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoDataUri}
          width={72}
          height={72}
          alt=""
          style={{ borderRadius: "50%", marginBottom: 24 }}
        />
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#5B3FA6" }}>
          BELUM DILANCARKAN — IPOH, PERAK
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 24, maxWidth: 900 }}>
          Tinggal untuk hari kedua. Dapat ganjaran kerananya.
        </div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 32, color: "#E8402B" }}>De Ipoh</div>
      </div>
    ),
    { ...size }
  );
}
