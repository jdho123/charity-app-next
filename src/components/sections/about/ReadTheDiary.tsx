import Link from 'next/link';
import Image from 'next/image';

interface ReadTheDiaryProps {
  className?: string;
}

export default function ReadTheDiary({ className = '' }: ReadTheDiaryProps) {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <Image
        src="/images/prakashFlowers.png"
        alt="Pretty flowers"
        width={2015}
        height={541}
        className="w-full"
      ></Image>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-3xl md:text-4xl font-gloria mb-16 leading-relaxed">
            His story is just one of many.
            <br />
            Discover how small acts of kindness
            <br />
            and dedication are transforming
            <br />
            lives around the world.
          </p>

          <Link href="/diary" className="inline-block">
            <div className="bg-[#C1221F] text-white font-gloria text-3xl px-12 py-5 rounded-full relative group transition-transform hover:scale-105">
              <span className="relative z-10 mr-12">Read the Diary</span>

              <div className="absolute right-8 top-1/2 -translate-y-1/2">
                <Image
                  src="/images/heartArrow.png"
                  alt="Heart arrow"
                  width={60}
                  height={45}
                  className="object-contain"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
