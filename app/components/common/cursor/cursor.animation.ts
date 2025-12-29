import gsap from "@/app/lib/gsap";

type CursorAnimationParams = {
  container: HTMLDivElement;
};

export default function initCursorAnimation({
  container,
}: CursorAnimationParams) {
  const q = gsap.utils.selector(container);
  const cursor = container;
  const cursorText = q(".cursor-text")[0];

  // center cursor
  gsap.set(cursor, { xPercent: -50, yPercent: -50 });

  const xTo = gsap.quickTo(cursor, "x", {
    duration: 0.4,
    ease: "power3.out",
  });

  const yTo = gsap.quickTo(cursor, "y", {
    duration: 0.4,
    ease: "power3.out",
  });

  const moveCursor = (e: MouseEvent) => {
    xTo(e.clientX);
    yTo(e.clientY);
  };

  const showText = (text: string) => {
    cursorText.textContent = text;
    gsap.to(cursorText, {
      opacity: 1,
      scale: 0.1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const hideText = () => {
    gsap.to(cursorText, {
      opacity: 0,
      scale: 0.8,
      duration: 0.2,
      ease: "power2.in",
    });
  };

  const onHover = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(".box-hero-link")) {
      gsap.to(cursor, {
        autoAlpha: 0,
        duration: 0.3,
        overwrite: "auto",
      });
    }
    if (target.closest(".nav-name")) {
      gsap.to(cursor, {
        scale: 9,
        borderRadius: "50%",
        backgroundColor: "purple",
        duration: 0.3,
      });
      showText("That's me!");
    }
    if (target.closest(".sidebar-toggle")) {
      gsap.to(cursor, {
        scale: 9,
        borderRadius: "50%",
        backgroundColor: "purple",
        duration: 0.3,
      });
      showText("Click");
    }
    if (target.closest(".about-link")) {
      gsap.to(cursor, {
        autoAlpha: 0,
        duration: 0.3,
        overwrite: "auto",
      });
    }
    if (target.closest(".project-link")) {
      gsap.to(cursor, {
        autoAlpha: 0,
        duration: 0.3,
        overwrite: "auto",
      });
    }
    if (target.closest(".contact-link")) {
      gsap.to(cursor, {
        autoAlpha: 0,
        duration: 0.3,
        overwrite: "auto",
      });
    }
  };

  const onLeave = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    const boxLink = target.closest(".box-hero-link");
    if (boxLink && !boxLink.contains(e.relatedTarget as Node)) {
      gsap.to(cursor, {
        autoAlpha: 1,
        duration: 0.3,
        overwrite: "auto",
      });
    }

    const navName = target.closest(".nav-name");

    if (navName && !navName.contains(e.relatedTarget as Node)) {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: "", // Clear inline style to revert to CSS class
        duration: 0.3,
      });
      hideText();
    }
    const sidebarToggle = target.closest(".sidebar-toggle");
    if (sidebarToggle && !sidebarToggle.contains(e.relatedTarget as Node)) {
      gsap.to(cursor, {
        autoAlpha: 1,
        duration: 0.3,
        overwrite: "auto",
      });
    }
    const aboutLink = target.closest(".about-link");
    if (aboutLink && !aboutLink.contains(e.relatedTarget as Node)) {
      gsap.to(cursor, {
        autoAlpha: 1,
        duration: 0.3,
        overwrite: "auto",
      });
    }
    const projectLink = target.closest(".project-link");
    if (projectLink && !projectLink.contains(e.relatedTarget as Node)) {
      gsap.to(cursor, {
        autoAlpha: 1,
        duration: 0.3,
        overwrite: "auto",
      });
    }
    const contactLink = target.closest(".contact-link");
    if (contactLink && !contactLink.contains(e.relatedTarget as Node)) {
      gsap.to(cursor, {
        autoAlpha: 1,
        duration: 0.3,
        overwrite: "auto",
      });
    }
  };

  window.addEventListener("mousemove", moveCursor);
  window.addEventListener("mouseover", onHover);
  window.addEventListener("mouseout", onLeave);

  // ✅ IMPORTANT: cleanup
  return () => {
    window.removeEventListener("mousemove", moveCursor);
    window.removeEventListener("mouseover", onHover);
    window.removeEventListener("mouseout", onLeave);
  };
}
