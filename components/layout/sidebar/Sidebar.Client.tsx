"use client";

import { useGSAP } from "@/app/lib/gsap";
import { useRef } from "react";
import initSidebarAnimation from "./sidebar.animation";
import SidebarLink from "./sidebar-link/SidebarLink";
import Footer from "../Footer";
import gsap from "@/app/lib/gsap";

type SidebarClientProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SidebarClient({ isOpen, onClose }: SidebarClientProps) {
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

  const handleLinkClick = (scrollTo: number) => {
    onClose();
    gsap.to(window, {
      scrollTo,
      duration: 1,
      ease: "power2.inOut",
      delay: 0.5, // Optional: wait for sidebar close animation to start/finish
    });
  };

  return (
    <div
      ref={container}
      className="fixed h-dvh w-full bg-[var(--white-color)] z-40 flex flex-col items-center justify-between  "
    >
      <div></div>
      <div className="w-full px-[1rem]">
        <ul className="sidebar-list origin-left bg-white flex-col w-full rounded-[1rem] px-[1rem] divide-y-1">
          <li>
            <SidebarLink label="Home" onClick={() => handleLinkClick(0)} />
          </li>
          <li>
            <SidebarLink label="About" onClick={() => handleLinkClick(2850)} />
          </li>
          <li>
            <SidebarLink
              label="Project"
              onClick={() => handleLinkClick(16300)}
            />
          </li>
          <li>
            <SidebarLink
              label="Contact"
              onClick={() => handleLinkClick(22150)}
            />
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
