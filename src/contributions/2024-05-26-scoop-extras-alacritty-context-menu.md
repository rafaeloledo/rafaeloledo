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

This PR was the earliest in a series of context menu additions I contributed to Scoop Extras (followed by Neovide #13439 and WezTerm #13908). During review, [jenbroek](https://github.com/jenbroek) pointed out an important Unicode path handling fix — paths with non-ASCII characters required `\"%V\"` instead of `%V` to avoid Alacritty failing to launch. After incorporating that feedback, I closed this PR and suggested the diffs be merged into jenbroek's complementary PR [#12997](https://github.com/ScoopInstaller/Extras/pull/12997).

That PR — **"alacritty@0.13.2: Add Open with Alacritty context menu"** — was merged on June 4, 2024, with me credited as `Co-authored-by: rafaeloledo`.

## Status

🔴 **Closed** — superseded by [#12997](https://github.com/ScoopInstaller/Extras/pull/12997), which was merged with co-authorship credit.
