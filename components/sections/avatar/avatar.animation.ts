import gsap, { ScrollTrigger } from "@/app/lib/gsap";

type AboutAnimationParams = {
  container: HTMLElement;
};

export function initAvatarAnimation({ container }: AboutAnimationParams) {
  const q = gsap.utils.selector(container);
  const getVector = (selector: string) =>
    q(selector)[0] as Element as SVGPathElement;

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

  const mm = gsap.matchMedia();

  const runAnimation = (scrollDuration: string, avatarScale: number) => {
    if (!htmlVector || !htmlLogo) return;

    ScrollTrigger.create({
      trigger: container,
      start: "center center",
      end: scrollDuration,
      scrub: true,
      pin: true,
    });

    gsap.to(".avatar", {
      scale: avatarScale,
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=50%",
        scrub: true,
      },
    });
    gsap.to(".hair", {
      y: -300,
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=100%",
        scrub: true,
      },
    });

    gsap.set(htmlLogo, { scale: 0.8 });

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
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: scrollDuration,
        scrub: true,
      },
    });

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
        duration: 5,
        drawSVG: "100%",
        ease: "power1.inOut",
      }
    );

    tl.to(
      [htmlLogo],
      {
        duration: 5,
        ease: "power1.inOut",

        motionPath: {
          path: htmlVector,
          align: htmlVector,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      },
      0
    );
    tl.to(
      [vueLogo],
      {
        duration: 5,
        ease: "power1.inOut",
        motionPath: {
          path: vueVector,
          align: vueVector,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      },
      0
    );
    tl.to(
      [reactLogo],
      {
        duration: 5,
        ease: "power1.inOut",
        motionPath: {
          path: reactVector,
          align: reactVector,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      },
      0
    );
    tl.to(
      [jsLogo],
      {
        duration: 5,
        ease: "power1.inOut",
        motionPath: {
          path: jsVector,
          align: jsVector,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      },
      0
    );
    tl.to(
      [nestjsLogo],
      {
        duration: 5,
        ease: "power1.inOut",
        motionPath: {
          path: nestjsVector,
          align: nestjsVector,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      },
      0
    );
    tl.to(
      [cssLogo],
      {
        duration: 5,
        ease: "power1.inOut",
        motionPath: {
          path: cssVector,
          align: cssVector,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      },
      0
    );
    tl.to(
      [expressLogo],
      {
        duration: 5,
        ease: "power1.inOut",
        motionPath: {
          path: expressVector,
          align: expressVector,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      },
      0
    );
    tl.to(
      [nuxtLogo],
      {
        duration: 5,
        ease: "power1.inOut",
        motionPath: {
          path: nuxtVector,
          align: nuxtVector,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      },
      0
    );
    tl.to(
      [phpLogo],
      {
        duration: 5,
        ease: "power1.inOut",
        motionPath: {
          path: phpVector,
          align: phpVector,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      },
      0
    );
    tl.to(
      [laravelLogo],
      {
        duration: 5,
        ease: "power1.inOut",
        motionPath: {
          path: laravelVector,
          align: laravelVector,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      },
      0
    );
    tl.to(
      [svelteLogo],
      {
        duration: 5,
        ease: "power1.inOut",
        motionPath: {
          path: svelteVector,
          align: svelteVector,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      },
      0
    );
    tl.to(
      [nextjsLogo],
      {
        duration: 5,
        ease: "power1.inOut",
        motionPath: {
          path: nextjsVector,
          align: nextjsVector,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      },
      0
    );
    tl.to(
      [tsLogo],
      {
        duration: 5,
        ease: "power1.inOut",
        motionPath: {
          path: tsVector,
          align: tsVector,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      },
      0
    );
    tl.to(
      [tailwindLogo],
      {
        duration: 5,
        ease: "power1.inOut",
        motionPath: {
          path: tailwindVector,
          align: tailwindVector,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
      },
      0
    );

    tl.fromTo(
      ".avatar",
      { filter: "blur(0px) saturate(100%)" },
      {
        duration: 2,
        ease: "power1.inOut",
        filter: "blur(5px) saturate(0%)",
      }
    );
  };

  mm.add("(min-width: 64rem)", () => {
    runAnimation("+=200%", 1.5);
  });

  mm.add("(max-width: 63.9rem)", () => {
    runAnimation("+=100%", 1);
  });
}
