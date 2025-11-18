/**
 * This run on the server side,
 * so we will try to do as much static UI definition on this side
 * anything that requires that client side feature requirements
 * we will let that thing to be handled by Layout
 */

import { type ReactNode } from 'react';
import Layout from './Layout';

import { MonoFont } from '@/styles/font';

type LayoutContainerProps = {
  children: ReactNode;
};

const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return (
    <Layout>
      <div className={`${MonoFont.className}`}>{children}</div>
    </Layout>
  );
};

export default LayoutContainer;
