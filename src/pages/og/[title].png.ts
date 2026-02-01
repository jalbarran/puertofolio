import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";
import path from "node:path";

export async function getStaticPaths() {
  return [
    { params: { title: "Jonathan Albarrán" } },
    { params: { title: "Proyectos Personales" } },
    { params: { title: "Experiencia" } },
    { params: { title: "Inteligencia Artificial" } },
    { params: { title: "Habilidades" } },
    { params: { title: "Contacto" } },
    { params: { title: "Inicio" } },
    { params: { title: "Acerca de" } },
    { params: { title: "Personal Projects" } },
    { params: { title: "Skills" } },
    { params: { title: "Experience" } },
    // ...
  ];
}

export async function GET({ params }: { params: { title: string } }) {
  const { title } = params;

  // 1. Configura una fuente (Satori necesita una fuente real para dibujar el texto)
  const fontData = fs.readFileSync(
    path.resolve("./public/fonts/Inter-Bold.ttf")
  );
  // 2. Crea el diseño de tu tarjeta en HTML/CSS (estilo flexbox)
  const svg = await satori(
    {
      type: "div",
      props: {
        children: decodeURIComponent(title),
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
          color: "#fff",
          fontSize: 60,
          fontWeight: 700,
          padding: "40px",
          textAlign: "center",
        },
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Inter", data: fontData, weight: 700 }],
    }
  );

  // 3. Convierte el SVG resultante en un PNG
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(new Uint8Array(pngBuffer), {
    headers: { "Content-Type": "image/png" },
  });
}