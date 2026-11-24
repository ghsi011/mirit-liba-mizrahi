# Working on this memorial

Preserve the exact name **מירית ליבה-מזרחי**. Use only family-supplied or explicitly approved facts, text, dates, and photographs. The initial approved scope is the name, “לזכרה, באהבה”, and a frame labeled “מקום לתמונה”. Do not invent biography, dates, quotations, or a likeness.

## Content changes

Start with `src/content/memorial.json`. Its only fields are `name`, `dedication`, and `photo`. Keep validation in `src/content/memorial.ts`. Photo files belong in `src/assets/photos/`; use the documented safe filenames. A missing or invalid photograph must fail the build. Do not add a fallback that silently hides a broken content reference.

Only commit photographs approved for this public repository after removing private metadata. Do not include private family information in source, tests, fixtures, commit messages, screenshots, or documentation. Use geometric fixtures for image tests, never generated people.

## Implementation

Keep a static Astro site with Hebrew `lang="he"` and `dir="rtl"`. Use semantic HTML, logical CSS properties, readable contrast, and layouts that survive narrow viewports and text enlargement. Keep photos uncropped and preserve descriptive alternative text.

Do not add client JavaScript, tracking, external asset requests, forms, accounts, a CMS, frameworks, or dependencies for a content-only change. Explain a necessary architectural change before expanding the scope. Avoid single-use abstractions and duplicate content rules. Render content as escaped text; never inject raw HTML.

All URLs must work at `/mirit-liba-mizrahi/`, not just the domain root. Use Astro's base path for public assets and its image pipeline for photographs.

## Verification

Use Node.js 24 and the committed lockfile. Run `npm ci`, `npm run check`, `npm run build`, and `npm run verify`. For layout or content-interface changes, exercise the production output on mobile and desktop at the project subpath, including both placeholder and supplied-photo variants. Confirm missing photo references fail and images actually decode. Inspect the rendered page; passing type checks alone is insufficient.

Do not remove or weaken validation, checks, or deployment gates to make a change pass. Report actual results and any unverified live integration. Never claim a site is live until its public URL serves the intended page. Publishing requires the user's authorization; do not infer permission from this file.
