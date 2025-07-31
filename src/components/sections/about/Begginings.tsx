import Image from 'next/image';

export default function Beginnings() {
  return (
    <section className="bg-white pt-20" id="beginnings">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-center relative min-h-[800px]">
          {/* Left Side Content */}
          <div className="max-w-lg">
            <h2 className="text-6xl font-gloria text-black mb-4">
              Our Journey
              <br />
              So Far
            </h2>

            <h3 className="text-4xl font-gloria text-[#DB6B24] mt-10 mb-6">The Beginning</h3>

            <p className="text-lg font-urbanist mb-4">
              Members of the Ledu team feel fortunate to enjoy freedoms that many others do not
              possess, and this sense of gratitude compels us to give back. Many members of our team
              have experienced suffering firsthand, and it is our goal to ensure children facing
              adversity have continuous access to education. Realizing that the problems in our
              regions were too vast for us to address directly, we chose to focus on vulnerable
              areas where armed conflicts have subsided but where many children continue to face the
              hardship of displacement, loss and deprivation or purely economically developing
              areas.
            </p>

            {/* Teaching Image (Polaroid-style) */}
            <div className="relative w-full bg-white p-3 shadow-md mt-4">
              <Image
                src="/images/teachingToClass.jpeg"
                alt="Teaching to a class"
                width={500}
                height={375}
                className="w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            {/* Center/Right Temple Illustration */}
            <div className="top-0 right-0 w-full lg:h-[500px] max-lg:order-2 max-lg:pt-10 overflow-visible">
              <Image
                src="/images/journeySoFar.png"
                alt="Temple illustration"
                width={700}
                height={600}
                className="object-cover object-right-top lg:scale-125"
              />
            </div>
            {/* Right Side Nepal Content (positioned below temple) */}
            <div className="lg:bottom-10 lg:right-0 lg:max-w-md mt-20 lg:mt-0 max-lg:order-1">
              <h3 className="text-4xl font-gloria text-[#3E6F1B] mb-6">Nepal</h3>
              <p className="text-lg font-urbanist">
                Inspired by stories of empowerment and awe-inspiring beauty in Nepal, we decided it
                would be the perfect place to begin our mission. It was there that we met Prakash
                Bista, a man whose story exemplifies the transformative power of education and
                community:
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
