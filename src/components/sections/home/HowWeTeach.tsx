"use client";

import * as React from "react";
import Button from "@/components/shared/Button";
import { HeroSection } from "./how_we_teach/Main";
import { ConnectSection } from "./how_we_teach/Connect";
import { TeachSection } from "./how_we_teach/Teach";
import { TransformSection } from "./how_we_teach/Transform";

function HowWeTeach() {
  return (
    <section className="overflow-hidden pb-32 bg-white max-md:pb-24">
      <HeroSection />
      <div className="flex z-10 flex-col items-start px-16 mt-0 w-full max-md:px-5 max-md:max-w-[1500px]">
        <ConnectSection />
        <TeachSection />
        <TransformSection />
      </div>
    </section>
  );
}

export default HowWeTeach;