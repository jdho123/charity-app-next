import BorderedText from "@/components/shared/BorderedText";
import Image from "next/image"

export default function MissionSection() {
    return (
      <article>
        <header className="flex flex-wrap gap-5 justify-between self-center mt-16 max-w-full text-6xl font-gloria text-[#0E26A5] w-[545px] max-md:mt-10 max-md:text-4xl">
          <h2 className="max-md:text-4xl">Our Mission</h2>
          <div className="self-start w-[60px] h-[54px]">
            <Image
              src="/images/starBlue.png"
              alt="Mission icon"
              width={60}
              height={54}
              className="object-contain"
            />
          </div>
        </header>
        <BorderedText className="flex flex-wrap gap-4 self-center mt-1.5 max-w-full text-2xl font-verdana text-black w-[583px]">
            Through our lessons and present deliveries we hope to empower pupils
            to be more well-rounded, educated, joyous, English speaking children
            and position them to seize any opportunity that might come up in their
            life.
        </BorderedText >
      </article>
    );
}