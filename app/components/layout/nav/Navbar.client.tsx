"use client";

import { useNavbarAnimation } from "./navbar.animation";
import useNavCircleHover from "@/app/components/layout/nav/useNavCircleHover";
type NavbarClientProps = {
  onToggle: () => void;
  isOpen: boolean;
};

export default function NavbarClient({ onToggle, isOpen }: NavbarClientProps) {
  const {
    container,
    toggleIconRef,
    scrollToHome,
    scrollToAbout,
    scrollToProject,
    scrollToContact,
  } = useNavbarAnimation({
    isOpen,
  });

  const {
    navRef: navRefAbout,
    navDot: navDotAbout,
    navCircle: navCircleAbout,
    navArrow: navArrowAbout,
    onEnter: onEnterAbout,
    onLeave: onLeaveAbout,
  } = useNavCircleHover();
  const {
    navRef: navRefProject,
    navDot: navDotProject,
    navCircle: navCircleProject,
    navArrow: navArrowProject,
    onEnter: onEnterProject,
    onLeave: onLeaveProject,
  } = useNavCircleHover();
  const {
    navRef: navRefContact,
    navDot: navDotContact,
    navCircle: navCircleContact,
    navArrow: navArrowContact,
    onEnter: onEnterContact,
    onLeave: onLeaveContact,
  } = useNavCircleHover();

  const handleSidebarToggle = () => {
    onToggle();
  };

  return (
    <nav ref={container} className="container flex flex-col text-[1rem] z-20 ">
      <div className="pr-[1rem] lg:pr-[0]">
        <ul className="flex items-center lg:gap-[1.875rem] w-full ">
          <div className=" flex lg:flex-col items-center w-full ">
            <button
              type="button"
              onClick={scrollToHome}
              className="relative flex items-center h-[4.0625rem] lg:flex lg:w-full lg:border-white lg:py-[1.75rem]  lg:h-[5.875rem] text-left appearance-none"
            >
              <p className="nav-name absolute ">farid</p>
            </button>
            <div className="progressbar-track w-full h-[1px] bg-gray-300/10 hidden lg:block">
              <div className="progressbar-desktop-fill-name w-full h-[1px] bg-white origin-left scale-x-0"></div>
            </div>
          </div>
          <div className="flex  lg:w-full  lg:gap-[1.875rem]">
            <li className="lg:hidden flex items-center h-[4.0625rem]">
              <button
                className="sidebar-toggle"
                type="button"
                onClick={handleSidebarToggle}
              >
                <svg
                  ref={toggleIconRef}
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    className="toggle-bg"
                    x="0.5"
                    y="0.5"
                    width="39"
                    height="39"
                    rx="19.5"
                    stroke="#fff"
                  />
                  <rect
                    className="toggle-dot"
                    x="11"
                    y="18"
                    width="4"
                    height="4"
                    rx="2"
                    fill="#fff"
                  />
                  <rect
                    className="toggle-dot"
                    x="18"
                    y="18"
                    width="4"
                    height="4"
                    rx="2"
                    fill="#fff"
                  />
                  <rect
                    className="toggle-dot"
                    x="25"
                    y="18"
                    width="4"
                    height="4"
                    rx="2"
                    fill="#fff"
                  />
                </svg>
              </button>
            </li>
            <li className="flex lg:flex-col items-center w-full hidden lg:block">
              <button
                ref={navRefAbout}
                type="button"
                onClick={scrollToAbout}
                onMouseEnter={onEnterAbout}
                onMouseLeave={onLeaveAbout}
                className="about-link flex items-center gap-[1rem] h-[4.0625rem] w-full g:py-[1.75rem] lg:h-[5.875rem] "
              >
                <div
                  ref={navDotAbout}
                  className=" w-[0.5rem] h-[0.5rem] outline outline-white rounded-full"
                />
                <p>About</p>
                <div
                  ref={navCircleAbout}
                  className=" w-[3rem] h-[3rem] bg-white rounded-full flex justify-center items-center"
                >
                  <svg
                    ref={navArrowAbout}
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.12959 20.2609L17.6449 8.85352"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.5939 8.55068L18.6965 7.71271L18.4383 14.8599"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
              <div className="progressbar-track w-full h-[1px] bg-gray-300/10 ">
                <div className="progressbar-desktop-fill-about w-full h-[1px] bg-white origin-left scale-x-0"></div>
              </div>
            </li>
            <li className="flex lg:flex-col items-center w-full hidden lg:block">
              <button
                ref={navRefProject}
                type="button"
                onMouseEnter={onEnterProject}
                onMouseLeave={onLeaveProject}
                onClick={scrollToProject}
                className="project-link flex items-center gap-[1rem] h-[4.0625rem] w-full g:py-[1.75rem] lg:h-[5.875rem] "
              >
                <div
                  ref={navDotProject}
                  className="nav-dot w-[0.5rem] h-[0.5rem] outline outline-white rounded-full"
                />
                <p>Project</p>
                <div
                  ref={navCircleProject}
                  className="nav-arrow w-[3rem] h-[3rem] bg-white rounded-full flex justify-center items-center"
                >
                  <svg
                    ref={navArrowProject}
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.12959 20.2609L17.6449 8.85352"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.5939 8.55068L18.6965 7.71271L18.4383 14.8599"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
              <div className="progressbar-track w-full h-[1px] bg-gray-300/10 ">
                <div className="progressbar-desktop-fill-project w-full h-[1px] bg-white origin-left scale-x-0"></div>
              </div>
            </li>
            <li className="flex lg:flex-col items-center w-full hidden lg:block">
              <button
                ref={navRefContact}
                type="button"
                onMouseEnter={onEnterContact}
                onMouseLeave={onLeaveContact}
                onClick={scrollToContact}
                className="contact-link flex items-center gap-[1rem] h-[4.0625rem] w-full g:py-[1.75rem] lg:h-[5.875rem] "
              >
                <div
                  ref={navDotContact}
                  className="nav-dot w-[0.5rem] h-[0.5rem] outline outline-white rounded-full"
                />
                <p>Contact</p>
                <div
                  ref={navCircleContact}
                  className="nav-arrow w-[3rem] h-[3rem] bg-white rounded-full flex justify-center items-center"
                >
                  <svg
                    ref={navArrowContact}
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.12959 20.2609L17.6449 8.85352"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.5939 8.55068L18.6965 7.71271L18.4383 14.8599"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
              <div className="progressbar-track w-full h-[1px] bg-gray-300/10 ">
                <div className="progressbar-desktop-fill-contact w-full h-[1px] bg-white origin-left scale-x-0"></div>
              </div>
            </li>
          </div>
        </ul>
        <div className="progressbar-track w-full h-[1px] bg-gray-300/10 lg:hidden ">
          <div className="progressbar-mobile-fill w-full h-[1px] bg-white origin-left scale-x-0"></div>
        </div>
      </div>
    </nav>
  );
}
