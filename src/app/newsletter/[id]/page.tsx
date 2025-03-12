import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuestLayout from '@/components/layout/GuestLayout';
import ScrollToTop from '@/components/shared/ScrollToTop';
import NewsDetailPage from '@/components/sections/news/NewsDetailPage';

// Define the page as an async server component
export default async function NewsPage() {
  const id = 1; // parseInt(params.id);

  if (isNaN(id)) {
    notFound();
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

// // Keep the metadata function separate
// export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
//   try {
//     const id = parseInt(params.id);

//     return {
//       title: `News Article - LEDU`,
//     };
//   } catch {
//     return {
//       title: 'News Article Not Found - LEDU',
//     };
//   }
// }
