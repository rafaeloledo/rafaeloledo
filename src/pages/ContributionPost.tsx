import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, GitMerge, GitPullRequest, Circle } from 'lucide-react';
import { getContribution, type Contribution } from '../lib/contributions';
import { Markdown } from '../components/Markdown';
import NotFound from './NotFound';

function StatusBadge({ status }: { status: Contribution['status'] }) {
  if (status === 'merged')
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-secondary/40 bg-secondary/10 text-secondary text-xs font-mono">
        <GitMerge size={12} /> merged
      </span>
    );
  if (status === 'open')
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-success/40 bg-success/10 text-success text-xs font-mono">
        <Circle size={12} className="fill-current" /> open
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-base-300 bg-base-200/50 text-base-content/50 text-xs font-mono">
      <GitPullRequest size={12} /> closed
    </span>
  );
}

export default function ContributionPost() {
  const { slug } = useParams();
  const contribution = slug ? getContribution(slug) : undefined;
  if (!contribution) return <NotFound />;

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        to="/contributions"
        className="text-xs text-base-content/60 hover:text-primary inline-flex items-center gap-1 mb-6"
      >
        <ArrowLeft size={12} /> cd ../contributions
      </Link>

      <header className="mb-8 space-y-3">
        <div className="text-xs text-base-content/50 font-mono">{contribution.date}</div>
        <h1 className="text-2xl font-bold leading-snug">{contribution.title}</h1>

        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={contribution.status} />
          <a
            href={contribution.pr_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:text-primary transition"
          >
            <span className="opacity-70">{contribution.repo}</span>
            <span className="text-base-content/40">#</span>
            <span>{contribution.pr_number}</span>
            <ExternalLink size={10} className="opacity-50" />
          </a>
        </div>

        {contribution.description && (
          <p className="text-base-content/70">{contribution.description}</p>
        )}

        {contribution.tags && (
          <div className="flex gap-1.5 pt-1">
            {contribution.tags.map((t) => (
              <span key={t} className="text-xs text-secondary">#{t}</span>
            ))}
          </div>
        )}
      </header>

      <Markdown>{contribution.content}</Markdown>

      <footer className="mt-12 pt-6 border-t border-base-300">
        <a
          href={contribution.pr_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm px-4 py-2 border border-base-300 bg-base-200/60 hover:bg-base-200 hover:border-secondary/60 text-base-content/70 transition"
        >
          <GitPullRequest size={14} />
          View PR on GitHub
          <ExternalLink size={12} className="opacity-50" />
        </a>
      </footer>
    </article>
  );
}
