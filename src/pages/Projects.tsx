import { ExternalLink, GitPullRequest, Star } from 'lucide-react';

type Project = {
  name: string;
  description: string;
  url: string;
  tags: string[];
  icon?: 'pr' | 'star';
};

const projects: Project[] = [
  {
    name: 'rafaeloledo.com.br',
    description: 'This site. Vite + React + Tailwind v4 + DaisyUI, served as a static SPA.',
    url: 'https://github.com/rafaeloledo/rafaeloledo',
    tags: ['typescript', 'react', 'tailwind', 'vite'],
    icon: 'star',
  },
  {
    name: 'Scoop Extras — manifests',
    description: 'Ongoing manifest updates: Neovide, WezTerm, Alacritty.',
    url: 'https://github.com/ScoopInstaller/Extras/pulls?q=author%3Arafaeloledo',
    tags: ['scoop', 'open-source', 'windows'],
    icon: 'pr',
  },
];

export default function Projects() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-xs text-base-content/50 mb-1"><span className="text-primary">$</span> ls ~/projects</div>
      <h1 className="text-2xl font-bold mb-2">Projects</h1>
      <p className="text-base-content/70 mb-8">A short list of things I've built or contributed to.</p>

      <ul className="space-y-3">
        {projects.map((p) => (
          <li key={p.name}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="block border border-base-300 rounded-lg p-4 hover:border-primary/60 hover:bg-base-200/40 transition group"
            >
              <div className="flex items-center gap-2 mb-1">
                {p.icon === 'pr' ? (
                  <GitPullRequest size={14} className="text-secondary" />
                ) : (
                  <Star size={14} className="text-accent" />
                )}
                <h2 className="font-semibold group-hover:text-primary">{p.name}</h2>
                <ExternalLink size={12} className="opacity-40 ml-auto" />
              </div>
              <p className="text-sm text-base-content/70">{p.description}</p>
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="text-[10px] text-secondary">#{t}</span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
