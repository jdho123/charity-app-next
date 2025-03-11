import type { Metadata } from 'next';
import GuestLayout from '@/components/layout/GuestLayout';
import ScrollToTop from '@/components/shared/ScrollToTop';
import NewsSummaryDisplay from '@/components/sections/news/NewsSummaryDisplay';

export const metadata: Metadata = {
  title: 'News - LEDU',
  description: 'Stay updated with our latest news and stories',
};

export default function NewsIndexPage() {
  return (
    <GuestLayout>
      <div className="bg-white min-h-screen py-12">
        <NewsSummaryDisplay />
      </div>

      <ScrollToTop />
    </GuestLayout>
  );
}
