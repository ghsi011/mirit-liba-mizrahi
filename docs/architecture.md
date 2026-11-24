# Architecture and scope

The destination is one public Hebrew memorial page. The approved starting content is the exact name מירית ליבה-מזרחי, the dedication לזכרה, באהבה, and an intentional photo placeholder labeled מקום לתמונה. Dates, biography, navigation, accounts, forms, tracking, a CMS, and invented imagery are outside this MVP.

## Chosen shape

Two shapes were considered: Markdown content collections and a single JSON document with build-time validation. One JSON document fits the tiny content interface and prevents arbitrary HTML. A collection adds concepts without a second content item. The validation module owns the schema and photograph lookup; the page owns semantic rendering; CSS owns presentation. There is no provider interface or pass-through wrapper to maintain.

The photo is either null or one complete object with a safe local filename and nonempty alternative text. It is never several independent booleans. A missing file stops the build. Astro resolves and optimizes local images, so generated image URLs include the project base path. The source photo still exists in public Git history, so the family must approve it and remove private metadata before committing.

Astro generates static HTML. Fonts are bundled locally. No browser JavaScript or network service is necessary to read the page. Native HTML, logical CSS, and a responsive grid provide the entire interaction model.

## Checks as constraints

A strict schema protects the exact name, supported content fields, length limits, and safe photograph filenames. Browser checks use a strict server mounted only at the GitHub Pages project subpath. Both the placeholder and real-image branch must render; missing and unsafe photo references must make the actual production build fail. Tests read the current approved dedication and photo state, so legitimate content edits do not fail because the initial placeholder was hardcoded.

Repository instructions guide judgment, but they are not a security boundary. Automated checks cannot determine whether family-provided facts are true or approved. Review those changes before merging. Keep the CI workflow and validation intact.

## Deployment

`main` triggers verification before the build artifact can deploy. Pull requests run the same verification without Pages write permissions. Workflow actions use verified immutable commit IDs. Node and direct package versions are pinned; npm ci uses the lockfile. GitHub Pages must be configured to use GitHub Actions.
