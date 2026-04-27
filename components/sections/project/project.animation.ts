import { useRef } from "react";
import gsap, { useGSAP } from "@/shared/lib/gsap";
import type { Project } from "@/shared/types/project";

type UseProjectAnimationParams = {
  projects: Project[];
};

export function useProjectAnimation({ projects }: UseProjectAnimationParams) {
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const q = gsap.utils.selector(container.current);

      const listWrapper = q(".list-wrapper")[0] as HTMLElement;
      const listLine = q(".list-line")[0] as HTMLElement;
      const listItems = q(".list-line > button");
      const imageWrapper = q(".image-wrapper")[0] as HTMLElement;
      const imageLine = q(".image-line")[0] as HTMLElement;
      const imageItems = q(".image-line > button");

      if (
        !listWrapper ||
        !listLine ||
        !listItems.length ||
        !imageWrapper ||
        !imageLine ||
        !imageItems.length
      ) {
        return;
      }

      // Initial state
      gsap.set(listWrapper, { pointerEvents: "auto" });
      gsap.set(imageWrapper, { pointerEvents: "none" });

      const timeline = gsap.timeline({
        paused: true,

        onStart: () => {
          gsap.set(listWrapper, { pointerEvents: "none" });
          gsap.set(imageWrapper, { pointerEvents: "auto" });
        },

        onReverseComplete: () => {
          gsap.set(listWrapper, { pointerEvents: "auto" });
          gsap.set(imageWrapper, { pointerEvents: "none" });
        },
      });

      timeline.fromTo(
        listItems,
        { xPercent: 0, opacity: 1 },
        {
          xPercent: -100,
          opacity: 0,
          duration: 2,
          ease: "power4.inOut",
          stagger: {
            each: 0.2,
            from: "start",
          },
        },
      );

      timeline.fromTo(
        imageItems,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,

          duration: 2,
          ease: "power4.inOut",
          stagger: {
            each: 0.2,
            from: "start",
          },
        },
      );

      const items = q(".project-item");

      items.forEach((item) => {
        const inner = item.querySelector(".project-text-inner");
        if (!inner) return;

        gsap.set(inner, {
          y: "-8rem",
          willChange: "transform",
        });

        item.addEventListener("mouseenter", ((e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = item.getBoundingClientRect();
          const relativeY = mouseEvent.clientY - rect.top;
          const isFromTop = relativeY < rect.height / 2;

          gsap.set(inner, { y: isFromTop ? "-8rem" : 0 });
          gsap.to(inner, {
            y: "-4rem",
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto",
          });
        }) as EventListener);

        item.addEventListener("mouseleave", ((e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = item.getBoundingClientRect();
          const relativeY = mouseEvent.clientY - rect.top;
          const isToTop = relativeY < rect.height / 2;

          gsap.to(inner, {
            y: isToTop ? "-8rem" : 0,
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto",
          });
        }) as EventListener);
      });

      tl.current = timeline;
    },
    { scope: container, dependencies: [projects] },
  );

  return { container, tl };
}
