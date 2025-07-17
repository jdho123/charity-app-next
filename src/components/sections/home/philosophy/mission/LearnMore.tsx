import Image from 'next/image';
import Link from 'next/link';

export default function LearnMoreCard() {
  return (
    <article className="relative flex flex-col justify-center items-end px-8 sm:px-12 md:px-20 py-12 md:py-16 mt-3.5 w-full min-h-[300px] md:min-h-[430px] rounded-[20px] md:rounded-[40px]">
      <div className="absolute inset-0 rounded-[20px] md:rounded-[40px] overflow-hidden">
        <Image
          src="/images/learnMoreCompound.webp"
          alt="Background"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex relative flex-col max-w-full w-full md:w-[423px] z-10 mx-auto">
        <Link href="/about#our-philosophy" className="inline-block">
          <div className="mt-12 md:mt-24">
            <div className="mt-auto">
              <div className="flex gap-2 items-center">
                <div className="w-[66%]">
                  <h2 className="self-stretch my-auto text-3xl sm:text-4xl md:text-5xl font-gloria underline decoration-2 underline-offset-8 text-right text-white">
                    Learn More
                  </h2>
                </div>
                <div className="w-[34%]">
                  <div className="rounded-full p-1 w-[80px] sm:w-[90px] md:w-[108px] h-[60px] sm:h-[70px] md:h-[80px] flex items-center justify-center">
                    <Image
                      src="/images/learnMoreSquiggleLine.png"
                      alt="Learn more icon"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
}
