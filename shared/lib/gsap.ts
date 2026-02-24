import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ScrollTrigger,
  Flip,
  MotionPathPlugin,
  DrawSVGPlugin,
  PixiPlugin,
  Draggable,
  ScrollToPlugin,
  ScrollSmoother,
} from "gsap/all";

gsap.registerPlugin(
  ScrollTrigger,
  Flip,
  MotionPathPlugin,
  DrawSVGPlugin,
  PixiPlugin,
  Draggable,
  ScrollToPlugin,
  ScrollSmoother,
);

export {
  useGSAP,
  ScrollTrigger,
  Flip,
  MotionPathPlugin,
  DrawSVGPlugin,
  Draggable,
  ScrollToPlugin,
  ScrollSmoother,
};
export default gsap;
