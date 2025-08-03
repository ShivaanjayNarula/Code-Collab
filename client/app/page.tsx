"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import HomePage from "./HomePage";
import LoginPage from "./auth/login/page";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = false; // Replace with your authentication logic

    if (!isAuthenticated) {
      // Redirect to login/signup page
      router.push("");
    }
  });
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        <HomePage />
      </ThemeProvider>
    </>
  );
}
