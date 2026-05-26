# Contributions — Instructions for Claude Code

This directory holds one markdown file per open-source PR shown on the site's contributions page.

## Policy: pages are pure mirrors of GitHub API state

**Do not hand-write or hand-edit the body or frontmatter of any entry.** Every field — title, date, description, tags, status, all body sections — must come from a GitHub API response. The Rust hydrator at `scripts/add-pr/` is the only thing that writes these files.

If you find yourself wanting to "improve" prose or add editorial notes, stop. That belongs in a different layer (not yet built) — not in these `.md` files.

## Before adding any PR entry

1. **Read `PRBLACKLIST.md` in this directory first.**
2. If the PR identifier (`owner/repo#number`) appears in the blacklist, do NOT create an entry. The hydrator already enforces this; do not bypass it.
3. The blacklist is authoritative — do not re-add a blacklisted PR even if the user pastes its URL, unless they explicitly ask to remove it from `PRBLACKLIST.md` first.

## When adding a PR entry

```
npm run add-pr -- <pr-url>
```

The hydrator (Rust binary under `scripts/add-pr/`, invoked via `cargo run`) does everything: parses the URL, calls `gh api` for PR + repo + files + commits, enforces the blacklist, refuses PRs where the user is neither author nor co-author, and writes a fully-populated `.md` with no placeholders. First run compiles (~15s); subsequent runs are instant.

## When regenerating all entries

```
npm run rebuild-prs
```

Reads each existing `*.md`, extracts its `pr_url`, and overwrites the file with fresh API output. Filenames are preserved so URLs stay stable; everything else is regenerated.

## When removing a PR entry

If the reason for removal is qualitative (e.g. lack of external engagement, superseded by a co-authored merge, off-topic), add it to `PRBLACKLIST.md` with a short reason so it isn't re-added later.
