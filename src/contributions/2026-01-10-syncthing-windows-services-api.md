---
title: "feat(cmd, osutil): implement Windows Services API communication"
date: 2026-01-10
description: Implements native Windows Services API integration so Syncthing can be managed as a proper Windows Service.
repo: syncthing/syncthing
pr_url: https://github.com/syncthing/syncthing/pull/10524
pr_number: 10524
status: open
tags: [go, windows, syncthing, systems]
---

## Context

[Syncthing](https://syncthing.net/) is an open-source continuous file synchronization program written in Go. It's used by millions of people worldwide to sync files between devices without a central server.

## The problem

When Syncthing runs as a Windows Service, it needs a way to communicate its status and receive control signals (start, stop, pause) via the Windows Service Control Manager (SCM). Without this, the OS can't properly manage the process lifecycle — it can't gracefully stop the service, report its state to Task Manager, or integrate with system monitoring tools.

## What this PR does

Implements the Windows Services API communication layer using `golang.org/x/sys/windows/svc`. This allows Syncthing to:

- Register as a proper Windows Service
- Receive and handle SCM control signals (`SERVICE_CONTROL_STOP`, `SERVICE_CONTROL_PAUSE`, etc.)
- Report status transitions back to the SCM (starting, running, stopping)
- Integrate cleanly with `sc.exe`, PowerShell's service cmdlets, and Task Manager

The implementation lives in `cmd/syncthing/` and `lib/osutil/` keeping platform-specific code isolated from the cross-platform core.

## Status

🟢 **Open** — under review. This is a significant systems-level addition targeting Windows users who run Syncthing as a background service.
