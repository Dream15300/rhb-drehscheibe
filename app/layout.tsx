import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
