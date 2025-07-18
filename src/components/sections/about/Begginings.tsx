import Image from 'next/image';

export default function Beginnings() {
  return (
    <section className="bg-white py-20" id="beginnings">
      <div className="container mx-auto px-4">
        <div className="flex justify-between relative min-h-[800px]">
          {/* Left Side Content */}
          <div className="max-w-lg">
            <h2 className="text-6xl font-gloria text-black mb-4">
              Our Journey
              <br />
              So Far
            </h2>

            <h3 className="text-4xl font-gloria text-[#DB6B24] mt-10 mb-6">The Beginning</h3>

            <p className="text-lg font-urbanist mb-8">
              Some of us on the team have experienced suffering in our own lives. We feel fortunate
              to enjoy freedoms that many others do not possess, and this sense of gratitude compels
              us to give back. Realizing that the problems in our regions were too vast for us to
              address directly, we chose to focus on areas where the core conflicts had subsided but
              where children still needed help.
            </p>

            {/* Teaching Image (Polaroid-style) */}
            <div className="relative w-[80%] bg-white p-3 shadow-md mt-8">
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
            <div className="top-0 right-0 w-full h-[500px] hidden lg:block">
              <Image
                src="/images/journeySoFar.png"
                alt="Temple illustration"
                width={700}
                height={600}
                className="object-cover object-right-top"
              />
            </div>
            {/* Right Side Nepal Content (positioned below temple) */}
            <div className="lg:bottom-10 lg:right-0 lg:max-w-md mt-20 lg:mt-0">
              <h3 className="text-4xl font-gloria text-[#3E6F1B] mb-6">Nepal</h3>
              <p className="text-lg font-urbanist">
                Inspired by stories of transformation and awe-inspiring beauty in Nepal, we decided
                it would be the perfect place to begin our mission. It was there that we met Prakash
                Bista, a man whose story exemplifies the power of education and community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
