"use client";

import { useNavbarAnimation } from "./navbar.animation";

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

  const handleSidebarToggle = () => {
    onToggle();
  };

  return (
    <nav
      ref={container}
      className="container flex flex-col justify-between  w-screen text-[1.5625rem] z-20 "
    >
      <ul className=" flex items-center lg:gap-[1.875rem] w-full  border-white lg:border-b-0  lg:py-0 ">
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
            <button type="button" onClick={handleSidebarToggle}>
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
              type="button"
              onClick={scrollToAbout}
              className="relative flex h-[4.0625rem] w-full lg:border-white lg:py-[1.75rem] lg:h-[5.875rem] text-left appearance-none"
            >
              <p className="absolute">About</p>
            </button>
            <div className="progressbar-track w-full h-[1px] bg-gray-300/10 ">
              <div className="progressbar-desktop-fill-about w-full h-[1px] bg-white origin-left scale-x-0"></div>
            </div>
          </li>
          <li className="flex lg:flex-col items-center w-full hidden lg:block">
            <button
              type="button"
              onClick={scrollToProject}
              className="relative flex h-[4.0625rem] w-full lg:border-white lg:py-[1.75rem] lg:h-[5.875rem] text-left appearance-none"
            >
              <p className="absolute">Project</p>
            </button>
            <div className="progressbar-track w-full h-[1px] bg-gray-300/10 ">
              <div className="progressbar-desktop-fill-project w-full h-[1px] bg-white origin-left scale-x-0"></div>
            </div>
          </li>
          <li className="flex lg:flex-col items-center w-full hidden lg:block">
            <button
              type="button"
              onClick={scrollToContact}
              className="relative flex h-[4.0625rem] w-full lg:border-white lg:py-[1.75rem] lg:h-[5.875rem] text-left appearance-none"
            >
              <p className="absolute">Contact</p>
            </button>
            <div className="progressbar-track w-full h-[1px] bg-gray-300/10 ">
              <div className="progressbar-desktop-fill-contact w-full h-[1px] bg-white origin-left scale-x-0"></div>
            </div>
          </li>
        </div>
      </ul>
      <div className="progressbar-track w-full h-[1px] bg-gray-300/10 lg:hidden">
        <div className="progressbar-mobile-fill w-full h-[1px] bg-white origin-left scale-x-0"></div>
      </div>
    </nav>
  );
}
