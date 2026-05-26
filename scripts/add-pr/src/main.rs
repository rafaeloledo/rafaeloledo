// Hydrate a contributions/*.md entry from a GitHub PR URL.
// Usage: add-pr <pr-url>

use anyhow::{anyhow, bail, Context, Result};
use serde::Deserialize;
use std::env;
use std::fs;
use std::path::PathBuf;
use std::process::Command;

#[derive(Deserialize)]
struct User {
    login: String,
}

#[derive(Deserialize)]
struct Pr {
    title: String,
    html_url: String,
    state: String,
    merged: bool,
    merged_at: Option<String>,
    closed_at: Option<String>,
    created_at: String,
    user: User,
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
    // Match https://github.com/{owner}/{repo}/pull/{n}
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
    // scripts/add-pr/target/... or scripts/add-pr/src/...
    // Resolve relative to CARGO_MANIFEST_DIR at compile time.
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
    let trimmed = out.trim_matches('-');
    trimmed.chars().take(60).collect::<String>().trim_end_matches('-').to_string()
}

fn detect_co_author(pr: &PrRef, viewer: &str) -> Result<bool> {
    let raw = gh(&[
        "api",
        &format!("repos/{}/{}/pulls/{}/commits", pr.owner, pr.repo, pr.number),
        "--paginate",
    ])?;
    let commits: Vec<CommitNode> = serde_json::from_str(&raw)?;
    let needle = format!("co-authored-by:");
    let viewer_lc = viewer.to_lowercase();
    Ok(commits.iter().any(|c| {
        let msg = c.commit.message.to_lowercase();
        msg.lines()
            .any(|line| line.contains(&needle) && line.contains(&viewer_lc))
    }))
}

fn run() -> Result<()> {
    let url = env::args()
        .nth(1)
        .ok_or_else(|| anyhow!("Usage: add-pr <pr-url>"))?;
    let pr = parse_pr_url(&url)?;

    if is_blacklisted(&pr)? {
        bail!(
            "{}/{}#{} is in PRBLACKLIST.md — refusing to add.",
            pr.owner,
            pr.repo,
            pr.number
        );
    }

    let viewer: User = serde_json::from_str(&gh(&["api", "user"])?)?;
    let pr_data: Pr = serde_json::from_str(&gh(&[
        "api",
        &format!("repos/{}/{}/pulls/{}", pr.owner, pr.repo, pr.number),
    ])?)?;

    let is_author = pr_data.user.login.eq_ignore_ascii_case(&viewer.login);
    let is_co_author = !is_author && detect_co_author(&pr, &viewer.login)?;

    if !is_author && !is_co_author {
        bail!(
            "{} is neither author nor co-author of {}/{}#{}.",
            viewer.login,
            pr.owner,
            pr.repo,
            pr.number
        );
    }

    let status = if pr_data.merged {
        "merged"
    } else if pr_data.state == "closed" {
        "closed"
    } else {
        "open"
    };

    let date_iso = pr_data
        .merged_at
        .as_deref()
        .or(pr_data.closed_at.as_deref())
        .unwrap_or(&pr_data.created_at)
        .get(..10)
        .ok_or_else(|| anyhow!("malformed date from GitHub"))?
        .to_string();

    let slug = slugify(&format!("{}-{}", pr.repo, pr_data.title));
    let filename = format!("{date_iso}-{slug}.md");
    let filepath = contrib_dir().join(&filename);

    if filepath.exists() {
        bail!("File already exists: {filename}");
    }

    let title_escaped = pr_data.title.replace('"', "\\\"");
    let co_author_block = if is_co_author {
        format!(
            "\n## How I'm credited\n\nCo-authored by me; the PR was opened by [{login}](https://github.com/{login}).\n",
            login = pr_data.user.login
        )
    } else {
        String::new()
    };

    let body = format!(
        "---\n\
         title: \"{title_escaped}\"\n\
         date: {date_iso}\n\
         description: TODO — one-sentence summary for the listing card.\n\
         repo: {owner}/{repo}\n\
         pr_url: {url}\n\
         pr_number: {number}\n\
         status: {status}\n\
         tags: []\n\
         ---\n\
         \n\
         ## Context\n\
         \n\
         TODO — what is this project and why does it matter?\n\
         \n\
         ## What this PR does\n\
         \n\
         TODO — describe the change.\n\
         {co_author_block}",
        owner = pr.owner,
        repo = pr.repo,
        number = pr.number,
        url = pr_data.html_url,
    );

    fs::write(&filepath, body)?;
    println!("✓ Wrote {filename}");
    println!(
        "  status: {status}{}",
        if is_co_author { " (co-author)" } else { "" }
    );
    println!("  edit:   {}", filepath.display());
    Ok(())
}

fn main() {
    if let Err(e) = run() {
        eprintln!("✗ {e:#}");
        std::process::exit(1);
    }
}
