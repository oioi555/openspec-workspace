## 1. Configuration and Command Formatting

- [x] 1.1 Update extension settings so `commandSyntax` uses `default` vs `claudeCode`, defaults to `default`, and shows natural English labels/descriptions in settings UI.
- [x] 1.2 Add a shared config helper and update slash-command snippet formatting so copied commands switch between `/opsx:<command>` and `/opsx-<command>`.
- [x] 1.3 Replace the single expanded-commands toggle with per-command settings/context keys and update menu labels to concise `Copy: <Command>` titles.

## 2. Explorer Command Surfaces

- [x] 2.1 Remove the initialized explorer header's proposal/output actions and add settings/refresh actions for extension controls.
- [x] 2.2 Add root-level `Changes` actions for `propose` and `explore`, with `new` and `bulk-archive` shown only when their individual expanded settings are enabled.
- [x] 2.3 Restrict active change actions to change-name-aware command copies (`apply`, `archive`, plus individually enabled expanded workflow commands).
- [x] 2.4 Restrict completed change actions to change-name copying, use a consistent package icon for change items, and give the `Completed Changes` folder a clearer archived/folder icon treatment.

## 3. CLI Tools View

- [x] 3.1 Move `CLI Tools` into a separate initialized view under the same activity container and reduce the item list to argument-free, human-oriented commands.
- [x] 3.2 Launch CLI items in a reused integrated terminal and keep the reference item opening the official CLI docs.

## 4. Verification

- [x] 4.1 Add or update tests for command formatting defaults, per-command expanded visibility helpers, explorer/view structure, and CLI provider items.
- [x] 4.2 Run `npm run compile`, `npm run lint`, and `npm test`.
