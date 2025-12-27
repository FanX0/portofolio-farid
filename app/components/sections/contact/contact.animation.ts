import gsap, { ScrollTrigger } from "@/app/lib/gsap";

type ContactAnimationParams = {
  container: HTMLElement;
};

export default function initContactAnimation({
  container,
}: ContactAnimationParams) {
  const q = gsap.utils.selector(container);
  const getElement = (selector: string) => q(selector)[0] as HTMLElement;

  const tlScroll = gsap.timeline({
    scrollTrigger: {
      trigger: getElement(".text-running"),
      start: "top top",
      end: "+=400%",
      scrub: true,
      pin: true,
    },
  });

  tlScroll.fromTo(
    getElement(".text-running"),
    { x: "110%" },
    { x: "-110%", ease: "power2.inOut" }
  );

  gsap.set(getElement(".mail-stamp"), { opacity: 0, scale: 2, rotate: 2 });
  gsap.set(getElement(".mail-message"), { opacity: 0, scale: 2 });

  const tlClick = gsap
    .timeline({ paused: true })
    .to(getElement(".mail-form"), { y: 500, duration: 1, ease: "power2.inOut" })
    .to(getElement(".mail-form"), { opacity: 0 })
    .to(getElement(".mail"), { y: -200, duration: 1, ease: "power2.inOut" })
    .to(q(".mail-top"), {
      scaleY: -1,
      transformOrigin: "bottom center",
      duration: 1,
    })
    .to(getElement(".mail-stamp"), {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "power2.inOut",
    })
    .to(getElement(".mail"), { x: "250%", duration: 2, ease: "power2.inOut" })
    .to(getElement(".mail"), { opacity: 0 })
    .to(getElement(".mail-message"), {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: "power2.inOut",
    })
    .set(getElement(".mail"), { opacity: 1, x: 0, y: "100%" })
    .to(getElement(".mail"), { y: "-120%", duration: 2 });

  return { tlClick };
}
