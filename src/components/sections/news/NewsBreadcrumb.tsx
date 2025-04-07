import Link from 'next/link';
import GloriaTitle from '@/components/shared/GloriaTitle';

interface NewsBreadcrumbProps {
  title: string;
}

export default function NewsBreadcrumb({ title }: NewsBreadcrumbProps) {
  return (
    <div className="flex items-center space-x-2 font-gloria mb-2">
      <Link href="/newsletter" className="hover:opacity-80">
        <GloriaTitle as="span" size="xl" color="black">
          Our News
        </GloriaTitle>
      </Link>
      <span className="text-xl">→</span>
      <GloriaTitle as="span" size="xl" color="black" className="truncate max-w-md">
        {title}
      </GloriaTitle>
    </div>
  );
}
