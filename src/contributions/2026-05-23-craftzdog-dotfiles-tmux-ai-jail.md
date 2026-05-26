---
title: "feat(tmux): run claude via ai-jail in popup"
date: 2026-05-23
description: Adds a tmux keybinding to open Claude AI inside an ai-jail sandboxed popup session.
repo: craftzdog/dotfiles-public
pr_url: https://github.com/craftzdog/dotfiles-public/pull/191
pr_number: 191
status: open
tags: [tmux, dotfiles, ai, shell]
---

## Context

[craftzdog/dotfiles-public](https://github.com/craftzdog/dotfiles-public) is the public dotfiles repository of Takuya Matsuyama (devaslife), a popular developer and content creator. It's widely referenced by the community.

## What this PR does

Adds a tmux keybinding that launches Claude AI through [ai-jail](https://github.com/nickvdyck/ai-jail) — a sandboxing layer that restricts Claude's filesystem and network access — inside a floating popup pane.

The idea is to have a quick `<prefix> + A` shortcut that drops you into a sandboxed AI session without leaving your terminal workflow. The popup floats over the current window and can be dismissed when done.

```tmux
bind-key A display-popup -E -w 80% -h 80% "ai-jail claude"
```

## Why ai-jail

Running Claude directly with full filesystem access is risky in a developer environment. `ai-jail` uses OS-level sandboxing (seccomp/pledge depending on the platform) to limit what the model can touch. This is especially important in shared or sensitive environments.

## Status

🟢 **Open** — awaiting review from the maintainer.
