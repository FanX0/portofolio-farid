import type { Project } from "@/shared/types/project";
import type { RefObject } from "react";

export type SectionRefs = {
  heroRef: RefObject<HTMLElement | null>;
  aboutRef: RefObject<HTMLElement | null>;
  projectRef: RefObject<HTMLElement | null>;
  contactRef: RefObject<HTMLElement | null>;
};

export type HeroSectionProps = {
  projects: Project[];
  isLoading?: boolean;
  onIntroComplete?: () => void;
  sectionRefs?: SectionRefs;
};
