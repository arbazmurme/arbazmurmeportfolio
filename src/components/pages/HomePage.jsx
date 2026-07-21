"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import TypingText from "../../context/TypingText";
import { useMemo } from "react";
import { useTheme } from "../../context/ThemeContext";

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
  { value: "2+", label: "Years Exp." },
  { value: "20+", label: "Projects" },
  { value: "10+", label: "Clients" },
];

const techStack = ["MongoDB", "Express", "React", "Node.js", "Next.js", "TypeScript"];

const socials = [
  { href: "https://github.com/", icon: <GithubIcon />, label: "GitHub" },
  { href: "https://linkedin.com/", icon: <LinkedinIcon />, label: "LinkedIn" },
  { href: "https://twitter.com/", icon: <TwitterIcon />, label: "Twitter" },
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

// ── Component ──────────────────────────────────────────────────────────────────
const HomeDetails = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
    <div
      className="relative flex flex-col lg:flex-row min-h-screen items-center overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: colors.bg }}
    >

      {/* ── Background: grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: colors.grid,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Background: radial glow top-left ── */}
      <div
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: colors.glow }}
      />

      {/* ── Background: radial glow bottom-right ── */}
      <div
        className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: colors.glow }}
      />

      {/* ── Animated horizontal scan line ── */}
      <motion.div
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(90deg, transparent, rgba(255,180,0,0.25), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,180,0,0.15), transparent)"
        }}
      />

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

      {/* ════════════════════════════════════════
          LEFT — PHOTO PANEL (FULL HEIGHT & WIDTH)
      ════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-1/2 fixed left-0 top-0 h-screen items-center justify-center z-1 px-8">
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Glow ring behind photo */}
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-30"
            style={{
              background: isDark
                ? "radial-gradient(circle, #ffb400 0%, transparent 70%)"
                : "radial-gradient(circle, #ffb400 0%, transparent 70%)",
              transform: "scale(1.3)"
            }}
          />

          {/* Rotating dashed border */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 rounded-full border border-dashed border-[#ffb400]/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-8 rounded-full border border-dashed border-[#ffb400]/10"
          />

          {/* Floating badge — Available */}
         

          {/* Photo - FULL HEIGHT & WIDTH */}
          <div
            className="relative w-full h-full max-w-[90%] max-h-[90%] rounded-2xl overflow-hidden flex items-center justify-center"
            style={{
              boxShadow: isDark
                ? "0 0 0 1px rgba(255,180,0,0.15), 0 40px 100px rgba(0,0,0,0.7), 0 0 80px rgba(255,180,0,0.12)"
                : "0 0 0 1px rgba(255,180,0,0.20), 0 40px 80px rgba(0,0,0,0.10), 0 0 60px rgba(255,180,0,0.08)",
            }}
          >
            <Image
              src="/arbaz_murme.png"
              alt="Arbaz Murme — MERN Stack Developer"
              fill
              priority
              className="relative z-10 object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gradient overlay at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20"
              style={{
                background: isDark
                  ? "linear-gradient(to top, #04060f, transparent)"
                  : "linear-gradient(to top, #f8f9fa, transparent)"
              }}
            />
          </div>

          {/* Stats cards floating below photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 w-max z-30"
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.15 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className="flex flex-col items-center rounded-xl px-5 py-3 backdrop-blur-md border border-[#ffb400]/15 cursor-default"
                style={{
                  background: isDark
                    ? "rgba(255,180,0,0.06)"
                    : "rgba(255,255,255,0.7)"
                }}
              >
                <span className="text-2xl font-black text-[#ffb400] leading-none">{s.value}</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile image — shown at TOP on small screens */}
      <div className="lg:hidden flex justify-center w-full pt-4 md:-40 pb-4 px-0 md:px-6">
        <div
          className="relative w-64 h-80 rounded-2xl overflow-hidden"
          style={{
            boxShadow: isDark
              ? "0 0 0 1px rgba(255,180,0,0.2), 0 20px 50px rgba(0,0,0,0.5)"
              : "0 0 0 1px rgba(255,180,0,0.3), 0 20px 50px rgba(0,0,0,0.1)"
          }}
        >
          <Image
            src="/arbaz_murme.png"
            alt="Arbaz Murme"
            fill
            className="object-cover object-top"
            priority
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-20"
            style={{
              background: isDark
                ? "linear-gradient(to top, #04060f, transparent)"
                : "linear-gradient(to top, #f8f9fa, transparent)"
            }}
          />
        </div>
      </div>

      {/* ════════════════════════════════════════
          RIGHT — TEXT PANEL
      ════════════════════════════════════════ */}
      <div className="relative w-full lg:w-1/2 lg:ml-auto px-6 sm:px-10 lg:px-16 pb-16 lg:py-0 min-h-screen flex flex-col justify-center">

        {/* Tag line */}
        <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-[#ffb400]" />
          <span className="text-xs tracking-[0.35em] uppercase font-semibold text-[#ffb400]">
            Welcome to my Portfolio
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          {...fadeUp(0.25)}
          className="text-5xl sm:text-6xl xl:text-7xl font-black uppercase leading-[1] tracking-tight"
        >
          <span style={{ color: colors.text }}>Hi, I'm </span>
          <br />
          <span
            className="relative inline-block"
            style={{
              background: "linear-gradient(135deg, #ffb400 0%, #ff8c00 50%, #ffb400 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientMove 4s ease infinite",
            }}
          >
            Arbaz Murme
          </span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div {...fadeIn(0.5)} className="mt-5">
          <TypingText />
        </motion.div>

        {/* Description */}
        <motion.p
          {...fadeUp(0.65)}
          className="mt-6 text-base sm:text-lg leading-relaxed max-w-lg"
          style={{ color: colors.textSecondary }}
        >
          MERN Stack Developer crafting{" "}
          <span className="font-semibold" style={{ color: colors.text }}>modern, scalable</span>, and{" "}
          <span className="font-semibold" style={{ color: colors.text }}>high-performance</span> web applications.
          Passionate about smooth UI & powerful backend systems.
        </motion.p>

        {/* Tech stack pills */}
        <motion.div {...fadeUp(0.75)} className="mt-8 flex flex-wrap gap-2">
          {techStack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              whileHover={{ scale: 1.1, borderColor: "#ffb400" }}
              className="flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider cursor-default transition-colors duration-200"
              style={{
                borderColor: isDark ? "rgba(255,180,0,0.20)" : "rgba(255,180,0,0.30)",
                color: colors.textSecondary,
                background: isDark ? "rgba(255,180,0,0.05)" : "rgba(255,180,0,0.08)",
              }}
            >
              <CodeIcon className="w-3 h-3 text-[#ffb400]" />
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.85)}
          className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4"
        >
          {/* Primary button */}
          <Link
            href="/about"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #ffb400, #ff8c00)",
              boxShadow: "0 0 0 rgba(255,180,0,0)",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 40px rgba(255,180,0,0.45)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 0 rgba(255,180,0,0)"}
          >
            <span className="relative z-10 text-black">More About Me</span>
            <motion.svg
              viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5"
              className="relative z-10 w-5 h-5"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
            {/* shine sweep */}
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
          </Link>

          {/* Secondary button */}
          <Link
            href="/blog"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border px-8 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300"
            style={{
              borderColor: isDark ? "rgba(255,180,0,0.40)" : "rgba(255,180,0,0.50)",
              color: colors.text,
              background: isDark ? "rgba(255,180,0,0.04)" : "rgba(255,180,0,0.06)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = isDark ? "rgba(255,180,0,0.10)" : "rgba(255,180,0,0.15)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(255,180,0,0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = isDark ? "rgba(255,180,0,0.04)" : "rgba(255,180,0,0.06)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <StarIcon className="text-[#ffb400] w-4 h-4" />
            <span>Blog</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        {/* Social links */}
        <motion.div {...fadeUp(1.0)} className="mt-10 flex items-center gap-3">
          <span className="text-xs tracking-widest uppercase text-gray-500 mr-2">Follow me</span>
          {socials.map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.1 }}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-10 h-10 rounded-full border transition-colors duration-200"
              style={{
                borderColor: isDark ? "rgba(255,180,0,0.20)" : "rgba(255,180,0,0.30)",
                color: isDark ? "#9ca3af" : "#4b5563",
                background: isDark ? "rgba(255,180,0,0.05)" : "rgba(255,180,0,0.08)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#ffb400";
                e.currentTarget.style.borderColor = "rgba(255,180,0,0.60)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = isDark ? "#9ca3af" : "#4b5563";
                e.currentTarget.style.borderColor = isDark ? "rgba(255,180,0,0.20)" : "rgba(255,180,0,0.30)";
              }}
            >
              {s.icon}
            </motion.a>
          ))}

          {/* Divider + scroll hint */}
          <div className="ml-auto hidden sm:flex items-center gap-2 text-gray-500 text-xs">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <span className="tracking-widest uppercase">Scroll</span>
          </div>
        </motion.div>

      </div>



    </div>
  );
};

export default HomeDetails;