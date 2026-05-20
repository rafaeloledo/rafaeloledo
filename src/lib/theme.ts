import { useEffect, useState } from 'react';

export type Theme = 'yorha-dark' | 'yorha-light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'yorha-dark';
    return (document.documentElement.getAttribute('data-theme') as Theme) || 'yorha-dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'yorha-dark' ? 'yorha-light' : 'yorha-dark'));

  return { theme, setTheme, toggle };
}
