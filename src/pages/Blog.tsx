import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { posts } from '../lib/posts';

export default function Blog() {
  const [q, setQ] = useState('');
  const [tag, setTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => s.add(t)));
    return [...s].sort();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return posts.filter((p) => {
      if (tag && !p.tags?.includes(tag)) return false;
      if (!needle) return true;
      return (
        p.title.toLowerCase().includes(needle) ||
        p.description?.toLowerCase().includes(needle) ||
        p.content.toLowerCase().includes(needle)
      );
    });
  }, [q, tag]);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs text-base-content/50 mb-1">
          <span className="text-primary">$</span> ls ~/posts
        </div>
        <h1 className="text-2xl font-bold">Blog</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <label className="input input-bordered flex items-center gap-2 flex-1 bg-base-200/50">
          <Search size={14} className="opacity-50" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="grep ~/posts/*.md"
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

      <ul className="divide-y divide-base-300 border border-base-300 rounded-lg overflow-hidden">
        {filtered.length === 0 && (
          <li className="px-4 py-8 text-sm text-base-content/50 text-center">no posts matched</li>
        )}
        {filtered.map((p) => (
          <li key={p.slug}>
            <Link to={`/blog/${p.slug}`} className="block px-4 py-4 hover:bg-base-200 transition">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-xs text-base-content/50 font-mono">{p.date}</span>
                <h2 className="font-medium">{p.title}</h2>
              </div>
              {p.description && <p className="text-sm text-base-content/60 mt-1">{p.description}</p>}
              {p.tags && (
                <div className="flex gap-1.5 mt-2">
                  {p.tags.map((t) => (
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
