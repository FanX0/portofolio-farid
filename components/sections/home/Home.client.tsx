"use client";

import HeroSection from "@/components/sections/hero/HeroSection.server";
import AboutSection from "@/components/sections/about/AboutSection.server";
import AvatarSection from "@/components/sections/avatar/AvatarSection.server";
import ContactSection from "@/components/sections/contact/ContactSection.server";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/nav/Navbar.server";
import ProjectSection from "@/components/sections/project/ProjectSection.server";
import ProjectScrollSection from "@/components/sections/project-scroll/ProjectScrollSection.server";
import type { Project } from "@/shared/types/project";
import Sidebar from "@/components/layout/sidebar/Sidebar.server";
import { useState } from "react";

type HomeClientProps = {
  projects: Project[];
};

export default function HomeClient({ projects }: HomeClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 text-white mix-blend-difference">
        <Navbar onToggle={toggleSidebar} isOpen={isSidebarOpen} />
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <main>
        <article>
          <section aria-label="Hero">
            <HeroSection projects={projects} />
          </section>
          <section aria-label="About">
            <AboutSection />
          </section>
          <section aria-label="Project">
            <AvatarSection />
            <ProjectScrollSection projects={projects} />
            <ProjectSection projects={projects} />
          </section>
          <section aria-label="Contact">
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
