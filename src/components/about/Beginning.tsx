import Image from "next/image";

export default function Beginning() {
    return (
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-gloria mb-12">Our Journey So Far</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column */}
            <div className="space-y-8">
              <h3 className="text-4xl font-gloria text-[#DB6B24]">The Beginning</h3>
              
              <p className="text-xl font-inter">
                Some of us on the team have experienced suffering in our own lives. We feel 
                fortunate to enjoy freedoms that many others do not possess, and this sense 
                of gratitude compels us to give back. Realizing that the problems in our 
                regions were too vast for us to address directly, we chose to focus on areas 
                where the core conflicts had subsided but where children still needed help.
              </p>
      
              <Image 
                src="/images/beginning.png" 
                alt="Our beginning" 
                className="rounded-[50px] w-full h-[362px] object-cover"
                width={362}
                height={362}
              />
            </div>
  
            {/* Right Column */}
            <div className="relative">
              <Image 
                src="/images/journeySoFar.png" 
                alt="Nepal" 
                className="w-full h-[578px] object-cover"
                layout="responsive"
                width={578}
                height={578}
              />
              
              <div className="mt-8 space-y-6">
                <h3 className="text-4xl font-gloria text-[#3E6F1B]">Nepal</h3>
                <p className="text-xl font-verdana">
                  Inspired by stories of transformation and awe-inspiring beauty in Nepal, 
                  we decided it would be the perfect place to begin our mission. It was 
                  there that we met Prakash Bista, a man whose story exemplifies the power 
                  of education and community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  