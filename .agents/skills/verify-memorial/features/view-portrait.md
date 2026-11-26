# View the portrait

## Sub-features

The labeled photo placeholder and the family-approved image state.

## How to get to it (user POV)

Open the memorial and look for the portrait frame beside or under the dedication.

## Driving it with Playwright

Run `npm run verify`. In the forced placeholder variant, see `מקום לתמונה` and no image. In the photo variant, resolve the image by its Hebrew alternative text, confirm it visibly decodes under the project subpath and check the placeholder is gone. Both states remain available without JavaScript.

## Gotchas

The synthetic two-rectangle fixture represents loading only, not an approved likeness. Do not use family photos in fixtures.
