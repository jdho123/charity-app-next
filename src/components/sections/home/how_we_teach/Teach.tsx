import * as React from "react";
import { RoundedImage } from "../../../shared/RoundedImage";
import BorderedText from "@/components/shared/BorderedText";

export function TeachSection() {
  return (
    <section className="self-end w-full max-w-[1174px] max-md:max-w-full">
      <div className="flex gap-12 max-md:flex-col">
        <div className="w-[45%] max-md:ml-0 max-md:w-full">
          <div className="pl-4 border-l-4 border-[#3E6F1B]">
            <p className="text-xl text-black mb-6">
              Our lessons are interactive and tailored to the children&apos;s needs. We
              use creative methods like role-playing, singing, storytelling, and
              collaborative activities to make learning fun and engaging.
            </p>
            <p className="text-xl text-black mb-6">
              Topics are aligned with the local curriculum, ensuring that lessons
              are both relevant and inspiring.
            </p>
            <p className="text-xl text-black">
              Beyond just teaching English, we help children build confidence,
              teamwork skills, and the ability to imagine a brighter future.
            </p>
          </div>
        </div>
        <div className="w-[55%] max-md:ml-0 max-md:w-full">
          <RoundedImage
            src="/images/suprisedManWithKids.jpeg"
            alt="Interactive teaching session"
            className="w-full aspect-[1.67] max-md:mt-10 max-md:max-w-full"
            width={700}
            height={420}
          />
        </div>
      </div>
    </section>
  );
}