import gsap, { ScrollTrigger, Flip } from "@/app/lib/gsap";

type HeroAnimationParams = {
  container: HTMLElement;
};

export function initHeroAnimation({ container }: HeroAnimationParams) {
  const q = gsap.utils.selector(container);

  const boxHeroImage = q(".box-hero-image")[0];
  const boxProjectImage = q(".box-project-image")[0];
  const projectImage = q(".project-image")[0];

  if (!boxHeroImage || !boxProjectImage || !projectImage) return;

  const state = Flip.getState(projectImage);
  boxProjectImage.appendChild(projectImage);

  const flipTween = Flip.from(state, {
    duration: 1,
    ease: "power3.inOut",
    paused: true,
  });

  const mm = gsap.matchMedia();

  mm.add("(min-width: 80rem)", () => {
    ScrollTrigger.create({
      trigger: boxHeroImage,
      start: "center center",
      end: "+=700",
      scrub: true,
      animation: flipTween,
    });
  });

  mm.add("(max-width: 79.9rem)", () => {
    ScrollTrigger.create({
      trigger: boxHeroImage,
      start: "center center",
      end: "+=1000",
      scrub: true,
      animation: flipTween,
    });
  });

  return () => {
    mm.revert();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}
