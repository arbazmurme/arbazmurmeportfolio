"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function HoloCard3D() {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.45,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="relative flex justify-center items-center py-4 [perspective:1200px]">
      {/* Outer ambient glow */}
      <div
        className="absolute -inset-8 rounded-full blur-3xl opacity-35 pointer-events-none transition-all duration-500"
        style={{
          background: "radial-gradient(circle, #ff9900 0%, #8b5cf6 50%, transparent 75%)",
        }}
      />

      {/* 3D Tilting Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-[380px] sm:max-w-[440px] aspect-[4/5] rounded-3xl p-3 sm:p-4 backdrop-blur-2xl border-2 transition-shadow duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        style={{
          transformStyle: "preserve-3d",
          backgroundColor: isDark ? "rgba(12, 16, 29, 0.85)" : "rgba(255, 255, 255, 0.88)",
          borderColor: isDark ? "rgba(255, 153, 0, 0.7)" : "rgba(255, 153, 0, 0.9)",
          boxShadow: isDark
            ? "0 0 45px rgba(255, 140, 0, 0.35), inset 0 0 25px rgba(255, 140, 0, 0.15)"
            : "0 10px 40px rgba(255, 140, 0, 0.25), inset 0 0 20px rgba(255, 140, 0, 0.1)",
        }}
      >
        {/* Holographic Specular Glare */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 180, 0, 0.2) 25%, transparent 60%)`,
            opacity: glarePos.opacity,
          }}
        />

        {/* Orbiting dashed tech ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-3 rounded-3xl border border-dashed border-[#ff9900]/30 pointer-events-none"
        />

        {/* Inner Image Frame */}
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden flex items-end justify-center"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* Subtle Halo Arc Behind Subject */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-[#ff9900]/60 shadow-[0_0_40px_rgba(255,140,0,0.7)] pointer-events-none" />

          {/* Arbaz Photo */}
          <div className="relative w-full h-full">
            <Image
              src="/about.png"
              alt="Arbaz Murme — MERN Stack Developer"
              fill
              priority
              className="object-cover object-center transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 640px) 340px, 440px"
            />
          </div>

          {/* Gradient Overlay for seamless integration */}
          <div
            className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-10"
            style={{
              background: isDark
                ? "linear-gradient(to top, rgba(6, 8, 20, 0.85) 0%, transparent 100%)"
                : "linear-gradient(to top, rgba(255, 255, 255, 0.8) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Top-Left: "FULLSTACK 3D DEV" Badge */}
        <div
          className="absolute top-4 left-4 z-40 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 border border-white/20 backdrop-blur-md shadow-lg"
          style={{ transform: "translateZ(50px)" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </span>
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white">
            AVAILABLE FOR HIRE
          </span>
        </div>

        {/* Bottom-Right: 3D Floating Chip */}
        <div
          className="absolute -bottom-4 -right-2 sm:-right-4 z-40 flex items-center gap-2.5 rounded-2xl px-4 py-2.5 border backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105"
          style={{
            transform: "translateZ(60px)",
            backgroundColor: isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 0.95)",
            borderColor: "#ff9900",
          }}
        >
          <span className="text-lg">⚡</span>
          <div>
            <p className="text-[10px] uppercase font-black tracking-widest text-[#ff9900]">
              EXPERTISE
            </p>
            <p className={`text-xs font-bold leading-none ${isDark ? "text-white" : "text-gray-900"}`}>
              MERN + Three.js
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
