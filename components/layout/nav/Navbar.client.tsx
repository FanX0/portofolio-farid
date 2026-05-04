"use client";

import { useState, useRef, type RefObject } from "react";
import gsap, { useGSAP } from "@/shared/lib/gsap";
import { useNavbarAnimation } from "./navbar.animation";
import useNavCircleHover from "@/components/layout/nav/useNavCircleHover";
import { NavArrowIcon } from "@/components/ui/NavArrowIcon";
import Magnetic from "@/components/common/Magnetic";

type SectionRefs = {
  heroRef: RefObject<HTMLElement | null>;
  aboutRef: RefObject<HTMLElement | null>;
  projectRef: RefObject<HTMLElement | null>;
  contactRef: RefObject<HTMLElement | null>;
};

type NavbarClientProps = {
  onToggle: () => void;
  isOpen: boolean;
  isLoading: boolean;
  onIntroComplete?: () => void;
  sectionRefs: SectionRefs;
};

export default function NavbarClient({
  onToggle,
  isOpen,
  isLoading,
  onIntroComplete,
  sectionRefs,
}: NavbarClientProps) {
  const [isHoverDisabled, setIsHoverDisabled] = useState(isLoading);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const navLeftRef = useRef<HTMLSpanElement>(null);
  const navRightRef = useRef<HTMLSpanElement>(null);
  const navLineRef = useRef<HTMLDivElement>(null);
  const navLogoContainerRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLUListElement>(null);

  const {
    container,
    toggleIconRef,
    scrollToHome,
    scrollToAbout,
    scrollToProject,
    scrollToContact,
  } = useNavbarAnimation({
    isOpen,
    isLoading,
    sectionRefs,
  });

  const {
    navRef: navRefHome,
    navDot: navDotHome,
    navCircle: navCircleHome,
    navArrow: navArrowHome,
    onEnter: onEnterHome,
    onLeave: onLeaveHome,
  } = useNavCircleHover(isHoverDisabled);
  const {
    navRef: navRefAbout,
    navDot: navDotAbout,
    navCircle: navCircleAbout,
    navArrow: navArrowAbout,
    onEnter: onEnterAbout,
    onLeave: onLeaveAbout,
  } = useNavCircleHover(isHoverDisabled);
  const {
    navRef: navRefProject,
    navDot: navDotProject,
    navCircle: navCircleProject,
    navArrow: navArrowProject,
    onEnter: onEnterProject,
    onLeave: onLeaveProject,
  } = useNavCircleHover(isHoverDisabled);
  const {
    navRef: navRefContact,
    navDot: navDotContact,
    navCircle: navCircleContact,
    navArrow: navArrowContact,
    onEnter: onEnterContact,
    onLeave: onLeaveContact,
  } = useNavCircleHover(isHoverDisabled);

  // Preloader Animation
  useGSAP(
    () => {
      if (!isLoading) return;

      const tl = gsap.timeline();

      // Initial state moved to CSS/JSX to avoid glitch on refresh
      const logoEl = navLogoContainerRef.current;
      if (logoEl) {
        // Wait for next frame to ensure layout is settled
        requestAnimationFrame(() => {
          if (!logoEl) return;
          
          // Clear any previous transforms to measure natural position
          gsap.set(logoEl, { clearProps: "x,y" });
          
          const rect = logoEl.getBoundingClientRect();
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight * 0.15;

          const offsetX = centerX - (rect.left + rect.width / 2);
          const offsetY = centerY - (rect.top + rect.height / 2);

          gsap.set(logoEl, { x: offsetX, y: offsetY });
        });
      }

      tl.to([navLeftRef.current, navRightRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      })
        .to(
          navLineRef.current,
          {
            scaleX: 1,
            duration: 0.6,
            ease: "expo.inOut",
          },
          "-=0.4",
        )
        .to(
          navLineRef.current,
          {
            width: 0,
            margin: 0,
            opacity: 0,
            duration: 0.8,
            ease: "power3.inOut",
          },
          "+=1.5",
        )
        .to(
          navRightRef.current,
          {
            marginLeft: "0.3em",
            duration: 0.8,
            ease: "power3.inOut",
          },
          "-=0.8",
        )
        .to(
          navLogoContainerRef.current,
          {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "expo.inOut",
          },
          "-=0.2",
        )
        .to(
          [navLinksRef.current, navDotHome.current, ".progressbar-track"],
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.8",
        )
        .to(
          preloaderRef.current,
          {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              setIsHoverDisabled(false);
              onIntroComplete?.();
            },
          },
          "-=0.5",
        );
    },
    { scope: container, dependencies: [isLoading] },
  );

  const handleSidebarToggle = () => {
    onToggle();
  };

  return (
    <nav ref={container} className="container flex flex-col text-[1rem] z-20 ">
      <div className="pr-4 lg:pr-0">
        <ul className="flex items-center justify-between lg:justify-start lg:gap-7.5 w-full ">
          <li className=" flex lg:flex-col items-center lg:w-full ">
            <button
              ref={navRefHome}
              type="button"
              aria-label="Home"
              onClick={scrollToHome}
              onMouseEnter={onEnterHome}
              onMouseLeave={onLeaveHome}
              className="home-link group flex items-center gap-4 h-16.25 lg:flex lg:w-full lg:py-7 lg:h-23.5 text-left appearance-none cursor-pointer"
            >
              <div
                ref={navDotHome}
                className="nav-dot w-2 h-2 outline outline-white rounded-full hidden lg:block opacity-0 -translate-y-2"
              />
              <div
                ref={navLogoContainerRef}
                className="flex items-center text-[1rem] tracking-tighter relative"
              >
                <span ref={navLeftRef} className="opacity-0 translate-y-[10px]">
                  farid
                </span>
                <div
                  ref={navLineRef}
                  className="h-[0.5px] bg-white/30 origin-center mx-6 w-40 lg:w-160 scale-x-0"
                />
                <span
                  ref={navRightRef}
                  className="opacity-0 translate-y-[10px]"
                >
                  azhari
                </span>
              </div>
              <div
                ref={navCircleHome}
                className="nav-circle opacity-0 w-12 h-12 bg-white rounded-full hidden lg:flex justify-center items-center"
              >
                <NavArrowIcon ref={navArrowHome} />
              </div>
            </button>
            <div className="progressbar-track w-full h-px bg-gray-300/10 hidden lg:block opacity-0">
              <div className="progressbar-desktop-fill-name w-full h-px bg-white origin-left scale-x-0"></div>
            </div>
          </li>
          <li className="lg:w-full">
            <ul
              ref={navLinksRef}
              className="flex lg:w-full lg:gap-7.5 opacity-0 -translate-y-2"
            >
              <li className="lg:hidden flex items-center h-16.25">
                <Magnetic>
                  <button
                    className="sidebar-toggle cursor-pointer"
                    type="button"
                    aria-label="Toggle Sidebar"
                    onClick={handleSidebarToggle}
                  >
                    <svg
                      ref={toggleIconRef}
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        className="toggle-bg"
                        x="0.5"
                        y="0.5"
                        width="39"
                        height="39"
                        rx="19.5"
                        stroke="#fff"
                      />
                      <rect
                        className="toggle-dot"
                        x="11"
                        y="18"
                        width="4"
                        height="4"
                        rx="2"
                        fill="#fff"
                      />
                      <rect
                        className="toggle-dot"
                        x="18"
                        y="18"
                        width="4"
                        height="4"
                        rx="2"
                        fill="#fff"
                      />
                      <rect
                        className="toggle-dot"
                        x="25"
                        y="18"
                        width="4"
                        height="4"
                        rx="2"
                        fill="#fff"
                      />
                    </svg>
                  </button>
                </Magnetic>
            </li>
            <li className="lg:flex lg:flex-col items-center w-full hidden lg:block">
              <button
                ref={navRefAbout}
                type="button"
                onClick={scrollToAbout}
                onMouseEnter={onEnterAbout}
                onMouseLeave={onLeaveAbout}
                className="about-link group flex items-center gap-4 h-16.25 w-full lg:py-7 lg:h-23.5 cursor-pointer"
              >
                <div
                  ref={navDotAbout}
                  className="nav-dot w-2 h-2 outline outline-white rounded-full"
                />
                <span>About</span>
                <div
                  ref={navCircleAbout}
                  className="nav-circle opacity-0 w-12 h-12 bg-white rounded-full flex justify-center items-center"
                >
                  <NavArrowIcon ref={navArrowAbout} />
                </div>
              </button>
              <div className="progressbar-track w-full h-px bg-gray-300/10 opacity-0">
                <div className="progressbar-desktop-fill-about w-full h-px bg-white origin-left scale-x-0"></div>
              </div>
            </li>
            <li className="lg:flex lg:flex-col items-center w-full hidden lg:block">
              <button
                ref={navRefProject}
                type="button"
                onMouseEnter={onEnterProject}
                onMouseLeave={onLeaveProject}
                onClick={scrollToProject}
                className="project-link group flex items-center gap-4 h-16.25 w-full lg:py-7 lg:h-23.5 cursor-pointer"
              >
                <div
                  ref={navDotProject}
                  className="nav-dot w-2 h-2 outline outline-white rounded-full"
                />
                <span>Project</span>
                <div
                  ref={navCircleProject}
                  className="nav-circle opacity-0 w-12 h-12 bg-white rounded-full flex justify-center items-center"
                >
                  <NavArrowIcon ref={navArrowProject} />
                </div>
              </button>
              <div className="progressbar-track w-full h-px bg-gray-300/10 opacity-0">
                <div className="progressbar-desktop-fill-project w-full h-px bg-white origin-left scale-x-0"></div>
              </div>
            </li>
            <li className="lg:flex lg:flex-col items-center w-full hidden lg:block">
              <button
                ref={navRefContact}
                type="button"
                onMouseEnter={onEnterContact}
                onMouseLeave={onLeaveContact}
                onClick={scrollToContact}
                className="contact-link group flex items-center gap-4 h-16.25 w-full lg:py-7 lg:h-23.5 cursor-pointer"
              >
                <div
                  ref={navDotContact}
                  className="nav-dot w-2 h-2 outline outline-white rounded-full"
                />
                <span>Contact</span>
                <div
                  ref={navCircleContact}
                  className="nav-circle opacity-0 w-12 h-12 bg-white rounded-full flex justify-center items-center"
                >
                  <NavArrowIcon ref={navArrowContact} />
                </div>
              </button>
              <div className="progressbar-track w-full h-px bg-gray-300/10 opacity-0">
                <div className="progressbar-desktop-fill-contact w-full h-px bg-white origin-left scale-x-0"></div>
              </div>
            </li>
          </ul>
        </li>
        </ul>
        <div className="progressbar-track w-full h-px bg-gray-300/10 lg:hidden opacity-0">
          <div className="progressbar-mobile-fill w-full h-px bg-white origin-left scale-x-0"></div>
        </div>
      </div>
    </nav>
  );
}
