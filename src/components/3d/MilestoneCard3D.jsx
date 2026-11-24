"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function MilestoneCard3D({ item, index, isDark }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX(((y - centerY) / centerY) * -10);
    setRotateY(((x - centerX) / centerX) * 10);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      whileHover={{ scale: 1.025, y: -4 }}
      className="relative rounded-3xl p-6 sm:p-7 border backdrop-blur-2xl transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.4)] overflow-hidden [perspective:1000px]"
      style={{
        transformStyle: "preserve-3d",
        backgroundColor: isDark ? "rgba(12, 16, 29, 0.84)" : "rgba(255, 255, 255, 0.9)",
        borderColor: isDark ? "rgba(255, 153, 0, 0.35)" : "rgba(255, 153, 0, 0.45)",
      }}
    >
      {/* Dynamic Specular Holographic Glare */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-20"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 180, 0, 0.25) 0%, rgba(139, 92, 246, 0.15) 30%, transparent 65%)`,
          opacity: glarePos.opacity,
        }}
      />

      {/* Ambient Corner Glow */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-20"
        style={{ backgroundColor: item.accentColor || "#ff9900" }}
      />

      {/* ── Top Header Row: Role & Tenure ── */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
            style={{ backgroundColor: item.accentColor || "#ff9900", color: item.accentColor || "#ff9900" }}
          />
          <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#ff9900]">
            {item.title}
          </h3>
        </div>

        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-black/40 border border-white/15 text-gray-300 backdrop-blur-md">
          {item.period}
        </span>
      </div>

      {/* Organization / Company Subtitle */}
      <div className="flex items-center gap-2 mb-4" style={{ transform: "translateZ(15px)" }}>
        <span className="text-sm font-bold tracking-wide" style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>
          🏢 {item.org}
        </span>
        {item.location && (
          <span className="text-xs text-gray-400 font-medium">
            • {item.location}
          </span>
        )}
      </div>

      {/* ── Bullet Achievements ── */}
      <ul className="space-y-2 mb-5" style={{ transform: "translateZ(10px)" }}>
        {item.points.map((pt, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-gray-300">
            <span className="text-[#ff9900] mt-1 shrink-0 text-xs">✦</span>
            <span style={{ color: isDark ? "#cbd5e1" : "#334155" }}>{pt}</span>
          </li>
        ))}
      </ul>

      {/* ── Technologies Used in this Role ── */}
      {item.tech && item.tech.length > 0 && (
        <div className="pt-3 border-t border-white/10" style={{ transform: "translateZ(15px)" }}>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
            STACK & ARCHITECTURE:
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {item.tech.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-[#ff9900]"
                style={{
                  backgroundColor: isDark ? "rgba(0,0,0,0.5)" : "rgba(240,242,248,0.9)",
                  borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
                  color: isDark ? "#ffffff" : "#0f172a",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
