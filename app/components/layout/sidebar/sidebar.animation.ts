import gsap from "@/app/lib/gsap";

type SidebarAnimationParams = {
  container: HTMLElement;
};

export default function initSidebarAnimation({
  container,
}: SidebarAnimationParams) {
  const q = gsap.utils.selector(container);

  const tlOpen = gsap.timeline({ paused: true });

  tlOpen.fromTo(
    container,
    {
      y: "-100%",
    },
    {
      y: "0%",
      duration: 0.8,
      ease: "power3.inOut",
    }
  );
  tlOpen.fromTo(
    q(".footer-line"),
    {
      scaleX: 0,
    },
    {
      scaleX: 1,
      duration: 0.8,
      ease: "power3.inOut",
    },
    1
  );

  tlOpen.fromTo(
    q(".sidebar-list"),
    {
      scaleY: 0,
    },
    {
      scaleY: 1,
      duration: 0.8,
      ease: "power3.inOut",
      stagger: 0.1,
    },
    1
  );

  tlOpen.fromTo(
    q(".sidebar-link-text"),
    {
      y: "100%",
    },
    {
      y: "0%",
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    },
    2
  );

  const tlClose = gsap.timeline({ paused: true });

  tlClose.fromTo(
    container,
    {
      y: "0%",
    },
    {
      y: "100%",
      duration: 0.8,
      ease: "power3.inOut",
    }
  );
  tlClose.set(
    q(".footer-line"),
    {
      scaleX: 1,
    },
    0
  );
  tlClose.set(
    q(".sidebar-link-text"),
    {
      y: 0,
    },
    0
  );

  return { tlOpen, tlClose };
}
