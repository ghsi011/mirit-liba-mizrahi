# Read the memorial

## Sub-features

Hebrew right-to-left reading, a readable dedication, mobile layout, and access without JavaScript.

## How to get to it (user POV)

Open the memorial home at `/mirit-liba-mizrahi/`.

## Driving it with Playwright

Run `npm run verify`. Verify that the exact level-one heading and configured dedication are visible at 320, 390 and 1440 pixels with no horizontal overflow or a11y violations. Confirm the content is also visible with JavaScript disabled.

## Gotchas

Use the current dedication from the content file; do not hardcode an earlier dedication. Inspect the current screenshots for actual layout changes.
