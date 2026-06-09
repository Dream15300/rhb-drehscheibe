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
  Das Quiz markiert richtige/falsche Antworten farblich und führt zum nächsten Bauteil.
- **Dreisprachig** Deutsch/Französisch/Englisch, Sprache umschaltbar und persistent.
- **Fortschritt**: „X / 8 entdeckt"-Anzeige, Abschluss-Screen bei 100 % und Reset-Funktion.
  Der Stand wird pro Gerät im `localStorage` gespeichert (kein Cross-Device-Sync).
- **PWA / Offline**: installierbar (Web-Manifest + Icons), funktioniert nach dem ersten Laden
  dank Service Worker auch offline.
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
  layout.tsx          Root-Layout, Metadaten/Viewport, Geist-Fonts, SW-Registrierung
  page.tsx            Orchestrator: Screen-State-Machine + Persistenz
  globals.css         Tailwind-Einstieg + Basis-Styles
  manifest.ts         Web-App-Manifest (PWA)
  apple-icon.tsx      Generiertes iOS-Home-Screen-Icon
  opengraph-image.tsx Generiertes Social-Sharing-Bild
lib/
  i18n.ts             Locale-Typ + UI-Texte (DE/FR/EN)
  hotspots.ts         Hotspot-Datenmodell + Inhalte (DE/FR/EN) + Gleiswinkel
  usePersistentState  SSR-sicherer localStorage-State-Hook (useSyncExternalStore)
components/
  Scene.tsx                3D-Canvas, Pointer-Drag, Lade-/Fehler-Fallback
  Turntable.tsx            3D-Geometrie der Drehscheibe + Hotspot-Marker
  ErrorBoundary.tsx        Fallback für WebGL-/Renderfehler
  ServiceWorkerRegister    Registriert den Offline-Service-Worker (nur Produktion)
  screens/                 Intro-, Explore-, Detail-, Quiz-, Completed-Screen
public/
  sw.js               Service Worker (Offline-Caching)
  icon.svg            App-Icon (Manifest)
  icon-maskable.svg   Maskable-App-Icon (Manifest)
```

## Konfiguration

- `NEXT_PUBLIC_SITE_URL` (optional): Basis-URL für absolute OpenGraph-/Manifest-URLs in
  Produktion. Ohne Angabe wird `http://localhost:3000` verwendet.

## Inhalte erweitern

- **Texte/Sprachen**: `lib/i18n.ts` (UI) bzw. die einzelnen Hotspot-Felder in `lib/hotspots.ts`.
  Eine weitere Sprache wird durch Ergänzen des `Locale`-Typs und der drei Textquellen hinzugefügt.
- **Neues Bauteil**: Eintrag in `hotspots` ergänzen (`anchorPosition`/`labelPosition` legen die
  Marker im 3D-Raum fest).
- **Fotos**: Bilddateien unter `public/images/` ablegen und das optionale Feld `image` des
  jeweiligen Hotspots setzen. Ohne `image` wird der Bildbereich im Detail-Screen ausgeblendet.
