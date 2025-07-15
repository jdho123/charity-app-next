import Image from 'next/image';

export default function Prakash() {
    return (
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Title Section */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-gloria text-[#0E26A5] leading-[50px]">
              The Visionary
              <br />
              Who Returned Home
            </h2>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column */}
            <div className="space-y-12">
              <p className="text-xl font-urbanist">
                Prakash Bista was born in Kalikot, a remote village where residents didn't 
                even have access to a hospital. His parents, after a three-day walk to the 
                nearest town, saw children in school uniforms and decided to send Prakash to a 
                boarding school. He faced several hurdles throughout his education journey,
                with both his parents passing away just as he was preparing for his final
                end-of-school exams.
              </p>
  
              <p className="text-xl font-urbanist">
                Despite these immense challenges, Prakash founded Impact Schools, convincing 
                neighbours to trust him with building the first school in his village. With 
                scholarships, he studied in the US and at LSE, but choosing not to stay abroad
                but to come back and give back to his community, Prakash returned home to expand 
                Impact Schools. Today, these schools educate over 300 children and provide 
                accommodations for more than 30 orphans.
              </p>
            </div>
  
            {/* Right Column */}
            <div className="space-y-8">
              <Image 
                src="/images/prakash.png" 
                alt="Prakash Bista" 
                className="rounded-[50px] w-full h-[316px] object-cover"
                width={500}
                height={316}
              />
  
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
                  Prakash&apos;s story reminds us that one individual&apos;s determination can ignite 
                  change for entire communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }