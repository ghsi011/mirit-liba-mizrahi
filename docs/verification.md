# Verify a change

Use the Node version in `.nvmrc`, then:

```sh
npm ci
npx playwright install --with-deps chromium
npm run verify
```

If the browser download is unavailable but a supported Chromium is already installed, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to its absolute executable path. The report records this explicit browser-only substitution and its version. CI uses the Playwright-managed browser by default.

The single verification command runs Astro's checker, builds the production page, and tests the actual HTML through a strict local server mounted at `/mirit-liba-mizrahi/`. It does not serve root-level asset URLs as a fallback.

The check covers current content, a forced placeholder, and a geometric test photograph at widths of 320, 390, and 1440 pixels. It verifies the exact heading, Hebrew RTL attributes, current dedication, visible placeholder or decoded photograph, local asset loading, no horizontal overflow, no page errors, no shipped scripts, no external requests, and automated WCAG A/AA rules. It also opens the site with JavaScript disabled. Automated accessibility checks do not replace human visual review.

The temporary variants are built outside the source tree and deleted afterward. They never alter approved content or the deployable `dist` output. Negative builds must reject a missing image, a changed name, and an unsafe photo path. The test image is two colored rectangles, not a person.

Screenshots and a JSON result appear in `.verification/`, which is excluded from Git. Inspect the current mobile and desktop screenshots after a design change. Do not commit screenshots with private family information.

## Live publication check

A successful local run does not verify GitHub access, Actions, or Pages. After a deployment finishes, fetch the actual public URL, confirm HTTP 200, the exact heading, and the expected photo state. Check that its CSS, fonts, favicon, and any photograph load successfully under the project subpath. Record the deployment commit and the URL checked. Never describe the site as live based only on a local build or a queued workflow.
