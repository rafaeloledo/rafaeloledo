import { NavLink, Link } from 'react-router-dom';
import { Command, Github, Linkedin, Youtube } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { to: '/', label: 'home', code: '01' },
  { to: '/blog', label: 'blog', code: '02' },
  { to: '/music', label: 'music', code: '03' },
  { to: '/contributions', label: 'contrib', code: '04' },
  { to: '/projects', label: 'projects', code: '05' },
  { to: '/uses', label: 'uses', code: '06' },
  { to: '/about', label: 'about', code: '07' },
];

export function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-base-100/85 border-b border-base-300">
      <div className="chrome-bar" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-[3.85rem] flex items-center gap-5">
        <Link to="/" className="font-mono text-base shrink-0 group">
          <span className="text-secondary opacity-70">YoRHa//</span>
          <span className="text-primary font-bold tracking-wide group-hover:text-accent transition-colors">rafael-ledo</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-base ml-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `relative px-3.5 py-1.5 hover:text-primary transition glitch-hover ${
                  isActive
                    ? 'text-primary border border-primary/40 bg-primary/10'
                    : 'text-base-content/75 border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <span className="flex items-baseline gap-1.5">
                  <span className="text-[0.66rem] tracking-widest opacity-60">{l.code}</span>
                  <span>{l.label}</span>
                  {isActive && <span className="text-secondary text-xs">◂</span>}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex-1" />
        <span className="hidden lg:inline-flex items-center gap-1.5 text-[0.72rem] tracking-widest uppercase text-base-content/50">
          <span className="status-dot" /> online
        </span>
        <button
          onClick={onOpenPalette}
          className="hidden sm:inline-flex items-center gap-2 text-sm px-3 py-2 border border-base-300 bg-base-200/60 hover:bg-base-200 hover:border-secondary/60 text-base-content/70 transition"
          aria-label="Open command palette"
        >
          <Command size={14} />
          <span>K</span>
        </button>
        <a href="https://github.com/rafaeloledo" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle" aria-label="GitHub"><Github size={18} /></a>
        <a href="https://www.linkedin.com/in/rafaeloledo" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle hidden sm:inline-flex" aria-label="LinkedIn"><Linkedin size={18} /></a>
        <a href="https://www.youtube.com/@rafaeloledo" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle hidden sm:inline-flex" aria-label="YouTube"><Youtube size={18} /></a>
        <ThemeToggle />
      </div>
      <nav className="md:hidden flex overflow-x-auto gap-1 px-4 pb-2 text-sm">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              `px-2 py-1 shrink-0 border ${isActive ? 'text-primary border-primary/40 bg-primary/10' : 'text-base-content/70 border-transparent'}`
            }
          >
            <span className="opacity-50 mr-1">{l.code}</span>{l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
