---
title: "chore: use new api spec for inlay hints"
date: 2025-02-27
description: Updates the Neovim LSP inlay hints configuration to use the new API introduced in Neovim 0.10.
repo: craftzdog/dotfiles-public
pr_url: https://github.com/craftzdog/dotfiles-public/pull/180
pr_number: 180
status: merged
tags: [neovim, lua, dotfiles, lsp]
---

## Context

[craftzdog/dotfiles-public](https://github.com/craftzdog/dotfiles-public) is the public dotfiles of Takuya Matsuyama, widely used as a reference Neovim configuration. It features a carefully crafted IDE-like setup using lazy.nvim, LSP, Treesitter, and various plugins.

## The problem

Neovim 0.10 introduced a new, stable API for inlay hints via `vim.lsp.inlay_hint`. The old approach used either plugin-based hints or the unstable `_inlay_hint` private namespace. With 0.10, the recommended pattern changed:

```lua
-- Old (deprecated)
require('lsp-inlayhints').setup()

-- New (0.10+ native)
vim.lsp.inlay_hint.enable(true)
```

The existing config used the deprecated approach, causing warnings on Neovim 0.10+ and potential breakage on newer nightly builds.

## What this PR does

Updates the LSP setup to use `vim.lsp.inlay_hint.enable()` — the new stable API — and removes the dependency on an external inlay hints plugin. The change is applied in the `on_attach` callback so hints are enabled per-buffer when a language server attaches.

## Status

✅ **Merged** into `craftzdog/dotfiles-public`.
