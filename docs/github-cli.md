# Base GitHub CLI

This project ships with a small wrapper around GitHub CLI (`gh`) for the most common repo workflows.

## Run it

```bash
npm run gh -- help
```

You can also call it directly:

```bash
node ./scripts/base-gh.mjs help
```

## Commands

```bash
npm run gh -- doctor
npm run gh -- status
npm run gh -- auth
npm run gh -- repo
npm run gh -- issue list
npm run gh -- pr status
npm run gh -- pr view
npm run gh -- pr checks
npm run gh -- pr create --draft --fill
npm run gh -- branch live-copy-pass --push
npm run gh -- browse repo
npm run gh -- browse pr
```

## Notes

- Requires `gh` to be installed locally.
- Works best once an `origin` remote is configured.
- `branch <name>` automatically prefixes branch names with `codex/` unless the prefix is already present.
