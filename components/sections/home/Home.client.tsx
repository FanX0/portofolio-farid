"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/hero/HeroSection.server";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/nav/Navbar.server";
import LogoTransition from "@/components/common/logotransition/LogoTransition.server";

import type { Project } from "@/shared/types/project";
import Sidebar from "@/components/layout/sidebar/Sidebar.server";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { lockScroll, unlockScroll } from "@/shared/lib/utils/scrollLock";

import AboutSection from "@/components/sections/about/AboutSection.server";
import LazySection from "@/components/common/LazySection";

import AvatarSection from "@/components/sections/avatar/AvatarSection.server";
import ProjectSection from "@/components/sections/project/ProjectSection.server";
import ContactSection from "@/components/sections/contact/ContactSection.server";
import ProjectScrollSection from "@/components/sections/project-scroll/ProjectScrollSection.server";

type HomeClientProps = {
  projects: Project[];
};

export default function HomeClient({ projects }: HomeClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // use useLayoutEffect instead of useEffect to force scroll position before paint
  const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const applyScrollLock = () => {
      const lenis = window.lenis;

      if (isLoading) {
        // Lock both native scroll and Lenis
        lockScroll();
        if (!lenis) {
          // lenis might not be initialized yet on first render, try again next frame
          requestAnimationFrame(applyScrollLock);
        }
      } else {
        // Unlock native scroll and Lenis
        unlockScroll();

        const injectedStyle = document.getElementById("pre-paint-scroll-lock");
        if (injectedStyle) {
          injectedStyle.remove();
        }
      }
    };

    applyScrollLock();
    
    return () => {
      // Ensure we unlock on unmount if we were still loading
      unlockScroll();
    };
  }, [isLoading]);

  useEffect(() => {
    const breakpoint = 1024;
    const lastWasMobile = window.innerWidth < breakpoint;

    const handleResize = () => {
      const isMobile = window.innerWidth < breakpoint;
      if (isMobile !== lastWasMobile) {
        window.location.reload();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
      `}} />
      <header className="fixed top-0 w-full z-50 text-white mix-blend-difference">
        <Navbar 
          onToggle={toggleSidebar} 
          isOpen={isSidebarOpen} 
          isLoading={isLoading}
          sectionRefs={{ heroRef, aboutRef, projectRef, contactRef }}
        />
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <main>
        <article>
          <section ref={heroRef} id="hero" aria-label="Hero" className="bg-[var(--white-color)]">
            <HeroSection 
              projects={projects} 
              isLoading={isLoading} 
              onIntroComplete={() => setIsLoading(false)}
              sectionRefs={{ heroRef, aboutRef, projectRef, contactRef }}
            />
          </section>
          <div className="relative">
            <section aria-label="Logo Transition" className="absolute top-0 left-0 w-full h-screen z-10 pointer-events-none">
              <LogoTransition />
            </section>
            <section ref={aboutRef} id="about" aria-label="About">
              <AboutSection />
              <LazySection height="600px">
                <AvatarSection />
              </LazySection>
            </section>
          </div>
          <section ref={projectRef} id="project" aria-label="Project">
            <LazySection height="800px">
              <ProjectScrollSection projects={projects} />
            </LazySection>
            <LazySection height="1000px">
              <ProjectSection projects={projects} />
            </LazySection>
          </section>
          <section ref={contactRef} id="contact" aria-label="Contact">
            <LazySection height="600px">
              <ContactSection />
            </LazySection>
          </section>
        </article>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
