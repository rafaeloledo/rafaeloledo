import { Markdown } from '../components/Markdown';

const md = `
I'm a software engineer based in Brazil. I work across the stack but spend
most of my heart on **developer tools, terminal workflows, and the web platform**.

## What I care about

- Small, sharp tools that respect their users' time.
- Plain text, version control, and reproducibility.
- Open source — even tiny patches add up.

## Currently

- Building things on top of TypeScript, React, and Go.
- Contributing manifests to [Scoop](https://github.com/ScoopInstaller).
- Writing in this notebook when something is worth writing down.

> If a tool can be a CLI, it probably should be.
`;

export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="hud-label mb-2">§ dossier · cat ~/about.md</div>
      <h1 className="display-serif mb-8">
        <span className="glitch" data-text="Profile">Profile</span>
      </h1>
      <Markdown>{md.trim()}</Markdown>
    </div>
  );
}
