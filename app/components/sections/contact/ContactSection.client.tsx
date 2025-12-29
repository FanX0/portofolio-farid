"use client";

import { useRef, useEffect, useState, useActionState } from "react";
import { useGSAP } from "@/app/lib/gsap";
import initContactAnimation from "./contact.animation";
import stamp from "@/public/images/f-stamp.png";
import Image from "next/image";
import { sendEmail } from "@/app/actions/sendEmail/sendEmail";
import type { EmailState } from "@/app/types/email";

export default function ContactSectionClient() {
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
    if (state?.success === true && tlClick.current) {
      tlClick.current.restart(true);
    }
  }, [state?.success]);

  useGSAP(
    () => {
      if (!container.current) return;
      const animation = initContactAnimation({ container: container.current });
      if (animation && animation.tlClick) {
        tlClick.current = animation.tlClick;
      }
    },
    { scope: container }
  );

  return (
    <div ref={container} className="bg-[var(--black-color)]">
      <div className=" w-full overflow-hidden">
        <div className="text-running h-dvh flex items-center w-[70rem] lg:w-[140rem] ">
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

              <div className="mail flex flex-col items-center">
                <div className="mail-form absolute z-30 w-[22rem] lg:w-[50rem]  bottom-[6rem] lg:bottom-[1.5rem]  grid grid-cols-1 lg:grid-cols-2 gap-[1rem] bg-white border-1 border-black px-[1rem] py-[1rem] pb-[5rem] lg:pb-[10rem] rounded-[1rem]">
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
                    <a
                      className="email-link"
                      href="mailto:faridazhari111@gmail.com"
                    >
                      faridazhari111@gmail.com
                    </a>
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
                        d="M296 87.5205H0.5L296 174.021L591.5 87.5205H296Z"
                        fill="white"
                        stroke="black"
                        className="mail-back"
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
                        d="M296 87.0205H591.5L296 0.520508L0.5 87.0205H296Z"
                        fill="white"
                        stroke="black"
                        className="mail-top"
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
                        d="M0.5 87.5205V360.021H296H591.5V87.5205L296 174.021L0.5 87.5205Z"
                        fill="white"
                        stroke="black"
                        className="mail-front"
                      />
                    </svg>
                    <div className="mail-message absolute z-40 bottom-[2rem] ">
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
                <div className="mail-stamp absolute z-50 bottom-[6rem] lg:-bottom-[2rem] w-[4rem] ">
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
}
