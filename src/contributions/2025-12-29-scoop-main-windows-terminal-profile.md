---
title: "pwsh: add Windows Terminal profile installation script"
date: 2026-05-20
description: "When you execute `winget install pwsh`, the profile is added automatically."
repo: ScoopInstaller/Main
pr_url: https://github.com/ScoopInstaller/Main/pull/7466
pr_number: 7466
status: closed
tags: ["scoop", "scoop-apps", "scoop-bucket"]
---

## Context

📦 The default bucket for Scoop.

Repository: [ScoopInstaller/Main](https://github.com/ScoopInstaller/Main)

Homepage: <https://scoop.sh>

## What this PR does

When you execute `winget install pwsh`, the profile is added automatically.

Changes:  
- Executing `powershell -ExecutionPolicy Bypass -File install-profile.ps1` will add the `pwsh` profile based on `SCOOP` env var.
- Format notes  

One thing to note:  
- The script may be signed to alter the execution policy from `Bypass`.

- [x] Use conventional PR title: `<manifest-name[@version]|chore>: <general summary of the pull request>`
- [x] I have read the [Contributing Guide](https://github.com/ScoopInstaller/.github/blob/main/.github/CONTRIBUTING.md)

## Files changed

- `bucket/pwsh.json` (+9 −2)
- `scripts/pwsh/install-profile.ps1` (+73 −0)

