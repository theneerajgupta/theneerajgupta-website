// app/about/page.tsx
import LayoutContainer from '@/components/layout/LayoutContainer';

export default function AboutPage() {
  return (
    <LayoutContainer>
      <div
        className='w-64 h-64 rounded-xl flex items-center justify-center text-xl font-semibold'
        style={{ backgroundColor: '#16a34a' }}
      >
        About Page
      </div>
    </LayoutContainer>
  );
}
