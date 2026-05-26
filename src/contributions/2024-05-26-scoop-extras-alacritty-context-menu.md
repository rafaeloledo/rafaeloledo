---
title: "alacritty@0.13.2: Add Open with Alacritty context menu"
date: 2024-06-04
description: "Adds a bundled registry file to optionally add an \"Open Alacritty here\" context menu entry just as Alacritty's own installer[^1] does."
repo: ScoopInstaller/Extras
pr_url: https://github.com/ScoopInstaller/Extras/pull/12997
pr_number: 12997
status: merged
tags: ["hacktoberfest", "scoop", "scoop-apps", "scoop-bucket"]
---

## Context

📦 The Extras bucket for Scoop.

Repository: [ScoopInstaller/Extras](https://github.com/ScoopInstaller/Extras)

Homepage: <https://scoop.sh>

## What this PR does

Adds a bundled registry file to optionally add an "Open Alacritty here" context menu entry just as Alacritty's own installer[^1] does.

Closes #12983

- [x] I have read the [Contributing Guide](https://github.com/ScoopInstaller/.github/blob/main/.github/CONTRIBUTING.md).

[^1]: https://github.com/alacritty/alacritty/blob/master/alacritty/windows/wix/alacritty.wxs#L41-L49

## Files changed

- `bucket/alacritty.json` (+16 −0)
- `scripts/alacritty/install-context.reg` (+15 −0)
- `scripts/alacritty/uninstall-context.reg` (+6 −0)

## How I'm credited

Co-authored by me; the PR was opened by [jenbroek](https://github.com/jenbroek).
