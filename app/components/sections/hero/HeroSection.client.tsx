"use client";

import { useRef, useState } from "react";
import type { HeroSectionProps } from "./hero.types";

import TextMask from "@/app/components/ui/TextMask";
import LogoTransition from "@/app/components/common/logotransition/LogoTransition.server";
import Image from "next/image";

import { initHeroAnimation } from "./hero.animation";

import { getImageUrl } from "@/app/lib/sanity/image";
import { useGSAP } from "@/app/lib/gsap";

export default function HeroSectionClient({ projects }: HeroSectionProps) {
  const [imageReady, setImageReady] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current || !imageReady) return;
      return initHeroAnimation({ container: container.current });
    },
    { scope: container, dependencies: [imageReady] }
  );

  return (
    <div ref={container} className="hero-section">
      <div className="bg-[var(--white-color)] h-dvh  flex justify-center items-center">
        <div className="container  flex items-end  pb-[2rem] h-full max-h-[80rem]  ">
          <div className="w-full  lg:py-0   flex flex-col  gap-[1rem]  lg:flex-row justify-between   ">
            <div className="box-hero-image flex w-full h-[20rem] lg:h-[20rem] lg:w-[50%] lg:order-2 ">
              <div className="project-image flex w-full h-full  rounded-[2rem] overflow-hidden ">
                {projects.slice(-1).map((project) => {
                  const imageUrl = getImageUrl(project.images?.[0]);
                  if (!imageUrl) return null;

                  return (
                    <Image
                      width={1280}
                      height={1280}
                      key={project._id}
                      src={imageUrl}
                      alt={project.title}
                      className="object-cover w-full h-full "
                      onLoadingComplete={() => setImageReady(true)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-[3rem] lg:justify-between lg:order-1 ">
              <div className="flex flex-col gap-[0.5rem]">
                <TextMask start="" className="heading  font-medium">
                  Creative Developer
                </TextMask>
                <TextMask start="" className="heading ">
                  from Indonesia
                </TextMask>
              </div>
              <div className="flex items-center justify-between px-[3rem] lg:px-[3rem] bg-black w-[20rem] h-[7rem]  lg:w-[22.75rem] lg:h-[7.8125rem] rounded-full">
                <TextMask
                  start=""
                  className="text-[1.5rem]  font-medium text-white"
                >
                  Scroll down
                </TextMask>

                <svg
                  width="24"
                  height="26"
                  viewBox="0 0 24 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 1.5L11.5 21.5"
                    stroke="#EEEEEE"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5 16.5L11.5 23.5L5.5 16.5"
                    stroke="#EEEEEE"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[23rem] lg:h-dvh bg-[var(--white-color)] py-[2rem] ">
        <div className="container  w-full flex flex-col gap-[2rem] items-center justify-between ">
          <div className="flex w-full justify-between items-center">
            <p className="">Recent Project</p>
            <p className="">View all / {projects.length}</p>
          </div>
          <div className="box-project-image h-full lg:h-[53rem] w-full rounded-[2rem]"></div>
        </div>
      </div>
      <div className="relative">
        <LogoTransition />
      </div>
    </div>
  );
}
