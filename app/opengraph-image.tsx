import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt =
  "Kavárna Mletá & Měkká – Výběrová káva v centru Prahy";

/**
 * Generovaný OG image pro sociální sítě.
 */
export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #F5EDE2 0%, #E8D9C8 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Coffee bean icon */}
        <div
          style={{
            fontSize: 80,
            marginBottom: 20,
          }}
        >
          ☕
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 60,
            fontWeight: 900,
            color: "#6B4F3A",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "80%",
          }}
        >
          Kavárna Mletá &amp; Měkká
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "#6B4F3A",
            opacity: 0.7,
            marginTop: 16,
            textAlign: "center",
          }}
        >
          Káva, co tě na chvíli zpomalí.
        </div>

        {/* Bottom badges */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
          }}
        >
          {["Výběrová káva", "Work-friendly", "Praha 2"].map((text) => (
            <div
              key={text}
              style={{
                background: "#7FB77E",
                color: "white",
                padding: "8px 20px",
                borderRadius: 24,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
