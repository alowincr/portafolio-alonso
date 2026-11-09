import { ImageResponse } from "next/og";

export const alt = "Alonso Carbajal — Desarrollador Fullstack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const stack = ["React", "Next.js", "Java", "Spring Boot", "FastAPI"];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #09090b 0%, #1e1b4b 55%, #4c1d95 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#a5b4fc", letterSpacing: 6 }}>
          PORTAFOLIO
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: -2,
            marginTop: 18,
          }}
        >
          Alonso Carbajal
        </div>

        <div style={{ display: "flex", fontSize: 40, color: "#c4b5fd", marginTop: 8 }}>
          Desarrollador Fullstack
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 44 }}>
          {stack.map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: 24,
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", marginTop: 52, fontSize: 24, color: "#94a3b8" }}>
          Lima, Perú · Disponible para prácticas y roles junior
        </div>
      </div>
    ),
    { ...size }
  );
}
