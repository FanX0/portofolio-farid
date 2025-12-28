"use client";

import HeroSection from "@/app/components/sections/hero/HeroSection.server";
import AboutSection from "@/app/components/sections/about/AboutSection.server";
import AvatarSection from "@/app/components/sections/avatar/AvatarSection.server";
import ContactSection from "@/app/components/sections/contact/ContactSection.server";
import Footer from "@/app/components/layout/Footer";
import Navbar from "@/app/components/layout/nav/Navbar.server";
import ProjectSection from "@/app/components/sections/project/ProjectSection.server";
import ProjectScrollSection from "@/app/components/sections/project-scroll/ProjectScrollSection.server";
import type { Project } from "@/app/types/project";
import Sidebar from "@/app/components/layout/sidebar/Sidebar.server";
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
      {/* <RulerDev /> */}
      <header className="fixed top-0 w-full z-50 text-white mix-blend-difference">
        <Navbar onToggle={toggleSidebar} />
      </header>
      <Sidebar isOpen={isSidebarOpen} />
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
