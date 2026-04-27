import NavbarClient from "./Navbar.client";
import type { RefObject } from "react";

type SectionRefs = {
  heroRef: RefObject<HTMLElement | null>;
  aboutRef: RefObject<HTMLElement | null>;
  projectRef: RefObject<HTMLElement | null>;
  contactRef: RefObject<HTMLElement | null>;
};

type NavbarProps = {
  onToggle: () => void;
  isOpen: boolean;
  isLoading: boolean;
  onIntroComplete?: () => void;
  sectionRefs: SectionRefs;
};

export default function Navbar({ onToggle, isOpen, isLoading, onIntroComplete, sectionRefs }: NavbarProps) {
  return (
    <NavbarClient
      onToggle={onToggle}
      isOpen={isOpen}
      isLoading={isLoading}
      onIntroComplete={onIntroComplete}
      sectionRefs={sectionRefs}
    />
  );
}
