# Contributions — Instructions for Claude Code

This directory holds one markdown file per open-source PR shown on the site's contributions page.

## Before adding any PR entry

1. **Read `PRBLACKLIST.md` in this directory first.**
2. If the PR identifier (`owner/repo#number`) appears in the blacklist, do NOT create an entry for it. Skip it silently or surface why it was skipped if the user asked about that specific PR.
3. The blacklist is authoritative — do not re-add a blacklisted PR even if the user pastes its URL, unless they explicitly ask to remove it from `PRBLACKLIST.md` first.

## When adding a PR entry

Prefer the hydration script over hand-writing frontmatter:

```
npm run add-pr -- <pr-url>
```

It calls the GitHub API via `gh`, refuses blacklisted PRs, refuses PRs where the user is neither author nor co-author, picks the right filename/date/status, and writes a stub with TODO placeholders for the body. Then fill in `description`, `tags`, and the prose sections.

## When removing a PR entry

If the reason for removal is qualitative (e.g. lack of external engagement, not merged, off-topic), add it to `PRBLACKLIST.md` so it isn't re-added later.
