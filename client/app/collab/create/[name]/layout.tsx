"use client";

import { Toaster } from "@/components/ui/toaster";
import AnimatedGridPattern from "@/components/animated-grid-pattern";
import { ny } from "@/lib/utils";

export default function Layout({ children }: { children: string }) {
  return (
    <>
      <div className="absolute h-screen w-screen -z-10 flex items-center justify-center">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.5}
          duration={3}
          repeatDelay={1}
          className={ny(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "inset-x-0 h-[200%] skew-y-12",
            "h-full w-full"
          )}
        />
      </div>
      {children}
      <Toaster />
    </>
  );
}
