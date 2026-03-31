# Claude Leak Details Explorer

Instead of downloading and unzipping the whole codebase, here’s a detailed, structured view of every file and folder so you can explore it like a product, not a zip dump.

This app turns the `claude/src` tree into a browsable documentation experience with:

- A landing page and docs shell
- Searchable file inventory grouped by top-level folders
- Per-file summaries, export hints, and import roots
- Live source previews for text files
- Light and dark theme support

## Getting Started

Run the app locally:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run docs:manifest
```

## Project Structure

- `app/page.tsx` - landing page
- `app/docs/layout.tsx` - shared docs layout
- `app/docs/claude-src/page.tsx` - file inventory view
- `app/docs/claude-src/file/[...path]/page.tsx` - per-file detail page
- `app/docs/data/claude-src-manifest.json` - generated manifest
- `lib/claudeSrc.ts` - manifest loading and source preview helpers
- `scripts/build-claude-src-manifest.mjs` - manifest generation script

## How It Works

1. The manifest builder scans `claude/src` and generates structured metadata.
2. The docs index turns that metadata into a searchable explorer.
3. File detail pages resolve a path safely and show a preview from disk when available.

## Notes

- Source previews are limited for very large files.
- The manifest is expected to be regenerated when the underlying source tree changes.

---

<div align="center">
Built by [Rishi Chaurasia](https://github.com/RishiBuilds)
</div>
