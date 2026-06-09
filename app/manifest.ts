import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DFB Furka-Drehscheibe – Entdecker-App",
    short_name: "DFB Drehscheibe",
    description:
      "Interaktives 3D-Modell der handbetriebenen Furka-Drehscheibe (DFB) zum Entdecken und Lernen.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f5f1ea",
    theme_color: "#f5f1ea",
    lang: "de",
    categories: ["education", "travel"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
