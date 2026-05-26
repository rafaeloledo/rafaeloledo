---
title: "fix: add index to coreMethods to resolve imports"
date: 2025-04-16
description: Fixes a broken module resolution issue in the MercadoPago React SDK by adding missing index exports to coreMethods.
repo: mercadopago/sdk-react
pr_url: https://github.com/mercadopago/sdk-react/pull/134
pr_number: 134
status: closed
tags: [javascript, react, sdk, bugfix]
---

## Context

[mercadopago/sdk-react](https://github.com/mercadopago/sdk-react) is the official MercadoPago React SDK, used by thousands of e-commerce applications across Latin America to integrate payments.

## The problem

After a refactor of the SDK's internal structure, the `coreMethods` module lost its `index.ts` export barrel. This caused TypeScript and bundler-based projects (Vite, webpack, esbuild) to fail with a module resolution error when importing directly from certain SDK paths:

```
Cannot find module '@mercadopago/sdk-react/coreMethods'
```

The issue was particularly frustrating because it only manifested in strict TypeScript configs or when tree-shaking was enabled — making it hard to reproduce in casual testing.

## What this PR does

Adds a proper `index.ts` file to the `coreMethods` directory that re-exports all the methods. This restores the expected module resolution path and fixes imports both via the package root and via deep imports.

```ts
// Before: broken
import { createCardToken } from '@mercadopago/sdk-react/coreMethods';

// After: works correctly
import { createCardToken } from '@mercadopago/sdk-react/coreMethods';
```

## Status

🔴 **Closed** — the maintainer closed the PR without merging, but the fix itself was applied directly in the next release. The merge was considered unnecessary because the change was incorporated upstream — not because the fix was wrong.
