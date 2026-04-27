"use client";

import { useEffect, useState, useRef } from "react";
import type { Project } from "@/shared/types/project";
import TextMaskScroll from "@/components/ui/TextMaskScroll";
import Image from "next/image";

import gsap from "gsap";
import { useProjectAnimation } from "./project.animation";

import { getImageUrl } from "@/shared/lib/sanity/image";

type Props = {
  projects: Project[];
};

const ProjectSectionClient = ({ projects }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activedList, setActivedList] = useState<boolean>(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"list" | "image">("list");

  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalTl = useRef<gsap.core.Timeline | null>(null);

  const { container, tl } = useProjectAnimation({ projects });

  const modalImage = getImageUrl(activeProject?.images?.[imageIndex]);

  useEffect(() => {
    if (!activeProject) return;
    setImageIndex(0);
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject || !activeProject.images?.length) return;

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % activeProject.images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject || !modalRef.current) return;

    if (modalTl.current) return;

    const backdrop = backdropRef.current;
    modalTl.current = gsap.timeline({ paused: true });

    if (backdrop) {
      modalTl.current.fromTo(
        backdrop,
        { backdropFilter: "blur(0px)", opacity: 0 },
        {
          backdropFilter: "blur(8px)",
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
        },
        0,
      );
    }

    modalTl.current.fromTo(
      modalRef.current,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
      0,
    );

    modalTl.current.play();
  }, [activeProject]);

  useEffect(() => {
    if (!modalTl.current) return;

    if (activeProject) {
      modalTl.current.play();
    } else {
      modalTl.current.reverse();
    }
  }, [activeProject]);

  const handleClickImage = () => {
    setViewMode("image");
    setActivedList(false);
    tl.current?.play();
  };
  const handleClickList = () => {
    setViewMode("list");
    setActivedList(true);
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
    <div
      ref={container}
      className="bg-[var(--black-color)] text-white pb-[6rem]"
    >
      <div className="container mx-auto w-full h-full">
        <div className="w-full flex flex-col gap-8">
          <TextMaskScroll
            startMobile="center center"
            startDesktop="center center"
            endMobile="+=500"
            endDesktop="+=500"
            className="text-[clamp(5rem,10vw+1rem,10rem)] font-bold"
          >
            Project
          </TextMaskScroll>

          <div className="flex justify-between text-gray-300">
            <button
              className={`list-view-button cursor-pointer ${viewMode === "list" ? "text-white" : ""}`}
              onClick={handleClickList}
            >
              List View
            </button>
            <button
              className={`image-view-button cursor-pointer ${viewMode === "image" ? "text-white" : ""}`}
              onClick={handleClickImage}
            >
              Image View
            </button>
          </div>

          <div className="relative w-full grid">
            <section className="list-wrapper col-start-1 row-start-1">
              <div className="list-line flex flex-col">
                {projects.map((project, index) => {
                  return (
                    <button
                      key={project._id}
                      onClick={() => handleOpenProject(project)}
                      className="project-item border-b border-gray-500 w-full cursor-pointer select-none"
                    >
                      <div className="project-text overflow-hidden h-[4rem]">
                        <div className=" project-text-inner flex flex-col ">
                          <div className="flex  items-center justify-start h-[4rem] px-4">
                            <h2 className="text-3xl">{project.title}</h2>
                          </div>
                          {/* hover */}
                          <div className="flex items-center justify-between bg-white text-black h-[4rem] px-4">
                            <h2 className="text-3xl">{project.title}</h2>
                            <a className="text-sm" href={project.liveDemo}>
                              Live Website
                            </a>
                          </div>
                          {/* default */}
                          <div className="flex items-center justify-start h-[4rem] px-4">
                            <h2 className="text-3xl">{project.title}</h2>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
            <section className="image-wrapper col-start-1 row-start-1 w-full pointer-events-none flex justify-center z-10">
              <div className="image-line grid grid-cols-1 justify-items-center lg:grid-cols-3 gap-[4rem] w-full mt-[2rem] pb-[4rem]">
                {projects.map((project) => {
                  const imageUrl = getImageUrl(project.images?.[0]);

                  return (
                    <button
                      key={project._id}
                      onClick={() => handleOpenProject(project)}
                      className="cursor-pointer select-none pointer-events-auto"
                    >
                      <div className="project-image-box w-[25rem] h-[15rem] rounded-[2rem] overflow-hidden">
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
              className="fixed inset-0 w-full z-9999 pointer-events-none flex items-center justify-center p-4 lg:p-8"
            >
              {activeProject && (
                <>
                  <div
                    ref={backdropRef}
                    className="fixed inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
                    onClick={handleCloseProject}
                  />

                  <div
                    ref={modalRef}
                    className="relative w-full max-w-[30rem] lg:max-w-[40rem] bg-[#0a0a0a] rounded-t-[2rem] overflow-hidden flex flex-col pointer-events-auto shadow-2xl border border-white/5 max-h-[90vh]"
                  >
                    {/* Header Controls */}
                    <button
                      className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white cursor-pointer hover:bg-black/40 transition-colors"
                      onClick={handleCloseProject}
                    >
                      <span>✕</span>
                    </button>

                    {/* Scrollable Content Container */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                      {/* Top Image */}
                      <div className="w-full aspect-[16/10] bg-[#111] overflow-hidden">
                        {modalImage && (
                          <Image
                            src={modalImage}
                            alt={activeProject.title}
                            width={1280}
                            height={800}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Project Details */}
                      <div className="p-6 lg:p-8 flex flex-col gap-8 pb-56">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-[#bbf771] text-black text-[0.7rem] uppercase tracking-widest rounded-full border border-[#bbf771] font-medium">
                              Project Case
                            </span>
                          </div>
                          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                            {activeProject.title}
                          </h2>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-4 bg-[var(--color-white)] rounded-full" />
                            <h3 className="text-xs font-bold text-white tracking-widest uppercase opacity-60">
                              Technologies Used
                            </h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {activeProject.technologies.map((tech, index) => (
                              <p
                                key={index}
                                className="bg-white/5 border border-white/10 font-light px-3 py-1.5 rounded-lg text-sm text-gray-300"
                              >
                                {tech}
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-4 pb-20">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-4 bg-[var(--color-white)] rounded-full" />
                            <h3 className="text-xs font-bold text-white tracking-widest uppercase opacity-60">
                              About Project
                            </h3>
                          </div>
                          <p className="text-gray-400 font-light leading-relaxed text-lg">
                            {activeProject.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Fixed Footer controls */}
                    <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent flex flex-col gap-4 pt-12">
                      <a
                        href={activeProject.liveDemo}
                        target="_blank"
                        className="w-full bg-[var(--white-color)] text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group cursor-pointer"
                      >
                        <span>Live Demo</span>
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>

                      <div className="flex items-center justify-between text-[0.7rem] font-bold tracking-widest text-white/40 uppercase px-1">
                        <button
                          className="hover:text-white transition-colors cursor-pointer"
                          onClick={handlePrevious}
                        >
                          PREVIOUS
                        </button>
                        <button
                          className="hover:text-white transition-colors cursor-pointer"
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
};

export default ProjectSectionClient;
