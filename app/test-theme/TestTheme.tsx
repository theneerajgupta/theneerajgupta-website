'use client';

import { useTheme } from '@/app/providers/ThemeProvider';

export function TestTheme() {
  const { theme, resolvedTheme, setTheme, mounted } = useTheme();

  if (!mounted) return null;

  return (
    <div className='p-8 bg-base-100 text-base-content min-h-screen'>
      <div className='card bg-base-200 shadow-xl p-6'>
        <h2 className='text-2xl font-bold mb-4'>Theme Test Dashboard</h2>

        <div className='space-y-2 mb-4'>
          <div>
            <strong>User-selected theme:</strong> {theme}
          </div>
          <div>
            <strong>Resolved DaisyUI theme applied:</strong> {resolvedTheme}
          </div>
          <div>
            <strong>Mounted on client:</strong> {mounted ? 'Yes' : 'No'}
          </div>
          <div>
            <strong>HTML data-theme attribute:</strong>{' '}
            {typeof document !== 'undefined'
              ? document.documentElement.getAttribute('data-theme')
              : 'N/A'}
          </div>
        </div>

        <div className='flex gap-2'>
          <button className='btn btn-primary' onClick={() => setTheme('light')}>
            Light
          </button>
          <button
            className='btn btn-secondary'
            onClick={() => setTheme('dark')}
          >
            Dark
          </button>
          <button
            className='btn btn-secondary'
            onClick={() => setTheme('system')}
          >
            System
          </button>
        </div>
      </div>
    </div>
  );
}
