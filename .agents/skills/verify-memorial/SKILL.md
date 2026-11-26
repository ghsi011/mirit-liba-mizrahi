---
name: verify-memorial
description: Run and inspect the Mirit Liba-Mizrahi memorial production page, photo states, and GitHub Pages deployment when verifying a change.
---

# Verify the memorial

## Launch

From the repository root with Node 24, run `npm ci` and `npx playwright install chromium`. Run `npm run verify` to build and drive the production page. The suite opens a private loopback server on an OS-assigned port for each content state. No accounts, credentials, or production data are required. A usable run prints `PASS current:` and checks the actual page at `/mirit-liba-mizrahi/`.

For visual inspection after the build, start `npm run preview -- --host 127.0.0.1 --port 4321` and open the project subpath. Use the port printed by Astro. Do not reuse or stop another process.

## Doctor

For a preview, request `http://127.0.0.1:4321/mirit-liba-mizrahi/` and confirm HTTP 200 and the exact title `מירית ליבה-מזרחי` in the HTML. For the automated run, its HTTP status, exact heading, and subpath checks identify the instance before the browser evidence is accepted. Do not substitute a type check or a root-path preview.

## Drive

Use [the feature map](features/README.md). Run `npm run verify` once for all features and inspect the screenshots at 390px and 1440px. For a visual change, also open the page at 320px and check the scope of the actual edit. For a deployment, verify the exact successful workflow SHA and the public URL; local proof is not publication proof.

## Evidence

Keep `.verification/report.json` and the current, placeholder and photo screenshots in `.verification/`. Confirm the report is from this run. Cite the affected file or behavior, check result and any unverified external step in the PR. Do not commit screenshots of family photographs or identifying details.

## Cleanup

The suite closes browsers and servers and removes temporary content fixtures without deleting evidence. Stop only the preview process you started. Confirm the evidence remains under `.verification/` and fixtures did not modify production content.

## Helpers

`npm run verify` invokes `scripts/verify.mjs`. It runs formatting, source lint, Astro checking, static builds, built HTML validation, browser journeys and negative content builds. Use [the verification guide](../../../docs/verification.md) for browser overrides and the live deployment check.
