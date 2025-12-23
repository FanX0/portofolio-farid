import About from "./components/About";
import Avatar from "./components/Avatar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Nav from "./components/Nav";
import Project from "./components/Project";
import ProjectAnimation from "./components/ProjectAnimation";
import RulerDev from "./components/RulerDev";

export default function HomePage() {
  return (
    <>
      <RulerDev />
      <header className="fixed top-0 w-full z-50 text-white mix-blend-difference">
        <Nav />
      </header>
      <main>
        <article>
          <section className=" ">
            <HeroSection />
          </section>
          <section>
            <About />
          </section>
          <section>
            <Avatar />
          </section>
          <section>
            <ProjectAnimation />
            <Project />
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
