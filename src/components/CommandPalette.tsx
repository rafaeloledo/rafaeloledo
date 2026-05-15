import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Home, User, /* Mail, */ Wrench, FolderGit2, ExternalLink } from 'lucide-react';
import { posts } from '../lib/posts';

type Item = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  action: () => void;
  group: string;
};

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(() => {
    const go = (to: string) => () => {
      navigate(to);
      onClose();
    };
    const ext = (url: string) => () => {
      window.open(url, '_blank');
      onClose();
    };
    return [
      { id: 'home', label: 'Home', icon: <Home size={14} />, action: go('/'), group: 'Navigate' },
      { id: 'blog', label: 'Blog', icon: <FileText size={14} />, action: go('/blog'), group: 'Navigate' },
      { id: 'projects', label: 'Projects', icon: <FolderGit2 size={14} />, action: go('/projects'), group: 'Navigate' },
      { id: 'uses', label: 'Uses / Stack', icon: <Wrench size={14} />, action: go('/uses'), group: 'Navigate' },
      { id: 'about', label: 'About', icon: <User size={14} />, action: go('/about'), group: 'Navigate' },
      // { id: 'contact', label: 'Contact', icon: <Mail size={14} />, action: go('/contact'), group: 'Navigate' },
      ...posts.map((p) => ({
        id: `post:${p.slug}`,
        label: p.title,
        hint: p.date,
        icon: <FileText size={14} />,
        action: go(`/blog/${p.slug}`),
        group: 'Posts',
      })),
      {
        id: 'gh',
        label: 'GitHub: @rafaeloledo',
        icon: <ExternalLink size={14} />,
        action: ext('https://github.com/rafaeloledo'),
        group: 'Links',
      },
      {
        id: 'li',
        label: 'LinkedIn',
        icon: <ExternalLink size={14} />,
        action: ext('https://www.linkedin.com/in/rafaeloledo'),
        group: 'Links',
      },
    ];
  }, [navigate, onClose]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((i) => i.label.toLowerCase().includes(needle) || i.group.toLowerCase().includes(needle));
  }, [q, items]);

  useEffect(() => {
    if (open) {
      setQ('');
      setIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setIdx(0), [q]);

  if (!open) return null;

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[idx]?.action();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  // group filtered
  const groups = filtered.reduce<Record<string, Item[]>>((acc, it) => {
    (acc[it.group] ||= []).push(it);
    return acc;
  }, {});

  let flatIndex = -1;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-start pt-[12vh] px-4" onClick={onClose}>
      <div
        className="w-full max-w-xl bg-base-100 border border-base-300 rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-base-300">
          <Search size={14} className="text-base-content/50" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search posts, pages, links…"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-base-content/40"
          />
          <kbd className="kbd kbd-xs">esc</kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto py-1">
          {filtered.length === 0 && (
            <div className="px-3 py-6 text-sm text-base-content/50 text-center">no matches</div>
          )}
          {Object.entries(groups).map(([group, list]) => (
            <div key={group}>
              <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-wider text-base-content/40">{group}</div>
              {list.map((it) => {
                flatIndex++;
                const active = flatIndex === idx;
                return (
                  <button
                    key={it.id}
                    onClick={it.action}
                    onMouseEnter={() => setIdx(filtered.indexOf(it))}
                    className={`w-full text-left px-3 py-2 flex items-center gap-3 text-sm ${
                      active ? 'bg-base-200 text-primary' : 'hover:bg-base-200/60'
                    }`}
                  >
                    <span className="opacity-70">{it.icon}</span>
                    <span className="flex-1 truncate">{it.label}</span>
                    {it.hint && <span className="text-xs text-base-content/40">{it.hint}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="px-3 py-2 border-t border-base-300 flex items-center gap-3 text-[10px] text-base-content/50">
          <span><kbd className="kbd kbd-xs">↑</kbd> <kbd className="kbd kbd-xs">↓</kbd> navigate</span>
          <span><kbd className="kbd kbd-xs">↵</kbd> open</span>
        </div>
      </div>
    </div>
  );
}
