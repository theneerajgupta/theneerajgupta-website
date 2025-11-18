'use client';

import { useEffect, type ReactNode } from 'react';
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
    <main className='min-h-screen flex flex-col flex-1 items-center justify-center'>
      {children}
    </main>
  );
}

export default Layout;
