"use client";

import { useRef, useState, useEffect } from "react";
import type { HeroSectionProps } from "./hero.types";

import TextMask from "@/components/ui/TextMask";
import WordRotate from "@/components/ui/WordRotate";
import FlairButton from "@/components/ui/FlairButton";
import Image from "next/image";

import { useHeroAnimation } from "./hero.animation";
import { useBoxHeroAnimation } from "./useBoxHeroAnimation";

import { getImageUrl } from "@/shared/lib/sanity/image";
import gsap, { useGSAP } from "@/shared/lib/gsap";

export default function HeroSectionClient({
  projects,
  isLoading,
  onIntroComplete,
  sectionRefs,
}: HeroSectionProps) {
  const [imageReady, setImageReady] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    container,
    scrollToContact,
    heroText1,
    heroText2,
    heroText3,
    heroText4,
    heroText5,
    heroText6,
    heroText7,
    heroText8,
    heroText9,
    heroText10,
    leftColContentRef,
    leftColRef,
    rightColRef,
    heroHeadlineRef,
    playButtonRef,
  } = useHeroAnimation({
    sectionRefs,
    onIntroComplete,
  });

  const {
    circleArrowRef,
    arrowContainerRef,
    arrowRef,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
  } = useBoxHeroAnimation();

  const latestProject = projects[0];
  const projectImages = latestProject?.images || [];

  // Main Hero Timeline: runs on mount
  useGSAP(
    () => {
      // Initial hidden states handled by CSS classes (.opacity-0 .translate-y-10)
      // and for expand parts (.w-0)
    },
    { scope: container },
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

  const [showModal, setShowModal] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (!container.current || !videoRef.current) return;

    const isMobile = window.innerWidth < 1024;

    if (isMobile) {
      setShowModal(true);
      return;
    }

    if (!isPlaying) {
      // Unmute and play the video
      videoRef.current.muted = false;
      videoRef.current.play();
      setIsPlaying(true);

      // Scroll to trigger the ScrollTrigger expansion
      const scrollTarget =
        container.current.offsetTop + window.innerHeight * 0.8;
      gsap.to(window, {
        scrollTo: scrollTarget,
        duration: 1.5,
        ease: "power2.inOut",
      });
    } else {
      // Pause and mute the video
      videoRef.current.pause();
      videoRef.current.muted = true;
      setIsPlaying(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };

  return (
    <div ref={container} className="hero-section">
      <div className="relative bg-[var(--white-color)] lg:h-dvh lg:max-h-[80rem] flex justify-center items-center">
        <div
          ref={heroHeadlineRef}
          className="absolute p-4 mb-[32rem] lg:mb-[19rem]"
        >
          <h1
            aria-label="Creating Interactive Digital Experiences that feel smooth, fast, and alive."
            className="flex flex-col items-center text-[1.5rem] lg:text-[3rem] xl:text-[4.2rem] 2xl:text-[5rem] font-fraunces leading-tight"
          >
            <span
              aria-hidden="true"
              className="flex items-center gap-x-[0.3em] justify-center"
            >
              <span ref={heroText1} className="hidden ">
                Creating
              </span>
              <span ref={heroText2} className="hidden ">
                Interactive
              </span>
              <span ref={heroText3} className="hidden ">
                Digital
              </span>
            </span>
            <span
              aria-hidden="true"
              className="flex items-center gap-x-[0.3em] justify-center"
            >
              <span className="hidden" ref={heroText4}>
                Experiences
              </span>

              <span ref={heroText5} className="hidden">
                that
              </span>
              <span className="hidden" ref={heroText6}>
                feel
              </span>
            </span>
            <span
              aria-hidden="true"
              className="flex items-center gap-x-[0.3em] justify-center"
            >
              <span ref={heroText7} className="hidden">
                smooth,
              </span>
              <span ref={heroText8} className="hidden">
                fast,
              </span>
              <span className="hidden" ref={heroText9}>
                and
              </span>
              <span className="hidden" ref={heroText10}>
                alive.
              </span>
            </span>
          </h1>
        </div>
        <div className="container flex flex-col justify-end gap-[4rem] lg:gap-[8rem] pb-[4rem] lg:pb-[6rem] h-full mt-[28rem] lg:mt-0">
          <div className="relative w-full lg:py-0 flex flex-col gap-[4rem] lg:flex-row justify-between items-center lg:items-end h-auto">
            <div ref={leftColRef} className="w-full">
              <div
                ref={leftColContentRef}
                className="hidden flex flex-col gap-[2rem] lg:justify-between opacity-0 items-center lg:items-start w-full"
              >
                <div className="flex flex-col gap-[0.5rem] text-center lg:text-left ">
                  <p className="font-fraunces text-[1rem] lg:text-[1.8rem] xl:text-[2rem] 2xl:text-[2.2rem] leading-[1.2] lg:leading-[1.1] text-[var(--black-color)]">
                    A creative developer specializing
                    <br />
                    in crafting modern, intuitive, and
                    <br />
                    engaging digital experiences
                    <span className="flex items-center justify-center lg:justify-start gap-[0.3em]">
                      <span className="italic">for</span>
                      <span className="lg:h-[2.2rem] inline-block">
                        <WordRotate
                          words={["B2B", "digital", "startup", "ecommerce"]}
                        />
                      </span>
                      <span>brands.</span>
                    </span>
                  </p>
                </div>
                <div
                  onClick={scrollToContact}
                  className="box-hero-link cursor-pointer flex items-center justify-between gap-x-2 px-[1.2rem] lg:px-[2rem] mt-[0rem] lg:mt-[0.8rem] bg-black w-fit min-w-[10rem] h-[3rem] lg:w-[15rem] lg:h-[4rem] rounded-full text-white whitespace-nowrap"
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  onMouseMove={onMouseMove}
                >
                  <TextMask
                    start=""
                    className="text-[0.8rem] lg:text-[1rem] font-medium pr-2"
                  >
                    Get in touch
                  </TextMask>

                  <div className="relative w-[1.8rem] h-[1.8rem] lg:w-[2.5rem] lg:h-[2.5rem] flex items-center justify-center">
                    <div
                      ref={circleArrowRef}
                      className="z-0 absolute inset-0 bg-white rounded-full  "
                    />
                    <div
                      ref={arrowContainerRef}
                      className="z-10 w-full h-full flex items-center justify-center rounded-full overflow-hidden pointer-events-none"
                    >
                      <svg
                        ref={arrowRef}
                        width="24"
                        height="26"
                        viewBox="0 0 24 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="arrow-down w-[0.8rem] h-[0.8rem] lg:w-[1rem] lg:h-[1rem] relative text-white"
                      >
                        <path
                          d="M11.5 1.5L11.5 21.5"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.5 16.5L11.5 23.5L5.5 16.5"
                          stroke="currentColor"
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

            <div
              ref={rightColRef}
              onClick={handlePlayClick}
              className="group relative w-full lg:max-w-[30rem] h-auto rounded-[1rem] overflow-hidden opacity-0 cursor-pointer z-30"
            >
              <video
                ref={videoRef}
                src="/videos/hero/project-preview.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto block"
              />
              {/* Play button overlay */}
              <div
                className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-300 pointer-events-none ${
                  isPlaying ? "opacity-0" : "opacity-100"
                }`}
              >
                <FlairButton
                  ref={playButtonRef}
                  label="Play"
                  onClick={handlePlayClick}
                  hasBorder={false}
                  className="w-24 h-24 rounded-full bg-black/50 backdrop-blur-sm pointer-events-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileVideoModal
        isOpen={showModal}
        onClose={handleCloseModal}
        videoRef={modalVideoRef}
      />
    </div>
  );
}

function MobileVideoModal({
  isOpen,
  onClose,
  videoRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (videoRef.current) {
        videoRef.current.play();
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, videoRef]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-xl">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white transition-transform hover:scale-110 border border-white/10"
        aria-label="Close modal"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div className="w-full h-full flex items-center justify-center p-4">
        <video
          ref={videoRef}
          src="/videos/hero/project-preview.mp4"
          loop
          playsInline
          className="w-full h-auto max-h-[80vh] rounded-[1rem]"
        />
      </div>
    </div>
  );
}
