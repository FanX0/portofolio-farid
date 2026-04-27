"use client";

import { ProjectScrollSectionProps } from "./projectScroll.types";
import { useProjectScrollAnimation } from "./projectScroll.animation";
import Image from "next/image";
import { getImageUrl } from "@/shared/lib/sanity/image";

export default function ProjectScrollClient({
  projects = [],
}: ProjectScrollSectionProps) {
  const { container } = useProjectScrollAnimation();
  const latestProjects = [...projects].reverse();

  return (
    <div ref={container} className=" bg-[var(--white-color)] ">
      <div className="h-dvh flex justify-center items-center">
        <div className="relative h-full w-full flex items-center justify-center ">
          <div className="relative h-full w-full   ">
            <div className="container h-full flex items-center justify-between  gap-[2rem] lg:gap-[4rem]">
              <div className="title-left w-auto bg-[var(--black-color)] text-white px-[1rem] py-[0.5rem] lg:px-[2rem] py-[1rem] rounded-[2rem]">
                <p className="lg:text-[2rem]">Projects</p>
              </div>
              <p className="title-right w-[20ch] lg:text-[2rem]">
                Turning ideas into scalable, meaningful digital solutions.
              </p>
            </div>
          </div>
          <div className="absolute w-full h-full  flex items-center justify-center  ">
            <div className=" grid grid-rows-3 lg:flex lg:justify-center  w-full h-full py-[3rem]  gap-[2rem] lg:gap-[10rem] overflow-hidden">
              <div className="line-1 h-full   flex flex-row lg:flex-col gap-[4rem]   ">
                {latestProjects.slice(0, 3).map((project) => {
                  const imageUrl = getImageUrl(project.images?.[0]);
                  return (
                    <div
                      key={project._id}
                      className=" w-[20rem] h-[12rem] xl:w-[17rem] xl:h-[10rem] 2xl:w-[20rem] 2xl:h-[12rem]  rounded-[2rem] overflow-hidden"
                    >
                      {imageUrl && (
                        <Image
                          width={1280}
                          height={1280}
                          src={imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="line-2 h-full flex flex-row lg:flex-col gap-[4rem] ">
                {latestProjects.slice(3, 6).map((project) => {
                  const imageUrl = getImageUrl(project.images?.[0]);
                  return (
                    <div
                      key={project._id}
                      className=" w-[20rem] h-[12rem] xl:w-[17rem] xl:h-[10rem] 2xl:w-[20rem] 2xl:h-[12rem] rounded-[2rem] overflow-hidden"
                    >
                      {imageUrl && (
                        <Image
                          width={1280}
                          height={1280}
                          src={imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="line-3 h-full flex flex-row lg:flex-col gap-[4rem] ">
                {latestProjects.slice(6, 9).map((project) => {
                  const imageUrl = getImageUrl(project.images?.[0]);
                  return (
                    <div
                      key={project._id}
                      className=" w-[20rem] h-[12rem] xl:w-[17rem] xl:h-[10rem] 2xl:w-[20rem] 2xl:h-[12rem] rounded-[2rem] overflow-hidden"
                    >
                      {imageUrl && (
                        <Image
                          width={1280}
                          height={1280}
                          src={imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}
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
}
