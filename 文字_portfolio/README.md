# Lo‑fi Zine Portfolio (Kishi)

**Aims**: Split‑scroll bilingual reading (EN/ZH), parallax rhythm, zine‑style index, analog overlays (grain/scanlines), optional generative canvas.

## Quick Start (Vite or static)
- **Static**: open `index.html` in a modern browser.
- **Vite**:
  1. `npm create vite@latest` → Vanilla → JS → replace the generated files with this folder’s contents (or move this folder into the Vite project root).
  2. `npm install` (if needed) and `npm run dev`.
  3. Ensure `/assets` is served (Vite serves `public/` automatically; alternatively set `base` or move `assets` to `public`).
  
## Folder
```
.
├─ index.html
├─ src/
│  ├─ styles.css
│  ├─ main.js
│  └─ scratch-canvas.js
└─ assets/
   ├─ textures/grain.png
   ├─ cursors/scribble.svg
   └─ demos/scroll_demo.gif
```

## Controls
- **INDEX** (top-left): toggle zine list.
- **FX** (top-right): enable/disable scanlines, grain, glitch hover, canvas background, and scroll sync.

## Aesthetic hooks
- Color palette: muted cream `#e6e0d6`, washed red `#b55a5a`, deep bg `#0f0f10`.
- Typography: system monospace fallback; swap in JetBrains/IBM Plex Mono or a typewriter font by editing `--font` in `:root`.
- Overlays: `.film-grain` + `.scanlines` with `mix-blend-mode` for analog feel.
- Cursor: `/assets/cursors/scribble.svg`.

## Tech limits (solo vs collaborator)
**Solo (HTML/CSS/JS)**:
- Split columns, scroll‑sync, parallax transforms, hover glitches, analog overlays, custom cursor.
- Optional canvas background (scratchy drifting lines) using plain Canvas2D.

**Potential collaborator**:
- Complex, high‑performance generative art (WebGL / shader‑based ink bleed, real‑time displacement).
- Advanced scroll choreography (GSAP ScrollTrigger, locomotive‑scroll physics) with timeline editors.
- Custom bitmap/handwritten font production; SVG text rasterization pipelines.
- Accessibility/performance audits for long texts, i18n rendering & pagination.

## Sustainability (repo habits)
- Keep `/assets/textures` small and procedural where possible.
- Add content as Markdown and hydrate (future): simple parser to inject sections into both columns.
- Guardrails: avoid heavy libs; one canvas only; progressive enhancement for CSS scroll‑animations.
- Browser support: JS parallax fallback covers Safari ≤16; modern browsers get CSS scroll‑timeline.

## Customize
- Replace text inside `<article class="block">...` in each column.
- Control per‑block parallax with `data-speed="0.05..0.35"` (higher = more drift).
- To disable canvas by default: set `on=false` in `scratch-canvas.js` or uncheck the FX toggle.
