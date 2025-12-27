"use client";

import { useRef, useState } from "react";
import type { HeroSectionProps } from "./hero.types";

import TextMask from "@/app/components/ui/TextMask";
import LogoTransition from "@/app/components/common/LogoTransition";
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
    <div ref={container}>
      <div className="bg-[var(--white-color)] h-dvh">
        <div className="container h-full flex items-start pt-[8rem] lg:items-end pb-[2rem]    ">
          <div className="w-full h-full lg:py-0 lg:h-[20rem]   flex flex-col  gap-[4rem] lg:gap-[1rem] lg:flex-row justify-center lg:justify-between  ">
            <div className="box-hero-image flex w-full h-[20rem] lg:h-full  lg:w-[50%] lg:order-2 ">
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
      <div className="bg-[var(--white-color)] h-dvh">
        <div className="container h-full w-full flex flex-col gap-[2rem] items-center justify-between ">
          <div className="flex w-full justify-between items-center">
            <p className="">Recent Project</p>
            <p className="">View all / {projects.length}</p>
          </div>
          <div className="box-project-image h-full w-full rounded-[2rem]"></div>
        </div>
      </div>
      <div>
        <LogoTransition />
      </div>
    </div>
  );
}
