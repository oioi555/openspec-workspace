## Why

The project now has a stable `1.0.0` release line, but distributing installable `.vsix` files still depends on manual packaging and upload steps. Automating the release asset flow keeps distribution repeatable, reduces release mistakes, and gives users a simple GitHub Releases download path without adding Open VSX publishing overhead.

## What Changes

- Add a GitHub Actions workflow that builds a `.vsix` package when a GitHub Release is published.
- Allow manual workflow dispatch so an existing tagged release can receive or refresh its `.vsix` asset later.
- Upload the generated `.vsix` file to the matching GitHub Release.
- Update release/install documentation so GitHub Releases are the canonical `.vsix` distribution path.

## Capabilities

### New Capabilities
- `release-vsix-assets`: Build and attach versioned `.vsix` artifacts to GitHub Releases for tagged extension versions.

### Modified Capabilities
- None.

## Impact

- Affects GitHub Actions workflow configuration under `.github/workflows/`.
- Affects release and installation documentation in `README.md`.
- Relies on the existing VS Code extension packaging flow (`npm run vscode:prepublish` and `vsce package`).
