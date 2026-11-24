# Verification result — 2026-11-24

Status: published at https://ghsi011.github.io/mirit-liba-mizrahi/ . The new public repository belongs to the verified GitHub account `ghsi011`. The original verified bundle was transferred to the authenticated laptop with a matching SHA-256 digest and source commit; the site was not rebuilt from scratch. GitHub Actions ran the complete verification suite with its standard Chromium 159 runtime and deployed successfully.

A live HTTP check returned 200, confirmed the exact approved name, dedication, Hebrew RTL, empty photo state, and absence of client scripts. Both font files and the favicon returned 200. The served HTML matched the original verified production HTML byte for byte. See [live verification data](live-verification.json) and the [first successful workflow](https://github.com/ghsi011/mirit-liba-mizrahi/actions/runs/45383136759).

The sections below retain the initial local verification details. Its temporary browser substitution was no longer needed on GitHub's runner.

## Executed checks

`npm ci` completed from the lockfile. `npm run verify` passed with the explicit browser override below. That command ran Astro's checker and the production build, then exercised current content, a forced placeholder, and a supplied geometric photo at widths 320, 390, and 1440 pixels under `/mirit-liba-mizrahi/`.

All nine browser cases passed the exact-name, Hebrew RTL, dedication, placeholder/photo state, asset-loading, zero-client-script, zero-external-request, overflow, and automated WCAG A/AA checks. All three variants remained readable with JavaScript disabled. The actual production build rejected a missing photo, changed name, and unsafe photo path. Fixture changes were isolated; deployable `dist` still contains only the approved minimal content.

Desktop and mobile screenshots were inspected visually. The portrait remains intentional and empty in the real build. The test-photo screenshot shows only two colored rectangles. An independent architecture review found and resolved two verification issues: current-content assumptions that would reject later valid family edits, and an omitted generated-evidence ignore rule. No further architecture refactor was warranted.

## Browser runtime substitution

The Playwright-managed Chromium download returned HTTP 403 in this environment. Installed desktop Chromium could not start because Unix profile sockets are unavailable. A temporary `@sparticuz/chromium@153.0.0` headless runtime successfully ran the same checks, reporting Chromium `153.0.8010.0`. It ran in single-process mode with a fresh browser per case. This changed only the test runtime, not the website or its package dependencies.

The executed command was:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/tmp/memorial-browser/chromium-launcher \
ASTRO_TELEMETRY_DISABLED=1 npm run verify
```

The temporary launcher used `/tmp/chromium --single-process --no-zygote --disable-gpu`. It is not part of the repository. On a normal development machine or GitHub runner, use the documented Playwright installation and `npm run verify` without the override. The same checked-in CI workflow subsequently passed on GitHub with the normal Playwright-managed Chromium runtime.

## Publication evidence

- Public repository: https://github.com/ghsi011/mirit-liba-mizrahi
- Public site: https://ghsi011.github.io/mirit-liba-mizrahi/
- First deployed source commit: `5f6372061b32f75c7379ca96fb60d8e6a720e594`
- First successful workflow: https://github.com/ghsi011/mirit-liba-mizrahi/actions/runs/45383136759
- Pages build type: GitHub Actions; HTTPS enforced.
- No collaborators were invited. Public page content remains the approved minimal scope.
