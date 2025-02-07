import Image from 'next/image';

export default function WhoWeAre() {
    return (
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <h2 className="text-5xl font-gloria text-center">Who We Are</h2>
              
              <p className="text-xl font-verdana">
                We are a generation driven by the fear that we might not pass on to our children 
                the world they deserve. The biggest challenge of this century will undoubtedly 
                be climate change. While we may not yet know how to solve it, we believe education 
                can empower more people to take part in tackling humanity&apos;s greatest challenges.
              </p>
              
              <p className="text-xl font-verdana">
                By sharing the education we&apos;ve been fortunate to receive in England with those 
                who lack access, we hope to create a better shot at addressing these global problems.
              </p>
            </div>
  
              <Image 
                src="/images/flower1.png" 
                alt="Decorative flowers" 
                layout="fill"
                objectFit="cover"
                className="absolute -top-14 right-0 w-[372px] h-[418px]"
              />
              <Image 
                src="/images/flower2.png" 
                alt="Decorative flowers" 
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0 w-[206px] h-[216px]"
              />

              <Image 
                src="/images/quote-left.png" 
                alt="Quote mark" 
                layout="fill"
                objectFit="contain"
                className="absolute -top-8 -left-8 w-[175px] h-[149px] opacity-80"
              />
              <Image 
                src="/images/quote-right.png" 
                alt="Quote mark" 
                layout="fill"
                objectFit="contain"
                className="absolute -bottom-8 -right-8 w-[159px] h-[133px] opacity-80"
              />
              <Image 
                src="/images/quote-right.png" 
                alt="Quote mark" 
                layout="fill"
                objectFit="contain"
                className="absolute -bottom-8 -right-8 w-[159px] h-[133px] object-contain opacity-80"
              />
              
              <blockquote className="text-3xl font-inter text-center">
                &quot;Tough times create tough men. Tough men create easy times. 
                Easy times create weak people. Weak people create tough times.&quot;
              </blockquote>
            </div>
  
            <p className="mt-8 text-xl font-inter max-w-2xl mx-auto text-center">
              Tough times have certainly begun. But we do not yet consider ourselves strong. 
              Only by overcoming challenges together, by fighting for what the child in each 
              of us knows to be right, <strong>will we become truly resilient.</strong>
            </p>
          </div>
      </section>
    );
  }