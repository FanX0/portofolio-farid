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
    <div ref={container} className=" bg-[var(--black-color)]  h-full">
      <div className="h-dvh flex justify-center items-center">
        <div
          id="about-title"
          className="container h-full max-h-[80rem] flex flex-col items-end gap-[2rem] pt-[10rem] lg:pb-[4rem]"
        >
          <TextMaskScroll
            startDesktop="top+=800"
            endDesktop="+=200"
            startMobile="top+=800"
            endMobile="+=200"
            className=" text-[clamp(6rem,10vw+1rem,10rem)]  font-bold text-white w-full"
          >
            About
          </TextMaskScroll>
          <TextClipPath
            startDesktop="top+=800"
            endDesktop="+=4000"
            startMobile="top+=800"
            endMobile="+=4000"
            className=" leading-[2rem] lg:leading-[4rem] text-[1.5rem] lg:text-[3rem] text-left font-bold text-center "
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
