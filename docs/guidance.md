# Guidance used

Primary sources were read on 2026-11-24. The project uses their relevant guidance; it does not claim that unavailable host commands or models ran.

## Matt Pocock

Source repository: https://github.com/mattpocock/skills . Main was resolved to `abeeaf95660ba9e8b7c753eb38f441ca707a8823` during this work.

- [Wayfinder](https://github.com/mattpocock/skills/blob/abeeaf95660ba9e8b7c753eb38f441ca707a8823/skills/engineering/wayfinder/SKILL.md): establish the destination and distinguish scope from unresolved decisions. The parent approved the initial wayfinding recommendation before implementation. This one-page effort did not need a multi-session issue map.
- [Improve Codebase Architecture](https://github.com/mattpocock/skills/blob/abeeaf95660ba9e8b7c753eb38f441ca707a8823/skills/engineering/improve-codebase-architecture/SKILL.md): an independent agent reviewed the implemented source for shallow modules, friction, and testability, applying the deletion test. The review produced a temporary HTML report outside the repository. No further module deepening was warranted.
- [Codebase Design](https://github.com/mattpocock/skills/blob/abeeaf95660ba9e8b7c753eb38f441ca707a8823/skills/engineering/codebase-design/SKILL.md): the small content interface owns validation and photo resolution in one place. There is no speculative CMS/provider abstraction.

## P-Stack

Primary source: https://github.com/cursor/plugins/tree/main/pstack . Main was resolved to `005d8f6e8ec057b738adcd08a08b30db0478402d`. The requested “potato mode” is named `poteto-mode` upstream.

- [Poteto mode](https://github.com/cursor/plugins/blob/005d8f6e8ec057b738adcd08a08b30db0478402d/pstack/skills/poteto-mode/SKILL.md), its Feature playbook, and Architect: define the content shape, compare two simple architectures, give implementation one owner, and independently review the result. Named upstream model families were unavailable; workers used the available session model.
- [Model the Domain](https://github.com/cursor/plugins/blob/005d8f6e8ec057b738adcd08a08b30db0478402d/pstack/skills/principle-model-the-domain/SKILL.md): the photo is null or a complete object, so mismatched boolean state cannot develop.
- [Laziness Protocol](https://github.com/cursor/plugins/blob/005d8f6e8ec057b738adcd08a08b30db0478402d/pstack/skills/principle-laziness-protocol/SKILL.md): use one content source and three cohesive source responsibilities rather than extra layers.
- [Prove It Works](https://github.com/cursor/plugins/blob/005d8f6e8ec057b738adcd08a08b30db0478402d/pstack/skills/principle-prove-it-works/SKILL.md): test rendered production builds and decoded images rather than stopping at type checks.
- [Test Behavior, Not Implementation](https://github.com/cursor/plugins/blob/005d8f6e8ec057b738adcd08a08b30db0478402d/pstack/skills/principle-test-behavior-not-implementation/SKILL.md): assert visible content, asset loading, accessibility, and invalid-input build failures.
- [Encode Lessons in Structure](https://github.com/cursor/plugins/blob/005d8f6e8ec057b738adcd08a08b30db0478402d/pstack/skills/principle-encode-lessons-in-structure/SKILL.md): exact-name and safe-path requirements are executable checks as well as documentation.
- [Control UI](https://github.com/cursor/plugins/blob/005d8f6e8ec057b738adcd08a08b30db0478402d/cursor-team-kit/skills/control-ui/SKILL.md): inspect the actual browser surface, record screenshots and page/network errors. The old upstream `pstack/skills/web-verify/SKILL.md` URL returned 404; current Poteto mode routes UI verification to Control UI. Cursor-only `deslop` and its named task harness were not available and are not claimed as run.

The parent supplied operational guidance for Writing Software as a Subthread and Doctrine Persistence because those skill files were not exposed in this execution environment. Applied guidance: exercise plausible partial failures through real entry points; challenge interactions between content editing and deployment paths; substitute unavailable dependencies only at their boundary; recover from environment failures; proceed within the existing authorization; report the exact remaining blocker. These two skill texts were supplied by the parent, not independently fetched here.

## Platform documentation

Astro's [GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/) informed the `site`/`base` configuration and Actions publishing. Current package versions were queried from npm. TypeScript 7 did not satisfy the current Astro checker's peer range, so TypeScript 6.0.3 was used without overriding dependency constraints.
