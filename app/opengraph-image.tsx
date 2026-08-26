import { ImageResponse } from "next/og";
import { addressLine, site } from "@/lib/content";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview card. The old site shared a transparent PNG logo, which
 * renders as a floating mark on whatever background the platform uses.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #241710 0%, #3c2a21 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#d9962a",
            }}
          />
          <div
            style={{
              color: "#f0c46a",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            {site.venue}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#e8dcc0",
              fontSize: 82,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              color: "rgba(232, 220, 192, 0.78)",
              fontSize: 40,
              marginTop: 18,
              lineHeight: 1.25,
            }}
          >
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(232, 220, 192, 0.2)",
            paddingTop: 28,
            color: "rgba(232, 220, 192, 0.6)",
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex" }}>{addressLine}</div>
          <div style={{ display: "flex", color: "#f0c46a" }}>
            kaffediem.online
          </div>
        </div>
      </div>
    ),
    size,
  );
}
