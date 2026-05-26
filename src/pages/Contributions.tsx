import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, GitMerge, GitPullRequest, Circle } from 'lucide-react';
import { contributions, type Contribution } from '../lib/contributions';

function StatusBadge({ status }: { status: Contribution['status'] }) {
  if (status === 'merged')
    return (
      <span className="inline-flex items-center gap-1 text-[10px] text-secondary font-mono">
        <GitMerge size={10} />merged
      </span>
    );
  if (status === 'open')
    return (
      <span className="inline-flex items-center gap-1 text-[10px] text-success font-mono">
        <Circle size={10} className="fill-current" />open
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-base-content/40 font-mono">
      <GitPullRequest size={10} />closed
    </span>
  );
}

export default function Contributions() {
  const [q, setQ] = useState('');
  const [tag, setTag] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<Contribution['status'] | null>(null);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    contributions.forEach((c) => c.tags?.forEach((t) => s.add(t)));
    return [...s].sort();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return contributions.filter((c) => {
      if (tag && !c.tags?.includes(tag)) return false;
      if (statusFilter && c.status !== statusFilter) return false;
      if (!needle) return true;
      return (
        c.title.toLowerCase().includes(needle) ||
        c.description?.toLowerCase().includes(needle) ||
        c.repo.toLowerCase().includes(needle) ||
        c.content.toLowerCase().includes(needle)
      );
    });
  }, [q, tag, statusFilter]);

  const counts = useMemo(() => ({
    merged: contributions.filter((c) => c.status === 'merged').length,
    open: contributions.filter((c) => c.status === 'open').length,
    closed: contributions.filter((c) => c.status === 'closed').length,
  }), []);

  return (
    <div className="space-y-6">
      <div>
        <div className="hud-label mb-2">§ open-source · /contributions</div>
        <h1 className="display-serif">
          <span className="glitch" data-text="Contributions">Contributions</span>
        </h1>
        <p className="text-sm text-base-content/60 mt-2">
          Pull requests sent to open-source projects I care about.
        </p>
      </div>

      {/* Stats row */}
      <div className="flex gap-4 text-xs font-mono border border-base-300 bg-base-200/20 px-4 py-3">
        <button
          onClick={() => setStatusFilter(null)}
          className={`flex items-center gap-1.5 transition ${!statusFilter ? 'text-primary' : 'text-base-content/50 hover:text-base-content'}`}
        >
          <GitPullRequest size={12} />
          <span>{contributions.length} total</span>
        </button>
        <span className="text-base-content/20">·</span>
        <button
          onClick={() => setStatusFilter(statusFilter === 'merged' ? null : 'merged')}
          className={`flex items-center gap-1.5 transition ${statusFilter === 'merged' ? 'text-secondary' : 'text-base-content/50 hover:text-base-content'}`}
        >
          <GitMerge size={12} />
          <span>{counts.merged} merged</span>
        </button>
        <span className="text-base-content/20">·</span>
        <button
          onClick={() => setStatusFilter(statusFilter === 'open' ? null : 'open')}
          className={`flex items-center gap-1.5 transition ${statusFilter === 'open' ? 'text-success' : 'text-base-content/50 hover:text-base-content'}`}
        >
          <Circle size={12} />
          <span>{counts.open} open</span>
        </button>
        <span className="text-base-content/20">·</span>
        <button
          onClick={() => setStatusFilter(statusFilter === 'closed' ? null : 'closed')}
          className={`flex items-center gap-1.5 transition ${statusFilter === 'closed' ? 'text-base-content' : 'text-base-content/50 hover:text-base-content'}`}
        >
          <span>{counts.closed} closed</span>
        </button>
      </div>

      {/* Search + tags */}
      <div className="flex flex-col sm:flex-row gap-3">
        <label className="input input-bordered flex items-center gap-2 flex-1 bg-base-200/50">
          <Search size={14} className="opacity-50" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="grep ~/contributions/*.md"
            className="grow bg-transparent outline-none text-sm"
          />
          <kbd className="kbd kbd-xs">/</kbd>
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setTag(null)}
            className={`badge badge-sm ${!tag ? 'badge-primary' : 'badge-ghost'}`}
          >
            all
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t === tag ? null : t)}
              className={`badge badge-sm ${tag === t ? 'badge-primary' : 'badge-ghost'}`}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <ul className="divide-y divide-base-300 border border-base-300 overflow-hidden bg-base-200/20">
        {filtered.length === 0 && (
          <li className="px-4 py-8 text-sm text-base-content/50 text-center">no contributions matched</li>
        )}
        {filtered.map((c) => (
          <li key={c.slug}>
            <Link to={`/contributions/${c.slug}`} className="block px-4 py-4 hover:bg-base-200 transition">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-xs text-base-content/50 font-mono">{c.date}</span>
                <StatusBadge status={c.status} />
                <h2 className="font-medium">{c.title}</h2>
              </div>
              <div className="text-xs text-accent font-mono mt-1 opacity-70">{c.repo}#{c.pr_number}</div>
              {c.description && (
                <p className="text-sm text-base-content/60 mt-1">{c.description}</p>
              )}
              {c.tags && (
                <div className="flex gap-1.5 mt-2">
                  {c.tags.map((t) => (
                    <span key={t} className="text-[10px] text-secondary">#{t}</span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
