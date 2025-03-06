import type { Metadata } from 'next';
import GuestLayout from '@/components/layout/GuestLayout';
import ScrollToTop from '@/components/shared/ScrollToTop';
import Newsletter from '@/components/sections/home/NewsletterR';

export const metadata: Metadata = {
  title: 'Newsletter - LEDU',
};

export default function NewsletterPage() {
  return (
    <GuestLayout>
      <div className="bg-[#4B7277] min-h-screen">
        <Newsletter />
      </div>

      <ScrollToTop />
    </GuestLayout>
  );
}
