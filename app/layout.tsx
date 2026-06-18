import type { Metadata, Viewport } from "next";
import { Oswald, Source_Serif_4 } from "next/font/google";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import "./globals.css";

// CD-Manual DFB: Überschriften/technische Angaben in DIN Condensed (Versalien),
// Lesetext in Kepler Std. Beide sind Adobe Fonts und nicht frei einbettbar –
// wir verwenden die nächstgelegenen freien Äquivalente:
//   Oswald          ≈ DIN Condensed (schmale Grotesk, Rollmaterial-Anmutung)
//   Source Serif 4  ≈ Kepler Std (beide von Robert Slimbach)
const displayFont = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "DFB Furka-Drehscheibe – interaktive Entdecker-App",
  description:
    "Interaktives 3D-Modell der handbetriebenen Furka-Drehscheibe (DFB). Drehe das Modell, entdecke die Bauteile und teste dein Wissen – zweisprachig Deutsch/Französisch.",
  applicationName: "DFB Entdecker-App",
  authors: [{ name: "DFB" }],
  keywords: [
    "DFB",
    "Furka",
    "Drehscheibe",
    "Dampfbahn Furka-Bergstrecke",
    "Schmalspurbahn",
    "3D",
  ],
  openGraph: {
    title: "DFB Furka-Drehscheibe – interaktive Entdecker-App",
    description:
      "Interaktives 3D-Modell der handbetriebenen Furka-Drehscheibe (DFB).",
    type: "website",
    locale: "de_CH",
  },
  appleWebApp: {
    capable: true,
    title: "DFB Drehscheibe",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f1ea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
