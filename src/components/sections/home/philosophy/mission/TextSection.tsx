import BorderedText from "@/components/shared/BorderedText";
import Image from "next/image"

export default function MissionSection() {
    return (
      <article className="px-4 sm:px-6 md:px-0 mb-8 md:mb-0">
        <header className="flex flex-wrap gap-3 sm:gap-5 justify-between self-center mt-8 sm:mt-12 md:mt-16 max-w-full text-4xl sm:text-5xl md:text-6xl font-gloria text-[#0E26A5] w-full md:w-[545px]">
          <h2>Our Mission</h2>
          <div className="self-start w-[40px] h-[36px] sm:w-[50px] sm:h-[45px] md:w-[60px] md:h-[54px]">
            <Image
              src="/images/starBlue.png"
              alt="Mission icon"
              width={60}
              height={54}
              className="object-contain w-full h-full"
            />
          </div>
        </header>
        <BorderedText className="flex flex-wrap gap-3 sm:gap-4 self-center mt-4 max-w-full text-base sm:text-xl md:text-2xl font-verdana text-black w-full md:w-[583px]">
            Through our lessons and present deliveries we hope to empower pupils
            to be more well-rounded, educated, joyous, English speaking children
            and position them to seize any opportunity that might come up in their
            life.
        </BorderedText>
      </article>
    );
}