"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import dynamic from "next/dynamic";
import {
  FaReact,
  FaCss3Alt,
  FaBootstrap,
  FaNodeJs,
  FaGithub,
  FaFigma,
  FaPython,
  FaCloudflare,
  FaAws,
} from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import {
  TbBrandJavascript,
  TbBrandNextjs,
  TbBrandTailwind,
  TbBrandMongodb,
  TbBrandDjango,
  TbBrandGoogleAnalytics,
  TbBrandTypescript,
  TbBrandThreejs,
} from "react-icons/tb";
import { TiHtml5 } from "react-icons/ti";
import {
  SiMysql,
  SiAdobephotoshop,
  SiCanva,
  SiFirebase,
  SiPostman,
  SiRedis,
  SiExpress,
  SiDocker,
  SiVercel,
  SiGraphql,
} from "react-icons/si";

// Dynamic import for the 3D Tech Galaxy Viewport
const TechGalaxy3D = dynamic(() => import("@/components/3d/TechGalaxy3D"), {
  ssr: false,
});

// Full categorized tech stack with brand colors, 3D accents and tags
const TECH_DATABASE = [
  // Frontend
  {
    name: "React.js",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: <FaReact className="w-8 h-8 text-[#61dafb]" />,
    color: "#61dafb",
    level: "95%",
    desc: "Single Page Apps, Custom Hooks, Redux, Context API",
    tag: "Core Framework",
  },
  {
    name: "Next.js 14",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: <RiNextjsFill className="w-8 h-8 text-white" />,
    color: "#ffffff",
    level: "92%",
    desc: "App Router, SSR/SSG, Server Actions, Dynamic SEO",
    tag: "Fullstack Framework",
  },
  {
    name: "TypeScript",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: <TbBrandTypescript className="w-8 h-8 text-[#3178c6]" />,
    color: "#3178c6",
    level: "90%",
    desc: "Strict type checking, Interfaces, Generics, Scalable code",
    tag: "Type Safety",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: <TbBrandTailwind className="w-8 h-8 text-[#38bdf8]" />,
    color: "#38bdf8",
    level: "95%",
    desc: "Modern utility-first CSS, Responsive design, Micro-interactions",
    tag: "Styling & UI",
  },
  {
    name: "Three.js / WebGL",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: <TbBrandThreejs className="w-8 h-8 text-[#ff9900]" />,
    color: "#ff9900",
    level: "86%",
    desc: "3D scene graphs, Shaders, Procedural geometries, Interactive viewports",
    tag: "3D Web Experience",
  },
  {
    name: "JavaScript (ES6+)",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: <TbBrandJavascript className="w-8 h-8 text-[#f7df1e]" />,
    color: "#f7df1e",
    level: "94%",
    desc: "Async/Await, Closures, DOM manipulation, Functional programming",
    tag: "Language",
  },
  {
    name: "HTML5 & Semantic Web",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: <TiHtml5 className="w-8 h-8 text-[#e34f26]" />,
    color: "#e34f26",
    level: "98%",
    desc: "Accessible markup (ARIA), Clean structure, Schema.org SEO",
    tag: "Markup",
  },
  {
    name: "CSS3 & Animations",
    category: "frontend",
    categoryLabel: "Frontend",
    icon: <FaCss3Alt className="w-8 h-8 text-[#1572b6]" />,
    color: "#1572b6",
    level: "95%",
    desc: "Keyframes, Flexbox, Grid, Glassmorphic 3D transforms",
    tag: "Styles",
  },

  // Backend & DB
  {
    name: "Node.js",
    category: "backend",
    categoryLabel: "Backend & DB",
    icon: <FaNodeJs className="w-8 h-8 text-[#68a063]" />,
    color: "#68a063",
    level: "90%",
    desc: "Event loop, RESTful microservices, Stream processing, Cluster scaling",
    tag: "Runtime",
  },
  {
    name: "Express.js",
    category: "backend",
    categoryLabel: "Backend & DB",
    icon: <SiExpress className="w-8 h-8 text-[#ffffff]" />,
    color: "#e2e8f0",
    level: "92%",
    desc: "REST APIs, Custom middlewares, JWT auth, Error handling pipelines",
    tag: "Backend Framework",
  },
  {
    name: "MongoDB & Mongoose",
    category: "backend",
    categoryLabel: "Backend & DB",
    icon: <TbBrandMongodb className="w-8 h-8 text-[#13aa52]" />,
    color: "#13aa52",
    level: "88%",
    desc: "Aggregation pipelines, Indexing, Schema validation, Atlas clustering",
    tag: "NoSQL Database",
  },
  {
    name: "MySQL / Relational DB",
    category: "backend",
    categoryLabel: "Backend & DB",
    icon: <SiMysql className="w-8 h-8 text-[#00758f]" />,
    color: "#00758f",
    level: "82%",
    desc: "Relational queries, Joins, Transactions, Data normalization",
    tag: "SQL Database",
  },
  {
    name: "Redis Caching",
    category: "backend",
    categoryLabel: "Backend & DB",
    icon: <SiRedis className="w-8 h-8 text-[#dc382d]" />,
    color: "#dc382d",
    level: "80%",
    desc: "In-memory caching, Session store, Rate limiting, Pub/Sub",
    tag: "Cache & Store",
  },
  {
    name: "Firebase Suite",
    category: "backend",
    categoryLabel: "Backend & DB",
    icon: <SiFirebase className="w-8 h-8 text-[#ffca28]" />,
    color: "#ffca28",
    level: "85%",
    desc: "Phone/Email Auth, Firestore Realtime DB, Cloud Storage",
    tag: "BaaS & Realtime",
  },

  // Tools & Cloud
  {
    name: "Git & GitHub",
    category: "tools",
    categoryLabel: "Tools & Cloud",
    icon: <FaGithub className="w-8 h-8 text-white" />,
    color: "#ffffff",
    level: "94%",
    desc: "Git workflow, PR reviews, CI/CD Actions, Release management",
    tag: "Version Control",
  },
  {
    name: "Postman",
    category: "tools",
    categoryLabel: "Tools & Cloud",
    icon: <SiPostman className="w-8 h-8 text-[#ff6c37]" />,
    color: "#ff6c37",
    level: "92%",
    desc: "API automated testing, Environment mockups, Documentation",
    tag: "API Testing",
  },
  {
    name: "Cloudflare",
    category: "tools",
    categoryLabel: "Tools & Cloud",
    icon: <FaCloudflare className="w-8 h-8 text-[#f38020]" />,
    color: "#f38020",
    level: "88%",
    desc: "DNS management, SSL/TLS security, Edge caching & CDN",
    tag: "Edge & CDN",
  },
  {
    name: "Vercel & Cloud Deploy",
    category: "tools",
    categoryLabel: "Tools & Cloud",
    icon: <SiVercel className="w-8 h-8 text-white" />,
    color: "#ffffff",
    level: "92%",
    desc: "Edge networks, Zero-config preview deployments, Serverless runtime",
    tag: "Cloud Hosting",
  },
  {
    name: "Figma UI/UX Design",
    category: "tools",
    categoryLabel: "Tools & Cloud",
    icon: <FaFigma className="w-8 h-8 text-[#f24e1e]" />,
    color: "#f24e1e",
    level: "85%",
    desc: "Design system tokens, Wireframing, High-fidelity UI prototypes",
    tag: "Design Tool",
  },

  // Architecture & SEO
  {
    name: "Dynamic SEO & Metadata",
    category: "architecture",
    categoryLabel: "Architecture & SEO",
    icon: <TbBrandGoogleAnalytics className="w-8 h-8 text-[#e37400]" />,
    color: "#e37400",
    level: "90%",
    desc: "OpenGraph, Schema.org JSON-LD, Sitemap & Robots automation",
    tag: "Search Ranking",
  },
  {
    name: "REST & Microservices",
    category: "architecture",
    categoryLabel: "Architecture & SEO",
    icon: <SiGraphql className="w-8 h-8 text-[#e10098]" />,
    color: "#e10098",
    level: "92%",
    desc: "Stateless architecture, Payload validation, Rate limits, Clean code",
    tag: "System Design",
  },
];

// Single 3D Perspective Tilt Card Component
function TechCard3D({ item, isDark }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -12);
    setRotateY(((x - centerX) / centerX) * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      whileHover={{ scale: 1.04, y: -6 }}
      className="relative group rounded-3xl p-5 border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between overflow-hidden [perspective:800px]"
      style={{
        transformStyle: "preserve-3d",
        backgroundColor: isDark ? "rgba(12, 16, 29, 0.78)" : "rgba(255, 255, 255, 0.88)",
        borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
      }}
    >
      {/* Dynamic Brand Glow on Hover */}
      <div
        className="absolute -inset-10 rounded-full opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${item.color} 0%, transparent 70%)`,
        }}
      />

      {/* Top Row: Icon + Badge */}
      <div className="flex items-center justify-between mb-3" style={{ transform: "translateZ(20px)" }}>
        <div
          className="flex items-center justify-center w-12 h-12 rounded-2xl border transition-transform duration-300 group-hover:scale-110 shadow-md"
          style={{
            backgroundColor: isDark ? "rgba(0,0,0,0.6)" : "rgba(240,242,248,0.9)",
            borderColor: item.color + "55",
            boxShadow: `0 0 15px ${item.color}33`,
          }}
        >
          {item.icon}
        </div>

        <div className="flex flex-col items-end">
          <span
            className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border shadow-sm"
            style={{
              backgroundColor: item.color + "18",
              borderColor: item.color + "44",
              color: item.color,
            }}
          >
            {item.level}
          </span>
          <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400 mt-1">
            {item.tag}
          </span>
        </div>
      </div>

      {/* Middle: Name & Description */}
      <div style={{ transform: "translateZ(15px)" }}>
        <h3
          className="text-base sm:text-lg font-black uppercase tracking-tight mb-1 group-hover:text-[#ff9900] transition-colors"
          style={{ color: isDark ? "#ffffff" : "#0f172a" }}
        >
          {item.name}
        </h3>
        <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          {item.desc}
        </p>
      </div>

      {/* Bottom: Progress Bar */}
      <div className="mt-4 pt-3 border-t border-white/10" style={{ transform: "translateZ(10px)" }}>
        <div className="relative h-1.5 rounded-full overflow-hidden bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: item.level }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{
              backgroundColor: item.color,
              boxShadow: `0 0 10px ${item.color}`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Tools3DSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", label: "All Stack", icon: "🌟" },
    { id: "frontend", label: "Frontend 3D", icon: "💻" },
    { id: "backend", label: "Backend & DB", icon: "⚙️" },
    { id: "tools", label: "Tools & Cloud", icon: "☁️" },
    { id: "architecture", label: "Architecture", icon: "⚡" },
  ];

  const filteredItems =
    activeFilter === "all"
      ? TECH_DATABASE
      : TECH_DATABASE.filter((item) => item.category === activeFilter);

  return (
    <section className="relative w-full my-8">
      {/* ── Section Title ── */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff9900]/60 bg-[#ff9900]/12 text-[#ff9900] text-xs font-bold uppercase tracking-[0.25em] shadow-[0_0_20px_rgba(255,153,0,0.3)] mb-3">
          <span>✦</span>
          <span>COMPREHENSIVE 3D ARSENAL</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight">
          Tools &{" "}
          <span className="bg-gradient-to-r from-[#FFD200] via-[#FF8500] to-[#FF4500] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,133,0,0.5)]">
            Technologies
          </span>
        </h2>
        <p className={`mt-2.5 text-xs sm:text-sm max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Interact with my full technical stack in 3D. Explore the live WebGL Tech Cosmos above, and filter specialized frameworks and microservices below.
        </p>
      </div>

      {/* ── 3D Viewport: Realtime WebGL Tech Cosmos ── */}
      <div className="mb-10">
        <TechGalaxy3D
          activeFilter={activeFilter}
          onSelectTech={(tech) => {
            if (tech.category) {
              setActiveFilter(tech.category);
            }
          }}
        />
      </div>

      {/* ── Interactive Category Filters ── */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
        {categories.map((cat) => {
          const isActive = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-xl transition-all duration-300 hover:scale-105 ${
                isActive
                  ? "bg-gradient-to-r from-[#ff9900] via-[#ff7700] to-[#ff5500] text-black border-[#ff9900] shadow-[0_0_25px_rgba(255,153,0,0.7)] font-black"
                  : isDark
                  ? "bg-black/50 border-white/15 text-gray-300 hover:border-[#ff9900] hover:text-white"
                  : "bg-white/80 border-gray-300 text-gray-700 hover:border-[#ff9900]"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isActive ? "bg-black/20 text-black font-black" : "bg-white/10 text-gray-400"
                }`}
              >
                {cat.id === "all"
                  ? TECH_DATABASE.length
                  : TECH_DATABASE.filter((i) => i.category === cat.id).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── 3D Perspective Cards Grid ── */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
      >
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <TechCard3D item={item} isDark={isDark} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

