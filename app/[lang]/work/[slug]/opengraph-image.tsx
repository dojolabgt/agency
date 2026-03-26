import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import en from "../../../../dictionaries/en.json";
import es from "../../../../dictionaries/es.json";

export const size = { width: 1200, height: 900 };
export const contentType = "image/png";

export function generateStaticParams() {
  return en.work.projects.flatMap((project) =>
    ["es", "en"].map((lang) => ({ lang, slug: project.slug }))
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  const dict = lang === "es" ? es : en;
  const project = dict.work.projects.find((p) => p.slug === slug);
  if (!project) return new Response("Not found", { status: 404 });

  const [fontData, logoData] = await Promise.all([
    readFile(
      join(
        process.cwd(),
        "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"
      )
    ),
    readFile(join(process.cwd(), "public/logo.png"), "base64"),
  ]);

  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(145deg, #141414 0%, #0a0a0a 55%, #0f0f0f 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Geist",
        }}
      >
        {/* Subtle radial glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -120,
            width: 600,
            height: 600,
            borderRadius: 300,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Bottom-right glow behind image */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: 100,
            width: 700,
            height: 700,
            borderRadius: 350,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* Left — text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 440,
            flexShrink: 0,
            padding: "64px 0 64px 68px",
          }}
        >
          {/* Logo — 3:1 ratio (1200×400) */}
          <img src={logoSrc} style={{ height: 22, width: 200, opacity: 0.5 }} />

          {/* Project info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Index + Category */}
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 32,
              }}
            >
              {project.index} — {project.category}
            </span>

            {/* Divider */}
            <div
              style={{
                width: 32,
                height: 1,
                background: "rgba(255,255,255,0.12)",
                marginBottom: 24,
                display: "flex",
              }}
            />

            {/* Tags */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.22)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Year */}
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.15)",
                marginTop: 20,
              }}
            >
              {project.year}
            </span>
          </div>
        </div>

        {/* Right — floating image card */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "52px 0 52px 36px",
            paddingRight: 0,
          }}
        >
          {/* Card — bleeds slightly off the right edge for depth */}
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              borderRadius: "24px 0 0 24px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRight: "none",
              boxShadow:
                "-24px 0 80px rgba(0,0,0,0.5), 0 24px 60px rgba(0,0,0,0.4)",
              backgroundImage: `url(${project.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            {/* Subtle inner gradient on image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(12,12,12,0.35) 0%, transparent 40%)",
                display: "flex",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Geist",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
