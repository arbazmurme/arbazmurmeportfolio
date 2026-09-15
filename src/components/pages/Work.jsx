"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projectsData";
import { PORTFOLIO_STATS } from "@/data/portfolioData";
import {
  FaReact,
  FaNodeJs,
  FaCss3Alt,
  FaJsSquare,
  FaFigma,
  FaBootstrap,
  FaGooglePlay,
  FaGithub,
  FaExternalLinkAlt,
  FaPython,
  FaDatabase,
  FaAws,
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

// Define all possible tech icons – add new ones here
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

  // Maps & Location
  "#google-maps-api": <FaJsSquare />,

  // UI/UX
  "#figma": <FaFigma />,
  "#swiper.js": <SiSwiper />,
  "#responsive-design": <FaCss3Alt />,

  // Tools
  "#postman": <SiPostman />,

  // Features
  "#ai-search-optimization": <BiSolidDashboard />,
  "#seo-optimization": <BiSolidDashboard />,
  "#ssr": <SiNextdotjs />,
  "#dynamic-seo": <SiNextdotjs />,
  "#filter-system": <BiSolidDashboard />,
  "#appointment-system": <BiSolidDashboard />,
  "#slot-management": <BiSolidDashboard />,
  "#multi-vendor-architecture": <BiSolidDashboard />,
  "#stock-management": <BiSolidDashboard />,
  "#order-management": <BiSolidDashboard />,
  "#employee-analytics": <BiSolidDashboard />,
  "#commission-system": <BiSolidDashboard />,
  "#referral-system": <BiSolidDashboard />,
  "#promo-codes": <BiSolidDashboard />,
  "#cashback": <BiSolidDashboard />,
  "#google-translate-api": <FaJsSquare />,
};


// Helper to get icon for a tech tag, fallback to a default
const getTechIcon = (tag) => {
  const icon = techIcons[tag];
  return icon ? icon : <span className="text-xs text-gray-400">⚙️</span>; // fallback
};

const ProjectCard = ({ project, index }) => {
  const {
    title,
    date,
    techs,
    description,
    liveDemo,
    github,
    projectLink,
    playStoreLinks,
    imageSrc,
    imageAlt,
  } = project;

  return (
    <div
      className="group relative flex flex-col bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden hover:border-[#ffb400]/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#ffb400]/10 scroll-reveal"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <Link href={projectLink} target="_blank" rel="noopener noreferrer" className="relative overflow-hidden block">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={600}
          height={360}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="w-full h-52 object-contain transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute top-3 right-3 text-xs text-[#ffb400] bg-gray-900/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#ffb400]/30">
          {date}
        </span>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <h3 className="text-base font-bold text-[#ffb400] leading-snug line-clamp-2">
          {title}
        </h3>

        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {techs.slice(0, 6).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] bg-gray-800/80 text-gray-300 rounded-full border border-gray-700 hover:border-[#ffb400] hover:text-[#ffb400] transition-all duration-200"
            >
              <span className="text-[#ffb400] text-[10px]">{getTechIcon(tag)}</span>
              {tag.replace("#", "")}
            </span>
          ))}
          {techs.length > 6 && (
            <span className="px-2 py-0.5 text-[10px] bg-gray-800/60 text-gray-500 rounded-full border border-gray-700">
              +{techs.length - 6} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 pt-2 mt-auto">
          {liveDemo && (
            <a
              href={liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs bg-[#ffb400] text-black font-semibold px-3 py-1.5 rounded-lg hover:bg-[#e09e00] transition-all duration-300 hover:-translate-y-0.5"
            >
              <FaExternalLinkAlt className="text-[10px]" />
              Live Demo
            </a>
          )}
          {playStoreLinks?.map((link, i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs bg-green-600 text-white font-semibold px-3 py-1.5 rounded-lg hover:bg-green-700 transition-all duration-300 hover:-translate-y-0.5"
            >
              <FaGooglePlay className="text-[10px]" />
              {playStoreLinks.length > 1 ? `Play Store ${i + 1}` : "Play Store"}
            </a>
          ))}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs bg-gray-700 text-white font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-600 transition-all duration-300 hover:-translate-y-0.5"
            >
              <FaGithub className="text-[10px]" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const LatestWorks = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const cards = document.querySelectorAll(".scroll-reveal");
    cards.forEach((el) => observer.observe(el));

    return () => {
      cards.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto px-4 sm:px-6 py-20 md:py-24 lg:py-28 relative overflow-hidden bg-gradient-to-b lg:max-w-7xl"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-10 w-72 h-72 bg-[#ffb400]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#ffb400]/5 to-pink-500/5 rounded-full blur-3xl"></div>

        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#ffb400]/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${8 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-16 relative z-1">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
          My{" "}
          <span className="text-[#ffb400] relative inline-block">
            Work
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#ffb400] to-pink-500 rounded-full"></span>
          </span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Showcasing my journey through innovative projects and scalable
          solutions
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20 relative z-1">
        <div className="group bg-gray-900/10 backdrop-blur-sm p-6 rounded-2xl text-center border border-gray-800 hover:border-[#ffb400] transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-[#ffb400]/10">
          <div className="text-5xl font-bold text-[#ffb400] mb-2 group-hover:scale-110 transition-transform duration-300">
            {PORTFOLIO_STATS.yearsExperience}
          </div>
          <p className=" text-lg">Years of Experience</p>
          <div className="w-12 h-1 bg-gradient-to-r from-[#ffb400] to-pink-500 mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="group bg-gray-900/10 backdrop-blur-sm p-6 rounded-2xl text-center border border-gray-800 hover:border-[#ffb400] transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-[#ffb400]/10">
          <div className="text-5xl font-bold text-[#ffb400] mb-2 group-hover:scale-110 transition-transform duration-300">
            {PORTFOLIO_STATS.projectsCount}
          </div>
          <p className="text-lg">Finished Projects</p>
          <div className="w-12 h-1 bg-gradient-to-r from-[#ffb400] to-pink-500 mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="group bg-gray-900/10 backdrop-blur-sm p-6 rounded-2xl text-center border border-gray-800 hover:border-[#ffb400] transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-[#ffb400]/10">
          <div className="text-5xl font-bold text-[#ffb400] mb-2 group-hover:scale-110 transition-transform duration-300">
            {PORTFOLIO_STATS.clientsCount}
          </div>
          <p className=" text-lg">Satisfied Clients</p>
          <div className="w-12 h-1 bg-gradient-to-r from-[#ffb400] to-pink-500 mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* 3-Column Grid Projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-1">
        {projects.map((project, idx) => (
          <ProjectCard
            key={`${project.title}-${idx}`}
            project={project}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestWorks;
