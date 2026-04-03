import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "Luna Studio – Prémiový beauty salon";

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
          background: "linear-gradient(145deg, #F8F4EF 0%, #E7D9CC 55%, #C89B8A 100%)",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 600,
            color: "#1F1A17",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: "85%",
          }}
        >
          Luna Studio
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#6F625B",
            marginTop: 20,
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          Prostor, kde krása dostává čas.
        </div>
        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 36,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["Prémiová péče", "Praha", "Rezervace online"].map((text) => (
            <div
              key={text}
              style={{
                background: "#1F1A17",
                color: "#F8F4EF",
                padding: "10px 22px",
                borderRadius: 4,
                fontSize: 17,
                fontWeight: 600,
                fontFamily: "sans-serif",
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
