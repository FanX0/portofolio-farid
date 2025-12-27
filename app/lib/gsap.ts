import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ScrollTrigger,
  Flip,
  MotionPathPlugin,
  DrawSVGPlugin,
  PixiPlugin,
  Draggable,
} from "gsap/all";

gsap.registerPlugin(
  ScrollTrigger,
  Flip,
  MotionPathPlugin,
  DrawSVGPlugin,
  PixiPlugin,
  Draggable
);

export {
  useGSAP,
  ScrollTrigger,
  Flip,
  MotionPathPlugin,
  DrawSVGPlugin,
  Draggable,
};
export default gsap;
