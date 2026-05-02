import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ScrollTrigger,
  ScrollToPlugin,
  SplitText,
  DrawSVGPlugin,
  MotionPathPlugin,
} from "gsap/all";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  SplitText,
  DrawSVGPlugin,
  MotionPathPlugin,
);

export {
  useGSAP,
  ScrollTrigger,
  ScrollToPlugin,
  SplitText,
  DrawSVGPlugin,
  MotionPathPlugin,
};
export default gsap;
