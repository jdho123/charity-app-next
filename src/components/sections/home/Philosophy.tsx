import Image from 'next/image';
import PhilosophyHeader from './philosophy/PhilosophyHeader';
import OurMission from './philosophy/OurMission';

export default function Philosophy() {
  return (
        <section className="overflow-hidden pb-8 pl-16 bg-white max-md:pl-5">
          <div className="flex gap-5 max-md:flex-col">
            <article className="w-[45%] max-md:ml-0 max-md:w-full">
              <div className="grow mt-24 text-black max-md:mt-10 max-md:max-w-full">
                <PhilosophyHeader />
                <div className="mt-9 w-full overflow-hidden rounded-3xl max-md:max-w-full">
                  <Image
                    src="/images/nightGroupPhilosophy.jpeg"
                    alt="Philosophy illustration"
                    width={600}
                    height={518}
                    className="object-cover w-full rounded-3xl"
                  />
                </div>
              </div>
            </article>
    
            <article className="ml-5 w-[55%] max-md:ml-0 max-md:w-full">
              <OurMission />
            </article>
          </div>
        </section>
    );
}