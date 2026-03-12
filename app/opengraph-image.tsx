import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "NAKO Agency — Разработка сайтов под ключ";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "#252321",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {/* Logo / Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "#A67B5B",
              marginRight: "24px",
            }}
          />
          <span
            style={{
              color: "#F9F7F2",
              fontSize: "48px",
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            N A K O   A G E N C Y
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            color: "#F9F7F2",
            fontSize: "72px",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "24px",
          }}
        >
          Разработка сайтов
        </div>

        <div
          style={{
            color: "#F9F7F2",
            fontSize: "72px",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "40px",
          }}
        >
          под ключ
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: "#A67B5B",
            fontSize: "32px",
            textAlign: "center",
          }}
        >
          Premium-minimal дизайн • Скорость • SEO
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
