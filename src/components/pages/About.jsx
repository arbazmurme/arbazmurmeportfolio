"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import SkillsOne from "../skills_2";
import { PORTFOLIO_STATS, PERSONAL_INFO, SOCIAL_LINKS } from "@/data/portfolioData";

// Dynamically import 3D Three.js components to prevent SSR issues
const TechGalaxy3D = dynamic(() => import("@/components/3d/TechGalaxy3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] sm:h-[520px] rounded-3xl border border-[#ff9900]/30 bg-black/40 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#ff9900] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase font-bold tracking-widest text-[#ff9900]">
          Initializing 3D Tech Cosmos...
        </span>
      </div>
    </div>
  ),
});

const AboutBackground3D = dynamic(() => import("@/components/3d/AboutBackground3D"), {
  ssr: false,
});

const HoloCard3D = dynamic(() => import("@/components/3d/HoloCard3D"), {
  ssr: false,
});

// ─── Inline SVG Icons ────────────────────────────────────────────────────────
const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#ff9900]">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#ff9900]">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#ff9900]">
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.26.2 2.47.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
  </svg>
);
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#ff9900]">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.57v-2.24c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .31.21.69.82.57C20.57 21.8 24 17.31 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#ff9900]">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM6.78 20.45H3.9V9h2.88v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.23 0z" />
  </svg>
);
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const FlagIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#ff9900]">
    <path d="M4 4h16v9H4zm0 11h16v2H4z" />
  </svg>
);
const LangIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-[#ff9900]">
    <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
  </svg>
);

// ─── Personal Info ───────────────────────────────────────────────────────────
const personalInfo = [
  { icon: <LocationIcon />, label: "Location", value: PERSONAL_INFO.location },
  { icon: <FlagIcon />, label: "Nationality", value: PERSONAL_INFO.nationality },
  { icon: <LangIcon />, label: "Languages", value: PERSONAL_INFO.languages },
  { icon: <MailIcon />, label: "Email", value: PERSONAL_INFO.email, href: PERSONAL_INFO.emailHref },
  { icon: <PhoneIcon />, label: "Phone", value: PERSONAL_INFO.phone, href: PERSONAL_INFO.phoneHref },
  { icon: <LinkedinIcon />, label: "LinkedIn", value: "arbaj-murme-4493031a3", href: SOCIAL_LINKS.linkedin },
  { icon: <GithubIcon />, label: "GitHub", value: "arbazmurme", href: SOCIAL_LINKS.github },
];

// ─── Skill Bars ──────────────────────────────────────────────────────────────
const skills = [
  { name: "React.js", pct: 95 },
  { name: "Next.js 14 (App Router & SSR)", pct: 92 },
  { name: "Tailwind CSS & Responsive UI", pct: 95 },
  { name: "Node.js & Express Architecture", pct: 90 },
  { name: "Three.js & 3D WebGL", pct: 86 },
  { name: "TypeScript & Static Analysis", pct: 90 },
  { name: "MongoDB & Mongoose Pipelines", pct: 88 },
  { name: "REST API & Microservices", pct: 92 },
  { name: "Firebase & Real-time Database", pct: 84 },
  { name: "JWT & Role-Based Access Control", pct: 88 },
  { name: "Dynamic SEO & Core Web Vitals", pct: 90 },
  { name: "CI/CD & Cloud Deployment", pct: 82 },
];

// ─── Stat Cards ──────────────────────────────────────────────────────────────
const stats = [
  { value: PORTFOLIO_STATS.yearsExperience, label: "Years Experience", icon: "🚀" },
  { value: PORTFOLIO_STATS.projectsCount, label: "Projects Completed", icon: "💼" },
  { value: PORTFOLIO_STATS.clientsCount, label: "Happy Clients", icon: "🤝" },
  { value: PORTFOLIO_STATS.linesOfCode, label: "Lines of Code", icon: "⚡" },
];

// ─── Animation Helper ────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bg = isDark ? "#060814" : "#fbf7f4";
  const cardBg = isDark ? "rgba(12, 16, 29, 0.75)" : "rgba(255, 255, 255, 0.85)";
  const borderColor = isDark ? "rgba(255, 153, 0, 0.28)" : "rgba(255, 153, 0, 0.4)";
  const textColor = isDark ? "#ffffff" : "#0f172a";
  const mutedColor = isDark ? "#94a3b8" : "#64748b";

  return (
    <div
      className="relative min-h-screen transition-colors duration-500 overflow-x-hidden selection:bg-[#ff9900]/30 selection:text-white"
      style={{ backgroundColor: bg, color: textColor }}
    >
      {/* ── Ambient 3D Particle Wave Field (Three.js) ── */}
      <AboutBackground3D />

      {/* ── Ambient Radial Background Glows ── */}
      <div className="fixed -top-40 -left-40 w-[35rem] h-[35rem] rounded-full bg-[#ff8c00]/12 blur-3xl pointer-events-none -z-0" />
      <div className="fixed -bottom-40 -right-40 w-[35rem] h-[35rem] rounded-full bg-[#8b5cf6]/10 blur-3xl pointer-events-none -z-0" />

      {/* ── Main Container (Cleared for Right Sidebar) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-8 pb-20 lg:pr-24">

        {/* ── Header Title ── */}
        <motion.div {...fadeUp(0)} className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff9900]/60 bg-[#ff9900]/12 text-[#ff9900] text-xs font-bold uppercase tracking-[0.25em] shadow-[0_0_20px_rgba(255,153,0,0.3)] mb-3">
            <span>✦</span>
            <span>GET TO KNOW ME</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
            About{" "}
            <span className="bg-gradient-to-r from-[#FFD200] via-[#FF8500] to-[#FF4500] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,133,0,0.5)]">
              Me
            </span>
          </h1>
          <div className="mt-3.5 mx-auto w-24 h-1.5 rounded-full bg-gradient-to-r from-[#ff9900] via-[#ff7700] to-[#ff4500] shadow-[0_0_15px_#ff9900]" />
        </motion.div>

        {/* ── Dual-Column Hero: 3D Holographic Photo + Personal Bio ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14">
          {/* Left: 3D Tilting Holographic Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <HoloCard3D />
          </motion.div>

          {/* Right: Bio & Personal Information Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight mb-3">
              Crafting Scalable Fullstack &{" "}
              <span className="text-[#ff9900]">3D Web Experiences</span>
            </h2>

            <p className="mb-6 text-sm sm:text-base leading-relaxed" style={{ color: mutedColor }}>
              I'm a results-driven <strong style={{ color: textColor }}>MERN Stack Developer</strong> based in Solapur, Maharashtra, specializing in scalable web systems, dynamic architectures, and cutting-edge interactive 3D WebGL interfaces. I transform complex ideas into modern, lightning-fast digital products with clean engineering and seamless aesthetics.
            </p>

            {/* Info Badges Grid */}
            <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
              {personalInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 rounded-2xl p-3 border backdrop-blur-xl transition-all duration-200 hover:border-[#ff9900] hover:shadow-[0_0_20px_rgba(255,153,0,0.2)]"
                  style={{ backgroundColor: cardBg, borderColor: borderColor }}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#ff9900]/15 border border-[#ff9900]/30 shadow-sm">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("mailto") ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-bold text-[#ff9900] hover:underline truncate block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-xs sm:text-sm font-bold truncate" style={{ color: textColor }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button: Download CV */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/arbaz-murme.pdf"
                  target="_blank"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-8 py-3.5 font-black uppercase tracking-wider text-xs sm:text-sm text-black bg-gradient-to-r from-[#ff9900] via-[#ff7700] to-[#ff5500] shadow-[0_0_28px_rgba(255,140,0,0.65)] hover:shadow-[0_0_40px_rgba(255,140,0,0.95)] transition-all"
                >
                  <DownloadIcon />
                  <span>Download Resume (CV)</span>
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12" />
                </Link>
              </motion.div>

              <Link
                href="/work"
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm border backdrop-blur-md transition-all duration-300 hover:border-[#ff9900] hover:text-[#ff9900] ${
                  isDark
                    ? "bg-black/50 border-white/20 text-white"
                    : "bg-white/90 border-gray-300 text-gray-800"
                }`}
              >
                <span>View Portfolio Projects →</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Key Metrics / Stats Row ── */}
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="rounded-2xl p-5 text-center border backdrop-blur-xl transition-all duration-300 hover:border-[#ff9900] shadow-[0_4px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,140,0,0.3)]"
              style={{ backgroundColor: cardBg, borderColor: borderColor }}
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#FFD200] to-[#FF8500] bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest mt-1.5" style={{ color: mutedColor }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════
            ── SHOWCASE 3D: INTERACTIVE 3D TECH GALAXY (THREE.JS) ──
        ══════════════════════════════════════════════════════════════════ */}
        <motion.div {...fadeUp(0.1)} className="mb-16">
          <div className="text-center mb-6">
            <span className="text-xs tracking-[0.35em] uppercase font-bold text-[#ff9900] block mb-1">
              ✦ Realtime 3D WebGL Visualization
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Interactive 3D{" "}
              <span className="bg-gradient-to-r from-[#FFD200] via-[#FF8500] to-[#FF4500] bg-clip-text text-transparent">
                Tech Cosmos
              </span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm max-w-xl mx-auto" style={{ color: mutedColor }}>
              A live 3D galaxy demonstrating my core stack. Rotate with mouse drag, inspect orbital satellites, and view architectural specializations.
            </p>
          </div>

          {/* 3D Tech Galaxy Viewport */}
          <TechGalaxy3D />
        </motion.div>

        {/* ── Technical Proficiencies (Skill Bars) ── */}
        <motion.div {...fadeUp(0)} className="mb-16">
          <div className="text-center mb-8">
            <span className="text-xs tracking-[0.35em] uppercase font-bold text-[#ff9900] block mb-1">
              Engineered Precision
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Technical{" "}
              <span className="bg-gradient-to-r from-[#FFD200] to-[#FF8500] bg-clip-text text-transparent">
                Proficiencies
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5 p-6 sm:p-8 rounded-3xl border backdrop-blur-2xl"
            style={{ backgroundColor: cardBg, borderColor: borderColor }}
          >
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs sm:text-sm font-bold tracking-wide" style={{ color: textColor }}>
                    {skill.name}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-[#ff9900]">
                    {skill.pct}%
                  </span>
                </div>

                {/* Progress Bar Track */}
                <div
                  className="relative h-2.5 rounded-full overflow-hidden"
                  style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#ff9900] via-[#ff7700] to-[#ff4500]"
                  >
                    <span className="absolute right-0 top-0 h-full w-4 rounded-full blur-sm opacity-90 bg-white" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Categorized Tech Stack (SkillsOne) ── */}
        <motion.div {...fadeUp(0)}>
          <div className="text-center mb-8">
            <span className="text-xs tracking-[0.35em] uppercase font-bold text-[#ff9900] block mb-1">
              Comprehensive Toolkit
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Tools &{" "}
              <span className="bg-gradient-to-r from-[#FFD200] via-[#FF8500] to-[#FF4500] bg-clip-text text-transparent">
                Technologies
              </span>
            </h2>
          </div>

          <SkillsOne />
        </motion.div>

      </div>
    </div>
  );
}
