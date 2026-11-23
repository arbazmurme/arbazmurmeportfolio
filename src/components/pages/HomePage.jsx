"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "../../context/ThemeContext";
import { PORTFOLIO_STATS, SOCIAL_LINKS, PERSONAL_INFO } from "@/data/portfolioData";
import TransitionLink from "@/components/TransitionLink";

const SilkSpiderCursor = dynamic(
  () => import("@/components/ui/silk-spider-cursor").then((mod) => mod.SilkSpiderCursor || mod.default),
  { ssr: false }
);

// ── Accurate Brand & Tech Icons ───────────────────────────────────────────────
const MongoDbIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#13aa52]" fill="currentColor">
    <path d="M12 0c-.3 0-.6.1-.9.3C7.8 2.5 4 8.7 4 14.5 4 19.7 7.6 24 12 24s8-4.3 8-9.5c0-5.8-3.8-12-7.1-14.2-.3-.2-.6-.3-.9-.3zm.3 2.5c2.3 2 5.5 7.1 5.5 12 0 4-2.5 7.5-5.8 7.5-.1 0-.1 0-.2 0V2.5c.2 0 .3 0 .5 0z" />
  </svg>
);

const ExpressIcon = () => (
  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white text-black font-extrabold text-[10px] leading-none">
    ex
  </span>
);

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#61dafb]" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.8" fill="currentColor" />
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#68a063]" fill="currentColor">
    <path d="M12 1.5L2.25 7.1v11.3L12 24l9.75-5.6V7.1L12 1.5zm6.5 14.7l-6.5 3.8-6.5-3.8V9.3l6.5-3.8 6.5 3.8v6.9z" />
  </svg>
);

const NextJsIcon = () => (
  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white text-black font-black text-[10px] leading-none">
    N
  </span>
);

const TypeScriptIcon = () => (
  <span className="flex items-center justify-center w-4 h-4 rounded bg-[#3178c6] text-white font-bold text-[10px] leading-none">
    TS
  </span>
);

// ── UI Navigation & Action Icons ──────────────────────────────────────────────
const PlaneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-4.5 sm:h-4.5">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#ff9900]">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#ff9900]">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

// ── Social Icons ───────────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4.5 h-4.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const techItems = [
  { name: "MongoDB", icon: <MongoDbIcon /> },
  { name: "Express", icon: <ExpressIcon /> },
  { name: "React", icon: <ReactIcon /> },
  { name: "Node.js", icon: <NodeIcon /> },
  { name: "Next.js", icon: <NextJsIcon /> },
  { name: "TypeScript", icon: <TypeScriptIcon /> },
];

const socials = [
  { href: SOCIAL_LINKS.github, icon: <GithubIcon />, label: "GitHub" },
  { href: SOCIAL_LINKS.linkedin, icon: <LinkedinIcon />, label: "LinkedIn" },
  { href: SOCIAL_LINKS.twitter, icon: <TwitterIcon />, label: "Twitter" },
  { href: PERSONAL_INFO.emailHref, icon: <MailIcon />, label: "Email" },
];

export default function HomePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <main
      className="relative z-0 h-screen w-full max-h-screen flex items-center justify-center overflow-hidden transition-all duration-500 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: isDark ? "url('/bg-dark.jpg')" : "url('/bg-light.jpg')",
        backgroundColor: isDark ? "#060814" : "#fbf7f4",
      }}
    >
      {/* ── Ambient Radial Glows (matching ribbon waves) ── */}
      <div className="absolute -top-20 -left-20 w-[30rem] h-[30rem] rounded-full bg-[#ff8c00]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] rounded-full bg-[#ff8c00]/15 blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-[26rem] h-[26rem] rounded-full bg-[#8b5cf6]/12 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[26rem] h-[26rem] rounded-full bg-[#8b5cf6]/12 blur-3xl pointer-events-none" />

      {/* ── Silk Spider Cursor with Custom Spider Model ── */}
      <SilkSpiderCursor
        modelSrc="/models/spider.glb"
        anchorSelector="[data-silk-anchor]"
        silkColor={isDark ? "#ffaa33" : "#ff7700"}
        zIndex={30}
      />

      {/* ── Wide Responsive Hero Container (Clearance for Right Sidebar) ── */}
      <div className="relative z-[1] w-full max-w-[1550px] mx-auto px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16 lg:pr-28 xl:pr-32">

        {/* ════════════════════════════════════════
            LEFT COLUMN: PROMINENT PROFILE CARD & STATS
        ════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-[42%] xl:w-[40%] flex flex-col items-center justify-center"
        >
          {/* Outer Profile Card with Vivid Glowing Neon Orange Frame */}
          <div
            data-silk-anchor
            className={`relative w-60 sm:w-72 md:w-80 lg:w-[360px] xl:w-[410px] aspect-[4/5] max-h-[44vh] sm:max-h-[48vh] lg:max-h-[52vh] xl:max-h-[55vh] rounded-3xl overflow-hidden p-2.5 sm:p-3.5 backdrop-blur-xl border-2 transition-all duration-300 shadow-[0_0_40px_rgba(255,140,0,0.4)] ${
              isDark
                ? "bg-[#0c101d]/80 border-[#ff8c00]/85"
                : "bg-white/85 border-[#ff8c00]"
            }`}
          >
            {/* Top-Left: "AVAILABLE FOR WORK" Badge */}
            <div
              data-silk-anchor
              className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/80 border border-white/20 backdrop-blur-md shadow-lg"
            >
              <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
                AVAILABLE FOR WORK
              </span>
            </div>

            {/* Inner Content Area */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-end justify-center">
              {/* Bold Golden/Orange Circular Halo Arc behind Arbaz */}
              <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 rounded-full border-2 border-[#ff8c00] shadow-[0_0_45px_rgba(255,140,0,0.95),inset_0_0_30px_rgba(255,140,0,0.55)] pointer-events-none" />

              {/* Arbaz Murme Photo */}
              <div className="relative w-full h-full">
                <Image
                  src="/arbaz_murme.png"
                  alt="Arbaz Murme — MERN Stack Developer"
                  fill
                  priority
                  className="object-contain object-bottom relative z-10 transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 340px, 420px"
                />
              </div>

              {/* Bottom Orange Wave Glow */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#ff8c00]/40 via-[#ff8c00]/15 to-transparent pointer-events-none rounded-b-2xl z-10" />
            </div>
          </div>

          {/* 3 Prominent Stats Cards Underneath Photo */}
          <div className="mt-3.5 sm:mt-4.5 flex items-center justify-center gap-2.5 sm:gap-3.5 w-full max-w-xs sm:max-w-sm lg:max-w-[360px] xl:max-w-[410px]">
            {/* Stat 1: Years Exp */}
            <div
              data-silk-anchor
              className={`flex-1 flex flex-col items-center justify-center py-2.5 sm:py-3 px-2.5 rounded-2xl border backdrop-blur-xl transition-all duration-200 hover:scale-105 ${
                isDark
                  ? "bg-[#0c101d]/80 border-[#ff8c00]/45 shadow-[0_4px_22px_rgba(0,0,0,0.55),0_0_18px_rgba(255,140,0,0.2)]"
                  : "bg-white/90 border-[#ff8c00]/60 shadow-[0_4px_18px_rgba(0,0,0,0.08),0_0_12px_rgba(255,140,0,0.2)]"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff9900] mb-0.5 sm:mb-1">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className={`text-xl sm:text-2xl font-black leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                {PORTFOLIO_STATS.yearsExperience}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-widest text-gray-400 mt-0.5">
                YEARS EXP.
              </span>
            </div>

            {/* Stat 2: Projects */}
            <div
              data-silk-anchor
              className={`flex-1 flex flex-col items-center justify-center py-2.5 sm:py-3 px-2.5 rounded-2xl border backdrop-blur-xl transition-all duration-200 hover:scale-105 ${
                isDark
                  ? "bg-[#0c101d]/80 border-[#ff8c00]/45 shadow-[0_4px_22px_rgba(0,0,0,0.55),0_0_18px_rgba(255,140,0,0.2)]"
                  : "bg-white/90 border-[#ff8c00]/60 shadow-[0_4px_18px_rgba(0,0,0,0.08),0_0_12px_rgba(255,140,0,0.2)]"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff9900] mb-0.5 sm:mb-1">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <span className={`text-xl sm:text-2xl font-black leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                {PORTFOLIO_STATS.projectsCount}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-widest text-gray-400 mt-0.5">
                PROJECTS
              </span>
            </div>

            {/* Stat 3: Clients */}
            <div
              data-silk-anchor
              className={`flex-1 flex flex-col items-center justify-center py-2.5 sm:py-3 px-2.5 rounded-2xl border backdrop-blur-xl transition-all duration-200 hover:scale-105 ${
                isDark
                  ? "bg-[#0c101d]/80 border-[#ff8c00]/45 shadow-[0_4px_22px_rgba(0,0,0,0.55),0_0_18px_rgba(255,140,0,0.2)]"
                  : "bg-white/90 border-[#ff8c00]/60 shadow-[0_4px_18px_rgba(0,0,0,0.08),0_0_12px_rgba(255,140,0,0.2)]"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff9900] mb-0.5 sm:mb-1">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className={`text-xl sm:text-2xl font-black leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                {PORTFOLIO_STATS.clientsCount}
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-widest text-gray-400 mt-0.5">
                CLIENTS
              </span>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════
            RIGHT COLUMN: BIO, TECH STACK & ACTIONS
        ════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-[58%] xl:w-[60%] flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Welcome Tag Pill */}
          <div
            data-silk-anchor
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff9900]/60 bg-[#ff9900]/12 text-[#ff9900] text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] shadow-[0_0_18px_rgba(255,153,0,0.35)] mb-2.5 sm:mb-3"
          >
            <span>✦</span>
            <span>WELCOME TO MY PORTFOLIO</span>
          </div>

          {/* Bold Scaled Headline */}
          <h1 data-silk-anchor className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight leading-[1.04]">
            <span className={isDark ? "text-white" : "text-gray-900"}>HI, I'M </span>
            <br />
            <span
              className="inline-block bg-gradient-to-r from-[#FFD200] via-[#FF8500] to-[#FF4500] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,133,0,0.55)]"
            >
              ARBAZ MURME
            </span>
          </h1>

          {/* Subtitle with TypeAnimation */}
          <div className="mt-1.5 sm:mt-2 text-lg sm:text-xl lg:text-2xl font-black uppercase text-[#ff9900] tracking-wide">
            <TypeAnimation
              sequence={[
                "MERN STACK & REACT SPECIALIST",
                2200,
                "LET'S BUILD WITH MODERN TECHNOLOGY",
                2200,
                "FULL STACK WEB DEVELOPER",
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ display: "inline-block" }}
            />
          </div>

          {/* Description with Left Orange Accent Line */}
          <div className="border-l-3 border-[#ff9900] pl-4 my-3 sm:my-3.5 text-left">
            <p className={`text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl font-normal ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              MERN Stack Developer building modern, scalable, and high-performance
              web applications. Passionate about responsive UI design, microservices,
              and clean code architecture.
            </p>
          </div>

          {/* Tech Stack Pills (Enlarged and Enhanced) */}
          <div className="mt-2.5 sm:mt-3 flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-2.5 max-w-2xl">
            {techItems.map((tech) => (
              <span
                key={tech.name}
                data-silk-anchor
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border text-xs sm:text-[13px] font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-[#ff9900] ${
                  isDark
                    ? "bg-black/65 border-white/20 text-white shadow-md"
                    : "bg-white/90 border-gray-300 text-gray-800 shadow-sm"
                }`}
              >
                {tech.icon}
                <span>{tech.name}</span>
              </span>
            ))}
          </div>

          {/* Action Buttons with Page Transition Links */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Primary Button: MORE ABOUT ME */}
            <TransitionLink
              href="/about"
              data-silk-anchor
              className="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full font-black uppercase tracking-wider text-xs sm:text-sm text-black bg-gradient-to-r from-[#ff9900] via-[#ff7700] to-[#ff5500] shadow-[0_0_28px_rgba(255,140,0,0.65)] hover:shadow-[0_0_40px_rgba(255,140,0,0.95)] hover:scale-105 transition-all"
            >
              <PlaneIcon />
              <span>MORE ABOUT ME</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 font-bold">→</span>
            </TransitionLink>

            {/* Secondary Button: PROJECTS */}
            <TransitionLink
              href="/work"
              data-silk-anchor
              className={`inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm border backdrop-blur-md transition-all duration-300 hover:border-[#ff9900] hover:text-[#ff9900] hover:scale-105 ${
                isDark
                  ? "bg-black/55 border-white/25 text-white shadow-md"
                  : "bg-white/90 border-gray-300 text-gray-800 shadow-sm"
              }`}
            >
              <BriefcaseIcon />
              <span>PROJECTS</span>
            </TransitionLink>

            {/* Tertiary Button: BLOG */}
            <TransitionLink
              href="/blog"
              data-silk-anchor
              className={`inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm border backdrop-blur-md transition-all duration-300 hover:border-[#ff9900] hover:text-[#ff9900] hover:scale-105 ${
                isDark
                  ? "bg-black/55 border-white/25 text-white shadow-md"
                  : "bg-white/90 border-gray-300 text-gray-800 shadow-sm"
              }`}
            >
              <BookIcon />
              <span>BLOG</span>
            </TransitionLink>
          </div>

          {/* Social Links Connect Row */}
          <div className="mt-5 sm:mt-6 flex items-center justify-center lg:justify-start gap-3">
            <span className="text-[11px] sm:text-xs uppercase font-extrabold tracking-widest text-gray-400 mr-1.5">
              CONNECT:
            </span>
            {socials.map((s, i) => (
              <a
                key={i}
                data-silk-anchor
                href={s.href}
                target={s.href.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border backdrop-blur-md transition-all duration-200 hover:scale-110 hover:border-[#ff9900] hover:text-[#ff9900] hover:shadow-[0_0_18px_rgba(255,140,0,0.5)] ${
                  isDark
                    ? "bg-black/60 border-white/20 text-gray-200"
                    : "bg-white/90 border-gray-300 text-gray-700"
                }`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
}
