# Update and publish content

## Sub-features

The documented JSON content interface, safe local photos, and the GitHub Pages project path.

## How to get to it (user POV)

Open `src/content/memorial.json` to make an approved content edit. After authorized publication, open the public memorial.

## Driving it with the production build and browser

Run `npm run verify`. Confirm the valid edited dedication renders as text, invalid name and missing or unsafe photo references fail the real build, and the valid page and photo are served from the project path. After an authorized merge, follow the live check in `docs/verification.md`; verify the deployment run's source SHA before citing it.

## Gotchas

A successful local build or PR check does not prove the deployment ran. Never send a photograph to a public branch without family approval.
