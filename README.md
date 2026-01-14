# LexiPro Forensic OS — Enterprise Marketing Site (Final V2)

LexiPro Forensic OS is a deterministic evidence-layer concept built for **medical liability discovery**. This repository contains the **public-facing marketing site** (Vite + React + TailwindCSS) used for M&A conversations and buyer hand-off.

## What a buyer is getting

- A clean, modern React marketing site with a working interactive demo.
- A **Simulated Forensic Engine** (demo mode) that returns structured, audit-safe analysis without any external API calls.
- Build artifacts that are reproducible and deployable to common hosts (GitHub Pages, Netlify, Vercel, S3/CloudFront, etc.).

## Security posture (marketing demo)

**No client-side secrets.** This repo intentionally ships *no* Gemini or other provider API keys to the browser bundle.

- The demo analysis is offline/deterministic.
- If you want a live LLM-backed version, proxy requests through a server-side endpoint (serverless function / private API) where secrets remain private.

## Tech Stack

- Vite + React + TypeScript
- TailwindCSS (compiled locally; no CDN runtime dependencies)
- Lucide icons

## Quickstart (local dev)

Prerequisites: Node.js 18+ (Node 20 recommended)

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Build

```bash
npm run build
npm run preview
```

## Deployment

### GitHub Pages

This repo includes a GitHub Pages workflow (`.github/workflows/deploy.yml`).

If you deploy under a subpath (common for Pages), set:

```bash
VITE_BASE_PATH=/your-repo-name/
```

You can set this as a GitHub Actions environment variable or in your build environment.

### Netlify / Vercel

- Build command: `npm run build`
- Output directory: `dist`

If deploying under a subpath, configure `VITE_BASE_PATH` accordingly.

## Project structure

```
.
├── components/          # React UI sections
├── services/            # Demo engine logic (no network)
├── index.html           # Vite entry
├── index.tsx            # React entry
├── index.css            # Tailwind entry
├── tailwind.config.ts
├── postcss.config.cjs
├── vite.config.ts
└── package.json
```

## Notes for M&A / technical diligence

- **Reproducible builds:** pin versions + (recommended) generate and commit a lockfile for your preferred package manager.
- **No runtime CDNs:** Tailwind and dependencies are bundled through Vite.
- **Audit-safe messaging:** marketing copy avoids unverifiable claims like “0% hallucinations” and instead describes *anchoring compliance* / *anchors-required enforcement*.

---

**License:** Proprietary (asset sale / licensing by agreement).
