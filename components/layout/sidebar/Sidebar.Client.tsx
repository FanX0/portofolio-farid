"use client";

import { useGSAP } from "@/shared/lib/gsap";
import { useRef } from "react";
import initSidebarAnimation from "./sidebar.animation";
import SidebarLink from "./sidebar-link/SidebarLink";
import Footer from "../Footer";
import gsap from "@/shared/lib/gsap";

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
    { scope: container, dependencies: [isOpen] },
  );

  const handleLinkClick = (selector: string | number) => {
    onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).lenis;
    
    const offsetValue = selector === "#about" ? 800 : 0;

    if (lenis) {
      lenis.scrollTo(selector, {
        duration: 1.2,
        delay: 0.5, // Wait for sidebar close animation
        offset: offsetValue,
      });
    } else {
      gsap.to(window, {
        scrollTo: { y: selector, offsetY: -offsetValue },
        duration: 1.2,
        ease: "power2.inOut",
        delay: 0.5,
      });
    }
  };

  return (
    <div
      ref={container}
      className="hidden fixed h-dvh w-full bg-(--white-color) z-40 flex flex-col items-center justify-between  "
    >
      <div></div>
      <div className="w-full px-4">
        <ul className="sidebar-list origin-left bg-white flex-col w-full rounded-2xl px-4 divide-y">
          <li>
            <SidebarLink label="Home" onClick={() => handleLinkClick("#hero")} />
          </li>
          <li>
            <SidebarLink
              label="About"
              onClick={() => handleLinkClick("#about")}
            />
          </li>
          <li>
            <SidebarLink
              label="Project"
              onClick={() => handleLinkClick("#project-list")}
            />
          </li>
          <li>
            <SidebarLink
              label="Contact"
              onClick={() => handleLinkClick("#contact-form")}
            />
          </li>
        </ul>
      </div>
      <div className="w-full">
        <div className="px-4">
          <div className="footer-line w-full h-[2px] bg-(--black-color) origin-left" />
        </div>
        <Footer />
      </div>
    </div>
  );
}
