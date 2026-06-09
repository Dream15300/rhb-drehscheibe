# DFB Furka-Drehscheibe – interaktive Entdecker-App

Eine zweisprachige (DE/FR) Lern-Web-App, die eine **handbetriebene Furka-Drehscheibe**
der Dampfbahn Furka-Bergstrecke (DFB) als interaktives 3D-Modell zeigt. Nutzer drehen das
Modell mit dem Finger/der Maus, öffnen markierte Bauteile (Hotspots), lesen kurze und
technische Erklärungen und testen ihr Wissen in kleinen Quizfragen.

## Funktionen

- **3D-Modell** der Drehscheibe (react-three-fiber / three.js), per Pointer in zwei Achsen drehbar.
- **Interaktive Hotspots** für Brücke, Fachwerk, Gleis, Drehlager, Handantrieb, Laufring,
  Verriegelung und Grube.
- **Detail- und Quiz-Screens** je Bauteil mit kurzer, technischer und „Warum wichtig?"-Erklärung.
- **Zweisprachig** Deutsch/Französisch, Sprache umschaltbar und persistent.
- **Fortschritt** („entdeckte" Bauteile) wird im `localStorage` gespeichert.
- **Barrierefreiheit**: `prefers-reduced-motion` wird respektiert, `<html lang>` folgt der
  Sprachwahl, Bedienelemente sind als Buttons mit `aria`-Zuständen ausgezeichnet.

## Tech-Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [react-three-fiber](https://r3f.docs.pmnd.rs/) + [drei](https://github.com/pmndrs/drei) + [three.js](https://threejs.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript (strict)

## Entwicklung

```bash
npm install
npm run dev      # Dev-Server auf http://localhost:3000
npm run build    # Produktionsbuild
npm start        # Produktionsserver
npm run lint     # ESLint
```

## Projektstruktur

```
app/
  layout.tsx     Root-Layout, Metadaten/Viewport, Geist-Fonts
  page.tsx       Orchestrator: Screen-State-Machine + Persistenz
  globals.css    Tailwind-Einstieg + Basis-Styles
lib/
  i18n.ts             Locale-Typ + UI-Texte (DE/FR)
  hotspots.ts         Hotspot-Datenmodell + Inhalte + Gleiswinkel
  usePersistentState  SSR-sicherer localStorage-State-Hook
components/
  Scene.tsx           three.js-Canvas, Pointer-Drag, Lade-/Fehler-Fallback
  Turntable.tsx       3D-Geometrie der Drehscheibe + Hotspot-Marker
  ErrorBoundary.tsx   Fallback für WebGL-/Renderfehler
  screens/            Intro-, Explore-, Detail-, Quiz-Screen
```

## Inhalte erweitern

- **Texte/Sprachen**: `lib/i18n.ts` (UI) bzw. die einzelnen Hotspot-Felder in `lib/hotspots.ts`.
- **Neues Bauteil**: Eintrag in `hotspots` ergänzen (`anchorPosition`/`labelPosition` legen die
  Marker im 3D-Raum fest).
- **Fotos**: Bilddateien unter `public/images/` ablegen und das optionale Feld `image` des
  jeweiligen Hotspots setzen. Ohne `image` wird der Bildbereich im Detail-Screen ausgeblendet.
