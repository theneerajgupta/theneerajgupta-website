'use client';

import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  /** User-chosen theme: 'light' | 'dark' | 'system' */
  theme: Theme;
  /** Actual theme being applied after resolving 'system' */
  resolvedTheme: 'light' | 'dark';
  setTheme: (value: Theme) => void;
};

const STORAGE_KEY = 'theme'; // or 'site-theme', whatever you like

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyThemeClass(resolved: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  if (resolved === 'dark') {
    root.classList.add('theme-dark');
  } else {
    root.classList.remove('theme-dark');
  }
}

function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') return getSystemTheme();
  return theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Initial load: read from localStorage (if any) and resolve
  useEffect(() => {
    let initial: Theme = 'system';

    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        initial = stored;
      }
    }

    const resolved = resolveTheme(initial);
    setTheme(initial);
    setResolvedTheme(resolved);
    applyThemeClass(resolved);
  }, []);

  // When theme changes, resolve it and apply to document + persist
  useEffect(() => {
    const resolved = resolveTheme(theme);
    setResolvedTheme(resolved);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, theme);
    }

    applyThemeClass(resolved);
  }, [theme]);

  // Listen to system changes only when theme === 'system'
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setResolvedTheme((prev) => {
        if (theme !== 'system') return prev; // user chose explicit theme
        const next = media.matches ? 'dark' : 'light';
        applyThemeClass(next);
        return next;
      });
    };

    // initial sync if in system mode
    if (theme === 'system') {
      handleChange();
    }

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [theme]);

  const value: ThemeContextValue = {
    theme,
    resolvedTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export default ThemeProvider;
