## Context

The current README still reflects the older explorer workflow and command wording. It does not explain the dedicated `CLI Tools` view, the distinction between root-level and change-level copy actions, or the new default slash-command syntax.

The supplied screenshot shows the current experience in one frame: the `OpenSpec Explorer` tree with `Changes`, `Completed Changes`, and `Specifications`; an active change context menu with copy actions; the details webview; and a separate `CLI Tools` view with curated terminal commands.

## Goals / Non-Goals

**Goals:**
- Make the README accurately describe the current explorer and CLI surfaces.
- Show the current UI with an embedded screenshot near the top-level product overview.
- Explain command-copy behavior in a tool-neutral way while still documenting the two supported syntax styles.

**Non-Goals:**
- Do not change extension behavior, settings, or command availability.
- Do not turn the README into a full settings reference or exhaustive command catalog.
- Do not add new media assets beyond using the provided `media/screenshot.png` file.

## Decisions

- Organize the README around the current user journey: open the explorer, choose the right surface, copy the command, and optionally use `CLI Tools`. This is more useful for new users than preserving the older terse wording.
- Describe copy actions by explorer context instead of listing one flat command model. The `Changes` root, active changes, completed changes, and `CLI Tools` now serve different roles, and the README should mirror that structure.
- Document both syntax styles explicitly: the standard default `/opsx-<command>` form and the optional Claude Code `/opsx:<command>` form. This avoids locking the README to outdated `/opsx:*` placeholder wording.
- Embed `media/screenshot.png` as a representative UI example with generic alt text/caption. The copy should focus on stable surfaces rather than theme-specific visual details so the screenshot remains useful longer.

## Risks / Trade-offs

- [Screenshot can become stale] → Keep the caption generic and refresh the image when the explorer layout changes materially.
- [Two syntax styles may confuse readers] → State the default syntax first and frame the Claude Code style as an optional alternate mode.
- [README could overfit a single screenshot] → Use the image as an overview reference, but keep the narrative grounded in stable features and workflows.
