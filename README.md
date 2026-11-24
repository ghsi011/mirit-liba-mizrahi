# מירית ליבה-מזרחי

[Open the memorial](https://ghsi011.github.io/mirit-liba-mizrahi/) · [Verification and deployment](https://github.com/ghsi011/mirit-liba-mizrahi/actions)

A small Hebrew memorial. Astro builds a static page with self-hosted typography and no visitor JavaScript or tracking. The initial page contains only the approved name, dedication, and a labeled photograph placeholder.

## Run locally

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro, including `/mirit-liba-mizrahi/`.

Before sharing a change:

```sh
npm run check
npm run build
npm run verify
```

`verify` exercises the production page at its GitHub Pages project subpath. See [verification](docs/verification.md) for browser setup and evidence, [architecture](docs/architecture.md) for the design, and [guidance](docs/guidance.md) for the primary skill sources.

## Edit the content

Edit `src/content/memorial.json`. Keep the exact name `מירית ליבה-מזרחי`. `dedication` is plain text, limited to 140 characters. Do not add HTML. Text is escaped by the template.

Leave `photo` as `null` to show the intentional placeholder.

To add a family-approved photograph:

1. Remove location and other private metadata from a copy of the photograph. Use only a photograph the family approves for public release.
2. Save it under `src/assets/photos/`, for example `family-photo.jpg`.
3. Replace `"photo": null` with an object naming that file and a short, accurate Hebrew description:

```json
"photo": {
  "file": "family-photo.jpg",
  "alt": "מירית ליבה-מזרחי"
}
```

Use a filename containing only English letters, digits, hyphens, and underscores, followed by `.jpg`, `.jpeg`, `.png`, `.webp`, or `.avif`. The filename must start with a letter or digit. The build rejects missing photographs and invalid content. Astro creates optimized images at build time. The photograph is displayed without cropping.

The repository and its history are public. Keep private family information, unapproved photographs, secrets, and identifying image metadata out of commits. Removing a file in a later commit does not remove it from history.

## Deployment

The public repository is `ghsi011/mirit-liba-mizrahi`. GitHub Pages uses **GitHub Actions** as its publishing source. The checked deployment workflow builds and publishes this project. In `astro.config.mjs`, `site` identifies the account and `base` identifies the project subpath. Keep both aligned with the repository.

## Ask a coding agent

> Read AGENTS.md. Add only the family-approved text or photograph I provide through the documented content interface. Preserve the exact name מירית ליבה-מזרחי, Hebrew RTL layout, and quiet design. Do not invent facts or add dependencies or tracking. Run the documented checks and verify the production page on mobile and desktop before proposing the change.

## Source layout

- `src/content/memorial.json` — family-editable content.
- `src/content/memorial.ts` — content validation and photograph resolution.
- `src/pages/index.astro` — the semantic page and optimized photo output.
- `src/styles/global.css` — responsive presentation.
- `src/assets/photos/` — approved photographs only.

The font package includes its own license. No rights to family photographs or content are granted by this repository.
