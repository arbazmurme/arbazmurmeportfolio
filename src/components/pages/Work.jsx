"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { projects } from "@/data/projectsData";
import { PORTFOLIO_STATS } from "@/data/portfolioData";
import ProjectCard3D from "@/components/3d/ProjectCard3D";
import ProjectModal3D from "@/components/3d/ProjectModal3D";

// Dynamic import for WebGL 3D Canvas
const WorkCanvas3D = dynamic(() => import("@/components/3d/WorkCanvas3D"), {
  ssr: false,
});

import {
  FaReact,
  FaNodeJs,
  FaCss3Alt,
  FaJsSquare,
  FaFigma,
  FaBootstrap,
  FaPython,
  FaDatabase,
  FaAws,
  FaSearch,
  FaTimes,
  FaRocket,
  FaLayerGroup,
  FaUsers,
  FaChartLine,
  FaServer,
} from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiSwiper,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiSocketdotio,
  SiFirebase,
  SiNginx,
  SiRedis,
  SiDjango,
  SiPostman,
  SiOracle,
  SiJquery,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { TbApi, TbBrandReactNative } from "react-icons/tb";
import { MdOutlineSecurity, MdPayment } from "react-icons/md";
import { GrCloudComputer } from "react-icons/gr";
import { BiSolidDashboard } from "react-icons/bi";

// Comprehensive Tech Icon Mapping
const techIcons = {
  // Frontend
  "#react.js": <FaReact />,
  "#react-native": <TbBrandReactNative />,
  "#next.js": <SiNextdotjs />,
  "#tailwind.css": <SiTailwindcss />,
  "#bootstrap": <FaBootstrap />,
  "#css": <FaCss3Alt />,
  "#javascript": <FaJsSquare />,
  "#typescript": <SiTypescript />,
  "#jquery": <SiJquery />,
  "#redux": <SiRedux />,

  // Backend
  "#node.js": <FaNodeJs />,
  "#express.js": <SiExpress />,
  "#python": <FaPython />,
  "#django": <SiDjango />,
  "#rest-api": <TbApi />,
  "#API": <TbApi />,
  "#socket.io": <SiSocketdotio />,

  // Database
  "#mongodb": <SiMongodb />,
  "#mongoose": <SiMongodb />,
  "#sql": <FaDatabase />,
  "#oracle": <SiOracle />,
  "#redis": <SiRedis />,

  // Auth & Security
  "#firebase-auth": <SiFirebase />,
  "#jwt-auth": <MdOutlineSecurity />,
  "#otp-login": <MdOutlineSecurity />,
  "#role-based-access": <MdOutlineSecurity />,

  // DevOps & Infrastructure
  "#nginx": <SiNginx />,
  "#pm2": <GrCloudComputer />,
  "#aws": <FaAws />,
  "#vercel": <SiVercel />,
  "#cdn": <GrCloudComputer />,
  "#cloudinary": <GrCloudComputer />,
  "#load-balancer": <GrCloudComputer />,

  // Payments
  "#payment-integration": <MdPayment />,
  "#razorpay": <MdPayment />,
  "#payu": <MdPayment />,
  "#upi-intent": <MdPayment />,
  "#wallet-system": <MdPayment />,

  // UI/UX & Tools
  "#figma": <FaFigma />,
  "#swiper.js": <SiSwiper />,
  "#responsive-design": <FaCss3Alt />,
  "#postman": <SiPostman />,

  // Features
  "#ai-search-optimization": <BiSolidDashboard />,
  "#seo-optimization": <BiSolidDashboard />,
  "#ssr": <SiNextdotjs />,
  "#dynamic-seo": <SiNextdotjs />,
  "#multi-vendor-architecture": <BiSolidDashboard />,
  "#stock-management": <BiSolidDashboard />,
  "#order-management": <BiSolidDashboard />,
  "#employee-analytics": <BiSolidDashboard />,
};

const getTechIcon = (tag) => {
  return techIcons[tag] || <span className="text-xs">⚙️</span>;
};

// Filter categories
const FILTER_TABS = [
  { id: "all", label: "All Projects", icon: "🌟" },
  { id: "enterprise", label: "Enterprise & Commerce", icon: "⚡" },
  { id: "fullstack", label: "Next.js & Full-Stack", icon: "🚀" },
  { id: "mobile_api", label: "Mobile Apps & APIs", icon: "📱" },
];

export default function LatestWorks() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  // Categorize and filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. Category tab match
      const tags = (project.techs || []).join(" ").toLowerCase();
      const title = (project.title || "").toLowerCase();
      const desc = (project.description || "").toLowerCase();

      let matchesCategory = true;
      if (activeFilter === "enterprise") {
        matchesCategory =
          title.includes("ewshopping") ||
          title.includes("kirana") ||
          title.includes("shop") ||
          title.includes("rent") ||
          tags.includes("multi-vendor") ||
          tags.includes("redis") ||
          tags.includes("payment");
      } else if (activeFilter === "fullstack") {
        matchesCategory =
          tags.includes("next.js") ||
          tags.includes("react.js") ||
          title.includes("domin8") ||
          title.includes("foto mill") ||
          title.includes("dental") ||
          title.includes("coempt") ||
          title.includes("golden") ||
          title.includes("news");
      } else if (activeFilter === "mobile_api") {
        matchesCategory =
          (project.playStoreLinks && project.playStoreLinks.length > 0) ||
          tags.includes("react-native") ||
          tags.includes("rest-api") ||
          tags.includes("api") ||
          title.includes("api") ||
          title.includes("foodside") ||
          title.includes("driveome") ||
          title.includes("salontreat");
      }

      // 2. Search query match
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        matchesSearch =
          title.includes(query) ||
          desc.includes(query) ||
          tags.includes(query) ||
          (project.date || "").toLowerCase().includes(query);
      }

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 overflow-x-hidden ${
        isDark ? "bg-[#060814] text-white" : "bg-[#fbf7f4] text-gray-900"
      }`}
    >
      {/* ── 1. Three.js Ambient 3D Cyber Background ── */}
      <WorkCanvas3D />

      {/* ── 2. Subtle Radial Ambient Lighting ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#ff9900]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-[#a855f7]/10 rounded-full blur-[140px]" />
        <div className="absolute top-2/3 left-1/3 w-[400px] h-[400px] bg-[#38bdf8]/10 rounded-full blur-[130px]" />
      </div>

      {/* ── 3. Main Content Container (With right-side navigation clearance) ── */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:pr-24 pt-20 md:pt-28 pb-32">
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          {/* Top Cyber Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4 backdrop-blur-md"
            style={{
              backgroundColor: isDark ? "rgba(255, 153, 0, 0.1)" : "rgba(255, 153, 0, 0.15)",
              borderColor: "rgba(255, 153, 0, 0.4)",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-black uppercase tracking-widest text-[#ff9900]">
              ENTERPRISE & FULL-STACK ARCHITECTURE
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight"
          >
            FEATURED{" "}
            <span className="bg-gradient-to-r from-[#ff9900] via-[#ff5500] to-[#8b5cf6] bg-clip-text text-transparent">
              PROJECTS
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`mt-4 text-sm sm:text-base leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Explore high-performance multi-vendor marketplaces, modern Next.js applications, and
            scalable backend systems built with production-grade engineering.
          </motion.p>
        </div>

        {/* ── 4. Interactive 3D Production KPI Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14"
        >
          {[
            {
              label: "Years Experience",
              value: `${PORTFOLIO_STATS.yearsExperience}+`,
              icon: <FaRocket className="text-xl text-[#ff9900]" />,
              accent: "#ff9900",
            },
            {
              label: "Shipped Projects",
              value: `${projects.length}+`,
              icon: <FaLayerGroup className="text-xl text-[#38bdf8]" />,
              accent: "#38bdf8",
            },
            {
              label: "Active Sellers & Users",
              value: "3,000+",
              icon: <FaUsers className="text-xl text-[#a855f7]" />,
              accent: "#a855f7",
            },
            {
              label: "System Reliability",
              value: "99.9%",
              icon: <FaServer className="text-xl text-[#10b981]" />,
              accent: "#10b981",
            },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.04, y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative rounded-2xl p-5 sm:p-6 border backdrop-blur-xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden"
              style={{
                backgroundColor: isDark ? "rgba(12, 16, 29, 0.82)" : "rgba(255, 255, 255, 0.9)",
                borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Corner accent glow */}
              <div
                className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none"
                style={{ backgroundColor: stat.accent }}
              />

              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  {stat.icon}
                </span>
                <span
                  className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
                  style={{ backgroundColor: stat.accent, color: stat.accent }}
                />
              </div>

              <div
                className="text-2xl sm:text-3xl font-black tracking-tight"
                style={{ color: stat.accent }}
              >
                {stat.value}
              </div>
              <p
                className={`text-xs sm:text-sm font-semibold mt-1 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── 5. Category Filters & Instant Search Bar ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "text-black shadow-[0_0_20px_rgba(255,153,0,0.5)]"
                      : isDark
                      ? "text-gray-400 hover:text-white hover:bg-white/5"
                      : "text-gray-600 hover:text-black hover:bg-black/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeWorkFilter"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ff9900] to-[#ff5500]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.icon}</span>
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Instant Search Bar */}
          <div className="relative w-full md:w-72">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, project..."
              className="w-full pl-9 pr-9 py-2.5 rounded-2xl text-xs font-semibold border backdrop-blur-xl transition-all duration-200 outline-none focus:border-[#ff9900] focus:ring-1 focus:ring-[#ff9900]"
              style={{
                backgroundColor: isDark ? "rgba(12, 16, 29, 0.75)" : "rgba(255, 255, 255, 0.85)",
                borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
                color: isDark ? "#ffffff" : "#000000",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-bold text-gray-400 mb-6 px-1">
          <span>
            Showing <strong className="text-[#ff9900]">{filteredProjects.length}</strong> of{" "}
            {projects.length} Projects
          </span>
          {searchQuery && (
            <span className="text-[#ff9900]">Filtered by &quot;{searchQuery}&quot;</span>
          )}
        </div>

        {/* ── 6. 3D Projects Grid ── */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          >
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <ProjectCard3D
                  key={`${project.title}-${idx}`}
                  project={project}
                  index={idx}
                  isDark={isDark}
                  getTechIcon={getTechIcon}
                  onOpenModal={(proj) => setSelectedProject(proj)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty Search / Filter State */
          <div
            className="text-center py-20 rounded-3xl border backdrop-blur-xl"
            style={{
              backgroundColor: isDark ? "rgba(12, 16, 29, 0.5)" : "rgba(255, 255, 255, 0.5)",
              borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            }}
          >
            <p className="text-base font-bold text-[#ff9900] mb-2">No matching projects found</p>
            <p className="text-xs text-gray-400 mb-4">
              Try searching for &quot;next.js&quot;, &quot;redis&quot;, &quot;marketplace&quot; or
              clearing your filters.
            </p>
            <button
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-[#ff9900] text-black hover:bg-[#ffaa00] transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* ── 7. 3D Project Architecture Modal ── */}
      {selectedProject && (
        <ProjectModal3D
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          isDark={isDark}
          getTechIcon={getTechIcon}
        />
      )}
    </div>
  );
}
