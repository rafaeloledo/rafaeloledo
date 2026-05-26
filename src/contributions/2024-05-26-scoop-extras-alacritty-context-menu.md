---
title: "add context menu for alacritty and fix sublime bug"
date: 2024-05-26
description: Adds a Windows Explorer context menu entry for Alacritty and fixes a related Sublime Text manifest bug in the Scoop Extras bucket.
repo: ScoopInstaller/Extras
pr_url: https://github.com/ScoopInstaller/Extras/pull/13358
pr_number: 13358
status: closed
tags: [scoop, alacritty, windows, packaging]
---

## Context

[Alacritty](https://alacritty.org/) is a fast, cross-platform terminal emulator written in Rust. [ScoopInstaller/Extras](https://github.com/ScoopInstaller/Extras) is where GUI apps like terminals live in the Scoop ecosystem.

## What this PR does

### Alacritty context menu

Adds an "Open Alacritty here" right-click option in Windows Explorer. When registered, right-clicking any folder shows the option, which opens Alacritty with the working directory set to the selected folder.

Registry path registered:
```
HKEY_CLASSES_ROOT\Directory\shell\Alacritty\command → alacritty.exe --working-directory "%V"
```

### Sublime Text bug fix

Discovered and fixed a related bug in the Sublime Text manifest where the context menu registration script had an incorrect registry path, causing the entry to appear in the wrong location in the context menu hierarchy.

## Relation to other PRs

This PR was the earliest in a series of context menu additions I contributed to Scoop Extras (followed by Neovide #13439 and WezTerm #13908). It was ultimately closed in favor of a more unified approach, but the pattern established here was carried forward in the merged PRs.

## Status

🔴 **Closed** — superseded by a cleaner implementation approach adopted in subsequent PRs.
