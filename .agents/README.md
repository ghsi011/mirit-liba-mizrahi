# P-Stack in this repository

The repository installs the two P-Stack verification workflows as local agent skills so a fresh checkout does not depend on a global plugin:

- [Create Verification](skills/pstack-create-verification-skill/SKILL.md)
- [Maintain Verification](skills/pstack-maintain-verification-skill/SKILL.md)

The source is [P-Stack at b7b93c3](https://github.com/cursor/plugins/tree/b7b93c36be9bcc36a74db438e0fd385d660bc559/pstack), MIT licensed. The checked-in copies use Codex's project skill path and prefixed names. They do not set personal model preferences or install a machine-wide plugin. Use the running agent's existing model and permissions.

[Verify Memorial](skills/verify-memorial/SKILL.md) is the site-specific skill produced by Create Verification. It reuses the existing production-browser harness rather than maintaining a second test suite.
