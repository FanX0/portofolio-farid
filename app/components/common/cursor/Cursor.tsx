"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import initCursorAnimation from "./cursor.animation";

export default function Cursor() {
  const container = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!container.current) return;
      return initCursorAnimation({ container: container.current });
    },
    { scope: container }
  );
  return (
    <div
      ref={container}
      className="cursor hidden lg:flex justify-center items-center bg-white mix-blend-difference h-[0.7rem] w-[0.7rem] fixed top-0 left-0 pointer-events-none z-[9999]"
    >
      <span className="cursor-text whitespace-nowrap" />
    </div>
  );
}
