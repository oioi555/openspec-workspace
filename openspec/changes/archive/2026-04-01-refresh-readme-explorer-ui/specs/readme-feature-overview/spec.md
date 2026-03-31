## ADDED Requirements

### Requirement: README describes the current explorer layout
The repository README SHALL describe the extension's current VS Code surfaces in terms that match the shipped UI.

#### Scenario: Reader reviews the feature overview
- **WHEN** a user reads the overview or feature summary in `README.md`
- **THEN** the README describes the `OpenSpec Explorer` structure in terms of `Changes`, archived/completed changes, and `Specifications`
- **AND** the README explains that `CLI Tools` is a separate view for curated OpenSpec terminal commands

### Requirement: README explains contextual command copying
The repository README SHALL explain that command-copy behavior depends on the explorer context and uses the configured slash-command syntax.

#### Scenario: Reader follows the quickstart
- **WHEN** a user reads the workflow or quickstart guidance in `README.md`
- **THEN** the README explains that the `Changes` root exposes argument-less command copies, active changes expose change-name-aware command copies, and completed changes only expose change-name copying
- **AND** the README documents the default `/opsx-<command>` syntax and the optional Claude Code `/opsx:<command>` syntax

### Requirement: README includes a current UI screenshot
The repository README SHALL embed a current screenshot that previews the extension UI.

#### Scenario: README is rendered on GitHub
- **WHEN** GitHub renders `README.md`
- **THEN** the README includes an image sourced from `media/screenshot.png`
- **AND** the image alt text or nearby caption identifies it as a current OpenSpec Explorer and CLI Tools preview
