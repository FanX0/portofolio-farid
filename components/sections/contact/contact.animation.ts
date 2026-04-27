import { useRef } from "react";
import gsap, { useGSAP, SplitText } from "@/shared/lib/gsap";

export function useContactAnimation() {
  const container = useRef<HTMLDivElement>(null);
  const tlClick = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const q = gsap.utils.selector(container.current);
      const getElement = (selector: string) => q(selector)[0] as HTMLElement;

      const wrapper = getElement(".text-running-wrapper");
      const text = getElement(".text-running");
      
      const split = new SplitText(".text-running-text", { type: "chars, words" });

      const scrollTween = gsap.to(text, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          end: "+=5000px",
          scrub: true,
        }
      });

      split.chars.forEach((char) => {
        gsap.from(char, {
          yPercent: "random(-200, 200)",
          rotation: "random(-20, 20)",
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: "left 100%",
            end: "left 30%",
            scrub: 1
          }
        });
      });

      gsap.set(getElement(".mail-stamp"), { opacity: 0, scale: 2, rotate: 2 });
      gsap.set(getElement(".mail-message"), { opacity: 0, scale: 2 });

      const timeline = gsap
        .timeline({ paused: true })
        .to(getElement(".mail-form"), {
          y: 500,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(getElement(".mail-form"), { opacity: 0 })
        .to(getElement(".mail"), { y: -200, duration: 1, ease: "power2.inOut" })
        .to(q(".mail-top"), {
          scaleY: -1,
          transformOrigin: "bottom center",
          duration: 1,
        })
        .to(getElement(".mail-stamp"), {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "power2.inOut",
        })
        .to(getElement(".mail"), {
          x: "250%",
          duration: 2,
          ease: "power2.inOut",
        })
        .to(getElement(".mail"), { opacity: 0 })
        .to(getElement(".mail-message"), {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "power2.inOut",
        })
        .set(getElement(".mail"), { opacity: 1, x: 0, y: "100%" })
        .to(getElement(".mail"), { y: "-120%", duration: 2 });

      tlClick.current = timeline;
    },
    { scope: container },
  );

  return { container, tlClick };
}
