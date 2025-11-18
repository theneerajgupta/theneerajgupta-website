'use client';

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';

// ----- Types -----
export type UserTheme = 'light' | 'dark';
export type DaisyUITheme = string;

type ThemeContextValue = {
  /** Chosen theme by user ('light' | 'dark' | 'system') */
  theme: UserTheme | 'system';
  /** Resolved theme applied to DaisyUI ('custom-light' or 'custom-dark', etc.) */
  resolvedTheme: DaisyUITheme;
  /** Change theme */
  setTheme: (theme: UserTheme | 'system') => void;
  /** True once the provider has mounted */
  mounted: boolean;
};

// ----- Context -----
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'theme';

// ----- Provider Props -----
type ThemeProviderProps = {
  children: ReactNode;
  lightTheme?: DaisyUITheme;
  darkTheme?: DaisyUITheme;
  defaultTheme?: UserTheme | 'system';
};

export function ThemeProvider({
  children,
  lightTheme = 'custom-light',
  darkTheme = 'custom-dark',
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<UserTheme | 'system'>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<DaisyUITheme>(
    defaultTheme === 'dark' ? darkTheme : lightTheme,
  );

  // Get system preference
  const getSystemTheme = (): UserTheme =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  // Apply theme to <html> element
  const applyTheme = (resolved: DaisyUITheme) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', resolved);
    }
  };

  // Resolve theme from user choice or system
  const resolveTheme = (themeChoice: UserTheme | 'system'): DaisyUITheme => {
    if (themeChoice === 'system') {
      return getSystemTheme() === 'dark' ? darkTheme : lightTheme;
    }
    return themeChoice === 'dark' ? darkTheme : lightTheme;
  };

  // Load stored theme on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(STORAGE_KEY) as
        | UserTheme
        | 'system'
        | null;
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setThemeState(stored);
      }
    }
    setMounted(true);
  }, []);

  // Update resolved theme whenever user theme changes
  useEffect(() => {
    const nextResolved = resolveTheme(theme);
    setResolvedTheme(nextResolved);
    applyTheme(nextResolved);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, theme);
    }
  }, [theme, lightTheme, darkTheme]);

  // Listen to system changes if in 'system' mode
  useEffect(() => {
    if (theme !== 'system') return;
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const next = media.matches ? darkTheme : lightTheme;
      setResolvedTheme(next);
      applyTheme(next);
    };

    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [theme, lightTheme, darkTheme]);

  const setTheme = (value: UserTheme | 'system') => setThemeState(value);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, mounted }}>
      {mounted ? children : null}
    </ThemeContext.Provider>
  );
}

// ----- Hook -----
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

export default ThemeProvider;
