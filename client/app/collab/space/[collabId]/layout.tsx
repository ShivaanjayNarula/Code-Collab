"use client";
import { Toaster } from "@/components/ui/toaster";
import DotPattern from "@/components/dot-pattern";
import { RecoilRoot } from "recoil";
import { ny } from "@/lib/utils";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";
import logo from "../../../../public/logo.svg";

export default function Layout({ children }: { children: string }) {
  const links = [
    {
      title: "Home",
      icon: (
        <Image priority src={logo} alt="Code Collab Logo" className="h-8 w-8" />
      ),
      href: "/",
    },

    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-white bg-transparent" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-white bg-transparent" />
      ),
      href: "#",
    },
    {
      title: "Twitter",
      icon: <IconBrandX className="h-full w-full text-white bg-transparent" />,
      href: "https://x.com/shivanjaynarula",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-white bg-transparent" />
      ),
      href: "https://github.com/ShivaanjayNarula/Code-Collab",
    },
  ];
  return (
    <RecoilRoot>
      <div className="absolute h-screen w-screen -z-10 flex items-center justify-center">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={ny(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
            "[mask-image:linear-gradient(to_bottom_left,white,transparent,white)] ",
            "h-full w-full"
          )}
        />
      </div>
      {children}
      <Toaster />
      <div className="fixed bottom-0 w-full z-50 flex items-center justify-center bg-transparent">
        <FloatingDock items={links}  desktopClassName="bg-transparent " />
      </div>
    </RecoilRoot>
  );
}
