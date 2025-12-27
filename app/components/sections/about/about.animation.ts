import { ScrollTrigger } from "@/app/lib/gsap";
type AboutAnimationParams = {
  container: HTMLElement;
};

export function initAboutAnimation({ container }: AboutAnimationParams) {
  ScrollTrigger.create({
    trigger: container,
    start: "top top",
    end: "+=600%",
    scrub: true,

    pin: true,
  });
}
