import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "DFB Furka-Drehscheibe – interaktive Entdecker-App";

// Generiertes OpenGraph-/Social-Sharing-Bild.
export default function OpengraphImage() {
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
          background: "#f5f1ea",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            fontWeight: 700,
            color: "#a31a1b",
          }}
        >
          DFB ENTDECKER-APP
        </div>

        <div
          style={{
            fontSize: 86,
            fontWeight: 800,
            color: "#0a0a0a",
            marginTop: 28,
            lineHeight: 1.05,
          }}
        >
          Handbetriebene Furka-Drehscheibe
        </div>

        <div
          style={{
            fontSize: 36,
            color: "#525252",
            marginTop: 32,
          }}
        >
          Interaktives 3D-Modell · DE · FR · EN
        </div>
      </div>
    ),
    { ...size },
  );
}
