import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

/** Generovaná favicon – minimalistický symbol ve stylu značky. */
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
          background: "#1F1A17",
          borderRadius: "20%",
          color: "#F8F4EF",
          fontSize: 18,
          fontWeight: 600,
          fontFamily: "serif",
        }}
      >
        L
      </div>
    ),
    { ...size }
  );
}
