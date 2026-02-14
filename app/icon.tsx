import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

/**
 * Generovaná favicon – coffee bean stylizace.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6B4F3A",
          borderRadius: "20%",
          fontSize: 20,
        }}
      >
        ☕
      </div>
    ),
    {
      ...size,
    }
  );
}
