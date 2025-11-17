import Layout from './Layout';

type LayoutContainerProps = {
  exampleText: string;
};

const LayoutContainer = ({ exampleText }: LayoutContainerProps) => {
  return (
    <Layout>
      <div>{exampleText}</div>
    </Layout>
  );
};

export default LayoutContainer;
