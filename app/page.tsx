import HeroSection from "@/app/components/sections/hero/HeroSection.server";
import AboutSection from "@/app/components/sections/about/AboutSection.server";
import AvatarSection from "@/app/components/sections/avatar/AvatarSection.server";
import ContactSection from "@/app/components/sections/contact/ContactSection.server";
import Footer from "@/app/components/layout/Footer";
import Navbar from "@/app/components/layout/nav/Navbar.server";
import ProjectSection from "./components/sections/project/ProjectSection.server";
import { getProjects } from "@/app/lib/sanity/queries";
import ProjectScrollSection from "./components/sections/project-scroll/ProjectScrollSection.server";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <header className="fixed top-0 w-full z-50 text-white mix-blend-difference">
        <Navbar />
      </header>
      <main>
        <article>
          <section className=" ">
            <HeroSection projects={projects} />
          </section>
          <section>
            <AboutSection />
          </section>
          <section>
            <AvatarSection />
          </section>
          <section>
            <ProjectScrollSection projects={projects} />
            <ProjectSection projects={projects} />
          </section>
          <section>
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
