"use client";

import TextClipPath from "@/components/ui/TextClipPath";
import TextMaskScroll from "@/components/ui/TextMaskScroll";
import { useAboutAnimation } from "./about.animation";

export default function AboutSectionClient() {
  const { container } = useAboutAnimation();

  return (
    <div ref={container} className=" bg-[var(--black-color)]  h-full">
      <div className="h-dvh flex justify-center items-center">
        <div
          id="about-title"
          className="container h-full max-h-[80rem] flex flex-col items-end gap-[2rem] pt-[10rem] lg:pb-[4rem]"
        >
          <TextMaskScroll
            startDesktop="top+=100"
            endDesktop="+=200"
            startMobile="top+=100"
            endMobile="+=600"
            className=" text-[clamp(5rem,10vw+1rem,10rem)]  font-bold text-white w-full"
          >
            About
          </TextMaskScroll>
          <TextClipPath
            startDesktop="top+=400"
            endDesktop="+=1500"
            startMobile="top+=400"
            endMobile="+=2500"
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
