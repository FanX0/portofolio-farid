"use client";

import { useRef, useState, useEffect } from "react";
import type { HeroSectionProps } from "./hero.types";

import TextMask from "@/app/components/ui/TextMask";
import LogoTransition from "@/app/components/common/logotransition/LogoTransition.server";
import Image from "next/image";

import { initHeroAnimation } from "./hero.animation";
import { useBoxHeroAnimation } from "./useBoxHeroAnimation";

import { getImageUrl } from "@/app/lib/sanity/image";
import gsap, { useGSAP } from "@/app/lib/gsap";

export default function HeroSectionClient({ projects }: HeroSectionProps) {
  const [imageReady, setImageReady] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const { circleArrowRef, arrowRef, onMouseEnter, onMouseLeave } =
    useBoxHeroAnimation();

  const latestProject = projects[0];
  const projectImages = latestProject?.images || [];

  useGSAP(
    () => {
      // Hero Image Animation
      if (container.current && imageReady) {
        initHeroAnimation({ container: container.current });
      }
    },
    { scope: container, dependencies: [imageReady] }
  );

  useEffect(() => {
    if (projectImages.length <= 1) return;

    let timer: gsap.core.Tween;

    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % projectImages.length);
      timer = gsap.delayedCall(1, nextSlide);
    };

    timer = gsap.delayedCall(1, nextSlide);

    return () => {
      timer?.kill();
    };
  }, [projectImages.length]);

  const handleScrollToContact = () => {
    gsap.to(window, {
      scrollTo: 22150,
      duration: 2,
      ease: "power2.out",
    });
  };
  const handleScrollToProject = () => {
    gsap.to(window, {
      scrollTo: 16300,
      duration: 2,
      ease: "power2.out",
    });
  };

  return (
    <div ref={container} className="hero-section">
      <div className="bg-[var(--white-color)] h-dvh  flex justify-center items-center">
        <div className="container  flex items-end  pb-[2rem] h-full max-h-[80rem]  ">
          <div className="w-full  lg:py-0   flex flex-col  gap-[4rem]  lg:flex-row justify-between   ">
            <div className="box-hero-image flex w-full h-[15rem] lg:h-[20rem] lg:w-[50%] lg:order-2 ">
              <div className="project-image relative flex w-full h-full  rounded-[2rem] overflow-hidden ">
                {projectImages.map((image, index) => {
                  const imageUrl = getImageUrl(image);
                  if (!imageUrl) return null;

                  return (
                    <Image
                      width={1280}
                      height={1280}
                      key={index}
                      src={imageUrl}
                      alt={latestProject?.title || "Project Image"}
                      className={`object-cover w-full h-full absolute inset-0   ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                      }`}
                      onLoadingComplete={() => {
                        if (index === 0) setImageReady(true);
                      }}
                      priority={index === 0}
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
              <div
                onClick={handleScrollToContact}
                className="box-hero-link cursor-pointer flex items-center justify-between px-[2rem] lg:px-[3rem] bg-black w-[20rem] h-[6rem]  lg:w-[22.75rem] lg:h-[7.8125rem] rounded-full hover:bg-[var(--white-color)] text-white hover:text-black hover:outline-black hover:outline-[3px]"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <TextMask start="" className=" text-[1.2rem]  font-medium ">
                  Get in touch
                </TextMask>

                <div className="relative w-[4rem] h-[4rem] flex items-center justify-center">
                  <div
                    ref={circleArrowRef}
                    className="absolute inset-0 bg-white rounded-full origin-right "
                  />
                  <svg
                    ref={arrowRef}
                    width="24"
                    height="26"
                    viewBox="0 0 24 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="arrow-down w-[1.4rem] h-[1.4rem] relative z-10 "
                  >
                    <path
                      d="M11.5 1.5L11.5 21.5"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.5 16.5L11.5 23.5L5.5 16.5"
                      stroke="white"
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
      </div>
      <div className="h-[26rem] lg:h-dvh bg-[var(--white-color)] py-[2rem] ">
        <div className="container  w-full flex flex-col gap-[2rem] items-center justify-between ">
          <div className="flex w-full justify-between items-center">
            <p className="">Recent Project</p>
            <p onClick={handleScrollToProject} className="view-all-project">
              View all / {projects.length}
            </p>
          </div>
          <div className="box-project-image h-[15rem] lg:h-[53rem] w-full rounded-[2rem]"></div>
        </div>
      </div>
      <div className="relative">
        <LogoTransition />
      </div>
    </div>
  );
}
