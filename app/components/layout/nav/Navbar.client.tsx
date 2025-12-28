"use client";

import { useRef } from "react";
import { useGSAP } from "@/app/lib/gsap";
import initNavbarAnimation from "./navbar.animation";

type NavbarClientProps = {
  onToggle: () => void;
};

export default function NavbarClient({ onToggle }: NavbarClientProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;
      return initNavbarAnimation({ container: container.current });
    },
    { scope: container }
  );

  const handleSidebarToggle = () => {
    onToggle();
  };

  return (
    <nav
      ref={container}
      className="container flex flex-col justify-between  w-screen text-[1.5625rem] z-20 "
    >
      <ul className=" flex items-center lg:gap-[1.875rem] w-full  border-white lg:border-b-0  lg:py-0 ">
        <div className=" flex lg:flex-col items-center w-full ">
          <div className="relative flex items-center h-[4.0625rem] lg:flex lg:w-full lg:border-white lg:py-[1.75rem]  lg:h-[5.875rem] ">
            <p className="nav-name absolute ">farid</p>
          </div>
          <div className="progressbar-track w-full h-[1px] bg-gray-300/10 hidden lg:block">
            <div className="progressbar-desktop-fill-name w-full h-[1px] bg-white origin-left scale-x-0"></div>
          </div>
        </div>
        <div className="flex  lg:w-full  lg:gap-[1.875rem]">
          <li className="lg:hidden flex items-center h-[4.0625rem]">
            <button type="button" onClick={handleSidebarToggle}>
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
            </button>
          </li>
          <li className="flex lg:flex-col items-center w-full hidden lg:block">
            <div className="relative flex h-[4.0625rem]  lg:flex lg:w-full lg:border-white lg:py-[1.75rem]  lg:h-[5.875rem] ">
              <p className=" absolute">About</p>
            </div>
            <div className="progressbar-track w-full h-[1px] bg-gray-300/10 ">
              <div className="progressbar-desktop-fill-about w-full h-[1px] bg-white origin-left scale-x-0"></div>
            </div>
          </li>
          <li className="flex lg:flex-col items-center w-full hidden lg:block">
            <div className="relative flex h-[4.0625rem] lg:flex lg:w-full lg:border-white lg:py-[1.75rem]  lg:h-[5.875rem] ">
              <p className=" absolute">Project</p>
            </div>
            <div className="progressbar-track w-full h-[1px] bg-gray-300/10 ">
              <div className="progressbar-desktop-fill-project w-full h-[1px] bg-white origin-left scale-x-0"></div>
            </div>
          </li>
          <li className="flex lg:flex-col items-center w-full hidden lg:block">
            <div className="relative flex h-[4.0625rem] lg:flex lg:w-full lg:border-white lg:py-[1.75rem]  lg:h-[5.875rem] ">
              <p className=" absolute">Contact</p>
            </div>
            <div className="progressbar-track w-full h-[1px] bg-gray-300/10 ">
              <div className="progressbar-desktop-fill-contact w-full h-[1px] bg-white origin-left scale-x-0"></div>
            </div>
          </li>
        </div>
      </ul>
      <div className="progressbar-track w-full h-[1px] bg-gray-300/10 lg:hidden">
        <div className="progressbar-mobile-fill w-full h-[1px] bg-white origin-left scale-x-0"></div>
      </div>
    </nav>
  );
}
