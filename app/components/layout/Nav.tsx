"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

const Nav = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    (context) => {
      const q = context.selector!;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 64rem)", () => {
        gsap.fromTo(
          q("#nav-name"),
          {
            fontSize: "17.5rem",
            fontWeight: 700,
            y: 100,
          },
          {
            y: 0,
            fontSize: "1.5625rem",
            fontWeight: 500,
            scrollTrigger: {
              start: 100,
              end: 500,
              scrub: true,
            },
          }
        );
        gsap.to(q("#nav-about"), {
          y: 100,
          x: "-80%",
          fontSize: "17.5rem",
          fontWeight: 700,

          scrollTrigger: {
            start: 2900,
            end: 3300,
            scrub: true,
          },
        });
        gsap.to(q("#nav-about"), {
          y: 0,
          x: 0,
          fontSize: "1.5625rem",
          fontWeight: 500,

          scrollTrigger: {
            start: 8050,
            end: 8450,
            scrub: true,
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <nav
      ref={container}
      className="container flex justify-between gap-[1.875rem] w-screen text-[2xl] lg:text-[1.5625rem] font-[200] z-50  h-[4.0625rem] px-[1.25rem] lg:px-[4.375rem] py-[.625rem] lg:py-[70px]    "
    >
      <ul className="flex items-center lg:gap-[1.875rem] w-full border-b-1 border-white lg:border-b-0 py-[2rem] lg:py-0">
        <div className=" flex items-center w-full ">
          <div className="relative flex h-[4.0625rem] lg:flex lg:w-full lg:border-b-1 lg:border-white lg:py-[1.75rem]  lg:h-[5.875rem] ">
            <p className="absolute" id="nav-name">
              farid
            </p>
          </div>
        </div>
        <div className="flex  lg:w-full  lg:gap-[1.875rem]">
          <li className="lg:hidden flex items-center h-[4.0625rem]">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="39"
                height="39"
                rx="19.5"
                stroke="#fff"
              />
              <rect x="11" y="18" width="4" height="4" rx="2" fill="#fff" />
              <rect x="18" y="18" width="4" height="4" rx="2" fill="#fff" />
              <rect x="25" y="18" width="4" height="4" rx="2" fill="#fff" />
            </svg>
          </li>
          <li className="hidden relative lg:flex  lg:h-[5.875rem] lg:w-full border-b-1 border-white lg:py-[28px] ">
            <p id="nav-about" className="absolute ">
              About
            </p>
          </li>
          <li className="hidden relative lg:flex  lg:h-[5.875rem] lg:w-full border-b-1 border-white lg:py-[28px]">
            <p id="nav-project" className="absolute">
              Project
            </p>
          </li>
          <li className="hidden relative lg:flex  lg:h-[5.875rem] lg:w-full border-b-1 border-white lg:py-[28px]">
            <p id="nav-contact" className="absolute">
              Contact
            </p>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
