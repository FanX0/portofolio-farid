import gsap, { Draggable } from "@/shared/lib/gsap";

type ProjectAnimationParams = {
  container: HTMLElement;
};

export function initProjectAnimation({ container }: ProjectAnimationParams) {
  const q = gsap.utils.selector(container);

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

  const tl = gsap.timeline({
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

  // --- Image Draggable ---
  const minImageY = Math.min(
    0,
    imageWrapper.clientHeight - imageLine.scrollHeight,
  );

  Draggable.create(imageLine, {
    type: "y",
    inertia: true,
    edgeResistance: 0.9,
    zIndexBoost: false,

    onRelease() {
      const currentMinImageY = Math.min(
        0,
        imageWrapper.clientHeight - imageLine.scrollHeight,
      );

      const y = gsap.getProperty(imageLine, "y") as number;

      if (y > 0) {
        gsap.to(imageLine, { y: 0, duration: 0.8, ease: "expo.out" });
      } else if (y < currentMinImageY) {
        gsap.to(imageLine, {
          y: currentMinImageY,
          duration: 0.8,
          ease: "expo.out",
        });
      }
    },
  });

  tl.fromTo(
    listItems,
    { xPercent: 0 },
    {
      xPercent: -100,

      duration: 2,
      ease: "power4.inOut",
      stagger: {
        each: 0.2,
        from: "start",
      },
    },
  );

  tl.fromTo(
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

      // Hard-set starting position based on enter direction
      gsap.set(inner, { y: isFromTop ? 0 : "-8rem" });
      // Animate to center (hover state)
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

      // Animate to exit direction (top child or bottom child)
      gsap.to(inner, {
        y: isToTop ? 0 : "-8rem",
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    }) as EventListener);
  });

  return { tl };
}
