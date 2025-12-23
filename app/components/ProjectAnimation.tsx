"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState, useRef, useEffect } from "react";
import type { Project } from "@/app/types/project";
import Image from "next/image";

const ProjectAnimation = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const container = useRef<HTMLDivElement>(null);

  const latestProjects = [...projects].reverse();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/data/project.json");
        const data: Project[] = await res.json();
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useGSAP(
    (context) => {
      const q = context.selector!;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=400%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(q("#text-1"), {
        x: "-40%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
      });
      tl.to(
        q("#text-2"),
        {
          x: "40%",
          opacity: 0,
          duration: 1,
          ease: "power1.inOut",
        },
        0
      );
      tl.to(container.current, {
        backgroundColor: "var(--black-color)",
        duration: 1,
        ease: "power1.inOut",
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 80rem)", () => {
        tl.fromTo(
          q("#line-1"),
          {
            y: "150%",
          },
          {
            y: "10%",
            duration: 1,
            ease: "power1.inOut",
          },
          1
        );
        tl.fromTo(
          q("#line-2"),
          {
            y: "-150%",
          },
          {
            y: "10%",
            duration: 1,
            ease: "power1.inOut",
          },
          1
        );
        tl.fromTo(
          q("#line-3"),
          {
            y: "150%",
          },
          {
            y: "10%",
            duration: 1,
            ease: "power1.inOut",
          },
          1
        );
        tl.to(
          q("#line-1"),
          {
            x: "-200%",
            duration: 1,
            ease: "power1.inOut",
          },
          2
        );
        tl.to(
          q("#line-2"),
          {
            opacity: 0,
            duration: 1,
            ease: "power1.inOut",
          },
          2
        );
        tl.to(
          q("#line-3"),
          {
            x: "200%",
            duration: 1,
            ease: "power1.inOut",
          },
          2
        );
      });
      mm.add("(max-width: 80rem)", () => {
        tl.fromTo(
          q("#line-1"),
          {
            x: "100%",
          },
          {
            x: "-51%",
            duration: 1,
            ease: "power1.inOut",
          },
          1
        );
        tl.fromTo(
          q("#line-2"),
          {
            x: "-100%",
          },
          {
            x: "10%",
            duration: 1,
            ease: "power1.inOut",
          },
          1
        );
        tl.fromTo(
          q("#line-3"),
          {
            x: "100%",
          },
          {
            x: "-51%",
            duration: 1,
            ease: "power1.inOut",
          },
          1
        );
        tl.to(
          q("#line-1"),
          {
            y: "-120%",
            duration: 1,
            ease: "power1.inOut",
            opacity: 0,
          },
          2
        );
        tl.to(
          q("#line-2"),
          {
            opacity: 0,
            duration: 1,
            ease: "power1.inOut",
          },
          2
        );
        tl.to(
          q("#line-3"),
          {
            y: "120%",
            duration: 1,
            ease: "power1.inOut",
            opacity: 0,
          },
          2
        );
      });
    },
    { scope: container }
  );
  return (
    <div ref={container} className=" bg-[var(--white-color)] ">
      <div className="h-dvh  ">
        <div className="relative h-full w-full flex items-center justify-center ">
          <div className="relative h-full w-full   ">
            <div className="container h-full flex items-center justify-between  gap-[2rem] lg:gap-[4rem]">
              <div
                id="text-1"
                className="w-auto bg-[var(--black-color)] text-white px-[1rem] py-[0.5rem] lg:px-[2rem] py-[1rem] rounded-[2rem]"
              >
                <p className="lg:text-[2rem]">Projects</p>
              </div>
              <p id="text-2" className="w-[20ch] lg:text-[2rem]">
                Turning ideas into scalable, meaningful digital solutions.
              </p>
            </div>
          </div>
          <div className="absolute w-full h-full  flex items-center justify-center  ">
            <div className=" grid grid-rows-3 lg:flex lg:justify-center  w-full h-full py-[3rem]  gap-[2rem] lg:gap-[10rem] overflow-hidden">
              <div
                id="line-1"
                className=" h-full   flex flex-row lg:flex-col gap-[10rem] "
              >
                {latestProjects.slice(0, 2).map((project) => {
                  return (
                    <div
                      key={project.id}
                      className="bg-purple-500 w-[20rem] h-[12rem] lg:w-[30rem] lg:h-[18rem] rounded-[2rem] overflow-hidden"
                    >
                      <Image
                        width={1280}
                        height={1280}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full "
                      ></Image>
                    </div>
                  );
                })}
              </div>
              <div
                id="line-2"
                className=" h-full flex flex-row lg:flex-col gap-[10rem] "
              >
                {latestProjects.slice(3, 5).map((project) => {
                  return (
                    <div
                      key={project.id}
                      className="bg-purple-500 w-[20rem] h-[12rem] lg:w-[30rem] lg:h-[18rem] rounded-[2rem] overflow-hidden"
                    >
                      <Image
                        width={1280}
                        height={1280}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full "
                      ></Image>
                    </div>
                  );
                })}
              </div>
              <div
                id="line-3"
                className=" h-full flex flex-row lg:flex-col gap-[10rem] "
              >
                {latestProjects.slice(6, 8).map((project) => {
                  return (
                    <div
                      key={project.id}
                      className="bg-purple-500 w-[20rem] h-[12rem] lg:w-[30rem] lg:h-[18rem] rounded-[2rem] overflow-hidden"
                    >
                      <Image
                        width={1280}
                        height={1280}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full "
                      ></Image>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAnimation;
