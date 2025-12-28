"use client";

import { useGSAP } from "@/app/lib/gsap";
import { useRef } from "react";
import initSidebarAnimation from "./sidebar.animation";
import SidebarLink from "./sidebar-link/SidebarLink";
import Footer from "../Footer";

type SidebarClientProps = {
  isOpen: boolean;
};

export default function SidebarClient({ isOpen }: SidebarClientProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;
      const { tlOpen, tlClose } = initSidebarAnimation({
        container: container.current,
      });

      if (isOpen) {
        tlOpen.play();
      } else {
        tlClose.play();
      }
    },
    { scope: container, dependencies: [isOpen] }
  );

  return (
    <div
      ref={container}
      className="fixed h-dvh w-full bg-[var(--white-color)] z-40 flex flex-col items-center justify-between  "
    >
      <div></div>
      <div className="w-full px-[1rem]">
        <ul className="sidebar-list origin-top bg-white flex-col w-full rounded-[1rem] px-[1rem] divide-y-1">
          <li>
            <SidebarLink label="Home" />
          </li>
          <li>
            <SidebarLink label="About" />
          </li>
          <li>
            <SidebarLink label="Project" />
          </li>
          <li>
            <SidebarLink label="Contact" />
          </li>
        </ul>
      </div>
      <div className="w-full">
        <div className="px-[1rem]">
          <div className="footer-line w-full h-[2px] bg-[var(--black-color)] origin-left" />
        </div>
        <Footer />
      </div>
    </div>
  );
}
