import gsap from "gsap";

export default function initSidebarLinkAnimation(target: SVGSVGElement) {
  const tl = gsap.timeline({ paused: true, repeat: -1 });

  tl.to(target, {
    yPercent: -150,
    xPercent: 150,
    duration: 0.3,
    ease: "power2.in",
  })
    .set(target, { yPercent: 150, xPercent: -150 })
    .to(target, {
      yPercent: 0,
      xPercent: 0,
      duration: 0.3,
      ease: "power2.out",
    })
    .to({}, { duration: 0.1 });

  return tl;
}
