import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { musics } from '../lib/music';
import { MusicThumb } from '../components/MusicThumb';

export default function Music() {
  const [q, setQ] = useState('');
  const [tag, setTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    musics.forEach((m) => m.tags?.forEach((t) => s.add(t)));
    return [...s].sort();
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return musics.filter((m) => {
      if (tag && !m.tags?.includes(tag)) return false;
      if (!needle) return true;
      return (
        m.title.toLowerCase().includes(needle) ||
        m.description?.toLowerCase().includes(needle) ||
        m.artist?.toLowerCase().includes(needle) ||
        m.anime?.toLowerCase().includes(needle) ||
        m.content.toLowerCase().includes(needle)
      );
    });
  }, [q, tag]);

  return (
    <div className="space-y-6">
      <div>
        <div className="hud-label mb-2">§ archive · /music</div>
        <h1 className="display-serif">
          <span className="glitch" data-text="Frequencies">Frequencies</span>
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <label className="input input-bordered flex items-center gap-2 flex-1 bg-base-200/50">
          <Search size={14} className="opacity-50" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="grep ~/music/*.md"
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

      <ul className="divide-y divide-base-300 border border-base-300 overflow-hidden bg-base-200/20">
        {filtered.length === 0 && (
          <li className="px-4 py-8 text-sm text-base-content/50 text-center">no tracks matched</li>
        )}
        {filtered.map((m) => (
          <li key={m.slug}>
            <Link to={`/music/${m.slug}`} className="flex gap-4 px-4 py-4 hover:bg-base-200 transition">
              <div className="shrink-0 w-16 h-16 bg-base-300/50 border border-base-300 overflow-hidden">
                <MusicThumb music={m} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-xs text-base-content/50 font-mono">{m.date}</span>
                  <h2 className="font-medium">{m.title}</h2>
                </div>
                {(m.artist || m.anime || m.year) && (
                  <p className="text-sm text-base-content/60 mt-0.5">
                    {[m.artist, m.anime, m.year && `(${m.year})`].filter(Boolean).join(' · ')}
                  </p>
                )}
                {m.description && <p className="text-sm text-base-content/60 mt-1">{m.description}</p>}
                {m.tags && (
                  <div className="flex gap-1.5 mt-2">
                    {m.tags.map((t) => (
                      <span key={t} className="text-[10px] text-secondary">#{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
