import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuestLayout from '@/components/layout/GuestLayout';
import ScrollToTop from '@/components/shared/ScrollToTop';
import NewsDetailPage from '@/components/sections/news/NewsDetailPage';

interface NewsPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
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

export default function NewsPage({ params }: NewsPageProps) {
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
