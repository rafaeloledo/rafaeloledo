---
title: "feat(tmux): run claude via ai-jail in popup"
date: 2026-05-23
description: "Wraps the `claude` invocation in the tmux popup binding (prefix + y) with [`ai-jail`](https://github.com/akitaonrails/ai-jail) so the Claude Code session runs inside a sandbox rather than directly on the host."
repo: craftzdog/dotfiles-public
pr_url: https://github.com/craftzdog/dotfiles-public/pull/191
pr_number: 191
status: open
tags: []
---

## Context

My personal dotfiles

Repository: [craftzdog/dotfiles-public](https://github.com/craftzdog/dotfiles-public)

## What this PR does

## Summary

Wraps the `claude` invocation in the tmux popup binding (prefix + y) with [`ai-jail`](https://github.com/akitaonrails/ai-jail) so the Claude Code session runs inside a sandbox rather than directly on the host.

## What is ai-jail?

`ai-jail` (by [@akitaonrails](https://github.com/akitaonrails/ai-jail)) is a lightweight sandbox launcher for AI coding agents. It runs the wrapped command (here, `claude`) under a constrained environment — restricting filesystem and network access — so an agent that goes off the rails (rogue `rm`, unexpected network egress, writes outside the project) can't damage the broader system. The agent still gets the working directory it needs, but with guardrails.

## Change

A single edit in `.config/tmux/utility.conf`: the popup spawns `ai-jail claude` instead of `claude`. Behavior is otherwise identical — same per-directory session naming, same popup geometry.

## Usage

### CLI

Once `ai-jail` is on `PATH`, the tmux binding works transparently — `prefix + y` opens a popup running `claude` inside the sandbox. You can also invoke it manually from any shell:

```sh
# Run claude sandboxed in the current directory
ai-jail claude

# Initialize a default config in the current directory
ai-jail --init

# Regenerate the config from scratch
ai-jail --clean --init
```

### `.ai-jail` config file

`ai-jail` reads a per-project `.ai-jail` file from the working directory. It controls what the sandboxed command can see and reach:

```toml
# ai-jail sandbox configuration
# https://github.com/akitaonrails/ai-jail
# Edit freely. Regenerate with: ai-jail --clean --init

command = ["claude"]      # command to run inside the jail
rw_maps = []              # extra paths mounted read-write
ro_maps = []              # extra paths mounted read-only
hide_dotdirs = []         # dotdirs to hide from the sandbox
mask = []                 # paths to mask out entirely
allow_tcp_ports = []      # TCP ports the sandbox can reach
```

Typical tweaks:

- Add `~/.config/some-tool` to `ro_maps` if the agent needs to read external config.
- Add a build cache dir to `rw_maps` to share artifacts between runs.
- List `["443"]` in `allow_tcp_ports` to permit HTTPS egress for tools that fetch packages.

For more: https://github.com/akitaonrails/ai-jail#quick-start

## Caveat

This assumes `ai-jail` is installed and on `PATH`. Users without it will see the popup fail to attach. Happy to gate it behind an `if command -v ai-jail` check if preferred, or leave as-is and document the dependency in the README.

## Test plan

- [x] With `ai-jail` installed, prefix + y opens the popup and `claude` runs sandboxed
- [x] Re-triggering prefix + y in the same directory re-attaches to the existing session

## Credits
@akitaonrails

## Files changed

- `.config/tmux/utility.conf` (+1 −1)

