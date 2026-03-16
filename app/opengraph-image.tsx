import { ImageResponse } from "next/og";

import { mainPageContent } from "@/content/main-page";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background: "linear-gradient(135deg, #f5f7f8 0%, #ffffff 50%, #eef4ff 100%)",
          color: "#0f172a",
          padding: "64px",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}
        >
          <div
            style={{
              height: "56px",
              width: "56px",
              borderRadius: "16px",
              background: "#2f72dc",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700
            }}
          >
            {mainPageContent.brand.mark}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{ fontSize: "22px", color: "#2f72dc", fontWeight: 700 }}>
              {mainPageContent.hero.badge}
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700 }}>
              {mainPageContent.brand.name}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >
          <div
            style={{
              fontSize: "64px",
              lineHeight: 1.12,
              fontWeight: 800,
              maxWidth: "980px"
            }}
          >
            {mainPageContent.hero.headline}
          </div>
          <div
            style={{
              fontSize: "28px",
              lineHeight: 1.5,
              color: "#5b6b82",
              maxWidth: "980px"
            }}
          >
            {mainPageContent.metadata.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "24px",
            color: "#5b6b82"
          }}
        >
          <div>{mainPageContent.nav.ctaLabel}</div>
          <div>Demand Validation Landing</div>
        </div>
      </div>
    ),
    size
  );
}
