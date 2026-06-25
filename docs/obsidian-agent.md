# Obsidian Agent

`obsidian-knowledge-manager` is the project agent for maintaining the existing `Base Web` Obsidian vault with small, careful documentation updates.

## Location

The agent definition lives at `.codex/agents/obsidian-knowledge-manager.toml`.

The vault it should maintain lives at `Base Web/`.

## Example prompt

Use `@obsidian-knowledge-manager` in Codex with a prompt such as:

```text
Review the existing Base Web vault, update the active project notes and status summary, capture recent decisions and open questions, improve obvious wikilinks, and archive any clearly stale notes without over-restructuring the vault.
```

## Note

This agent should work inside the existing `Base Web` vault organization and should not over-restructure notes, folders, tags, or metadata.
