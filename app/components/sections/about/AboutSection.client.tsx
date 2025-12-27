"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import TextClipPath from "@/app/components/ui/TextClipPath";

import TextMaskScroll from "@/app/components/ui/TextMaskScroll";
import { initAboutAnimation } from "./about.animation";

export default function AboutSectionClient() {
  const container = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      if (!container.current) return;
      return initAboutAnimation({ container: container.current });
    },
    { scope: container }
  );
  return (
    <div ref={container} className=" bg-[var(--black-color)] ">
      <div className="h-dvh">
        <div
          id="about-title"
          className="container h-full flex flex-col lg:flex-row gap-[2rem] h-full items-center lg:items-end  pt-[10rem] lg:pt-0 lg:pb-[4rem]"
        >
          <TextMaskScroll
            startMobile={2250}
            endMobile="+=200"
            className="text-[6rem]  font-bold text-white lg:hidden w-full"
          >
            About
          </TextMaskScroll>
          <TextClipPath
            startDesktop="2950"
            endDesktop="8000"
            startMobile="2250"
            endMobile="6500"
            className=" leading-[2rem] lg:leading-[3rem] text-[1.5rem] lg:text-[3rem] text-left font-bold text-center "
          >
            I translate ideas into compelling, user focused experiences that
            drive brand growth. creating unique and memorable work. and truly
            believe great work comes from collaboration.
          </TextClipPath>
        </div>
      </div>
    </div>
  );
}
