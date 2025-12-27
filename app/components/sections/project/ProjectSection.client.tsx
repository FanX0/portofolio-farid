"use client";

import { useRef, useState } from "react";

import TextMaskScroll from "@/app/components/ui/TextMaskScroll";
import Image from "next/image";
import { useGSAP } from "@/app/lib/gsap";
import { initProjectAnimation } from "./project.animation";
import { getImageUrl } from "@/app/lib/sanity/image";

import { ProjectSectionProps } from "./project.types";
import { Project } from "@/app/types/project";

export default function ProjectSectionClient({
  projects = [],
}: ProjectSectionProps) {
  const [activedList, setactivedList] = useState<boolean>(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  const container = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalTl = useRef<gsap.core.Timeline | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const modalImage = getImageUrl(activeProject?.images?.[imageIndex]);

  useGSAP(
    () => {
      if (!container.current) return;
      const animation = initProjectAnimation({ container: container.current });
      if (animation && animation.tl) {
        tl.current = animation.tl;
      }
    },
    { scope: container, dependencies: [projects] }
  );

  const handleClickImage = () => {
    setactivedList(false);
    tl.current?.play();
  };
  const handleClickList = () => {
    setactivedList(true);
    tl.current?.reverse();
  };

  const handlePrevious = () => {
    if (!activeProject) return;
    const currentIndex = projects.findIndex((p) => p._id === activeProject._id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setActiveProject(projects[prevIndex]);
  };

  const handleNext = () => {
    if (!activeProject) return;
    const currentIndex = projects.findIndex((p) => p._id === activeProject._id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setActiveProject(projects[nextIndex]);
  };

  const handleOpenProject = (project: Project) => {
    setActiveProject(project);
  };

  const handleCloseProject = () => {
    modalTl.current?.reverse();
    setTimeout(() => {
      modalTl.current?.kill();
      modalTl.current = null;
      setActiveProject(null);
    }, 450);
  };

  return (
    <div ref={container} className="h-dvh bg-[var(--black-color)] text-white">
      <div className="container mx-auto w-full h-full">
        <div className="w-full h-full flex flex-col gap-8">
          <TextMaskScroll
            startMobile="center center"
            startDesktop="center center"
            endMobile="+=500"
            endDesktop="+=500"
            className="text-[6rem] font-bold lg:text-[17.5rem]"
          >
            Project
          </TextMaskScroll>

          <div className="flex justify-between text-gray-300">
            <button
              className={activedList ? "text-white" : ""}
              onClick={handleClickList}
            >
              List View
            </button>
            <button
              className={!activedList ? "text-white" : ""}
              onClick={handleClickImage}
            >
              Image View
            </button>
          </div>

          <div className="relative h-full overflow-hidden">
            <section className="list-wrapper h-full border-y border-gray-300 ">
              <div className="list-line">
                {projects.map((project, index) => {
                  return (
                    <button
                      key={project._id}
                      onClick={() => handleOpenProject(project)}
                      className="project-item  border-b border-gray-500 w-full"
                    >
                      <div className="project-text overflow-hidden h-[4rem]">
                        <div className=" project-text-inner flex flex-col ">
                          <div className="flex justify-start h-[4rem] px-4">
                            <h2 className="text-3xl">{project.title}</h2>
                          </div>
                          {/* hover */}
                          <div className="flex justify-between bg-white text-black h-[4rem] px-4">
                            <h2 className="text-3xl">{project.title}</h2>
                            <a className="text-sm" href={project.liveDemo}>
                              Live Website
                            </a>
                          </div>
                          {/* default */}
                          <div className="flex justify-start h-[4rem] px-4">
                            <h2 className="text-3xl">{project.title}</h2>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
            <section className="image-wrapper absolute top-0 w-full h-full pointer-events-none">
              <div className="image-line grid grid-cols-1 lg:grid-cols-3 gap-[4rem] h-full w-full items-start mt-[4rem] ">
                {projects.map((project) => {
                  const imageUrl = getImageUrl(project.images?.[0]);

                  return (
                    <button
                      key={project._id}
                      onClick={() => handleOpenProject(project)}
                    >
                      <div className=" w-[25rem] h-[15rem] rounded-[2rem] overflow-hidden">
                        {imageUrl && (
                          <Image
                            src={imageUrl}
                            width={1280}
                            height={1280}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
            <section
              aria-label="project-modal"
              className="fixed left-0 bottom-0 w-full  z-50 pointer-events-none"
            >
              {activeProject && (
                <>
                  <div
                    ref={backdropRef}
                    className="fixed inset-0 bg-black/5  pointer-events-auto"
                    onClick={handleCloseProject}
                  />
                  <div
                    ref={modalRef}
                    className="w-full h-full   flex items-center justify-center pointer-events-auto "
                  >
                    <div className="flex flex-col gap-[1rem] bg-[var(--black-color)] rounded-t-[0.5rem] max-w-[80rem] py-[1rem] lg:py-0 w-full relative lg:rounded-t-[2rem] lg:overflow-hidden">
                      <button
                        className="absolute flex w-full justify-end pr-[1rem] lg:pr-[2.5rem] pt-[1rem] text-[2rem] text-white"
                        onClick={handleCloseProject}
                      >
                        <div className="">✕</div>
                      </button>

                      <div className="lg:absolute flex flex-col gap-[1.5rem] px-[1rem] lg:bg-[var(--black-color)] lg:py-[2rem] ">
                        <h2 className="text-3xl uppercase">
                          {activeProject.title}
                        </h2>
                        <p className="font-light">
                          {activeProject.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.technologies.map((tech, index) => (
                            <p
                              key={index}
                              className="bg-[var(--white-color)] font-extralight px-2 py-1 rounded text-black"
                            >
                              {tech}
                            </p>
                          ))}
                        </div>
                        <a
                          className="font-extralight"
                          href={activeProject.liveDemo}
                        >
                          Visit Live Website
                        </a>
                      </div>

                      <div className="w-full h-[15rem] lg:h-[40rem] ">
                        {modalImage && (
                          <Image
                            src={modalImage}
                            alt={activeProject.title}
                            width={1280}
                            height={720}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex justify-between px-[1rem] lg:absolute bottom-0 lg:w-full lg:pb-[1rem]">
                        <button
                          className="lg:bg-[var(--black-color)] lg:px-[1rem] lg:py-[0.5rem] lg:rounded-[2rem]"
                          onClick={handlePrevious}
                        >
                          PREVIOUS
                        </button>
                        <button
                          className="lg:bg-[var(--black-color)] lg:px-[1rem] lg:py-[0.5rem] lg:rounded-[2rem]"
                          onClick={handleNext}
                        >
                          NEXT
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
