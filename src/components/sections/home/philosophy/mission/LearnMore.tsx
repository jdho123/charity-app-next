import Image from "next/image";
import Link from "next/link";

export default function LearnMoreCard() {
    return (
      <article className="relative flex flex-col justify-center items-end px-20 py-16 mt-3.5 w-full min-h-[430px] rounded-[40px] max-md:px-5 max-md:max-w-full">
        <div className="absolute inset-0 rounded-[40px] overflow-hidden">
          <Image
            src="/images/learnMoreCompound.webp"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex relative flex-col max-w-full w-[423px] z-10">
        
          <Link href="/learn-more">
            <div className="mt-24 max-md:mt-10 max-md:max-w-full">
              <div className="mt-auto">
                <div className="flex gap-2 items-center max-md:pt-16">
                  <div className="w-[66%]">
                    <h2 className="self-stretch my-auto text-5xl font-gloria text-white max-md:text-4xl underline border-white">
                      Learn More
                    </h2>
                  </div>
                  <div className="w-[34%]">
                    <div className="rounded-full p-1 w-[108px] h-[80px] flex items-center justify-center">
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