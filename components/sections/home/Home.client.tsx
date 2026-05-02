"use client";

import HeroSection from "@/components/sections/hero/HeroSection.server";
import AboutSection from "@/components/sections/about/AboutSection.server";
import AvatarSection from "@/components/sections/avatar/AvatarSection.server";
import ContactSection from "@/components/sections/contact/ContactSection.server";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/nav/Navbar.server";
import LogoTransition from "@/components/common/logotransition/LogoTransition.server";
import ProjectSection from "@/components/sections/project/ProjectSection.server";
import ProjectScrollSection from "@/components/sections/project-scroll/ProjectScrollSection.server";
import type { Project } from "@/shared/types/project";
import Sidebar from "@/components/layout/sidebar/Sidebar.server";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { ScrollTrigger } from "@/shared/lib/gsap";

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
      // @ts-expect-error - Accessing global lenis instance
      const lenis = window.lenis;

      if (isLoading) {
        // Lock both native scroll and Lenis
        document.documentElement.style.overflow = "hidden";
        if (lenis) {
          lenis.stop();
        } else {
          // lenis might not be initialized yet on first render, try again next frame
          requestAnimationFrame(applyScrollLock);
        }
      } else {
        // Unlock native scroll and Lenis
        document.documentElement.style.overflow = "";
        if (lenis) lenis.start();

        const injectedStyle = document.getElementById("pre-paint-scroll-lock");
        if (injectedStyle) {
          injectedStyle.remove();
        }
      }
    };

    applyScrollLock();
    
    return () => {
      // Ensure we unlock on unmount if we were still loading
      document.documentElement.style.overflow = "";
    };
  }, [isLoading]);

  // Reload page when layout crosses a major breakpoint (mobile ↔ desktop).
  // Complex GSAP ScrollTrigger animations with pins, scrub, and matchMedia
  // can't always cleanly re-initialize on resize — a reload is the safest fix.
  useEffect(() => {
    const breakpoint = 1024;
    let lastWasMobile = window.innerWidth < breakpoint;

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
              <AvatarSection />
            </section>
          </div>
          <section ref={projectRef} id="project" aria-label="Project">
            <ProjectScrollSection projects={projects} />
            <ProjectSection projects={projects} />
          </section>
          <section ref={contactRef} id="contact" aria-label="Contact">
            <ContactSection />
          </section>
        </article>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
