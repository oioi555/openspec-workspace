## Purpose
Define how GitHub Releases provide installable `.vsix` assets for this extension.

## Requirements

### Requirement: Published GitHub releases include a VSIX asset
The repository SHALL build and attach an installable `.vsix` asset when a tagged GitHub Release is published.

#### Scenario: Published release builds matching VSIX
- **WHEN** a GitHub Release is published for tag `vX.Y.Z`
- **THEN** the release asset workflow checks out tag `vX.Y.Z`
- **AND** validates that `package.json` reports version `X.Y.Z`
- **AND** packages the extension into a `.vsix` file
- **AND** uploads that `.vsix` file to the same GitHub Release

### Requirement: Maintainers can rerun VSIX asset publication for an existing release
The repository SHALL support manual reruns that publish or refresh the `.vsix` asset for an existing tagged GitHub Release.

#### Scenario: Manual dispatch backfills or replaces a release asset
- **WHEN** a maintainer manually dispatches the release asset workflow with an existing release tag
- **THEN** the workflow checks out that tag and packages the extension from it
- **AND** uploads the resulting `.vsix` to the matching GitHub Release
- **AND** replaces an existing asset with the same filename if one is already present

### Requirement: Repository documentation points users to GitHub Releases for VSIX installation
The repository SHALL describe GitHub Releases as the canonical source for downloadable `.vsix` packages.

#### Scenario: Reader looks for installation guidance
- **WHEN** a user reads `README.md` for install or release guidance
- **THEN** the README identifies GitHub Releases as the primary download location for `.vsix` artifacts
- **AND** explains how to install a downloaded `.vsix` into VS Code-compatible editors
