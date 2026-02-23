import type { HeroSectionProps } from "./hero.types";
import HeroSectionClient from "./HeroSection.client";

export default function HeroSection(props: HeroSectionProps) {
  return <HeroSectionClient {...props} />;
}
