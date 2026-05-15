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
      <div className="text-xs text-base-content/50 mb-1"><span className="text-primary">$</span> cat ~/about.md</div>
      <h1 className="text-2xl font-bold mb-6">About</h1>
      <Markdown>{md.trim()}</Markdown>
    </div>
  );
}
