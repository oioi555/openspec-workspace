## Overview

This change refines the explorer around three distinct command surfaces:

1. **Header surface** for extension-level settings
2. **Clipboard surfaces** for OpenSpec slash commands grouped by whether they need a change name
3. **CLI tools view** for human-oriented terminal commands shown as a separate collapsible view in the same activity container

The explorer should stay browse-first: selecting a change or spec still opens details, while command actions live on the nodes whose context matches the required arguments.

## Command Syntax Configuration

- Keep `openspecWorkspace.commandSyntax`, but narrow it to two options:
  - `default` copies `/opsx-<command>`
  - `claudeCode` copies `/opsx:<command>`
- Default to `default`, so Claude Code is clearly the exception rather than the baseline
- Use natural English labels in settings UI:
  - `Default`
  - `Claude Code`
- Update the setting descriptions so the standard syntax and Claude-specific syntax are easy to distinguish

## Expanded Commands Configuration

- Remove the single `openspecWorkspace.enableExpandedCommands` toggle
- Add individual boolean settings for each expanded command:
  - `openspecWorkspace.expandedCommands.new`
  - `openspecWorkspace.expandedCommands.bulkArchive`
  - `openspecWorkspace.expandedCommands.continue`
  - `openspecWorkspace.expandedCommands.fastForward`
  - `openspecWorkspace.expandedCommands.verify`
  - `openspecWorkspace.expandedCommands.sync`
- Add a shared config helper so command formatting, per-command visibility, and future settings reads all come from one place
- Mirror each setting into its own VS Code context key so `when` clauses can control menu visibility per command

Because menu titles in `package.json` are static, copy actions should use concise syntax-neutral labels such as `Copy: Propose` and `Copy: Apply`. Success messages should include the exact copied snippet.

## Header Command Surface

- Remove the initialized explorer header actions for proposal generation and output
- Add an `Open Settings` action with a gear icon
- Add a `Refresh` action beside settings so users can manually resync the explorer after large external changes, branch switches, or rare watcher misses
- `Open Settings` opens the VS Code settings UI filtered to this extension's settings
- `Refresh` rechecks workspace initialization and refreshes the explorer views
- Keep the welcome-state `Initialize OpenSpec` action unchanged

## Changes Root Clipboard Surface

- Keep `Changes` as a folder node
- Give the `Changes` node its own context value so it can host copy actions for commands that do not need a specific change name
- Always expose:
  - `propose`
  - `explore`
- Expose only when expanded commands are enabled:
  - `new`
  - `bulk-archive`
- These actions copy only the slash command itself, with no placeholder text appended

## Active Change Clipboard Surface

- Active change items keep their existing click-to-open details behavior
- Use the same `package` icon as other change items for a consistent visual language
- Active change context menus expose only commands that should be copied with the selected change name embedded
- Core actions:
  - `apply`
  - `archive`
- Expanded actions:
  - `continue`
  - `ff`
  - `verify`
  - `sync`

## Completed Change Surface

- Completed changes keep click-to-open details behavior
- Completed change context menus expose only `Copy Change Name`
- Completed and active change items now share the same `package` icon by design
- Give the `Completed Changes` folder node an explicit folder/archive-like icon so the archived section is recognizable even when collapsed

## CLI Tools View

- Move `CLI Tools` out of the main explorer tree and register it as a separate view in the same activity container
- The view should appear only when the workspace is initialized and remain collapsible below `OpenSpec Explorer`
- Each CLI tool item launches a command in a reused integrated terminal named `OpenSpec CLI`
- Keep only commands that are argument-free and still useful from the tree:
  - `openspec view`
  - `openspec list`
  - `openspec validate`
  - `openspec config profile`
  - `openspec update`
- Exclude commands like `openspec status` and `openspec show`
- Add an `OpenSpec CLI Reference` item that opens `https://github.com/Fission-AI/OpenSpec/blob/main/docs/cli.md`

## Explorer Structure and Context Values

- Root order should become:
  1. `Changes`
  2. `Specifications`
- Add a second initialized view under the same activity container:
  1. `OpenSpec Explorer`
  2. `CLI Tools`
- Introduce distinct context values so menu visibility can stay precise:
  - `changes-root`
  - `active-change`
  - `completed-change`
  - `cli-command`
  - `cli-help`
- The existing welcome/init experience and root-only OpenSpec discovery behavior stay unchanged
