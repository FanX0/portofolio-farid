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
} from "gsap/all";

gsap.registerPlugin(
  ScrollTrigger,
  Flip,
  MotionPathPlugin,
  DrawSVGPlugin,
  PixiPlugin,
  Draggable,
  ScrollToPlugin
);

export {
  useGSAP,
  ScrollTrigger,
  Flip,
  MotionPathPlugin,
  DrawSVGPlugin,
  Draggable,
  ScrollToPlugin,
};
export default gsap;
