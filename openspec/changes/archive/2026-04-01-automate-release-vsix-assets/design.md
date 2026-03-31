## Context

The repository now has a stable GitHub-based release flow (`main`, annotated tags, GitHub Releases), but `.vsix` packaging and release-asset upload are still manual steps. The extension already supports local packaging through `npm run vscode:prepublish` and `npx vsce package`, and the new release automation should build on that without adding Open VSX publishing or a large CI/CD surface.

The desired distribution model is simple:

- GitHub Releases remain the canonical public delivery channel.
- Each tagged release should be able to expose an installable `.vsix` asset.
- If a release is already published, maintainers should be able to rerun the packaging/upload flow manually.

## Goals / Non-Goals

**Goals:**
- Build a `.vsix` package automatically when a GitHub Release is published.
- Support manual reruns for an existing tagged release.
- Upload or replace the release asset on the matching GitHub Release.
- Document GitHub Releases as the primary `.vsix` distribution path.

**Non-Goals:**
- Do not automate version bumps, tag creation, or GitHub Release creation.
- Do not publish to Open VSX or the Visual Studio Marketplace.
- Do not introduce a broad multi-job release pipeline for linting, changelog generation, or multi-platform matrices.

## Decisions

- Use a single GitHub Actions workflow under `.github/workflows/release-vsix.yml` with two entry points:
  - `release: published` for the normal release path
  - `workflow_dispatch` with a `tag_name` input for manual reruns
  - Rationale: one workflow keeps the release asset logic centralized while still supporting backfills and retries.
- Resolve the target tag from the event context, check out that exact ref, and validate it against `package.json`.
  - Rationale: packaging from the tagged revision avoids drift from `main`, and the version check prevents accidentally attaching a mismatched artifact.
  - Alternative considered: package the default branch tip. Rejected because release assets should always match the tagged source.
- Package the extension with `npx --yes @vscode/vsce package --out ...`, which still invokes the existing prepublish flow from the checked-out tag.
  - Rationale: this reuses the established build path while remaining compatible with older tags that predate the convenience `package:vsix` npm script.
  - Alternative considered: adding Open VSX publishing at the same time. Rejected because it adds account/agreement overhead unrelated to GitHub Release distribution.
- Upload the `.vsix` asset with `gh release upload <tag> ... --clobber` and `contents: write` permission.
  - Rationale: `gh` is available on GitHub-hosted runners, targets an existing release directly, and `--clobber` makes manual reruns idempotent.
  - Alternative considered: `softprops/action-gh-release`. Rejected for now because the explicit CLI path is easier to reason about for upload-only behavior.
- Update `README.md` to describe GitHub Releases as the canonical `.vsix` download path and keep local packaging instructions aligned.
  - Rationale: users need a discoverable install path once release assets exist.

## Risks / Trade-offs

- **Tag and package version diverge** → Fail the workflow if `package.json` does not match the requested `vX.Y.Z` tag.
- **Manual dispatch is pointed at a non-existent release** → Let the upload step fail clearly; document manual dispatch as a rerun/backfill path for existing releases.
- **GitHub-hosted runner behavior changes over time** → Keep the workflow small and based on standard actions so it can be adjusted easily later.
- **Release is published before the asset job succeeds** → Allow reruns through `workflow_dispatch` and idempotent upload with `--clobber`.

## Migration Plan

- No user migration is required.
- Add the workflow and documentation.
- Use future GitHub Releases to produce `.vsix` assets automatically.
- Existing releases (such as `v1.0.0`) can be backfilled by manually dispatching the workflow with the matching tag.

## Open Questions

- None.
