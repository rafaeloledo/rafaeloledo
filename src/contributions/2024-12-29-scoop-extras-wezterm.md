---
title: "feat(wezterm): add context menu"
date: 2024-12-29
description: Adds a Windows Explorer context menu entry for WezTerm via the Scoop Extras package manifest.
repo: ScoopInstaller/Extras
pr_url: https://github.com/ScoopInstaller/Extras/pull/13908
pr_number: 13908
status: merged
tags: [scoop, wezterm, windows, packaging]
---

## Context

[WezTerm](https://wezfurlong.org/wezterm/) is a GPU-accelerated terminal emulator written in Rust, popular in the developer community for its speed and configurability. [ScoopInstaller/Extras](https://github.com/ScoopInstaller/Extras) is the Scoop bucket for packages like GUI apps and terminals.

## What this PR does

Adds a Windows context menu entry ("Open WezTerm here") to the WezTerm Scoop manifest. When installed, right-clicking any folder in Windows Explorer shows a WezTerm option that opens the terminal at that directory.

This is implemented via the Scoop manifest's `shortcuts` and `post_install` fields, which register the appropriate registry keys:

```
HKEY_CLASSES_ROOT\Directory\shell\WezTerm\command
```

The entry launches `wezterm start --cwd "%V"`, passing the selected folder as the working directory.

## Why it matters

"Open terminal here" is one of the most-requested developer conveniences on Windows. PowerToys has it, Windows Terminal has it — and now WezTerm users who install via Scoop get it automatically without any manual registry editing.

## Status

✅ **Merged** into `ScoopInstaller/Extras`.
