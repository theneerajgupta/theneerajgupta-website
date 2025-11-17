'use client';

import { type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const goTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='flex gap-2 p-4 border-b border-neutral-700 bg-neutral-900'>
        <button
          type='button'
          onClick={() => goTo('/')}
          className={pathname === '/' ? 'underline' : ''}
        >
          Home
        </button>
        <button
          type='button'
          onClick={() => goTo('/about')}
          className={pathname === '/about' ? 'underline' : ''}
        >
          About
        </button>
        <button
          type='button'
          onClick={() => goTo('/projects')}
          className={pathname === '/projects' ? 'underline' : ''}
        >
          Project
        </button>
      </header>
      <main className='flex-1 flex items-center justify-center'>
        {children}
      </main>
    </div>
  );
}

export default Layout;
