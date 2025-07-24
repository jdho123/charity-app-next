'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useClientOnly from '@/hooks/useClientOnly';
import FullHeightLayout from '@/components/layout/FullHeightLayout';
import DiaryClosed from '@/components/sections/diary/diaryClosed';

export default function DiaryPage() {
  const router = useRouter();
  // Use our custom hook with a custom breakpoint of 1000px
  const { isMobile } = useClientOnly(1000);

  const handleDiaryClick = () => {
    // Navigate to first diary page
    router.push('/diary/sister_love');
  };

  return (
    <FullHeightLayout>
      <div className="flex flex-col items-center justify-center h-screen w-full bg-[#D8B29A] relative overflow-hidden">
        <div className="w-full h-screen relative cursor-pointer" onClick={handleDiaryClick}>
          <div className="relative w-full h-full">
            <DiaryClosed className="w-full h-full" />
          </div>
          <div className="absolute bottom-4 w-full text-center">
            <p className="text-white text-lg bg-black/50 px-4 py-1 inline-block">Click to open</p>
          </div>
        </div>
      </div>
    </FullHeightLayout>
  );
}
