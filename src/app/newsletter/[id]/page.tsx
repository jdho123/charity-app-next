import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuestLayout from '@/components/layout/GuestLayout';
import ScrollToTop from '@/components/shared/ScrollToTop';
import NewsDetailPage from '@/components/sections/news/NewsDetailPage';

// Avoid extending PageProps or using any custom interface
// Use the exact parameter structure Next.js expects
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const id = parseInt(params.id);

    // You might want to fetch the article title here for SEO
    // This is a placeholder
    return {
      title: `News Article - LEDU`,
    };
  } catch {
    return {
      title: 'News Article Not Found - LEDU',
    };
  }
}

// Use a simple, explicit parameter type directly in the function signature
export default function NewsPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  return (
    <GuestLayout>
      <div className="bg-white min-h-screen pt-[120px]">
        <NewsDetailPage id={id} />
      </div>

      <ScrollToTop />
    </GuestLayout>
  );
}
