import { useEffect, useState } from 'react';

export type Theme = 'terminal-dark' | 'terminal-light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'terminal-dark';
    return (document.documentElement.getAttribute('data-theme') as Theme) || 'terminal-dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'terminal-dark' ? 'terminal-light' : 'terminal-dark'));

  return { theme, setTheme, toggle };
}
