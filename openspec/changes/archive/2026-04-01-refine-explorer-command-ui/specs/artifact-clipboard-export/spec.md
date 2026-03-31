## MODIFIED Requirements

### Requirement: Command syntax matches the selected tool style
The extension SHALL let users choose whether copied OpenSpec slash commands use the default OpenSpec syntax or the Claude Code syntax.

#### Scenario: Default syntax is selected
- **WHEN** `openspecWorkspace.commandSyntax` is set to `default`
- **THEN** copied commands use the `/opsx-<command>` form

#### Scenario: Claude Code syntax is selected
- **WHEN** `openspecWorkspace.commandSyntax` is set to `claudeCode`
- **THEN** copied commands use the `/opsx:<command>` form

#### Scenario: Command syntax uses the standard default
- **WHEN** the user has not changed `openspecWorkspace.commandSyntax`
- **THEN** copied commands use the `/opsx-<command>` form

### Requirement: Changes root exposes argument-less slash commands
The extension SHALL expose clipboard actions from the `Changes` explorer node for official slash commands that do not require a specific change name.

#### Scenario: Copy a core global command
- **WHEN** the user invokes a copy action for `propose` or `explore` from the `Changes` node
- **THEN** the clipboard receives only the selected slash command with no placeholder argument text

#### Scenario: Expanded global commands are disabled
- **WHEN** `openspecWorkspace.expandedCommands.new` and `openspecWorkspace.expandedCommands.bulkArchive` are `false`
- **THEN** `new` and `bulk-archive` copy actions are hidden from the `Changes` node

#### Scenario: Expanded global commands are enabled
- **WHEN** `openspecWorkspace.expandedCommands.new` is `true`
- **THEN** the `Changes` node exposes the `new` copy action
- **AND WHEN** `openspecWorkspace.expandedCommands.bulkArchive` is `true`
- **THEN** the `Changes` node exposes the `bulk-archive` copy action

### Requirement: Active changes expose change-aware slash commands
The extension SHALL expose clipboard actions from active change items only for slash commands that should include the selected change name.

#### Scenario: Copy a core active-change command
- **WHEN** the user invokes `apply` or `archive` from an active change item
- **THEN** the clipboard receives the selected slash command followed by the active change name

#### Scenario: Expanded active-change commands are enabled
- **WHEN** `openspecWorkspace.expandedCommands.continue`, `openspecWorkspace.expandedCommands.fastForward`, `openspecWorkspace.expandedCommands.verify`, or `openspecWorkspace.expandedCommands.sync` are enabled
- **THEN** active change items expose only the corresponding enabled expanded copy actions

### Requirement: Completed changes only copy change names
The extension SHALL limit completed change clipboard actions to copying the archived change name.

#### Scenario: Copy from a completed change item
- **WHEN** the user invokes the copy action on a completed change item
- **THEN** the clipboard receives plain text containing only the archived `<change-name>`

#### Scenario: Completed change actions are shown
- **WHEN** the user opens the context menu for a completed change item
- **THEN** slash-command copy actions are not shown for that item

### Requirement: Copy failure is reported
If a clipboard write fails, the extension SHALL report the failure and SHALL NOT claim success.
