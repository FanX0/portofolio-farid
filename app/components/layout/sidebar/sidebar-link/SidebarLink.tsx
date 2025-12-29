import { useGSAP } from "@/app/lib/gsap";
import { useRef } from "react";
import gsap from "gsap";
import initSidebarLinkAnimation from "./SidebarLink.animation";

type SidebarLinkProps = {
  label: string;
  onClick?: () => void;
};

export default function SidebarLink({ label, onClick }: SidebarLinkProps) {
  const container = useRef<HTMLButtonElement>(null);
  const arrow = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const resetTweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (!arrow.current) return;
      tlRef.current = initSidebarLinkAnimation(arrow.current);
    },
    { scope: container }
  );

  const handleMouseEnter = () => {
    resetTweenRef.current?.kill();
    tlRef.current?.restart();
  };

  const handleMouseLeave = () => {
    tlRef.current?.pause();
    if (arrow.current) {
      resetTweenRef.current = gsap.to(arrow.current, {
        yPercent: 0,
        xPercent: 0,
        duration: 0.2,
        overwrite: false,
      });
    }
  };

  return (
    <button
      ref={container}
      className="flex justify-between items-center w-full py-[1rem] group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="overflow-hidden">
        <p className="text-[1.2rem] sidebar-link">{label}</p>
      </div>
      <div className="overflow-hidden">
        <div className="sidebar-link w-[3rem] h-[3rem] rounded-full bg-black flex items-center justify-center overflow-hidden">
          <svg
            ref={arrow}
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="arrow w-[2rem] h-[2rem]"
          >
            <path
              d="M7.12959 20.2609L17.6449 8.85352"
              stroke="#EEEEEE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.5939 8.55068L18.6965 7.71271L18.4383 14.8599"
              stroke="#EEEEEE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
