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
    // Lock both html and body — required for full cross-browser scroll prevention
    if (isLoading) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Restore defaults — use "" not "auto" to avoid overriding CSS
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.documentElement.style.paddingRight = "";
      
      const injectedStyle = document.getElementById("pre-paint-scroll-lock");
      if (injectedStyle) {
        injectedStyle.remove();
      }

      // ScrollTrigger cached its measurements while overflow was hidden.
      // Recalculate after the layout reflows so pin spacers and scroll
      // distances are correct — this prevents the scroll-jump bug.
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    }
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
        
        // Only run on initial load when isLoading is true
        if (document.readyState === 'loading' || !document.getElementById('pre-paint-scroll-lock')) {
          var sbw = window.innerWidth - document.documentElement.clientWidth;
          var style = document.createElement('style');
          style.id = 'pre-paint-scroll-lock';
          style.innerHTML = 'html, body { overflow: hidden !important; padding-right: ' + sbw + 'px !important; }';
          document.head.appendChild(style);
        }
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
          <section aria-label="Logo Transition" className="relative h-dvh flex items-center justify-center bg-[var(--white-color)]">
            <LogoTransition />
          </section>
          <section ref={aboutRef} id="about" aria-label="About">
            <AboutSection />
          </section>
          <section ref={projectRef} id="project" aria-label="Project">
            <AvatarSection />
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
