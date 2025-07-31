import BorderedText from '@/components/shared/BorderedText';
import Image from 'next/image';

export default function PhilosophyHeader() {
  return (
    <div className="flex flex-col px-10 w-full max-md:px-5 max-md:max-w-full">
      <h1 className="self-start ml-5 text-6xl font-gloria text-[#000] max-md:ml-2.5 max-md:text-4xl">
        Our Philosophy
      </h1>
      <BorderedText className="flex flex-wrap gap-4 mt-2.5 text-2xl font-urbanist">
        For pupils, we offer a chance of an enriched education which opens the door for and shines a
        light on future opportunities. For teachers, we highlight that by giving, we gain so much
        more. <strong>Together, we foster growth, impact, and lasting change. </strong>
      </BorderedText>
      {/* <div className="self-end mt-8 mr-32 max-md:mr-2.5">
          <Image 
            src="/images/yellowStar.png" 
            alt="Decorative element" 
            width={40} 
            height={50} 
            className="object-contain"
          />
        </div> */}
    </div>
  );
}
