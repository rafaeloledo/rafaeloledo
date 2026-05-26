---
title: "alacritty: add 'Open with Alacritty' context menu (co-authored)"
date: 2024-06-04
description: Adds a Windows Explorer "Open with Alacritty" context menu entry in the Scoop Extras bucket. Merged with co-authorship credit.
repo: ScoopInstaller/Extras
pr_url: https://github.com/ScoopInstaller/Extras/pull/12997
pr_number: 12997
status: merged
tags: [scoop, alacritty, windows, packaging]
---

## Context

[Alacritty](https://alacritty.org/) is a fast, cross-platform terminal emulator written in Rust. [ScoopInstaller/Extras](https://github.com/ScoopInstaller/Extras) is where GUI apps like terminals live in the Scoop ecosystem.

## What this PR does

Adds an "Open with Alacritty" right-click option in Windows Explorer. Right-clicking any folder (or the folder background) shows the option, which launches Alacritty with the working directory set to the selected folder.

Registry path registered:
```
HKEY_CLASSES_ROOT\Directory\shell\Alacritty\command → alacritty.exe --working-directory "%V"
```

A key detail in the merged version: paths with non-ASCII characters require `"%V"` (quoted) instead of `%V`, otherwise Alacritty fails to launch on Unicode paths.

## How I'm credited

This PR was authored by [jenbroek](https://github.com/jenbroek) and merged on June 4, 2024 with me listed as `Co-authored-by: rafaeloledo`.

The co-authorship reflects the work I did in my original PR [#13358](https://github.com/ScoopInstaller/Extras/pull/13358), which I closed in favor of jenbroek's complementary PR after their review caught the Unicode path handling issue. The diffs from #13358 (context menu registration + a related Sublime Text manifest bug fix) were folded into #12997.

## Relation to other PRs

This was the earliest in a series of context menu additions I contributed to Scoop Extras, followed by Neovide [#13439](https://github.com/ScoopInstaller/Extras/pull/13439) and WezTerm [#13908](https://github.com/ScoopInstaller/Extras/pull/13908).

## Status

🟣 **Merged** as [#12997](https://github.com/ScoopInstaller/Extras/pull/12997) with co-authorship credit.
