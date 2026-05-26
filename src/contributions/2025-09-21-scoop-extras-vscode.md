---
title: "vscode@1.104.1: Remove unnecessary quotes in notes"
date: 2025-09-21
description: "QoL change. Removing annoying quotes."
repo: ScoopInstaller/Extras
pr_url: https://github.com/ScoopInstaller/Extras/pull/16081
pr_number: 16081
status: merged
tags: ["hacktoberfest", "scoop", "scoop-apps", "scoop-bucket"]
---

## Context

📦 The Extras bucket for Scoop.

Repository: [ScoopInstaller/Extras](https://github.com/ScoopInstaller/Extras)

Homepage: <https://scoop.sh>

## What this PR does

QoL change. Removing annoying quotes.

https://github.com/user-attachments/assets/ebadb603-fa35-46d3-9352-b03ef4c8802e

Make it the same as `sublime-text`:
<img width="1084" height="329" alt="image" src="https://github.com/user-attachments/assets/df7108dc-7641-448b-98cb-f793fdec832e" />

Relates to:
- https://github.com/ScoopInstaller/Main/issues/7061

- [X] Use conventional PR title: `<manifest-name[@version]|chore>: <general summary of the pull request>`
- [X] I have read the [Contributing Guide](https://github.com/ScoopInstaller/.github/blob/main/.github/CONTRIBUTING.md) 

## Summary by CodeRabbit

* **Documentation**
  * Updated user-facing notes to remove unnecessary quotes around registry import commands, improving readability and copy/paste accuracy.
  * This change is purely textual/formatting; no impact on installation flow, uninstallation, versions, URLs, integrity checks, architectures, or post-install behavior.
  * Clarifies display of commands to reduce confusion while preserving all existing functionality and controls.

## Files changed

- `bucket/vscode.json` (+3 −3)

