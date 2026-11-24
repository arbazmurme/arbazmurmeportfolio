"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaGooglePlay,
  FaTimes,
  FaLayerGroup,
  FaCheckCircle,
  FaCube,
  FaRocket,
} from "react-icons/fa";

export default function ProjectModal3D({ project, onClose, isDark, getTechIcon }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!project) return null;

  const {
    title,
    date,
    techs = [],
    description,
    liveDemo,
    github,
    playStoreLinks = [],
    imageSrc,
    imageAlt,
  } = project;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl z-10 [perspective:1000px]"
          style={{
            backgroundColor: isDark ? "rgba(12, 16, 29, 0.95)" : "rgba(255, 255, 255, 0.97)",
            borderColor: isDark ? "rgba(255, 153, 0, 0.35)" : "rgba(255, 153, 0, 0.5)",
            boxShadow: isDark
              ? "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 153, 0, 0.15)"
              : "0 25px 60px -15px rgba(0, 0, 0, 0.15), 0 0 30px rgba(255, 153, 0, 0.2)",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 border border-white/20 text-white hover:bg-[#ff9900] hover:text-black hover:scale-110 transition-all duration-200"
            title="Close Preview"
          >
            <FaTimes className="w-4 h-4" />
          </button>

          {/* Banner Image with Glowing Overlay */}
          <div className="relative w-full h-56 sm:h-72 md:h-80 bg-black/40 overflow-hidden rounded-t-3xl border-b border-white/10">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt || title}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">
                <FaCube className="w-16 h-16 text-[#ff9900]/40 animate-pulse" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Badges on Banner */}
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-black/75 border border-[#ff9900]/50 text-[#ff9900] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {date || "Production App"}
              </span>

              <div className="flex items-center gap-2">
                {liveDemo && (
                  <a
                    href={liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-[#ff9900] to-[#ff5500] text-black hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,153,0,0.5)]"
                  >
                    <FaRocket className="text-xs" />
                    Launch App
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Title & Architecture Headline */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#ff9900]">
                {title}
              </h2>
              <p
                className={`text-sm mt-1 font-semibold ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Production Solution • Full-Stack Architecture
              </p>
            </div>

            {/* Architectural Summary */}
            <div
              className="p-5 rounded-2xl border"
              style={{
                backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
                borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
              }}
            >
              <h3 className="text-xs font-black uppercase tracking-widest text-[#ff9900] mb-2 flex items-center gap-2">
                <FaLayerGroup /> Architecture & System Overview
              </h3>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {description}
              </p>
            </div>

            {/* Complete Tech Stack Specification */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-[#ff9900] mb-3 flex items-center gap-2">
                <FaCheckCircle /> Technologies & Frameworks ({techs.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {techs.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all duration-200"
                    style={{
                      backgroundColor: isDark ? "rgba(15, 23, 42, 0.7)" : "rgba(241, 245, 249, 0.9)",
                      borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                      color: isDark ? "#e2e8f0" : "#1e293b",
                    }}
                  >
                    <span className="text-[#ff9900] text-sm">
                      {getTechIcon ? getTechIcon(tag) : "⚙️"}
                    </span>
                    {tag.replace("#", "")}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2.5">
                {liveDemo && (
                  <a
                    href={liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider bg-[#ff9900] text-black px-4 py-2.5 rounded-xl hover:bg-[#ffaa00] transition-all shadow-[0_0_15px_rgba(255,153,0,0.4)] hover:scale-105"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    Visit Live Website
                  </a>
                )}
                {playStoreLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider bg-emerald-600 text-white px-4 py-2.5 rounded-xl hover:bg-emerald-500 transition-all hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  >
                    <FaGooglePlay className="text-xs" />
                    Play Store App {playStoreLinks.length > 1 ? `#${idx + 1}` : ""}
                  </a>
                ))}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider bg-gray-800 text-white px-4 py-2.5 rounded-xl hover:bg-gray-700 transition-all hover:scale-105 border border-white/10"
                  >
                    <FaGithub className="text-xs" />
                    GitHub Source
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="text-xs font-bold text-gray-400 hover:text-white px-3 py-1.5 transition-colors"
              >
                Close (ESC)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
