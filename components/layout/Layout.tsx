'use client';

import { type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { TestTheme } from '../../app/test/TestTheme';

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
      <main className='flex-1 flex items-center justify-center'>
        {children}
      </main>
    </div>
  );
}

export default Layout;
