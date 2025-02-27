"use client";

import * as React from "react";
import { HeroSection } from "./how_we_teach/Main";
import { ConnectSection } from "./how_we_teach/Connect";
import { TeachSection } from "./how_we_teach/Teach";
import { TransformSection } from "./how_we_teach/Transform";

function HowWeTeach() {
  return (
    <section className=" overflow-hidden pb-32 bg-white max-md:pb-24 ">
      <HeroSection />
      <div className="content-center mx-auto flex z-10 flex-col items-start px-16 mt-0 w-full max-md:px-5 max-md:max-w-[1200px] lg:pt-20 max-w-[1200px]">
        <ConnectSection />
        <TeachSection />
        <TransformSection />
      </div>
    </section>
  );
}

export default HowWeTeach;