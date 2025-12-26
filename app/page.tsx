import About from "./components/About";
import Avatar from "./components/Avatar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Nav from "./components/Nav";
import Project from "./components/Project";
import ProjectAnimation from "./components/ProjectAnimation";
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
            <About />
          </section>
          <section>
            <Avatar />
          </section>
          <section>
            <ProjectAnimation projects={projects} />
            <Project projects={projects} />
          </section>
          <section>
            <Contact />
          </section>
        </article>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
