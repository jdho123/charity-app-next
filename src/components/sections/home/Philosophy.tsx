import Image from 'next/image';
import PhilosophyHeader from './philosophy/PhilosophyHeader';
import OurMission from './philosophy/OurMission';

export default function Philosophy() {
  return (
    <section className="overflow-hidden pb-8 px-4 sm:px-6 md:px-8 lg:pl-16 bg-white">
      <div className="flex gap-5 flex-col lg:flex-row">
        <article className="w-full lg:w-[45%]">
          <div className="grow mt-10 sm:mt-16 md:mt-24 text-black">
            <PhilosophyHeader />
            <div className="mt-6 md:mt-9 w-full overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl">
              <Image
                src="/images/nightGroupPhilosophy.jpeg"
                alt="Philosophy illustration"
                width={600}
                height={518}
                className="object-cover w-full rounded-xl sm:rounded-2xl md:rounded-3xl"
              />
            </div>
          </div>
        </article>

        <article className="w-full lg:w-[55%] lg:ml-5 mt-8 lg:mt-0">
          <OurMission />
        </article>
      </div>
    </section>
  );
}