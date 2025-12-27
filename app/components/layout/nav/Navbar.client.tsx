"use client";

import { useGSAP } from "@/app/lib/gsap";
import { useRef } from "react";
import initNavbarAnimation from "./navbar.animation";

export default function NavbarClient() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    return initNavbarAnimation({ container: container.current });
  });

  return (
    <nav
      ref={container}
      className="container flex justify-between gap-[1.875rem] w-screen text-[2xl] lg:text-[1.5625rem] font-[200] z-50  h-[4.0625rem] px-[1.25rem] lg:px-[4.375rem] py-[.625rem] lg:py-[70px]    "
    >
      <ul className="flex items-center lg:gap-[1.875rem] w-full border-b-1 border-white lg:border-b-0 py-[2rem] lg:py-0">
        <div className=" flex items-center w-full ">
          <div className="relative flex h-[4.0625rem] lg:flex lg:w-full lg:border-b-1 lg:border-white lg:py-[1.75rem]  lg:h-[5.875rem] ">
            <p className="nav-name absolute">farid</p>
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
            <p className="nav-about absolute ">About</p>
          </li>
          <li className="hidden relative lg:flex  lg:h-[5.875rem] lg:w-full border-b-1 border-white lg:py-[28px]">
            <p className="nav-project absolute">Project</p>
          </li>
          <li className="hidden relative lg:flex  lg:h-[5.875rem] lg:w-full border-b-1 border-white lg:py-[28px]">
            <p className="nav-contact absolute">Contact</p>
          </li>
        </div>
      </ul>
    </nav>
  );
}
