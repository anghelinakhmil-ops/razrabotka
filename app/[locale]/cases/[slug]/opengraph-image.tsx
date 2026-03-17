import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "NAKO Agency — Case Study";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * Case titles & clients per locale.
 * Edge runtime cannot use next-intl, so we keep a lightweight lookup.
 */
const CASE_DATA: Record<
  string,
  Record<string, { title: string; client: string }>
> = {
  "ceramo-lab": {
    en: { title: "Ceramo Lab", client: "Ceramo Lab" },
    ru: { title: "Ceramo Lab", client: "Ceramo Lab" },
    uk: { title: "Ceramo Lab", client: "Ceramo Lab" },
    ro: { title: "Ceramo Lab", client: "Ceramo Lab" },
    pl: { title: "Ceramo Lab", client: "Ceramo Lab" },
    de: { title: "Ceramo Lab", client: "Ceramo Lab" },
    it: { title: "Ceramo Lab", client: "Ceramo Lab" },
    fr: { title: "Ceramo Lab", client: "Ceramo Lab" },
  },
  mindjoy: {
    en: { title: "MindJoy", client: "MindJoy" },
    ru: { title: "MindJoy", client: "MindJoy" },
    uk: { title: "MindJoy", client: "MindJoy" },
    ro: { title: "MindJoy", client: "MindJoy" },
    pl: { title: "MindJoy", client: "MindJoy" },
    de: { title: "MindJoy", client: "MindJoy" },
    it: { title: "MindJoy", client: "MindJoy" },
    fr: { title: "MindJoy", client: "MindJoy" },
  },
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const data =
    CASE_DATA[slug]?.[locale] ??
    CASE_DATA[slug]?.en ??
    { title: slug.replace(/-/g, " "), client: "" };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#252321",
          padding: "60px",
        }}
      >
        {/* Top: label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "4px",
              background: "#A67B5B",
            }}
          />
          <span
            style={{
              color: "#A67B5B",
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Case Study
          </span>
        </div>

        {/* Middle: project name + client */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              color: "#F9F7F2",
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "0.02em",
            }}
          >
            {data.title}
          </div>
          {data.client && data.client !== data.title && (
            <div
              style={{
                color: "rgba(249,247,242,0.5)",
                fontSize: "28px",
              }}
            >
              {data.client}
            </div>
          )}
        </div>

        {/* Bottom: brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "#A67B5B",
              }}
            />
            <span
              style={{
                color: "#F9F7F2",
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              NAKO AGENCY
            </span>
          </div>
          <span
            style={{
              color: "rgba(249,247,242,0.4)",
              fontSize: "20px",
            }}
          >
            nakoagency.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
