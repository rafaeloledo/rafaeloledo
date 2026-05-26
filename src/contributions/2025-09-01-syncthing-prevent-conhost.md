---
title: "feat: prevent conhost from pop-up on Windows"
date: 2025-09-03
description: "This change prevents the `conhost` process from popping. So the docs can remain the same and the `--no-console` flag remains working. If the change isn't made, it's needed to refactor the entire docs adapting it to `powershell ... -Hidden` wrapping approach. Wrapping with `conhost --headless` still pops the terminal in a `bat/cmd` script since it's a compilation-related problem and the OS forces the window appearing if there's no `conhost` process in the tree, only working, then, inside a terminal, which less tech savvy users won't do."
repo: syncthing/syncthing
pr_url: https://github.com/syncthing/syncthing/pull/10334
pr_number: 10334
status: closed
tags: ["go", "p2p", "peer-to-peer", "synchronization"]
---

## Context

Open Source Continuous File Synchronization

Repository: [syncthing/syncthing](https://github.com/syncthing/syncthing)

Homepage: <https://syncthing.net/>

## What this PR does

### Purpose

This change prevents the `conhost` process from popping. So the docs can remain the same and the `--no-console` flag remains working. If the change isn't made, it's needed to refactor the entire docs adapting it to `powershell ... -Hidden` wrapping approach. Wrapping with `conhost --headless` still pops the terminal in a `bat/cmd` script since it's a compilation-related problem and the OS forces the window appearing if there's no `conhost` process in the tree, only working, then, inside a terminal, which less tech savvy users won't do.

The problem of wrapping it with `powershell`, though, it's that user must run `ExecutionPolicy` changes similar to `scoop.sh` which i think it's not desired.

### Testing

I've compiled the program in the GOOS matching `windows` and GOARCH `amd64`.
You can reproduce in your machine quite easily. The problem is the default debug log is omitted on Windows.
`wezterm` uses the approach of `wezterm.exe` and `wezterm-gui.exe` which could be desired in this case, depending on maintainers will.

### Screenshots

It's not a GUI change. The webclient is the same and it maintains working.

### Documentation

Relates and may close https://github.com/syncthing/docs/pull/957 and https://github.com/syncthing/docs/pull/955.
Derived from https://github.com/syncthing/docs/pull/926 and https://github.com/syncthing/syncthing/pull/8760

## Authorship

- Name: Rafael Ledo @rafaeloledo 
- Email: rafaeloliveiraledo@gmail.com
- Name: Elias @Shablone
- Email: 1elias.bauer@gmail.com
- Name: Jakob Borg @calmh 
- Email: jakob@kastelo.net

## Files changed

- `build.go` (+5 −0)

