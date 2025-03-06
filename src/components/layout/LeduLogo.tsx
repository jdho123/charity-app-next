'use client';
import Link from 'next/link';
import Image from 'next/image';
import useClientOnly from '@/hooks/useClientOnly';

interface LeduLogoProps {
  href?: string;
}

export default function LeduLogo({ href = '/' }: LeduLogoProps) {
  // Use our custom hook instead of useState + useEffect
  const { isMobile } = useClientOnly(768);

  // Responsive dimensions
  const containerClass = isMobile ? `relative w-[80px] h-[80px]` : `relative w-[120px] h-[120px]`;

  return (
    <div className={containerClass}>
      <Link href={href}>
        <div className="relative w-full h-full">
          <Image
            src="/images/leduLogo.png"
            alt="LEDU Logo"
            fill
            priority
            className="object-cover"
          />
        </div>
      </Link>
    </div>
  );
}
