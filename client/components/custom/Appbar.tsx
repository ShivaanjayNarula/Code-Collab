"use client";
import clsx from "clsx";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TypingAnimation from "@/components/typing-animation";

const Appbar = () => {
  const links = ["Features", "Developers", "Company", "Blog", "Changelog"];
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className="w-full flex justify-center border-b border-white border-opacity-15">
        <div className="p-5 pb-3 md:px-20 text-white text-xs flex w-full md:w-[85%] items-center justify-between">
          <div className="flex justify-center items-center gap-x-2">
            <Image src={"/logo.svg"} alt="reload" height={85} width={85} />
          </div>
          <TypingAnimation
            className="text-4xl font-semibold dark:text-white"
            text="Code Collab"
          />
          {/* <div className="gap-4 hidden md:flex">
            {links.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                className="bg-[#8C45FF] text-white hover:opacity-90 flex items-center gap-1"
              >
                {link}
              </Button>
            ))}
          </div> */}
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              className="text-white"
              onClick={() => {
                router.push("/auth/login");
              }}
            >
              Login / SignUp
            </Button>
            <AlignJustify
              size={30}
              className="md:hidden"
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
        </div>
      </div>
      {/* Mobile nav */}
      <div
        className={`absolute w-full dark:text-black duration-300 ${
          showMenu ? "top-30" : "-top-90"
        }`}
      >
        <div className="flex justify-center items-center">
          <div
            className={clsx(
              "relative w-[80%] rounded-xl bg-black mt-5 text-white border border-white border-opacity-15",
              showMenu ? "top-0" : "top-[-500px]"
            )}
          >
            {links.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                className={clsx(
                  "bg-[#8C45FF] text-white hover:opacity-90 w-full py-5 flex items-center justify-center",
                  index > 0 && "border-t border-white border-opacity-15"
                )}
              >
                {link}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Appbar;
