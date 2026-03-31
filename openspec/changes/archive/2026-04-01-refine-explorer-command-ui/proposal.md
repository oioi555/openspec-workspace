## Summary

Refine the OpenSpec Explorer command UI so command copy actions match the official OpenSpec command model and day-to-day VS Code usage.

This change removes the old header actions, adds extension settings for command syntax and expanded workflow visibility, reorganizes clipboard actions by argument shape, and introduces a CLI Tools section for common human-oriented terminal commands.

## Goals

- Replace the initialized explorer header's proposal/output actions with a settings entry for this extension
- Surface bare slash-command copy actions from the `Changes` section and change-aware slash-command copy actions from active change items
- Limit completed changes to change-name copying and give archived changes a clearer archived/folder visual treatment
- Add extension settings for `Claude Code` vs `Other Tools` slash syntax and for enabling expanded workflow commands
- Add a curated `CLI Tools` section that launches common OpenSpec CLI commands in the terminal and links to the upstream CLI reference

## Non-Goals

- Do not execute slash commands directly from the explorer; slash actions remain clipboard exports
- Do not add per-command visibility toggles beyond a single expanded-commands switch
- Do not surface every OpenSpec CLI subcommand in the explorer
- Do not redesign the change-details webview beyond keeping it compatible with the new explorer surfaces

## Affected Areas

- `package.json`
- `src/constants/commands.ts`
- `src/extension/commands.ts`
- `src/providers/explorerProvider.ts`
- `src/utils/changeCommandSnippet.ts`
- `src/utils/config.ts` (new)
- related tests for command formatting, explorer menu visibility, and CLI terminal actions
