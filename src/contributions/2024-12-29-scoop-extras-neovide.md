---
title: "neovide: Add context menu"
date: 2024-12-29
description: Adds a Windows Explorer context menu entry for Neovide via the Scoop Extras package manifest.
repo: ScoopInstaller/Extras
pr_url: https://github.com/ScoopInstaller/Extras/pull/13439
pr_number: 13439
status: merged
tags: [scoop, neovide, neovim, windows, packaging]
---

## Context

[Neovide](https://neovide.dev/) is a Neovim GUI client with smooth animations, written in Rust. It's a popular choice for developers who want the power of Neovim with a polished graphical interface. [ScoopInstaller/Extras](https://github.com/ScoopInstaller/Extras) distributes it on Windows.

## What this PR does

Adds an "Open with Neovide" context menu entry to the Neovide Scoop manifest. Right-clicking a file in Windows Explorer shows a Neovide option that opens the file directly in the editor.

The manifest registers the appropriate shell extension via Scoop's `post_install` hook:

```
HKEY_CLASSES_ROOT\*\shell\Neovide\command → neovide.exe "%1"
HKEY_CLASSES_ROOT\Directory\shell\Neovide\command → neovide.exe "%V"
```

This covers both file and folder right-clicks — opening a file launches Neovide with that file, and opening a folder launches it in the directory context.

## Companion PR

This was submitted alongside the WezTerm context menu PR (#13908) as part of a batch of terminal/editor context menu improvements for the Scoop Extras bucket.

## Status

✅ **Merged** into `ScoopInstaller/Extras`.
