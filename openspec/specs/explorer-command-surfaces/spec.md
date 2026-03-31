## Purpose
Define requirements for explorer command surfaces, header controls, archived change presentation, and curated CLI tools.

## Requirements

### Requirement: Explorer header exposes extension controls
The initialized explorer SHALL expose extension-level controls instead of the previous proposal/output header actions.

#### Scenario: Explorer is initialized
- **WHEN** the `OpenSpec Explorer` view is shown for an initialized workspace
- **THEN** the header exposes a settings command for this extension
- **AND** the header exposes a refresh command that re-syncs the explorer views
- **AND** the previous proposal/output header actions are not shown

### Requirement: Change sections keep archived work recognizable
The explorer SHALL keep archived work recognizable even when active and completed change items use the same icon.

#### Scenario: Completed changes are listed
- **WHEN** the explorer renders items from `openspec/changes/archive/`
- **THEN** active and completed change items may share the same package icon
- **AND** the `Completed Changes` folder uses an explicit archived/folder-like icon

### Requirement: Explorer exposes curated CLI tools
The extension SHALL provide a dedicated `CLI Tools` view for common human-oriented OpenSpec terminal commands.

#### Scenario: CLI tools view is shown
- **WHEN** the workspace is initialized
- **THEN** the activity container shows a collapsible `CLI Tools` view below the main explorer
- **AND** the main `OpenSpec Explorer` tree does not include a `CLI Tools` root item

#### Scenario: CLI tools view contents are curated
- **WHEN** the `CLI Tools` view is rendered
- **THEN** it shows `openspec view`, `openspec list`, `openspec validate`, `openspec config profile`, `openspec update`, and `OpenSpec CLI Reference`
- **AND** it does not show `openspec status` or `openspec show`

#### Scenario: Launch a CLI tool
- **WHEN** the user activates a CLI tool item
- **THEN** the extension runs the corresponding `openspec` command in an integrated terminal

#### Scenario: CLI help is requested
- **WHEN** the user activates the CLI help entry
- **THEN** the extension opens the official OpenSpec CLI reference URL
