---
title: "vscode@1.104.1: Remove unnecessary quotes in notes"
date: 2025-09-21
description: Removes redundant quotes from the VS Code post-install notes in the Scoop Extras bucket.
repo: ScoopInstaller/Extras
pr_url: https://github.com/ScoopInstaller/Extras/pull/16081
pr_number: 16081
status: merged
tags: [scoop, vscode, windows, packaging]
---

## Context

[ScoopInstaller/Extras](https://github.com/ScoopInstaller/Extras) is the Scoop bucket for packages that don't fit the strict criteria of the Main bucket — including GUI apps, browser extensions, and larger tools like VS Code.

## What this PR does

The `vscode` manifest's `notes` field contained unnecessary surrounding quotes that appeared literally in the terminal output after installation. This made the post-install message look like:

```
"Run 'code' to start Visual Studio Code."
```

Instead of the intended:

```
Run 'code' to start Visual Studio Code.
```

The fix removes the outer quotes, so the message renders correctly without the extra punctuation artifacts.

## Why care about quotes in a JSON file?

The Scoop Extras bucket has thousands of manifests maintained by contributors worldwide. Consistent, clean output matters for user experience — especially for VS Code, one of the most installed packages in the entire ecosystem. Every install of VS Code on Windows via Scoop would hit this cosmetic bug.

## Status

✅ **Merged** into `ScoopInstaller/Extras`.
