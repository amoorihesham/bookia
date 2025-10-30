import { useEffect, useState } from 'react';

export const useIsDarkTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const c = new AbortController();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener(
      'change',
      (e) => {
        setIsDarkMode(e.matches);
      },
      { signal: c.signal }
    );

    return () => c.abort();
  }, []);

  return isDarkMode;
};
