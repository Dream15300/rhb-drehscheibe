import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Generiertes Home-Screen-Icon für iOS (SVG-Icons werden dort nicht unterstützt).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f1ea",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 124,
            height: 124,
            borderRadius: "50%",
            border: "10px solid #4d4a45",
            background: "#e7e2d8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 150,
              height: 20,
              borderRadius: 6,
              background: "#a31a1b",
            }}
          />
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "#2f2f2f",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
