import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const TextClipPath = ({
  children,
  className,
  startDesktop,
  endDesktop,
  startMobile,
  endMobile,
}: {
  children: ReactNode;
  className: string;
  startDesktop?: string;
  endDesktop?: string;
  startMobile?: string;
  endMobile?: string;
}) => {
  const container = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const split = new SplitText(container.current, { type: "chars" });

      gsap.set(split.chars, { display: "inline", color: "#404040" });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 64rem)", () => {
        gsap.to(split.chars, {
          color: "#ffffff",
          ease: "none",
          stagger: 0.6,
          scrollTrigger: {
            trigger: container.current,
            start: startDesktop,
            end: endDesktop,
            scrub: true,
          },
        });
      });
      mm.add("(max-width: 63.9rem)", () => {
        gsap.to(split.chars, {
          color: "#ffffff",
          ease: "none",
          stagger: 0.6,
          scrollTrigger: {
            trigger: container.current,
            start: startMobile,
            end: endMobile,
            scrub: true,
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <p className={className} ref={container}>
      {children}
    </p>
  );
};

export default TextClipPath;
