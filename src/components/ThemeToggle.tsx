import { Moon, Sun } from 'lucide-react';
import { useRef } from 'react';
import { useTheme } from '../lib/theme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const btn = useRef<HTMLButtonElement>(null);
  const isDark = theme === 'terminal-dark';

  const onClick = () => {
    toggle();
    const el = btn.current;
    if (!el) return;
    el.classList.remove('theme-pulse');
    void el.offsetWidth;
    el.classList.add('theme-pulse');
  };

  return (
    <button
      ref={btn}
      onClick={onClick}
      className="btn btn-sm btn-ghost btn-circle"
      aria-label="Toggle theme"
      title={`Switch to ${isDark ? 'light' : 'dark'}`}
    >
      <span className="grid place-items-center transition-transform duration-300" style={{ transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)' }}>
        {isDark ? <Moon size={16} /> : <Sun size={16} />}
      </span>
    </button>
  );
}
