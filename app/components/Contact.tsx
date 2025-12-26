"use client";

import { useRef, useEffect, useState, useActionState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import stamp from "@/public/images/f-stamp.png";
import { sendEmail } from "@/app/actions/sendEmail/sendEmail";
import type { EmailState } from "@/app/types/email";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const container = useRef<HTMLDivElement>(null);
  const tlClick = useRef<gsap.core.Timeline | null>(null);

  const initialState: EmailState = { success: false };

  const [state, formAction] = useActionState(sendEmail, initialState);
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      tlClick.current?.play();
    }
  }, [state.success]);

  useGSAP(
    (context) => {
      const q = context.selector!;

      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=400%",
          scrub: true,
          pin: true,
        },
      });

      tlScroll.fromTo(
        q("#text"),
        { x: "110%" },
        { x: "-110%", ease: "power2.inOut" }
      );

      gsap.set(q("#mail-stamp"), { opacity: 0, scale: 2, rotate: 2 });
      gsap.set(q("#mail-message"), { opacity: 0, scale: 2 });
      tlClick.current = gsap
        .timeline({ paused: true })
        .to(q("#mail-form"), { y: 500, duration: 1, ease: "power2.inOut" })
        .to(q("#mail-form"), { opacity: 0 })
        .to(q("#mail"), { y: -200, duration: 1, ease: "power2.inOut" })
        .to(q("#mail-top"), {
          scaleY: -1,
          transformOrigin: "bottom center",
          duration: 1,
        })
        .to(q("#mail-stamp"), {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "power2.inOut",
        })
        .to(q("#mail"), { x: "250%", duration: 2, ease: "power2.inOut" })
        .to(q("#mail"), { opacity: 0 })
        .to(q("#mail-message"), {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "power2.inOut",
        })
        .set(q("#mail"), { opacity: 1, x: 0, y: "100%" })
        .to(q("#mail"), { y: "-120%", duration: 2 });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="bg-[var(--black-color)]">
      <div className=" w-full overflow-hidden">
        <div
          id="text"
          className="h-dvh flex items-center w-[70rem] lg:w-[140rem] "
        >
          <p className="text-white text-[9rem] lg:text-[18.75rem]  font-bold ">
            LETS TALK IDEA
          </p>
        </div>
      </div>
      <div className="h-dvh  ">
        <div className="h-full  flex items-end ">
          <form action={formAction} className=" w-full">
            <fieldset className="relative  flex flex-col  justify-end items-center h-[45rem]  overflow-hidden">
              <legend className="w-full text-center text-white py-[1rem]  text-[4rem] font-semibold">
                Say Hello
              </legend>

              <div id="mail" className=" flex flex-col items-center">
                <div
                  id="mail-form"
                  className="absolute z-30 w-[22rem] lg:w-[50rem]  bottom-[6rem] lg:bottom-[1.5rem]  grid grid-cols-1 lg:grid-cols-2 gap-[1rem] bg-white border-1 border-black px-[1rem] py-[1rem] pb-[5rem] lg:pb-[10rem] rounded-[1rem]"
                >
                  <div className="flex flex-col gap-[0.5rem]">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) =>
                        setValues({ ...values, name: e.target.value })
                      }
                      className="border-1 border-black rounded-[0.5rem] px-[1rem] py-[0.5rem]"
                    />

                    {state.fieldErrors?.name && (
                      <p className="text-red-600 text-sm">
                        {state.fieldErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-[0.5rem]">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) =>
                        setValues({ ...values, email: e.target.value })
                      }
                      className="border-1 border-black rounded-[0.5rem] px-[1rem] py-[0.5rem]"
                    />
                    {state.fieldErrors?.email && (
                      <p className="text-red-600 text-sm">
                        {state.fieldErrors.email}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-[0.5rem] lg:col-span-2">
                    <label htmlFor="email">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Write your message here..."
                      rows={5}
                      value={values.message}
                      onChange={(e) =>
                        setValues({ ...values, message: e.target.value })
                      }
                      className="border-1 border-black rounded-[0.5rem] px-[1rem] py-[0.5rem]"
                    />

                    {state.fieldErrors?.message && (
                      <p className="text-red-600 text-sm">
                        {state.fieldErrors.message}
                      </p>
                    )}
                  </div>
                  <button
                    className="bg-[var(--black-color)] text-white py-[0.5rem] rounded-[0.5rem] lg:col-span-2"
                    type="submit"
                  >
                    Send
                  </button>
                  <div className="flex justify-between text-[0.8rem] lg:col-span-2">
                    <p>Prefer email?</p>
                    <a href="">faridazhari111@gmail.com</a>
                  </div>
                </div>
                <div className="relative w-[24rem] lg:w-[52rem] h-auto">
                  <div className="flex justify-center h-[14.6rem] lg:h-[19rem] pointer-events-none">
                    <svg
                      width="592"
                      height="361"
                      viewBox="0 0 592 361"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-0 left-0 z-10 w-full h-auto"
                    >
                      <path
                        id="mail-back"
                        d="M296 87.5205H0.5L296 174.021L591.5 87.5205H296Z"
                        fill="white"
                        stroke="black"
                      />
                    </svg>
                    {/* Mail top */}
                    <svg
                      width="592"
                      height="361"
                      viewBox="0 0 592 361"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-0 left-0 z-20 w-full h-auto"
                    >
                      <path
                        id="mail-top"
                        d="M296 87.0205H591.5L296 0.520508L0.5 87.0205H296Z"
                        fill="white"
                        stroke="black"
                      />
                    </svg>
                    {/* Mail front */}
                    <svg
                      width="592"
                      height="361"
                      viewBox="0 0 592 361"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-0 left-0 z-30 w-full h-auto"
                    >
                      <path
                        id="mail-front"
                        d="M0.5 87.5205V360.021H296H591.5V87.5205L296 174.021L0.5 87.5205Z"
                        fill="white"
                        stroke="black"
                      />
                    </svg>
                    <div
                      id="mail-message"
                      className="absolute z-40 bottom-[2rem] "
                    >
                      {state.success && (
                        <p className="text-green-600 ">
                          Your message has been sent successfully!
                        </p>
                      )}
                      {state.error && (
                        <p className="text-red-600"> {state.error}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  id="mail-stamp"
                  className="absolute z-50 bottom-[6rem] lg:-bottom-[2rem] w-[4rem] "
                >
                  <Image
                    width="1280"
                    height="1280"
                    src={stamp}
                    alt="stamp"
                  ></Image>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;
