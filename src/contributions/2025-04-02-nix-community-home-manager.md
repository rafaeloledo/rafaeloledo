---
title: "docs: add docs for mkOutOfStoreSymlink"
date: 2025-04-02
description: Documents the mkOutOfStoreSymlink function in the home-manager manual, which was previously undocumented despite being widely used.
repo: nix-community/home-manager
pr_url: https://github.com/nix-community/home-manager/pull/6660
pr_number: 6660
status: merged
tags: [nix, documentation, home-manager, linux]
---

## Context

[home-manager](https://github.com/nix-community/home-manager) is the de facto standard for managing user environments with Nix. It's used by thousands of developers on NixOS and macOS to declaratively configure their dotfiles, shells, editors, and tools.

## The problem

`lib.file.mkOutOfStoreSymlink` is a home-manager utility that creates symlinks pointing *outside* the Nix store — useful when you want a managed config file to actually link to a mutable path (e.g., a dotfile in your home directory that you edit directly).

Despite being referenced frequently in the home-manager forum, GitHub Issues, and community wikis, the function had **no entry in the official manual**. Users had to piece together how it worked from source code and third-party blog posts.

## What this PR does

Adds a dedicated section in the home-manager manual for `mkOutOfStoreSymlink`, covering:

- **Purpose** — when and why to use it over regular `home.file`
- **Usage example** — a minimal working snippet
- **Caveats** — the symlink won't be garbage-collected with the store path; the target must exist

```nix
home.file.".config/nvim".source =
  config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nvim";
```

## Why this matters

Documentation PRs are often the highest-leverage contributions to an open-source project. This one resolves a gap that generated repeated questions from the community — saving future users hours of confusion.

## Status

✅ **Merged** into `nix-community/home-manager`.
