## 1. Release asset workflow

- [x] 1.1 Add a GitHub Actions workflow that resolves the release tag from release and manual-dispatch events, then checks out the matching ref.
- [x] 1.2 Package a version-matched `.vsix` file and upload it to the matching GitHub Release with overwrite support for reruns.

## 2. Release documentation

- [x] 2.1 Update `README.md` to point users to GitHub Releases for `.vsix` downloads and installation.
- [x] 2.2 Align local packaging instructions and visible version metadata with the GitHub Release distribution flow.

## 3. Verification

- [x] 3.1 Verify compile and test commands still pass after the release automation changes.
- [x] 3.2 Verify local `.vsix` packaging succeeds and review the workflow for both published-release and manual-dispatch coverage.
