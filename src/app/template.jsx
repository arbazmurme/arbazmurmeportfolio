"use client";
import { animatePageIn } from "@/context/animatePageIn";
import { useEffect } from "react";

export default function Template({ children }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div>
      {/* 
        Page Transition Banners:
        z-[99999] guarantees that on page change, banners completely cover
        all page elements (text, buttons, sidebars) so nothing leaks through.
      */}
      <div id="banner-1" className="min-h-screen bg-[#ffb400] z-[99999] pointer-events-none fixed top-0 left-0 w-1/4 shadow-2xl" />
      <div id="banner-2" className="min-h-screen bg-[#ffb400] z-[99999] pointer-events-none fixed top-0 left-1/4 w-1/4 shadow-2xl" />
      <div id="banner-3" className="min-h-screen bg-[#ffb400] z-[99999] pointer-events-none fixed top-0 left-2/4 w-1/4 shadow-2xl" />
      <div id="banner-4" className="min-h-screen bg-[#ffb400] z-[99999] pointer-events-none fixed top-0 left-3/4 w-1/4 shadow-2xl" />
      {children}
    </div>
  );
}
