---
title: "7zip@25.01: Format notes message"
date: 2025-09-27
description: Fixes the formatting of the post-install notes message for the 7-Zip package in the Scoop Main bucket.
repo: ScoopInstaller/Main
pr_url: https://github.com/ScoopInstaller/Main/pull/7212
pr_number: 7212
status: merged
tags: [scoop, windows, packaging]
---

## Context

[ScoopInstaller/Main](https://github.com/ScoopInstaller/Main) is the default Scoop bucket. Every manifest is a JSON file describing how to install, verify, and configure a package.

## What this PR does

Fixes the formatting of the `notes` field in the `7zip` manifest. After installing 7-Zip via Scoop, the user sees a post-install message with tips or important information. The message had inconsistent formatting — mixing raw newlines and escaped characters in a way that rendered awkwardly in the terminal.

The fix ensures the notes display cleanly: proper line breaks, consistent indentation, and no extra whitespace artifacts.

## Small but meaningful

Package manager contributions often live in the details. A poorly formatted post-install message causes confusion and erodes trust in the tool — users wonder if something went wrong during installation. Clean output signals a polished, well-maintained package.

## Status

✅ **Merged** into `ScoopInstaller/Main`.
