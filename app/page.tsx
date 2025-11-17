import LayoutContainer from '@/components/layout/LayoutContainer';
import getBlogPost from '../lib/blog';

export default function HomePage() {
  const { data, htmlContent } = getBlogPost();

  return (
    <LayoutContainer>
      <div
        className='w-64 h-64 rounded-xl flex items-center justify-center text-xl font-semibold'
        style={{ backgroundColor: '#1d4ed8' }}
      >
        Home
      </div>

      {/* Render Markdown HTML */}
      <div
        className='markdown mt-8'
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </LayoutContainer>
  );
}
