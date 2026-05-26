---
title: "feat: add support for fish shell"
date: 2026-05-11
description: Adds Fish shell support to FrankMD, enabling syntax highlighting and correct shell detection for fish scripts.
repo: akitaonrails/FrankMD
pr_url: https://github.com/akitaonrails/FrankMD/pull/70
pr_number: 70
status: merged
tags: [ruby, shell, fish, markdown]
---

## Context

[FrankMD](https://github.com/akitaonrails/FrankMD) is a Markdown rendering tool by [Fabio Akita](https://www.akitaonrails.com/), a well-known figure in the Brazilian Ruby on Rails community. FrankMD parses and renders Markdown files with code highlighting support.

## The problem

FrankMD supported syntax highlighting for many shells (bash, zsh, sh) but didn't recognize Fish shell (`.fish` files or ` ```fish ` code blocks). Fish is increasingly popular among developers for its friendly syntax, autosuggestions, and scripting improvements over POSIX shells.

When a Fish script was included in a Markdown document rendered by FrankMD, it either fell back to plain text or triggered an error in the highlighter.

## What this PR does

Adds Fish shell to the list of recognized languages in FrankMD's syntax highlighting configuration. This includes:

- Registering `fish` as a valid language identifier for fenced code blocks (` ```fish `)
- Adding file extension mapping for `.fish` files
- Ensuring the highlighter gracefully handles Fish-specific syntax (functors, `begin`/`end` blocks, `set` commands)

## Why it matters

As Fish adoption grows — especially among developers who use tools like Starship, Tide, or Fisher — the ability to render Fish scripts cleanly in documentation becomes more important. This contribution makes FrankMD fully usable for Fish-first developers.

## Status

✅ **Merged** into `akitaonrails/FrankMD`.
