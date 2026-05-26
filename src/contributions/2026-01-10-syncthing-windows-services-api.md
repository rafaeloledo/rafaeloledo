---
title: "feat(cmd, osutil): implement Windows Services API communication (fixes #7042)"
date: 2026-01-10
description: "The purpose of this change is related to https://github.com/syncthing/docs/pull/955. Since `--no-console` is being discouraged on Windows 11 due to `Windows Terminal` being the new default \"console\"."
repo: syncthing/syncthing
pr_url: https://github.com/syncthing/syncthing/pull/10524
pr_number: 10524
status: open
tags: ["go", "p2p", "peer-to-peer", "synchronization"]
---

## Context

Open Source Continuous File Synchronization

Repository: [syncthing/syncthing](https://github.com/syncthing/syncthing)

Homepage: <https://syncthing.net/>

## What this PR does

### Purpose

The purpose of this change is related to https://github.com/syncthing/docs/pull/955. Since `--no-console` is being discouraged on Windows 11 due to `Windows Terminal` being the new default "console".

Here, i'm adding support for the Windows Services API in the project. It can now communicate and act as a service for Windows Services Manager.

It's necessary to the service be able to Start and Stop on the Manager's GUI.

https://github.com/user-attachments/assets/14c558ef-e6bb-41df-a154-2b58590dea92

Currently, the Stop action is working in functionality, but it can be coded better.

### Testing

Run the following commands on Windows:

Build the app with fake version

```sh
go run build.go --version v2.0.14
```

Then, create a service linked to the `syncthing.exe` path.

```cmd
sc create syncthing binPath="C:\repos\syncthing\bin\syncthing.exe --no-browser" start=auto DisplayName="syncthing"
```

Run the service

```cmd
sc start syncthing
```

Stop the service

```cmd
sc stop syncthing
```

Delete the service

```cmd
sc stop syncthing        (if running)
sc delete syncthing
```

https://learn.microsoft.com/en-us/windows/win32/services/services

## Authorship

Name: rafaeloledo
Email: rafaeloliveiraledo@gmail.com

## Files changed

- `cmd/syncthing/main.go` (+53 −0)
- `lib/osutil/services_windows.go` (+76 −0)

