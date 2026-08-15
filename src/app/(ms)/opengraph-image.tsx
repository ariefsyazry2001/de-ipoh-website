import { ImageResponse } from "next/og";
import { getCopy } from "@/content";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy = getCopy("ms");
export const alt = copy.meta.title;

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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 180, height: 92, borderRadius: 18, marginBottom: 24, background: "#171717", color: "#FFFFFF", fontSize: 42, fontWeight: 700 }}>
          Dipoh
        </div>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#FF3038" }}>
          BELUM DILANCARKAN — IPOH, PERAK
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 24, maxWidth: 900 }}>
          Tinggal untuk hari kedua. Dapat ganjaran kerananya.
        </div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 32, color: "#FF3038" }}>Dipoh</div>
      </div>
    ),
    { ...size }
  );
}
