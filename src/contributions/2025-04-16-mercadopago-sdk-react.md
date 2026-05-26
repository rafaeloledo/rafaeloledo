---
title: "fix: add index to coreMethods to resolve imports"
date: 2025-05-06
description: "Before"
repo: mercadopago/sdk-react
pr_url: https://github.com/mercadopago/sdk-react/pull/134
pr_number: 134
status: closed
tags: []
---

## Context

Mercado Pago's Official React SDK

Repository: [mercadopago/sdk-react](https://github.com/mercadopago/sdk-react)

## What this PR does

Before

![image](https://github.com/user-attachments/assets/a0b1e003-92e9-449a-8b7c-dfd3c83c9378)

After

![image](https://github.com/user-attachments/assets/95512806-74a5-43e5-b16b-89e62cd8f12e)

Then, it's expected as output: `index.d.ts` and `index.js` at build time inside `esm/coreMethods`.

## Files changed

- `src/coreMethods/index.ts` (+7 −0)

