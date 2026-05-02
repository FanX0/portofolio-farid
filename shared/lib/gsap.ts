import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ScrollTrigger,
  ScrollToPlugin,
  SplitText,
} from "gsap/all";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  SplitText,
);

export {
  useGSAP,
  ScrollTrigger,
  ScrollToPlugin,
  SplitText,
};
export default gsap;
