"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import MilestoneCard3D from "@/components/3d/MilestoneCard3D";
import {
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaLaptop,
  FaBook,
} from "react-icons/fa";

// Dynamically import the 3D spline canvas for background
const JourneyCanvas3D = dynamic(() => import("@/components/3d/JourneyCanvas3D"), {
  ssr: false,
});

// Comprehensive Timeline Dataset
const TIMELINE_DATA = [
  {
    id: "dexterous",
    type: "work",
    icon: FaBriefcase,
    title: "Full Stack Developer",
    org: "Dexterous Technology",
    location: "Pune / Solapur",
    period: "Nov 2024 – Present",
    accentColor: "#ff9900",
    badge: "Current Role",
    points: [
      "Building and scaling enterprise multi-vendor marketplace (EWShopping) supporting 3,000+ active sellers and 80k+ monthly traffic.",
      "Engineered AI-powered search, faceted filtering system, and lightning-fast checkout architecture.",
      "Integrated Next.js 14 SSR & dynamic schema metadata to elevate organic search ranking and SEO visibility.",
      "Architected Firebase OTP phone authentication and multi-role access control (Admin, Seller, Buyer).",
      "Configured Redis in-memory caching, Nginx reverse proxy load balancing, and automated CI/CD pipelines.",
    ],
    tech: ["Next.js 14", "React.js", "Node.js", "MongoDB", "Redis", "Firebase", "Nginx", "CI/CD"],
  },
  {
    id: "lejhro",
    type: "work",
    icon: FaCode,
    title: "React JS Developer Intern",
    org: "Lejhro Technology",
    location: "Bhubaneswar",
    period: "Jul 2024 – Oct 2024",
    accentColor: "#38bdf8",
    badge: "Internship",
    points: [
      "Developed responsive, high-performance UI components with React.js and modern Tailwind CSS.",
      "Coordinated Git team workflows, feature branches, and code reviews across distributed developers.",
      "Implemented comprehensive user behavior event tracking with Google Analytics and Tag Manager.",
      "Optimized Core Web Vitals, page load speeds, and dynamic meta tags for enhanced search discoverability.",
      "Participated in agile sprints, technical standups, and performance debugging sessions.",
    ],
    tech: ["React.js", "Tailwind CSS", "JavaScript ES6+", "Google Analytics", "Git & GitHub"],
  },
  {
    id: "nareshit",
    type: "education",
    icon: FaBook,
    title: "Python & Full Stack Specialized Program",
    org: "NareshIT",
    location: "Hyderabad",
    period: "Feb 2023 – Jul 2023",
    accentColor: "#a855f7",
    badge: "Advanced Certification",
    points: [
      "Mastered full-stack architecture, relational database schema modeling, and RESTful API endpoints.",
      "Developed full-stack web applications utilizing Python, Django REST framework, and React frontends.",
      "Implemented asynchronous task queues, authentication sessions, and clean MVC engineering.",
      "Focused on UI/UX design standards, responsive layouts, and cross-browser accessibility.",
    ],
    tech: ["Python", "Django", "REST APIs", "React.js", "MySQL", "OOP Design"],
  },
  {
    id: "freelance",
    type: "work",
    icon: FaLaptop,
    title: "Freelance Hardware & Technical Systems Support",
    org: "Self-Employed",
    location: "Solapur, Maharashtra",
    period: "Oct 2020 – Nov 2022",
    accentColor: "#10b981",
    badge: "Freelance",
    points: [
      "Delivered end-to-end technical diagnostics and hardware troubleshooting for high-end workstations and PCs.",
      "Configured secure local networking, OS installations, system migrations, and disaster recovery.",
      "Consulted with local clients on hardware upgrades, component optimization, and IT infrastructure.",
    ],
    tech: ["System Hardware", "Network Security", "OS Architecture", "Diagnostics"],
  },
  {
    id: "bca",
    type: "education",
    icon: FaGraduationCap,
    title: "BCA — Bachelor of Computer Applications",
    org: "DAV Velankar College, Solapur University",
    location: "Solapur",
    period: "Feb 2018 – Oct 2020",
    accentColor: "#ff5500",
    badge: "Graduated with Distinction",
    points: [
      "Graduated with 73.03% Distinction, completing core coursework in Software Engineering, Data Structures, DBMS, and Web Technologies.",
      "Led college academic projects in C/C++, Java, and relational database systems.",
      "Built a solid foundation in algorithms, computational theory, and network protocols.",
    ],
    tech: ["Data Structures", "DBMS & SQL", "C / C++", "Software Engineering", "Algorithms"],
  },
];

const METRICS = [
  { value: "2+ Years", label: "Production Experience", icon: "🚀" },
  { value: "3,000+", label: "Sellers Onboarded", icon: "💼" },
  { value: "80,000+", label: "Monthly Traffic Scaled", icon: "⚡" },
  { value: "73.03%", label: "Degree Distinction", icon: "🎓" },
];

export default function Profile() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [filter, setFilter] = useState("all"); // "all" | "work" | "education"

  const filteredData =
    filter === "all"
      ? TIMELINE_DATA
      : TIMELINE_DATA.filter((item) => item.type === filter);

  return (
    <div
      className="relative min-h-screen transition-colors duration-500 overflow-x-hidden selection:bg-[#ff9900]/30 selection:text-white"
      style={{
        backgroundColor: isDark ? "#060814" : "#fbf7f4",
        color: isDark ? "#ffffff" : "#0f172a",
      }}
    >
      {/* ── Ambient 3D Traveling Energy Spline (Three.js) ── */}
      <JourneyCanvas3D />

      {/* ── Ambient Radial Glows ── */}
      <div className="fixed -top-40 -left-40 w-[35rem] h-[35rem] rounded-full bg-[#ff8c00]/12 blur-3xl pointer-events-none -z-0" />
      <div className="fixed -bottom-40 -right-40 w-[35rem] h-[35rem] rounded-full bg-[#8b5cf6]/10 blur-3xl pointer-events-none -z-0" />

      {/* ── Main Container (Cleared for Right Sidebar) ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pt-8 pb-24 lg:pr-24">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff9900]/60 bg-[#ff9900]/12 text-[#ff9900] text-xs font-bold uppercase tracking-[0.25em] shadow-[0_0_20px_rgba(255,153,0,0.3)] mb-3">
            <span>✦</span>
            <span>PROFESSIONAL EVOLUTION</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
            My{" "}
            <span className="bg-gradient-to-r from-[#FFD200] via-[#FF8500] to-[#FF4500] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,133,0,0.5)]">
              Journey
            </span>
          </h1>
          <p className={`mt-3 text-xs sm:text-sm max-w-xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            A chronological timeline of my professional experience, production milestones, and academic foundation in software engineering.
          </p>

          <div className="mt-3.5 mx-auto w-24 h-1.5 rounded-full bg-gradient-to-r from-[#ff9900] via-[#ff7700] to-[#ff4500] shadow-[0_0_15px_#ff9900]" />
        </motion.div>

        {/* ── Career Highlights Metrics Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-14">
          {METRICS.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.04, y: -3 }}
              className="rounded-2xl p-4 sm:p-5 text-center border backdrop-blur-xl transition-all duration-300 shadow-md hover:border-[#ff9900]"
              style={{
                backgroundColor: isDark ? "rgba(12, 16, 29, 0.78)" : "rgba(255, 255, 255, 0.88)",
                borderColor: isDark ? "rgba(255, 153, 0, 0.28)" : "rgba(255, 153, 0, 0.38)",
              }}
            >
              <div className="text-2xl mb-1">{m.icon}</div>
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#FFD200] to-[#FF8500] bg-clip-text text-transparent">
                {m.value}
              </div>
              <div className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest mt-1 text-gray-400">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Interactive Filter Switcher ── */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12">
          {[
            { id: "all", label: "Full Journey", icon: "🌌" },
            { id: "work", label: "Work & Experience", icon: "💼" },
            { id: "education", label: "Education & Courses", icon: "🎓" },
          ].map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-[#ff9900] via-[#ff7700] to-[#ff5500] text-black border-[#ff9900] shadow-[0_0_25px_rgba(255,153,0,0.7)] font-black"
                    : isDark
                    ? "bg-black/50 border-white/15 text-gray-300 hover:border-[#ff9900] hover:text-white"
                    : "bg-white/80 border-gray-300 text-gray-700 hover:border-[#ff9900]"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? "bg-black/20 text-black font-black" : "bg-white/10 text-gray-400"
                  }`}
                >
                  {tab.id === "all"
                    ? TIMELINE_DATA.length
                    : TIMELINE_DATA.filter((i) => i.type === tab.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── 3D Timeline Tree with Laser Energy Spine ── */}
        <div className="relative">
          {/* Central Pulsing Energy Spine */}
          <div className="absolute top-4 bottom-4 left-6 md:left-1/2 md:-translate-x-1/2 w-1 rounded-full bg-gradient-to-b from-[#ff9900] via-[#8b5cf6] to-[#ff9900] shadow-[0_0_15px_#ff9900]" />

          <div className="space-y-10 sm:space-y-12">
            <AnimatePresence>
              {filteredData.map((item, index) => {
                const IconComponent = item.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className={`relative flex items-start gap-6 md:gap-8 ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Central Glowing Icon Node */}
                    <div className="shrink-0 relative z-20 md:absolute md:left-1/2 md:-translate-x-1/2">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 shadow-[0_0_20px_rgba(255,153,0,0.5)] hover:scale-115"
                        style={{
                          backgroundColor: isDark ? "#0c101d" : "#ffffff",
                          borderColor: item.accentColor,
                          boxShadow: `0 0 22px ${item.accentColor}66`,
                        }}
                      >
                        <IconComponent
                          className="w-5 h-5 transition-transform duration-300"
                          style={{ color: item.accentColor }}
                        />
                      </div>
                    </div>

                    {/* Left or Right Spacing on Desktop */}
                    <div className="hidden md:block md:w-1/2" />

                    {/* 3D Milestone Card */}
                    <div className="flex-1 md:w-1/2 pl-0">
                      <MilestoneCard3D item={item} index={index} isDark={isDark} />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
