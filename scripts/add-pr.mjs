#!/usr/bin/env node
// Hydrate a contributions/*.md entry from a GitHub PR URL.
// Usage: npm run add-pr -- <pr-url>

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTRIB_DIR = resolve(__dirname, '..', 'src', 'contributions');
const BLACKLIST = join(CONTRIB_DIR, 'PRBLACKLIST.md');

function die(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

function gh(args) {
  return execFileSync('gh', args, { encoding: 'utf8' });
}

function parsePrUrl(url) {
  const m = /github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/.exec(url);
  if (!m) die(`Not a GitHub PR URL: ${url}`);
  return { owner: m[1], repo: m[2], number: Number(m[3]) };
}

function isBlacklisted(owner, repo, number) {
  if (!existsSync(BLACKLIST)) return false;
  const id = `${owner}/${repo}#${number}`;
  return readFileSync(BLACKLIST, 'utf8').includes(id);
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
}

function detectCoAuthor(owner, repo, number, viewerLogin) {
  const commitsJson = gh(['api', `repos/${owner}/${repo}/pulls/${number}/commits`, '--paginate']);
  const commits = JSON.parse(commitsJson);
  const trailer = new RegExp(`co-authored-by:[^\\n]*${viewerLogin}`, 'i');
  return commits.some((c) => trailer.test(c.commit?.message || ''));
}

const url = process.argv[2];
if (!url) die('Usage: npm run add-pr -- <pr-url>');

const { owner, repo, number } = parsePrUrl(url);

if (isBlacklisted(owner, repo, number)) {
  die(`${owner}/${repo}#${number} is in PRBLACKLIST.md — refusing to add.`);
}

const viewer = JSON.parse(gh(['api', 'user'])).login;
const pr = JSON.parse(gh(['api', `repos/${owner}/${repo}/pulls/${number}`]));

const isAuthor = pr.user?.login?.toLowerCase() === viewer.toLowerCase();
const isCoAuthor = !isAuthor && detectCoAuthor(owner, repo, number, viewer);

if (!isAuthor && !isCoAuthor) {
  die(`${viewer} is neither author nor co-author of ${owner}/${repo}#${number}.`);
}

const status = pr.merged ? 'merged' : pr.state === 'closed' ? 'closed' : 'open';
const dateIso = (pr.merged_at || pr.closed_at || pr.created_at).slice(0, 10);
const slug = slugify(`${repo}-${pr.title}`);
const filename = `${dateIso}-${slug}.md`;
const filepath = join(CONTRIB_DIR, filename);

if (existsSync(filepath)) die(`File already exists: ${filename}`);

const frontmatter = [
  '---',
  `title: "${pr.title.replace(/"/g, '\\"')}"`,
  `date: ${dateIso}`,
  `description: TODO — one-sentence summary for the listing card.`,
  `repo: ${owner}/${repo}`,
  `pr_url: ${pr.html_url}`,
  `pr_number: ${number}`,
  `status: ${status}`,
  `tags: []`,
  '---',
  '',
  '## Context',
  '',
  'TODO — what is this project and why does it matter?',
  '',
  '## What this PR does',
  '',
  'TODO — describe the change.',
  '',
  isCoAuthor ? '## How I\'m credited\n\nCo-authored by me; the PR was opened by '
    + `[${pr.user.login}](https://github.com/${pr.user.login}).\n` : '',
].filter(Boolean).join('\n');

writeFileSync(filepath, frontmatter);
console.log(`✓ Wrote ${filename}`);
console.log(`  status: ${status}${isCoAuthor ? ' (co-author)' : ''}`);
console.log(`  edit:   ${filepath}`);
