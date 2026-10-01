"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TypingText from "../../context/TypingText";
import { useMemo, useRef, useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { PORTFOLIO_STATS, SOCIAL_LINKS } from "@/data/portfolioData";
import ScrollImageSequence from "../ScrollImageSequence";

// ── Social icons (inline SVG so no extra dep needed) ──────────────────────────
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const stats = [
  { value: PORTFOLIO_STATS.yearsExperience, label: "Years Exp." },
  { value: PORTFOLIO_STATS.projectsCount, label: "Projects" },
  { value: PORTFOLIO_STATS.clientsCount, label: "Clients" },
];

const techStack = ["MongoDB", "Express", "React", "Node.js", "Next.js", "TypeScript"];

const socials = [
  { href: SOCIAL_LINKS.github, icon: <GithubIcon />, label: "GitHub" },
  { href: SOCIAL_LINKS.linkedin, icon: <LinkedinIcon />, label: "LinkedIn" },
  { href: SOCIAL_LINKS.twitter, icon: <TwitterIcon />, label: "Twitter" },
];

// ── Animation variants ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.7, delay },
});

// ── Smooth Scroll-Linked Step Style ──────────────────────────────────────────
const getStepStyle = (progress, startIn, fullIn, startOut, fullOut) => {
  let opacity = 0;
  let translateY = 30;

  if (progress < startIn) {
    opacity = 0;
    translateY = 30;
  } else if (progress >= startIn && progress < fullIn) {
    const t = (progress - startIn) / Math.max(fullIn - startIn, 0.001);
    opacity = t;
    translateY = 30 * (1 - t);
  } else if (progress >= fullIn && progress <= startOut) {
    opacity = 1;
    translateY = 0;
  } else if (progress > startOut && progress <= fullOut) {
    const t = (progress - startOut) / Math.max(fullOut - startOut, 0.001);
    opacity = 1 - t;
    translateY = -30 * t;
  } else {
    opacity = 0;
    translateY = -30;
  }

  const isInteractive = opacity > 0.45;

  return {
    opacity,
    transform: `translate3d(0, ${translateY.toFixed(1)}px, 0)`,
    pointerEvents: isInteractive ? "auto" : "none",
    visibility: opacity > 0.01 ? "visible" : "hidden",
    transition: "opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
  };
};

// ── Component ──────────────────────────────────────────────────────────────────
const HomeDetails = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const maxScroll = rect.height - window.innerHeight;
            if (maxScroll > 0) {
              const p = Math.min(Math.max(-rect.top / maxScroll, 0), 1);
              setScrollProgress(p);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${2 + Math.random() * 3}px`,
        animationDuration: `${5 + Math.random() * 10}s`,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    [],
  );

  // Theme-based colors
  const colors = {
    bg: isDark ? "#04060f" : "#f8f9fa",
    cardBg: isDark ? "rgba(255,180,0,0.06)" : "rgba(255,180,0,0.10)",
    border: isDark ? "rgba(255,180,0,0.15)" : "rgba(255,180,0,0.25)",
    text: isDark ? "#ffffff" : "#1a1a2e",
    textSecondary: isDark ? "#9ca3af" : "#4b5563",
    glow: isDark
      ? "radial-gradient(circle, rgba(255,180,0,0.12) 0%, transparent 70%)"
      : "radial-gradient(circle, rgba(255,180,0,0.08) 0%, transparent 70%)",
    grid: isDark
      ? "linear-gradient(rgba(255,180,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,180,0,0.04) 1px, transparent 1px)"
      : "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
  };

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full">
      <div
        className="sticky top-0 h-screen w-full flex flex-col lg:flex-row items-center overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: colors.bg }}
      >
        {/* ── Cinematic Scroll-Linked Image Sequence Canvas ── */}
        <ScrollImageSequence containerRef={containerRef} isDark={isDark} />

        {/* ── Floating particles ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#ffb400] animate-float"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              opacity: isDark ? p.opacity : p.opacity * 0.6,
              animationDuration: p.animationDuration,
            }}
          />
        ))}
      </div>

      {/* ── Stats cards floating at bottom-left ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="hidden lg:flex absolute bottom-8 left-8 sm:left-12 z-20 gap-3.5"
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + i * 0.15 }}
            whileHover={{ scale: 1.08, y: -4 }}
            className="flex flex-col items-center rounded-2xl px-5 py-3.5 backdrop-blur-xl border border-[#ffb400]/35 bg-black/65 shadow-[0_15px_35px_rgba(0,0,0,0.6)] cursor-default transition-all"
          >
            <span className="text-3xl font-black text-[#ffb400] leading-none drop-shadow-[0_0_15px_rgba(255,180,0,0.5)]">
              {s.value}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-200 mt-1.5">
              {s.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* ════════════════════════════════════════
          RIGHT — TEXT PANEL (SCROLL-LINKED PHASES)
      ════════════════════════════════════════ */}
      <div className="relative w-full lg:w-1/2 lg:ml-auto px-4 sm:px-8 lg:px-12 pb-16 lg:py-0 min-h-screen flex flex-col justify-center z-10">
        <div className="relative w-full min-h-[500px] sm:min-h-[520px] flex items-center">

          {/* ── PHASE 1: Introduction (Scroll 0% -> ~28%) ── */}
          <div
            style={getStepStyle(scrollProgress, 0.0, 0.0, 0.22, 0.32)}
            className="absolute inset-0 flex flex-col justify-center select-none"
          >
            {/* Speech bubble wrapper — tail visible only on mobile */}
            <div className="relative">
              <div className="bg-black/55 backdrop-blur-2xl border border-white/15 rounded-3xl rounded-bl-sm lg:rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-l-4 border-l-[#ffb400]">
                {/* Tag line */}
                <div className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1 bg-[#ffb400]/15 border border-[#ffb400]/40 text-[#ffb400] text-xs font-bold uppercase tracking-[0.25em] mb-5 w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#ffb400] animate-pulse" />
                  Welcome to my Portfolio
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black uppercase leading-[1.05] tracking-tight drop-shadow-lg">
                  <span className="text-white">Hi, I'm </span>
                  <br />
                  <span
                    className="relative inline-block drop-shadow-[0_0_30px_rgba(255,180,0,0.6)]"
                    style={{
                      background: "linear-gradient(135deg, #ffc837 0%, #ff8008 50%, #ffc837 100%)",
                      backgroundSize: "200% 200%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "gradientMove 4s ease infinite",
                    }}
                  >
                    Arbaz Murme
                  </span>
                </h1>

                {/* Typing animation */}
                <div className="mt-4 font-bold text-lg sm:text-xl text-yellow-400">
                  <TypingText />
                </div>

                {/* Description */}
                <p className="mt-5 text-base sm:text-lg font-medium leading-relaxed text-gray-100 max-w-lg drop-shadow-md">
                  MERN Stack Developer crafting{" "}
                  <span className="font-extrabold text-[#ffb400] underline decoration-[#ffb400]/40 underline-offset-4">
                    modern, scalable
                  </span>
                  , and{" "}
                  <span className="font-extrabold text-[#ffb400] underline decoration-[#ffb400]/40 underline-offset-4">
                    high-performance
                  </span>{" "}
                  web applications. Passionate about smooth UI & powerful backend systems.
                </p>

                {/* Scroll Indicator Invitation */}
                <div className="mt-7 flex items-center gap-2.5 text-xs font-bold tracking-wider text-[#ffb400]">
                  <span className="uppercase tracking-widest text-[11px] bg-[#ffb400]/20 px-3 py-1.5 rounded-full border border-[#ffb400]/30">
                    Scroll down to explore ↓
                  </span>
                </div>
              </div>
              {/* Bubble tail — mobile only */}
              <span
                className="block lg:hidden absolute -bottom-3 left-5"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "14px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "14px solid rgba(255,180,0,0.55)",
                  filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))",
                }}
              />
            </div>
          </div>

          {/* ── PHASE 2: Architecture & Tech Stack (Scroll ~35% -> ~65%) ── */}
          <div
            style={getStepStyle(scrollProgress, 0.28, 0.38, 0.62, 0.72)}
            className="absolute inset-0 flex flex-col justify-center"
          >
            <div className="relative">
              <div className="bg-black/55 backdrop-blur-2xl border border-white/15 rounded-3xl rounded-bl-sm lg:rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-l-4 border-l-[#ffb400]">
                {/* Tag line */}
                <div className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1 bg-[#ffb400]/15 border border-[#ffb400]/40 text-[#ffb400] text-xs font-bold uppercase tracking-[0.25em] mb-5 w-fit">
                  <span className="w-2 h-2 rounded-full bg-[#ffb400] animate-pulse" />
                  Core Expertise & Craftsmanship
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase leading-[1.05] tracking-tight drop-shadow-lg">
                  <span className="text-white">Scalable Systems</span>
                  <br />
                  <span
                    className="relative inline-block drop-shadow-[0_0_30px_rgba(255,180,0,0.6)]"
                    style={{
                      background: "linear-gradient(135deg, #ffc837 0%, #ff8008 50%, #ffc837 100%)",
                      backgroundSize: "200% 200%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    & Seamless UI
                  </span>
                </h2>

                {/* Description */}
                <p className="mt-4 text-base sm:text-lg font-medium leading-relaxed text-gray-100 max-w-lg drop-shadow-md">
                  Architecting fast, reactive frontend interfaces backed by robust REST APIs, modern state management, and optimized database pipelines.
                </p>

                {/* Tech stack pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="flex items-center gap-1.5 rounded-full border border-[#ffb400]/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-black/70 backdrop-blur-md shadow-lg hover:border-[#ffb400] hover:scale-105 transition-all"
                    >
                      <CodeIcon className="w-3.5 h-3.5 text-[#ffb400]" />
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stats Highlight Pills */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {stats.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 backdrop-blur-md border border-[#ffb400]/30 bg-black/70 shadow-lg"
                    >
                      <span className="text-2xl font-black text-[#ffb400] leading-none">{s.value}</span>
                      <span className="text-[11px] uppercase tracking-wider text-gray-200 font-bold">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Bubble tail — mobile only */}
              <span
                className="block lg:hidden absolute -bottom-3 left-5"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "14px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "14px solid rgba(255,180,0,0.55)",
                  filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))",
                }}
              />
            </div>
          </div>

          {/* ── PHASE 3: Call to Action & Collaboration (Scroll ~70% -> 100%) ── */}
          <div
            style={getStepStyle(scrollProgress, 0.68, 0.78, 1.0, 1.0)}
            className="absolute inset-0 flex flex-col justify-center"
          >
            <div className="relative">
            <div className="bg-black/55 backdrop-blur-2xl border border-white/15 rounded-3xl rounded-bl-sm lg:rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-l-4 border-l-[#ffb400]">
              {/* Tag line */}
              <div className="inline-flex items-center gap-2.5 rounded-full px-3.5 py-1 bg-[#ffb400]/15 border border-[#ffb400]/40 text-[#ffb400] text-xs font-bold uppercase tracking-[0.25em] mb-5 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#ffb400] animate-pulse" />
                Let's Collaborate
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black uppercase leading-[1.05] tracking-tight drop-shadow-lg">
                <span className="text-white">Ready To Build</span>
                <br />
                <span
                  className="relative inline-block drop-shadow-[0_0_30px_rgba(255,180,0,0.6)]"
                  style={{
                    background: "linear-gradient(135deg, #ffc837 0%, #ff8008 50%, #ffc837 100%)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Something Great?
                </span>
              </h2>

              {/* Description */}
              <p className="mt-4 text-base sm:text-lg font-medium leading-relaxed text-gray-100 max-w-lg drop-shadow-md">
                Available for high-impact frontend and full-stack engineering roles, freelance builds, and ambitious web products.
              </p>

              {/* CTA Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-4">
                <Link
                  href="/about"
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 font-black uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,180,0,0.4)]"
                  style={{
                    background: "linear-gradient(135deg, #ffb400, #ff8c00)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 45px rgba(255,180,0,0.7) !important")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 20px rgba(255,180,0,0.4)")}
                >
                  <span className="relative z-10 text-black font-extrabold">More About Me</span>
                  <motion.svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="3"
                    className="relative z-10 w-5 h-5"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
                </Link>

                <Link
                  href="/blog"
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border-2 border-[#ffb400]/70 bg-black/70 backdrop-blur-md px-8 py-4 font-black uppercase tracking-wider text-sm text-white transition-all duration-300 hover:border-[#ffb400] hover:bg-[#ffb400]/20 shadow-lg"
                >
                  <StarIcon className="text-[#ffb400] w-4 h-4" />
                  <span>Blog</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              {/* Social links */}
              <div className="mt-7 flex items-center gap-3">
                <span className="text-xs tracking-widest uppercase text-gray-300 font-bold mr-2">
                  Follow me
                </span>
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center w-11 h-11 rounded-full border border-[#ffb400]/40 bg-black/70 text-gray-200 transition-all duration-200 hover:scale-110 hover:text-[#ffb400] hover:border-[#ffb400] shadow-md"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
              {/* Bubble tail — mobile only */}
              <span
                className="block lg:hidden absolute -bottom-3 left-5"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "14px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "14px solid rgba(255,180,0,0.55)",
                  filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))",
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Apple-style Vertical Scroll Timeline Indicator ── */}
      <div className="hidden lg:flex fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-30 pointer-events-none select-none">
        <span className="text-[11px] font-mono tracking-widest text-[#ffb400] font-bold">
          0{scrollProgress < 0.33 ? 1 : scrollProgress < 0.67 ? 2 : 3}
        </span>
        <div className="w-[3px] h-32 bg-white/10 rounded-full overflow-hidden relative shadow-inner">
          <div
            className="w-full bg-gradient-to-b from-[#ffb400] to-[#ff8c00] rounded-full transition-all duration-75 shadow-[0_0_10px_rgba(255,180,0,0.8)]"
            style={{ height: `${Math.max(8, Math.round(scrollProgress * 100))}%` }}
          />
        </div>
        <span className="text-[11px] font-mono tracking-widest text-gray-500 font-bold">03</span>
      </div>

      {/* ── Bottom Bar: Live Scroll Percentage ── */}
      <div className="absolute bottom-6 right-8 sm:right-14 z-20 hidden sm:flex items-center gap-3 select-none pointer-events-none">
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-[#ffb400]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <span className="text-[11px] tracking-widest uppercase text-gray-400 font-medium">Scroll</span>
        <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ffb400] to-[#ff8c00] transition-all duration-75"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
        <span className="font-mono text-xs text-[#ffb400] font-semibold min-w-[34px]">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>

    </div>
  </div>
  );
};

export default HomeDetails;