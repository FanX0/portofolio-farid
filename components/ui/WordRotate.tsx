"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface WordRotateProps {
  words: string[];
  className?: string;
}

export default function WordRotate({ words, className }: WordRotateProps) {
  const rotatorRef = useRef<HTMLSpanElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Wait for fonts to load before starting animations
  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  useGSAP(
    () => {
      if (!fontsLoaded) return;

      const rotator = rotatorRef.current;
      const wordEls = wordsRef.current.filter(
        (el): el is HTMLSpanElement => el !== null,
      );

      if (!rotator || wordEls.length === 0) return;

      // 1. ABSOLUTE RESET: Clear any residual GSAP styles from previous runs/re-renders
      gsap.killTweensOf([rotator, ...wordEls]);
      gsap.set(wordEls, { clearProps: "all" });
      
      // 2. Initial Setup (Immediate)
      gsap.set(wordEls, { 
        position: "absolute",
        top: 0,
        left: 0,
        yPercent: 100, 
        autoAlpha: 0, 
        display: "block",
        pointerEvents: "none"
      });
      
      // Show first word
      gsap.set(wordEls[0], { yPercent: 0, autoAlpha: 1, pointerEvents: "auto" });
      gsap.set(rotator, { width: wordEls[0].offsetWidth, autoAlpha: 1 });

      // 3. Build Timeline
      const mainTl = gsap.timeline({ repeat: -1 });

      wordEls.forEach((word, i) => {
        const next = wordEls[(i + 1) % wordEls.length];
        const swapLabel = `swap-${i}`;

        mainTl.to({}, { duration: 2.5 }); // Wait
        mainTl.add(swapLabel);

        // Current word: OUT (Up)
        mainTl.to(word, {
          yPercent: -100,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power4.inOut",
          pointerEvents: "none"
        }, swapLabel);

        // Next word: IN (From Bottom)
        mainTl.fromTo(next, 
          { yPercent: 100, autoAlpha: 0, pointerEvents: "none" },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power4.inOut",
            pointerEvents: "auto",
            immediateRender: false
          }, 
          swapLabel
        );

        // Container: RESIZE
        mainTl.to(rotator, {
          width: next.offsetWidth,
          duration: 0.8,
          ease: "power4.inOut",
        }, swapLabel);

        // CRITICAL: Only reset the old word AFTER the swap animation finishes
        mainTl.set(word, { yPercent: 100, autoAlpha: 0 }, `+=0.8`);
      });

      return () => {
        mainTl.kill();
        gsap.killTweensOf([rotator, ...wordEls]);
      };
    },
    { scope: rotatorRef, dependencies: [fontsLoaded, words] },
  );

  return (
    <span
      ref={rotatorRef}
      className={`inline-flex relative overflow-hidden items-center ${className ?? ""}`}
      style={{
        height: "1.4em",
        verticalAlign: "middle",
        visibility: "hidden",
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          ref={(el) => {
            wordsRef.current[i] = el;
          }}
          style={{
            whiteSpace: "nowrap",
            willChange: "transform, opacity",
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
