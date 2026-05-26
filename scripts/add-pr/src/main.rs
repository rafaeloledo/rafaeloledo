// Hydrate contributions/*.md entries purely from GitHub API data.
//   add-pr <pr-url> [--force]   hydrate one PR (refuses overwrite without --force)
//   add-pr --rebuild-all        regenerate every existing .md from its pr_url

use anyhow::{anyhow, bail, Context, Result};
use serde::Deserialize;
use std::env;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;

#[derive(Deserialize)]
struct User {
    login: String,
}

#[derive(Deserialize)]
struct Pr {
    title: String,
    body: Option<String>,
    html_url: String,
    state: String,
    merged: bool,
    merged_at: Option<String>,
    closed_at: Option<String>,
    created_at: String,
    user: User,
}

#[derive(Deserialize)]
struct Repo {
    description: Option<String>,
    homepage: Option<String>,
    html_url: String,
    #[serde(default)]
    topics: Vec<String>,
}

#[derive(Deserialize)]
struct PrFile {
    filename: String,
    additions: u64,
    deletions: u64,
}

#[derive(Deserialize)]
struct CommitNode {
    commit: CommitInner,
}

#[derive(Deserialize)]
struct CommitInner {
    message: String,
}

struct PrRef {
    owner: String,
    repo: String,
    number: u64,
}

fn parse_pr_url(url: &str) -> Result<PrRef> {
    let after = url
        .split_once("github.com/")
        .ok_or_else(|| anyhow!("Not a GitHub URL: {url}"))?
        .1;
    let parts: Vec<&str> = after.split('/').collect();
    if parts.len() < 4 || parts[2] != "pull" {
        bail!("Not a GitHub PR URL: {url}");
    }
    let number: u64 = parts[3]
        .split(|c: char| !c.is_ascii_digit())
        .next()
        .unwrap_or("")
        .parse()
        .with_context(|| format!("Invalid PR number in {url}"))?;
    Ok(PrRef {
        owner: parts[0].to_string(),
        repo: parts[1].to_string(),
        number,
    })
}

fn gh(args: &[&str]) -> Result<String> {
    let out = Command::new("gh")
        .args(args)
        .output()
        .context("failed to invoke `gh` — is the GitHub CLI installed?")?;
    if !out.status.success() {
        bail!(
            "gh {} failed:\n{}",
            args.join(" "),
            String::from_utf8_lossy(&out.stderr)
        );
    }
    Ok(String::from_utf8(out.stdout)?)
}

fn contrib_dir() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("..")
        .join("..")
        .join("src")
        .join("contributions")
        .canonicalize()
        .expect("contributions dir not found")
}

fn is_blacklisted(pr: &PrRef) -> Result<bool> {
    let path = contrib_dir().join("PRBLACKLIST.md");
    if !path.exists() {
        return Ok(false);
    }
    let body = fs::read_to_string(&path)?;
    let id = format!("{}/{}#{}", pr.owner, pr.repo, pr.number);
    Ok(body.contains(&id))
}

fn slugify(s: &str) -> String {
    let mut out = String::with_capacity(s.len());
    let mut prev_dash = true;
    for c in s.chars() {
        let lower = c.to_ascii_lowercase();
        if lower.is_ascii_alphanumeric() {
            out.push(lower);
            prev_dash = false;
        } else if !prev_dash {
            out.push('-');
            prev_dash = true;
        }
    }
    out.trim_matches('-')
        .chars()
        .take(60)
        .collect::<String>()
        .trim_end_matches('-')
        .to_string()
}

fn fetch_pr(pr: &PrRef) -> Result<Pr> {
    let raw = gh(&[
        "api",
        &format!("repos/{}/{}/pulls/{}", pr.owner, pr.repo, pr.number),
    ])?;
    Ok(serde_json::from_str(&raw)?)
}

fn fetch_repo(pr: &PrRef) -> Result<Repo> {
    let raw = gh(&["api", &format!("repos/{}/{}", pr.owner, pr.repo)])?;
    Ok(serde_json::from_str(&raw)?)
}

fn fetch_files(pr: &PrRef) -> Result<Vec<PrFile>> {
    let raw = gh(&[
        "api",
        &format!("repos/{}/{}/pulls/{}/files", pr.owner, pr.repo, pr.number),
        "--paginate",
    ])?;
    Ok(serde_json::from_str(&raw)?)
}

fn detect_co_author(pr: &PrRef, viewer: &str) -> Result<bool> {
    let raw = gh(&[
        "api",
        &format!("repos/{}/{}/pulls/{}/commits", pr.owner, pr.repo, pr.number),
        "--paginate",
    ])?;
    let commits: Vec<CommitNode> = serde_json::from_str(&raw)?;
    let viewer_lc = viewer.to_lowercase();
    Ok(commits.iter().any(|c| {
        c.commit.message.to_lowercase().lines().any(|line| {
            line.contains("co-authored-by:") && line.contains(&viewer_lc)
        })
    }))
}

fn date_iso(pr: &Pr) -> String {
    pr.merged_at
        .as_deref()
        .or(pr.closed_at.as_deref())
        .unwrap_or(&pr.created_at)
        .get(..10)
        .unwrap_or("1970-01-01")
        .to_string()
}

fn yaml_escape(s: &str) -> String {
    s.replace('\\', "\\\\").replace('"', "\\\"")
}

fn build_markdown(
    pr_ref: &PrRef,
    pr: &Pr,
    repo: &Repo,
    files: &[PrFile],
    is_co_author: bool,
) -> String {
    let status = if pr.merged {
        "merged"
    } else if pr.state == "closed" {
        "closed"
    } else {
        "open"
    };
    let date = date_iso(pr);

    let description = pr
        .body
        .as_deref()
        .and_then(|b| {
            b.lines()
                .map(str::trim)
                .find(|l| !l.is_empty() && !l.starts_with('#'))
        })
        .or(repo.description.as_deref())
        .unwrap_or("");
    let description = yaml_escape(description);

    let tags_yaml = repo
        .topics
        .iter()
        .map(|t| format!("\"{}\"", yaml_escape(t)))
        .collect::<Vec<_>>()
        .join(", ");

    let mut out = String::new();
    out.push_str("---\n");
    out.push_str(&format!("title: \"{}\"\n", yaml_escape(&pr.title)));
    out.push_str(&format!("date: {date}\n"));
    out.push_str(&format!("description: \"{description}\"\n"));
    out.push_str(&format!("repo: {}/{}\n", pr_ref.owner, pr_ref.repo));
    out.push_str(&format!("pr_url: {}\n", pr.html_url));
    out.push_str(&format!("pr_number: {}\n", pr_ref.number));
    out.push_str(&format!("status: {status}\n"));
    out.push_str(&format!("tags: [{tags_yaml}]\n"));
    out.push_str("---\n\n");

    out.push_str("## Context\n\n");
    if let Some(desc) = &repo.description {
        if !desc.trim().is_empty() {
            out.push_str(desc.trim());
            out.push_str("\n\n");
        }
    }
    out.push_str(&format!(
        "Repository: [{}/{}]({})\n",
        pr_ref.owner, pr_ref.repo, repo.html_url
    ));
    if let Some(home) = &repo.homepage {
        if !home.trim().is_empty() {
            out.push_str(&format!("\nHomepage: <{}>\n", home.trim()));
        }
    }
    out.push('\n');

    out.push_str("## What this PR does\n\n");
    match pr.body.as_deref() {
        Some(b) if !b.trim().is_empty() => {
            out.push_str(b.trim());
            out.push('\n');
        }
        _ => out.push_str("_No description was provided in the pull request._\n"),
    }
    out.push('\n');

    out.push_str("## Files changed\n\n");
    if files.is_empty() {
        out.push_str("_No files reported by the API._\n");
    } else {
        for f in files {
            out.push_str(&format!(
                "- `{}` (+{} −{})\n",
                f.filename, f.additions, f.deletions
            ));
        }
    }
    out.push('\n');

    if is_co_author {
        out.push_str("## How I'm credited\n\n");
        out.push_str(&format!(
            "Co-authored by me; the PR was opened by [{login}](https://github.com/{login}).\n",
            login = pr.user.login
        ));
    }

    out
}

fn hydrate(url: &str, force: bool, override_filename: Option<&str>) -> Result<String> {
    let pr_ref = parse_pr_url(url)?;

    if is_blacklisted(&pr_ref)? {
        bail!(
            "{}/{}#{} is in PRBLACKLIST.md — refusing to add.",
            pr_ref.owner,
            pr_ref.repo,
            pr_ref.number
        );
    }

    let viewer: User = serde_json::from_str(&gh(&["api", "user"])?)?;
    let pr = fetch_pr(&pr_ref)?;
    let repo = fetch_repo(&pr_ref)?;

    let is_author = pr.user.login.eq_ignore_ascii_case(&viewer.login);
    let is_co_author = !is_author && detect_co_author(&pr_ref, &viewer.login)?;

    if !is_author && !is_co_author {
        bail!(
            "{} is neither author nor co-author of {}/{}#{}.",
            viewer.login,
            pr_ref.owner,
            pr_ref.repo,
            pr_ref.number
        );
    }

    let files = fetch_files(&pr_ref)?;
    let body = build_markdown(&pr_ref, &pr, &repo, &files, is_co_author);

    let filename = match override_filename {
        Some(name) => name.to_string(),
        None => {
            let slug = slugify(&format!("{}-{}", pr_ref.repo, pr.title));
            format!("{}-{slug}.md", date_iso(&pr))
        }
    };
    let filepath = contrib_dir().join(&filename);

    if filepath.exists() && !force {
        bail!("File already exists: {filename} (use --force to overwrite)");
    }

    fs::write(&filepath, body)?;
    Ok(filename)
}

fn extract_pr_url(md_path: &Path) -> Result<Option<String>> {
    let body = fs::read_to_string(md_path)?;
    let mut in_frontmatter = false;
    for line in body.lines() {
        if line.trim() == "---" {
            if !in_frontmatter {
                in_frontmatter = true;
                continue;
            } else {
                break;
            }
        }
        if in_frontmatter {
            if let Some(rest) = line.trim().strip_prefix("pr_url:") {
                return Ok(Some(
                    rest.trim().trim_matches('"').trim_matches('\'').to_string(),
                ));
            }
        }
    }
    Ok(None)
}

fn rebuild_all() -> Result<()> {
    let dir = contrib_dir();
    let excluded = ["CLAUDE.md", "PRBLACKLIST.md"];
    let mut ok = 0;
    let mut failed = 0;

    let mut entries: Vec<_> = fs::read_dir(&dir)?.collect::<Result<_, _>>()?;
    entries.sort_by_key(|e| e.file_name());

    for entry in entries {
        let path = entry.path();
        let name = path.file_name().and_then(|s| s.to_str()).unwrap_or("");
        if !name.ends_with(".md") || excluded.contains(&name) {
            continue;
        }

        match extract_pr_url(&path)? {
            Some(url) => {
                print!("→ {name} ... ");
                match hydrate(&url, true, Some(name)) {
                    Ok(_) => {
                        println!("ok");
                        ok += 1;
                    }
                    Err(e) => {
                        println!("FAILED");
                        eprintln!("  {e:#}");
                        failed += 1;
                    }
                }
            }
            None => eprintln!("⚠ {name}: no pr_url in frontmatter, skipped"),
        }
    }

    println!("\n✓ Rebuilt {ok} files ({failed} failed)");
    if failed > 0 {
        std::process::exit(1);
    }
    Ok(())
}

fn run() -> Result<()> {
    let args: Vec<String> = env::args().skip(1).collect();
    if args.is_empty() {
        bail!("Usage:\n  add-pr <pr-url> [--force]\n  add-pr --rebuild-all");
    }
    if args[0] == "--rebuild-all" {
        return rebuild_all();
    }
    let force = args.iter().any(|a| a == "--force");
    let filename = hydrate(&args[0], force, None)?;
    println!("✓ Wrote {filename}");
    Ok(())
}

fn main() {
    if let Err(e) = run() {
        eprintln!("✗ {e:#}");
        std::process::exit(1);
    }
}
