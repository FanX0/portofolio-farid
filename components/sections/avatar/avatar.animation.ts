import { useRef } from "react";
import gsap, { ScrollTrigger, useGSAP } from "@/shared/lib/gsap";


export function useAvatarAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      // Disable lag smoothing to prevent 'jumps' on initial load when JS is busy
      gsap.ticker.lagSmoothing(0);

      const q = gsap.utils.selector(container.current);
      const getVector = (selector: string) =>
        q(selector)[0] as Element as SVGPathElement;

      getVector(".html-vector");
      const htmlLogo = q(".html-logo")[0];
      const vueVector = getVector(".vue-vector");
      const vueLogo = q(".vue-logo")[0];
      const reactVector = getVector(".react-vector");
      const reactLogo = q(".react-logo")[0];
      const jsVector = getVector(".js-vector");
      const jsLogo = q(".js-logo")[0];
      const nestjsVector = getVector(".nestjs-vector");
      const nestjsLogo = q(".nestjs-logo")[0];
      const cssVector = getVector(".css-vector");
      const cssLogo = q(".css-logo")[0];
      const expressVector = getVector(".express-vector");
      const expressLogo = q(".express-logo")[0];
      const nuxtVector = getVector(".nuxt-vector");
      const nuxtLogo = q(".nuxt-logo")[0];
      const phpVector = getVector(".php-vector");
      const phpLogo = q(".php-logo")[0];
      const laravelVector = getVector(".laravel-vector");
      const laravelLogo = q(".laravel-logo")[0];
      const svelteVector = getVector(".svelte-vector");
      const svelteLogo = q(".svelte-logo")[0];
      const nextjsVector = getVector(".nextjs-vector");
      const nextjsLogo = q(".nextjs-logo")[0];
      const tsVector = getVector(".ts-vector");
      const tsLogo = q(".ts-logo")[0];
      const tailwindVector = getVector(".tailwind-vector");
      const tailwindLogo = q(".tailwind-logo")[0];

      const avatarEl = q(".avatar")[0];
      const hairEl = q(".hair")[0];

      const mm = gsap.matchMedia();

      let retryCount = 0;
      const MAX_RETRIES = 10;

      const runAnimation = (
        scrollDuration: string,
        avatarScale: number,
        hairY: number,
      ) => {
        const htmlVector = getVector(".html-vector");
        if (!htmlVector) {
          // SVG paths aren't rendered yet (race condition on initial load).
          // Retry after a short delay so the animation actually gets created.
          if (retryCount < MAX_RETRIES) {
            retryCount++;
            gsap.delayedCall(0.15, () =>
              runAnimation(scrollDuration, avatarScale, hairY),
            );
          }
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: scrollDuration,
            scrub: 1.5,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        // Initialize elements
        gsap.set(
          [
            htmlVector,
            vueVector,
            reactVector,
            jsVector,
            nestjsVector,
            cssVector,
            expressVector,
            nuxtVector,
            phpVector,
            laravelVector,
            svelteVector,
            nextjsVector,
            tsVector,
            tailwindVector,
          ],
          {
            drawSVG: 0,
          },
        );
        // Initial state
        gsap.set(avatarEl, { filter: "blur(0px) saturate(100%)" });
        gsap.set(htmlLogo, { scale: 0.8 });

        // Avatar scaling - happens over full duration
        tl.to(
          avatarEl,
          {
            scale: avatarScale,
            ease: "power2.inOut",
          },
          0,
        );

        // Gray effect and blur - starts halfway through the animation (at 0.25s of 0.5s default)
        tl.to(
          avatarEl,
          {
            filter: "blur(5px) saturate(0%)",
            ease: "power4.in",
          },
          0.25,
        );

        tl.to(
          hairEl,
          {
            y: hairY,
            ease: "power1.inOut",
          },
          0,
        );

        // Tech vectors drawing
        tl.to(
          [
            htmlVector,
            vueVector,
            reactVector,
            jsVector,
            nestjsVector,
            cssVector,
            expressVector,
            nuxtVector,
            phpVector,
            laravelVector,
            svelteVector,
            nextjsVector,
            tsVector,
            tailwindVector,
          ],
          {
            drawSVG: "100%",
            ease: "none",
          },
          0,
        );

        // Logos motion paths
        const logos = [
          { logo: htmlLogo, vector: htmlVector },
          { logo: vueLogo, vector: vueVector },
          { logo: reactLogo, vector: reactVector },
          { logo: jsLogo, vector: jsVector },
          { logo: nestjsLogo, vector: nestjsVector },
          { logo: cssLogo, vector: cssVector },
          { logo: expressLogo, vector: expressVector },
          { logo: nuxtLogo, vector: nuxtVector },
          { logo: phpLogo, vector: phpVector },
          { logo: laravelLogo, vector: laravelVector },
          { logo: svelteLogo, vector: svelteVector },
          { logo: nextjsLogo, vector: nextjsVector },
          { logo: tsLogo, vector: tsVector },
          { logo: tailwindLogo, vector: tailwindVector },
        ];

        logos.forEach(({ logo, vector }) => {
          tl.to(
            logo,
            {
              motionPath: {
                path: vector,
                align: vector,
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
              },
              ease: "none",
            },
            0,
          );
        });

        // Make icons visible now that GSAP has parsed timeline
        gsap.set(".tech-icon-group", { visibility: "visible" });

        // Force a refresh after a small delay to ensure layout is settled on reload
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 500);
      };

      mm.add(
        {
          isMobile: "(max-width: 1023px)",
          isLG: "(min-width: 1024px) and (max-width: 1279px)",
          isXL: "(min-width: 1280px) and (max-width: 1535px)",
          is2XL: "(min-width: 1536px)",
        },
        (context) => {
          const conditions = context.conditions as {
            isMobile: boolean;
            isLG: boolean;
            isXL: boolean;
            is2XL: boolean;
          };
          const { isMobile, isLG, isXL } = conditions;

          if (isMobile) {
            runAnimation("+=100%", 1, -150);
          } else if (isLG) {
            runAnimation("+=180%", 1.4, -250);
          } else if (isXL) {
            runAnimation("+=150%", 1.3, -250);
          } else {
            // 2XL
            runAnimation("+=200%", 1.5, -300);
          }
        },
      );
    },
    { scope: container },
  );

  return { container };
}
