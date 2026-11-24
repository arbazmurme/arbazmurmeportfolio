"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaGooglePlay,
  FaInfoCircle,
  FaCube,
} from "react-icons/fa";

export default function ProjectCard3D({
  project,
  index,
  isDark,
  getTechIcon,
  onOpenModal,
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const {
    title,
    date,
    techs = [],
    description,
    liveDemo,
    github,
    projectLink,
    playStoreLinks = [],
    imageSrc,
    imageAlt,
  } = project;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth tilt angles
    setRotateX(((y - centerY) / centerY) * -9);
    setRotateY(((x - centerX) / centerX) * 9);

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
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      whileHover={{ scale: 1.02, y: -6 }}
      className="group relative flex flex-col rounded-3xl border backdrop-blur-xl overflow-hidden transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.4)] [perspective:1000px]"
      style={{
        transformStyle: "preserve-3d",
        backgroundColor: isDark ? "rgba(12, 16, 29, 0.82)" : "rgba(255, 255, 255, 0.92)",
        borderColor: isDark ? "rgba(255, 153, 0, 0.25)" : "rgba(255, 153, 0, 0.38)",
      }}
    >
      {/* Dynamic Specular Holographic Glare */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 153, 0, 0.28) 0%, rgba(56, 189, 248, 0.12) 40%, transparent 70%)`,
          opacity: glarePos.opacity,
        }}
      />

      {/* Image Container */}
      <div
        className="relative w-full h-52 sm:h-56 overflow-hidden bg-black/40 cursor-pointer"
        onClick={() => onOpenModal && onOpenModal(project)}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-108"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">
            <FaCube className="w-12 h-12 text-[#ff9900]/40" />
          </div>
        )}

        {/* Ambient Gradient on Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Top Floating Badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 border border-white/20 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider text-white">
            {date || "Production"}
          </span>
        </div>

        {/* Quick View Button on Image Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal && onOpenModal(project);
          }}
          className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-black/80 border border-[#ff9900]/60 text-[#ff9900] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#ff9900] hover:text-black"
        >
          <FaInfoCircle className="text-xs" />
          Inspect
        </button>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 space-y-3.5 z-20" style={{ transform: "translateZ(20px)" }}>
        {/* Title */}
        <h3
          onClick={() => onOpenModal && onOpenModal(project)}
          className="text-base sm:text-lg font-black tracking-tight leading-snug line-clamp-2 cursor-pointer transition-colors text-[#ff9900] hover:text-[#ffaa00]"
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`text-xs leading-relaxed line-clamp-3 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {techs.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-colors"
              style={{
                backgroundColor: isDark ? "rgba(15, 23, 42, 0.7)" : "rgba(241, 245, 249, 0.9)",
                borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                color: isDark ? "#cbd5e1" : "#334155",
              }}
            >
              <span className="text-[#ff9900] text-[10px]">
                {getTechIcon ? getTechIcon(tag) : "⚙️"}
              </span>
              {tag.replace("#", "")}
            </span>
          ))}
          {techs.length > 5 && (
            <span
              onClick={() => onOpenModal && onOpenModal(project)}
              className="px-2 py-1 text-[10px] font-bold rounded-lg border border-dashed cursor-pointer transition-colors hover:border-[#ff9900] hover:text-[#ff9900]"
              style={{
                backgroundColor: isDark ? "rgba(15, 23, 42, 0.4)" : "rgba(241, 245, 249, 0.5)",
                borderColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
                color: isDark ? "#94a3b8" : "#64748b",
              }}
            >
              +{techs.length - 5} more
            </span>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="flex flex-wrap items-center gap-2 pt-3 mt-auto border-t border-white/10">
          {liveDemo && (
            <a
              href={liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-[#ff9900] text-black px-3.5 py-2 rounded-xl hover:bg-[#ffaa00] transition-all duration-300 hover:scale-105 shadow-[0_0_12px_rgba(255,153,0,0.4)]"
            >
              <FaExternalLinkAlt className="text-[10px]" />
              Live Demo
            </a>
          )}

          {playStoreLinks.map((link, idx) => (
            <a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-emerald-600 text-white px-3 py-2 rounded-xl hover:bg-emerald-500 transition-all duration-300 hover:scale-105 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
            >
              <FaGooglePlay className="text-[10px]" />
              App
            </a>
          ))}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-gray-800 text-white px-3 py-2 rounded-xl hover:bg-gray-700 transition-all duration-300 hover:scale-105 border border-white/10"
            >
              <FaGithub className="text-[11px]" />
              GitHub
            </a>
          )}

          <button
            onClick={() => onOpenModal && onOpenModal(project)}
            className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-[#ff9900] transition-colors py-1.5 px-2"
            title="Inspect Architecture"
          >
            Details →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
