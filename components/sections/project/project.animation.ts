import gsap, { Draggable } from "@/app/lib/gsap";

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
    imageWrapper.clientHeight - imageLine.scrollHeight
  );

  Draggable.create(imageLine, {
    type: "y",
    inertia: true,
    edgeResistance: 0.9,

    onRelease() {
      const currentMinImageY = Math.min(
        0,
        imageWrapper.clientHeight - imageLine.scrollHeight
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
    }
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
    }
  );

  const items = q(".project-item");

  items.forEach((item) => {
    const inner = item.querySelector(".project-text-inner");
    if (!inner) return;

    gsap.set(inner, {
      y: "-8rem",
      willChange: "transform",
    });

    item.addEventListener("mouseenter", () => {
      gsap.to(inner, { y: "-4rem", duration: 0.45, ease: "power3.out" });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(inner, { y: 0, duration: 0.45, ease: "power3.out" });
    });
  });

  return { tl };
}
