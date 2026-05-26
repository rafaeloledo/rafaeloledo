---
title: "pwsh: add Windows Terminal profile installation script"
date: 2025-12-29
description: Adds a PowerShell post-install script to automatically register an app's Windows Terminal profile.
repo: ScoopInstaller/Main
pr_url: https://github.com/ScoopInstaller/Main/pull/7466
pr_number: 7466
status: closed
tags: [scoop, powershell, windows, devtools]
---

## Context

[Scoop](https://scoop.sh/) is a command-line installer for Windows. The [ScoopInstaller/Main](https://github.com/ScoopInstaller/Main) bucket is the default package registry, containing manifests for hundreds of popular tools.

## What this PR does

Adds a PowerShell post-install hook (`post_install`) to a package manifest that automatically registers a Windows Terminal profile for the installed application.

Without this, users have to manually edit their `settings.json` in Windows Terminal to add a profile for each new shell or tool they install — which is tedious and error-prone.

The script:
1. Detects if Windows Terminal is installed
2. Reads the user's `settings.json`
3. Appends a properly formatted profile entry if one doesn't already exist
4. Writes the file back safely

## Why it matters

Scoop already automates the install; this closes the gap between "tool is installed" and "tool is usable from Windows Terminal" — making the whole developer onboarding smoother on Windows.

## Status

🔴 **Closed** — the PR was closed without merge, likely due to maintainer policy around modifying user config files in post-install scripts.
