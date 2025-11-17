import { type ReactNode } from 'react';
import Layout from './Layout';

type LayoutContainerProps = {
  children: ReactNode;
};

const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return (
    <Layout>
      <div>{children}</div>
    </Layout>
  );
};

export default LayoutContainer;
