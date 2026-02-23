import { useRef } from "react";
import { useGSAP } from "@/app/lib/gsap";
import initLogoTransitionAnimation from "./logoTransition.animation";
import Image from "next/image";
import logoLeft from "@/public/images/f-left.png";
import logoRight from "@/public/images/f-right.png";

export default function LogoTransitionClient() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;
      return initLogoTransitionAnimation({ container: container.current });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      id="logo-transition"
      className="mx-auto w-full absolute flex items-center justify-center z-10"
    >
      <div className="left-logo  bg-[var(--white-color)] h-screen w-[50%] flex justify-end items-center">
        <Image
          src={logoLeft}
          alt="logo-left"
          className="w-auto h-[70rem] lg:h-[50rem] object-contain"
        />
      </div>
      <div className="right-logo  bg-[var(--white-color)] h-screen w-[50%] flex justify-start items-center">
        <Image
          src={logoRight}
          alt="logo-right"
          className="w-auto h-[70rem] lg:h-[50rem] object-contain"
        />
      </div>
    </div>
  );
}
