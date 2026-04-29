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
  SplitText,
  MorphSVGPlugin,
} from "gsap/all";

gsap.registerPlugin(
  ScrollTrigger,
  Flip,
  MotionPathPlugin,
  DrawSVGPlugin,
  PixiPlugin,
  Draggable,
  ScrollToPlugin,
  SplitText,
  MorphSVGPlugin,
);

export {
  useGSAP,
  ScrollTrigger,
  Flip,
  MotionPathPlugin,
  DrawSVGPlugin,
  Draggable,
  ScrollToPlugin,
  SplitText,
  MorphSVGPlugin,
};
export default gsap;
