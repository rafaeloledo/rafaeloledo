---
title: "chore: remove redefined code"
date: 2023-09-28
description: Removes duplicate Neovim configuration code that was being overridden later in the same setup, cleaning up the config.
repo: craftzdog/dotfiles-public
pr_url: https://github.com/craftzdog/dotfiles-public/pull/135
pr_number: 135
status: closed
tags: [neovim, lua, dotfiles, chore]
---

## Context

[craftzdog/dotfiles-public](https://github.com/craftzdog/dotfiles-public) is the public Neovim and terminal dotfiles repository of Takuya Matsuyama (devaslife). It's one of the most starred dotfiles repos on GitHub, used as a reference by thousands of developers.

## The problem

While studying the config to adapt it for my own setup, I noticed that a block of Neovim Lua configuration was being defined and then immediately overridden by a later definition in the same file. The first definition was effectively dead code — it would never be executed as intended because it was shadowed before taking effect.

This is a common issue in large, evolving dotfiles where settings accumulate over time and older definitions aren't always cleaned up.

## What this PR does

Removes the duplicate/redefined block, leaving only the active definition. No behavior changes — purely a code cleanup that makes the config easier to read and understand.

This was my first PR to a high-profile open-source dotfiles repo.

## Status

🔴 **Closed** — the maintainer acknowledged the issue but chose to handle it as part of a broader config refactor rather than merging this isolated cleanup. Still, it was a good learning experience about how to spot and report dead code in configuration files.
