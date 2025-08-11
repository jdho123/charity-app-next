import Image from 'next/image';

export default function Prakash() {
  return (
    <section className="bg-white pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl font-gloria text-[#0E26A5] leading-[50px]">
            The Visionary
            <br />
            Who Returned Home
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16">
          {/* Left Column */}
          <div className="space-y-12">
            <p className="text-lg font-urbanist">
              Prakash Bista was born in Kalikot, a remote rural village where residents didn't even
              have access to a hospital. His parents, after a three-day walk to the nearest town,
              saw children in school uniforms and decided to send Prakash to a boarding school. He
              faced several hurdles throughout his educational journey, with both his parents
              unfortunately passing away as he was preparing for his final school exams.
            </p>

            <p className="text-lg font-urbanist">
              Despite these immense challenges, Prakash founded Impact Schools, convincing
              neighbours to trust him with building the first school in his village. With
              scholarships, he studied in the USA and at the London School of Economics, but chose
              to return and to give back to his community; establishing and expanding Impact
              Schools. Today, these schools educate over 300 children and provide essential
              accommodation for more than 30 orphans.
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="relative rounded-[50px] w-full h-[316px]">
              <Image
                src="/images/prakash.png"
                alt="Prakash Bista"
                className="object-contain"
                fill
              />
            </div>

            {/* Quote Box */}
            <div className="bg-[#E7F8FF] rounded-[50px] p-8 relative">
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

              <p className="text-3xl font-urbanist text-center">
                Prakash's story reminds us that one individual's determination can ignite change for
                entire communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
