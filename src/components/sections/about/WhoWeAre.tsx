import Image from 'next/image';

export default function WhoWeAre() {
  return (
    <section className="bg-white max-lg:mt-10" id="who-we-are">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - with added top padding */}
          <div className="space-y-6 pt-16">
            <h2 className="text-5xl text-[#DB6B24] font-bold font-gloria">Who We Are</h2>

            <p className="text-lg font-urbanist">
              We are a generation driven by the fear that we might not pass on to our children the
              world they deserve. The biggest challenge of this century will undoubtedly be climate
              change. While we may not yet know how to solve it, we believe education can empower
              more people to take part in tackling humanity&apos;s greatest challenges.
            </p>

            <p className="text-lg font-urbanist">
              By sharing the education we&apos;ve been fortunate to receive in England with those
              who lack access, we hope to create a better shot at addressing these global problems.
            </p>

            {/* Image of people with flower necklaces in polaroid-like frame */}
            <div className="mt-8">
              <div className="w-full relative">
                <Image
                  src="/images/whoWeAreWearingFlowerNecklaces.jpeg"
                  alt="Our team wearing flower necklaces"
                  width={500}
                  height={333}
                  className="object-cover w-full h-auto"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>

          {/* Right Column - with reduced top padding */}
          <div className="flex flex-col space-y-6 lg:pt-32">
            {/* Additional text */}
            <div className="space-y-4">
              <p className="text-lg font-urbanist">
                Our work focuses on educating those who have done nothing wrong but have found
                themselves in unimaginably difficult conditions simply due to the &quot;birth
                roulette&quot;.
              </p>
              <p className="font-bold text-lg">As one of our guiding quotes states:</p>
            </div>

            {/* Quote box */}
            <div className="relative bg-[#E7F8FF] rounded-3xl p-8 mt-4">
              <Image
                src="/images/quote-left.png"
                alt="Quote mark"
                className="absolute -top-16 -left-16 w-[175px] h-[149px] object-contain opacity-50"
                width={175}
                height={149}
              />
              <Image
                src="/images/quote-right.png"
                alt="Quote mark"
                className="absolute -bottom-16 -right-16 w-[159px] h-[133px] object-contain opacity-50"
                width={159}
                height={133}
              />
              <blockquote className="text-2xl text-center px-6 py-4 font-urbanist">
                Tough times create tough men. Tough men create easy times. Easy times create weak
                people. Weak people create tough times.
              </blockquote>
            </div>

            {/* Final paragraph */}
            <p className="text-lg mt-4 font-urbanist">
              Tough times have certainly begun. But we do not yet consider ourselves strong. Only by
              overcoming challenges together, by fighting for what the child in each of us knows to
              be right,
              <strong> will we become truly resilient.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
