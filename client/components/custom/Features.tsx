import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { Card3 } from "./Card";

const Features = () => (
  <div>
    {/* First Feature Section */}
    <div className="pt-20 h-screen font-medium text-white">
      <p className="text-4xl text-center">
        Empower Your Team with Real-Time Collaboration. <br />
        Code Together Seamlessly, <br />
        Anytime, Anywhere.
      </p>

      <div className="flex items-center md:items-start flex-col md:flex-row justify-center pt-10 px-2 gap-20">
        <Card3
          src="/1.2.png"
          title="Authentication"
          description={
            <>
              Securely access your accounts to, <br />
              manage and collaborate.
            </>
          }
        />
        <div className="md:w-[50%] hidden md:block">
          <div className="bg-gradient-to-b from-transparent to-purple-600 md:w-[45rem] flex items-center justify-center rounded-xl md:h-[26rem]">
            <div>
              <Image
                src="/3.png"
                alt="reload"
                height={900}
                width={600}
                className="mask-gradient px-2"
              />
            </div>
          </div>
          <div className="relative md:-top-36 md:left-20 top-10 left-1">
            <p className="md:text-xl">Create Collab- space</p>
            <p className="pt-5 opacity-70">
              Build a shared workspace to connect ,collaborate and communicate.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Second Feature Section */}
    <div className="pt-20 h-screen font-medium text-white">
      <div className="flex items-center md:items-start flex-col md:flex-row justify-center pt-10 px-2 mt-5 gap-20">
        <div className="md:w-[50%] hidden md:block">
          <div className="bg-gradient-to-b from-transparent to-purple-950 w-[25rem] md:w-[45rem] flex items-center justify-center rounded-xl h-[26rem]">
            <div>
              <Image
                src="/4.png"
                alt="reload"
                height={600}
                width={600}
                className="mask-gradient"
              />
            </div>
          </div>
          <div className="relative -top-36 left-20">
            <p className="text-xl">Room for Collab</p>
            <p className="pt-5 opacity-70">
              Easily paste and share links for quick access to resources and
              collabration.
            </p>
          </div>
        </div>

        <div
          className={clsx(
            "p-5 px-8 rounded-lg border border-white border-opacity-15 h-66 w-70" // Added height and width utilities
          )}
        >
          <Image src={"/c1.png"} height={200} width={600} alt="reload" />
          <p className="text-lg font-medium">Instant Code Preview</p>
          <p className="opacity-70 pt-3">
            Write, collaborate, and see your output in real-time without delay!.
            Select your preferred programming language, write code, and execute
            it.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Features;
