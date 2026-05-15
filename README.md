# rafaeloledo.com.br

Personal site — blog + projects, built as a static SPA.

## Stack

- **Vite + React 19 + TypeScript** — fast dev loop, plain client-side routing.
- **Tailwind CSS v4 + DaisyUI 5** — terminal-flavored theme, dark by default with a light toggle.
- **react-markdown + rehype-highlight** — posts written in plain Markdown, picked up at build time via `import.meta.glob`.
- **mise** — pins Node + Bun (`.mise.toml`).
- **Bun** — package manager and script runner.

The build output (`dist/`) is fully static — drop it on any static host (Cloudflare Pages, GitHub Pages, Netlify, S3, nginx).

## Toolchain

System dependencies are managed by [mise](https://mise.jdx.dev):

```sh
mise install            # installs node + bun pinned in .mise.toml
```

## Develop

```sh
bun install
bun dev                 # vite dev server
bun run build           # type-check + production build → dist/
bun run preview         # preview the production build
```

## Writing a post

Drop a markdown file into `src/posts/` named `YYYY-MM-DD-some-slug.md` with frontmatter:

```md
---
slug: some-slug
title: A good title
date: 2026-05-15
description: One-line summary
tags: [foo, bar]
---

# Body in markdown
```

The post will show up on the home page list and `/blog`. Date and slug fall back to the filename if you omit them.

## Project layout

```
.
├── .mise.toml              # node + bun
├── index.html              # entry, theme bootstrap
├── vite.config.ts
├── src/
│   ├── main.tsx            # router root
│   ├── App.tsx             # routes + ⌘K shortcut
│   ├── index.css           # tailwind + daisyui themes
│   ├── posts/              # markdown source of truth
│   ├── pages/              # Home, Blog, Post, About, Contact, Uses, Projects
│   ├── components/         # Nav, Footer, ThemeToggle, CommandPalette, Markdown
│   └── lib/                # posts loader, theme hook
└── public/                 # static assets copied as-is
```

## Hugo-equivalent layout (reference only — this repo does NOT use Hugo)

For posterity, here is how the same content would map onto a Hugo project,
in case I ever port back:

```
.
├── hugo.toml
├── archetypes/
│   └── default.md          # frontmatter template for `hugo new`
├── content/
│   ├── _index.md           # home page copy
│   ├── about.md
│   ├── contact.md
│   ├── uses.md
│   ├── projects/
│   │   ├── _index.md
│   │   └── scoop-extras.md
│   └── blog/
│       ├── _index.md
│       ├── 2024-06-03-alacritty-contribution.md
│       ├── 2024-12-29-neovide-and-wezterm-contributions.md
│       └── 2026-05-15-welcome.md
├── layouts/
│   ├── _default/
│   │   ├── baseof.html     # shell — nav, footer, palette mount
│   │   ├── list.html       # blog index
│   │   └── single.html     # blog post
│   ├── partials/
│   │   ├── nav.html
│   │   ├── footer.html
│   │   ├── theme-toggle.html
│   │   └── command-palette.html
│   └── index.html          # home
├── assets/
│   ├── css/main.css        # tailwind/daisyui entrypoint
│   └── ts/palette.ts       # ⌘K + search island
├── data/
│   └── uses.toml           # uses page data
└── static/
    └── favicon.png
```

Front matter convention would mirror what's in `src/posts/` today.
```

## License

MIT.
