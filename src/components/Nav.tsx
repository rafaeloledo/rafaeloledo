import { NavLink, Link } from 'react-router-dom';
import { Command, Github, Linkedin, Youtube } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { to: '/', label: 'home' },
  { to: '/blog', label: 'blog' },
  { to: '/projects', label: 'projects' },
  { to: '/uses', label: 'uses' },
  { to: '/about', label: 'about' },
  // { to: '/contact', label: 'contact' },
];

export function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-base-100/80 border-b border-base-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
        <Link to="/" className="font-bold text-primary shrink-0">
          <span className="opacity-60">$</span> rafael-ledo
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-3 py-1 rounded hover:bg-base-200 transition ${
                  isActive ? 'text-primary bg-base-200' : 'text-base-content/80'
                }`
              }
            >
              ./{l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex-1" />
        <button
          onClick={onOpenPalette}
          className="hidden sm:inline-flex items-center gap-2 text-xs px-2.5 py-1.5 rounded border border-base-300 bg-base-200/60 hover:bg-base-200 text-base-content/70"
          aria-label="Open command palette"
        >
          <Command size={12} />
          <span>K</span>
        </button>
        <a href="https://github.com/rafaeloledo" target="_blank" rel="noreferrer" className="btn btn-sm btn-ghost btn-circle" aria-label="GitHub"><Github size={16} /></a>
        <a href="https://www.linkedin.com/in/rafaeloledo" target="_blank" rel="noreferrer" className="btn btn-sm btn-ghost btn-circle hidden sm:inline-flex" aria-label="LinkedIn"><Linkedin size={16} /></a>
        <a href="https://www.youtube.com/@rafaeloledo" target="_blank" rel="noreferrer" className="btn btn-sm btn-ghost btn-circle hidden sm:inline-flex" aria-label="YouTube"><Youtube size={16} /></a>
        <ThemeToggle />
      </div>
      <nav className="md:hidden flex overflow-x-auto gap-1 px-4 pb-2 text-xs">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              `px-2 py-1 rounded shrink-0 ${isActive ? 'text-primary bg-base-200' : 'text-base-content/70'}`
            }
          >
            ./{l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
