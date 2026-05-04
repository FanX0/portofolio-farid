import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(
  ScrollTrigger,
  DrawSVGPlugin,
  MotionPathPlugin
);

export {
  useGSAP,
  ScrollTrigger,
  DrawSVGPlugin,
  MotionPathPlugin
};
export default gsap;
