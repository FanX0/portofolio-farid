import AboutSection from "@/app/components/sections/AboutSection";
import AvatarSection from "@/app/components/sections/AvatarSection";
import ContactSection from "@/app/components/sections/ContactSection";
import Footer from "@/app/components/layout/Footer";
import HeroSection from "@/app/components/sections/HeroSection";
import Nav from "@/app/components/layout/Nav";
import ProjectSection from "./components/sections/ProjectSection";
import ProjectAnimationSection from "./components/sections/ProjectAnimationSection";
import { getProjects } from "@/app/lib/sanity/queries";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <header className="fixed top-0 w-full z-50 text-white mix-blend-difference">
        <Nav />
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
            <ProjectAnimationSection projects={projects} />
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
