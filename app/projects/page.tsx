// app/projects/page.tsx
import LayoutContainer from '@/components/layout/LayoutContainer';

export default function ProjectsPage() {
  return (
    <LayoutContainer>
      <div
        className='w-64 h-64 rounded-xl flex items-center justify-center text-xl font-semibold'
        style={{ backgroundColor: '#b91c1c' }}
      >
        Projects Page
      </div>
    </LayoutContainer>
  );
}
