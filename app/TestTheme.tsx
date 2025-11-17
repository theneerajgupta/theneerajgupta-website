'use client';

import { useTheme } from '@/app/providers/ThemeProvider';

export function TestTheme() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div>
      <div>Theme: {theme}</div>
      <div>Applied: {resolvedTheme}</div>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}
