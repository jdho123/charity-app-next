import Image from 'next/image';

interface OurPhilosophyProps {
  className?: string;
}

export default function OurPhilosophy({ className = '' }: OurPhilosophyProps) {
  return (
    <section className={`relative w-full min-h-[100vh] ${className}`} id="our-philosophy">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ourPhilo.jpeg"
          alt="Our Philosophy background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Title */}
        <h2 className="text-7xl font-gloria text-white text-center mb-16">Our Philosophy</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* For the Pupils */}
          <div className="flex flex-col items-center">
            <div className="inline-block relative mb-8">
              <h3 className="text-4xl font-gloria text-white py-2 px-8">
                For the Pupils
              </h3>
              <div className="absolute -inset-2 border-2 border-white rounded-full"></div>
            </div>

            <div className="bg-white rounded-3xl p-10 w-full h-full">
              <ul className="space-y-10">
                <li className="flex items-start">
                  <Image 
                    src="/images/starBlue.png" 
                    alt="Blue star" 
                    width={48} 
                    height={48} 
                    className="mt-1 mr-5 flex-shrink-0" 
                  />
                  <p className="text-xl font-verdana">
                    We shed light on the other side of the world
                  </p>
                </li>
                <li className="flex items-start">
                  <Image 
                    src="/images/starBlue.png" 
                    alt="Blue star" 
                    width={48} 
                    height={48} 
                    className="mt-1 mr-5 flex-shrink-0" 
                  />
                  <p className="text-xl font-verdana">
                    We highlight that there are people in entirely different societies who care
                  </p>
                </li>
                <li className="flex items-start">
                  <Image 
                    src="/images/starBlue.png" 
                    alt="Blue star" 
                    width={48} 
                    height={48} 
                    className="mt-1 mr-5 flex-shrink-0" 
                  />
                  <p className="text-xl font-verdana">
                    We provide opportunities to explore talents and passions using more advanced resources
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* For the Teachers */}
          <div className="flex flex-col items-center">
            <div className="inline-block relative mb-8">
              <h3 className="text-4xl font-gloria text-white py-2 px-8">
                For the Teachers
              </h3>
              <div className="absolute -inset-2 border-2 border-white rounded-full"></div>
            </div>

            <div className="bg-white rounded-3xl p-10 w-full h-full">
              <ul className="space-y-10">
                <li className="flex items-start">
                  <Image 
                    src="/images/yellowStar.png" 
                    alt="Yellow star" 
                    width={48} 
                    height={48} 
                    className="mt-1 mr-5 flex-shrink-0" 
                  />
                  <p className="text-xl font-verdana">
                    We shed light on the fact that giving allows us to gain so much more — the emotions received are beyond words
                  </p>
                </li>
                <li className="flex items-start">
                  <Image 
                    src="/images/yellowStar.png" 
                    alt="Yellow star" 
                    width={48} 
                    height={48} 
                    className="mt-1 mr-5 flex-shrink-0" 
                  />
                  <p className="text-xl font-verdana">
                    We offer valuable experience to those who are up-and-coming
                  </p>
                </li>
                <li className="flex items-start">
                  <Image 
                    src="/images/yellowStar.png" 
                    alt="Yellow star" 
                    width={48} 
                    height={48} 
                    className="mt-1 mr-5 flex-shrink-0" 
                  />
                  <p className="text-xl font-verdana">
                    We create opportunities for teachers to enjoy their craft even more by having a potentially greater impact
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}