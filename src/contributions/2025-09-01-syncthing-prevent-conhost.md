---
title: "feat: prevent conhost from pop-up on Windows"
date: 2025-09-01
description: Prevents the Windows Console Host (conhost.exe) from briefly flashing a console window when Syncthing starts.
repo: syncthing/syncthing
pr_url: https://github.com/syncthing/syncthing/pull/10334
pr_number: 10334
status: closed
tags: [go, windows, syncthing, ux]
---

## Context

[Syncthing](https://syncthing.net/) is a popular open-source file sync tool. On Windows, it's commonly installed as a background process that starts with the system. Many users prefer running it via the system tray or as a service — completely invisible.

## The problem

When Syncthing launched on Windows (especially when started via a shortcut or startup entry), `conhost.exe` (the legacy Windows Console Host) would briefly flash a black console window before the process went to the background. This is a well-known Windows quirk: even "windowless" Go binaries can trigger `conhost.exe` if they aren't compiled with the right linker flags or subsystem settings.

The flash is jarring — it looks like a crash or malware behavior to non-technical users.

## What this PR does

Sets the Windows subsystem flag so the binary doesn't allocate a console window at startup. In Go, this is done via the `-ldflags "-H windowsgui"` build flag, or by adjusting the PE subsystem field.

This makes Syncthing truly invisible on startup — no flash, no `conhost.exe`, just the tray icon appearing silently.

## Status

🔴 **Closed** — the approach needed refinement since completely suppressing the console can affect log output for users who debug via terminal. The discussion led to exploring alternative approaches.
