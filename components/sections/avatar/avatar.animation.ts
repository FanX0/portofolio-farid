import { useRef } from "react";
import gsap, { ScrollTrigger, useGSAP } from "@/shared/lib/gsap";


export function useAvatarAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const mm = gsap.matchMedia();
      let retryCount = 0;
      const MAX_RETRIES = 15;

      const runAnimation = (
        scrollDuration: string,
        avatarScale: number,
        hairY: number,
      ) => {
        const q = gsap.utils.selector(container.current);
        const getVector = (selector: string) => q(selector)[0] as SVGPathElement;

        // Fetch all elements fresh
        const htmlVector = getVector(".html-vector");
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

        // Critical elements check
        if (!htmlVector || !htmlLogo || !avatarEl) {
          if (retryCount < MAX_RETRIES) {
            retryCount++;
            gsap.delayedCall(0.2, () =>
              runAnimation(scrollDuration, avatarScale, hairY),
            );
          }
          return;
        }

        const vectors = [
          htmlVector, vueVector, reactVector, jsVector, nestjsVector,
          cssVector, expressVector, nuxtVector, phpVector, laravelVector,
          svelteVector, nextjsVector, tsVector, tailwindVector
        ].filter(Boolean);

        // Make icons visible immediately so they can be animated
        gsap.set(".tech-icon-group", { visibility: "visible" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: scrollDuration,
            scrub: true, // Use direct scrub for better responsiveness
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        // Initialize elements
        gsap.set(vectors, { drawSVG: 0 });
        gsap.set(avatarEl, { filter: "blur(0px) saturate(100%)" });
        gsap.set(htmlLogo, { scale: 0.8 });

        // Avatar scaling
        tl.to(avatarEl, {
          scale: avatarScale,
          ease: "power2.inOut",
        }, 0);

        // Gray effect and blur
        tl.to(avatarEl, {
          filter: "blur(5px) saturate(0%)",
          ease: "power4.in",
        }, 0.25);

        tl.to(hairEl, {
          y: hairY,
          ease: "power1.inOut",
        }, 0);

        // Tech vectors drawing
        tl.to(vectors, {
          drawSVG: "100%",
          ease: "none",
        }, 0);

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
          if (logo && vector) {
            tl.to(logo, {
              motionPath: {
                path: vector,
                align: vector,
                autoRotate: true,
                alignOrigin: [0.5, 0.5],
              },
              ease: "none",
            }, 0);
          }
        });

        // Refresh ScrollTrigger to ensure pinning and start/end are correct
        // Use a small delay to ensure the DOM and pins are settled
        gsap.delayedCall(0.1, () => {
          ScrollTrigger.refresh();
        });
      };

      mm.add(
        {
          isMobile: "(max-width: 1023px)",
          isLG: "(min-width: 1024px) and (max-width: 1279px)",
          isXL: "(min-width: 1280px) and (max-width: 1535px)",
          is2XL: "(min-width: 1536px)",
        },
        (context) => {
          const { isMobile, isLG, isXL } = context.conditions as any;
          if (isMobile) runAnimation("+=100%", 1, -150);
          else if (isLG) runAnimation("+=180%", 1.4, -250);
          else if (isXL) runAnimation("+=150%", 1.3, -250);
          else runAnimation("+=200%", 1.5, -300);
        },
      );
    },
    { scope: container },
  );

  return { container };
}
