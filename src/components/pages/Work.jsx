"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

// Project categories
const CATEGORIES = [
  { key: "All", label: "All Projects" },
  { key: "Web", label: "Web" },
  { key: "App", label: "App" },
  { key: "Dashboard", label: "Dashboard" },
  { key: "API", label: "API / Backend" },
];

// Projects data – one source of truth
const projects = [
  {
    title: "EWShopping - AI Powered Enterprise Multi-Vendor Marketplace",
    date: "Completed",
    category: ["Web", "App", "Dashboard"],
    techs: [
      "#next.js",
      "#react.js",
      "#node.js",
      "#express.js",
      "#mongodb",
      "#mongoose",
      "#redis",
      "#firebase-auth",
      "#otp-login",
      "#jwt-auth",
      "#role-based-access",
      "#ai-search-optimization",
      "#dynamic-seo",
      "#ssr",
      "#load-balancer",
      "#nginx",
      "#pm2",
      "#multi-vendor-architecture",
      "#stock-management",
      "#order-management",
      "#cdn",
      "#cloudinary",
    ],
    description:
      "Production-grade multi-vendor marketplace platform handling 3000+ active sellers and 80,000+ traffic. Designed with scalable load-balanced architecture using Nginx and PM2 cluster mode. Integrated Firebase OTP-based mobile authentication and role-based access control for Users, Sellers, Employees, and Admins. Built intelligent AI-driven search optimization with dynamic SEO rendering for every product page. Implemented advanced filtering engine, inventory management, order lifecycle tracking, employee analytics dashboard, Redis caching, and CDN-based asset optimization.",
    liveDemo: "https://ewshopping.com/",
    github: "",
    projectLink: "https://ewshopping.com/",
    playStoreLinks: [
      "https://play.google.com/store/apps/details?id=com.ewsapp",
    ],
    imageSrc: "/ewshoppingweb.png",
    imageAlt: "EWShopping AI Enterprise Marketplace",
  },
  {
    title: "SalonTreat - Salon & Pet Care Booking Platform",
    date: "Completed",
    category: ["Web", "App", "Dashboard"],
    techs: [
      "#react-native",
      "#next.js",
      "#node.js",
      "#express.js",
      "#mongodb",
      "#mongoose",
      "#rest-api",
      "#jwt-auth",
      "#appointment-system",
      "#slot-management",
      "#multi-vendor-architecture",
      "#payment-integration",
      "#google-maps-api",
      "#cloudinary",
      "#cdn",
      "#nginx",
      "#pm2",
    ],
    description:
      "Service marketplace platform for booking salon and pet care services online. Built with React Native mobile app (Partner App available on Play Store) and Next.js web platform. Features appointment scheduling, time slot management, multi-vendor architecture, service categorization, secure payments, and real-time booking status tracking. Includes Admin dashboard and service provider management system.",
    liveDemo: "https://salontreat.com/",
    github: "",
    projectLink: "https://salontreat.com/",
    playStoreLinks: [
      "https://play.google.com/store/apps/details?id=partner.salontreat.app",
      "https://play.google.com/store/apps/details?id=com.salontreat.app",
    ],
    imageSrc: "/salontreatapp.png",
    imageAlt: "SalonTreat Booking Platform",
  },
  {
    title: "Primera Dental Hub – Dental Clinic Website",
    date: "Completed",
    category: ["Web"],
    techs: [
      "#next.js",
      "#react.js",
      "#tailwind.css",
      "#seo-optimization",
      "#ssr",
      "#responsive-design",
      "#performance-optimization",
      "#cdn",
      "#cloudinary",
      "#nginx",
      "#pm2",
    ],
    description:
      "Modern, responsive and SEO-optimized healthcare website built with Next.js. Designed for a dental clinic to showcase services, enable appointment contact, and improve search engine visibility. Includes performance enhancements, optimized assets with CDN, responsive design, structured metadata, and Google Maps integration for improved user experience.",
    liveDemo: "https://primeradentalhub.com/",
    github: "",
    projectLink: "https://primeradentalhub.com/",
    imageSrc: "/primeradentalweb.png",
    imageAlt: "Primera Dental Hub Website",
  },
  {
    title: "Coempt - SEO Optimized Business Website",
    date: "Completed",
    category: ["Web"],
    techs: [
      "#next.js",
      "#react.js",
      "#tailwind.css",
      "#seo-optimization",
      "#ssr",
      "#responsive-design",
      "#performance-optimization",
      "#cdn",
      "#nginx",
      "#pm2",
    ],
    description:
      "Modern, user-friendly and SEO-optimized business website built using Next.js. Designed with clean UI/UX principles and optimized for performance, fast loading, and search engine visibility. Implemented SSR for better SEO ranking, structured metadata, responsive design, and optimized asset delivery using CDN.",
    liveDemo: "https://coempt.in/",
    github: "",
    projectLink: "https://coempt.in/",
    imageSrc: "/coempt.png",
    imageAlt: "Coempt SEO Friendly Business Website",
  },
  {
    title: "MyGoldenWeb - Real Estate Property Platform",
    date: "Completed",
    category: ["Web", "App"],
    techs: [
      "#next.js",
      "#react.js",
      "#tailwind.css",
      "#node.js",
      "#express.js",
      "#mongodb",
      "#mongoose",
      "#rest-api",
      "#jwt-auth",
      "#filter-system",
      "#cloudinary",
      "#google-maps-api",
      "#seo",
      "#ssr",
      "#nginx",
      "#pm2",
    ],
    description:
      "Real estate property listing platform for buying and selling properties. Users can filter listings by city, price range, and property type with a smooth and user-friendly interface. Built with scalable RESTful API architecture and SEO-optimized Next.js frontend. Includes admin panel for property approval, image gallery management, and secure authentication system.",
    liveDemo: "https://mygoldenweb.com/",
    github: "",
    projectLink: "https://mygoldenweb.com/",
    playStoreLinks: [
      "https://play.google.com/store/apps/details?id=com.mygoldenhomes.app",
    ],
    imageSrc: "/mygoldenweb.png",
    imageAlt: "MyGoldenWeb Real Estate Platform",
  },
  {
    title: "KiranaWorld - Multi-Vendor E-Commerce Platform",
    date: "Completed",
    category: ["Web", "App", "Dashboard"],
    techs: [
      "#react-native",
      "#next.js",
      "#node.js",
      "#express.js",
      "#mongodb",
      "#mongoose",
      "#redux",
      "#rest-api",
      "#jwt-auth",
      "#multi-vendor-architecture",
      "#payment-integration",
      "#razorpay",
      "#wallet-system",
      "#cloudinary",
      "#cdn",
      "#nginx",
      "#pm2",
    ],
    description:
      "Full-stack multi-vendor e-commerce platform available on Web and Google Play Store. Supports multiple store management where different vendors can manage their own products, orders, and inventory. Built with scalable RESTful API architecture and mobile app using React Native. Includes multi-variant product system (size, weight, color), secure payment integration, wallet system, order tracking, and admin control panel for platform-wide management.",
    liveDemo: "https://kiranaworld.in/",
    github: "",
    projectLink: "https://kiranaworld.in/",
    playStoreLinks: [
      "https://play.google.com/store/apps/details?id=suprmarket.kiranaworld.app",
    ],
    imageSrc: "/kiranaworld.png",
    imageAlt: "KiranaWorld Multi Vendor E-Commerce Platform",
  },
  {
    title: "Driveome - Ride & Package Transfer Platform",
    date: "Completed",
    category: ["Web", "App", "Dashboard"],
    techs: [
      "#react-native",
      "#next.js",
      "#node.js",
      "#express.js",
      "#mongodb",
      "#mongoose",
      "#rest-api",
      "#jwt-auth",
      "#redux",
      "#socket.io",
      "#google-maps-api",
      "#razorpay",
      "#payu",
      "#upi-intent",
      "#wallet-system",
      "#commission-system",
      "#cashback",
      "#referral-system",
      "#promo-codes",
      "#cloudinary",
      "#cdn",
      "#nginx",
      "#pm2",
    ],
    description:
      "Full-stack ride booking and package transfer platform with mobile app and web panel. Users can book rides or send packages between locations with real-time tracking via Google Maps. Integrated multiple payment methods including UPI (Intent flow), PayU, Razorpay, Cards, and in-app Wallet system. Features cashback, referral bonuses, promo codes, and commission management for drivers. Built with scalable RESTful API architecture and real-time Socket.io tracking.",
    liveDemo: "https://driveome.com/",
    github: "",
    projectLink: "https://driveome.com/",
    playStoreLinks: [
      "https://play.google.com/store/apps/details?id=com.driveOme",
    ],
    imageSrc: "/driveomewebsite.png",
    imageAlt: "Driveome Ride and Package Transfer Platform",
  },
  {
    title: "Rajyabharat News Website",
    date: "January 2025 - February 2025",
    category: ["Web", "Dashboard"],
    techs: [
      "#react.js",
      "#next.js",
      "#tailwind.css",
      "#node.js",
      "#express.js",
      "#mongodb",
      "#mongoose",
      "#redux",
      "#jwt-auth",
      "#google-translate-api",
      "#cdn",
      "#nginx",
      "#pm2",
      "#role-based-access",
      "#employee-analytics",
    ],
    description:
      "National multi-reporter news platform with User, Admin, and Reporter panels. Supports district, state, national, and international news publishing with role-based access control. Integrated Google Translate for multi-language support, CDN-based optimized image delivery, and comprehensive analytics dashboard.",
    liveDemo: "https://rajyabharat.com/",
    github: "",
    projectLink: "https://rajyabharat.com/",
    imageSrc: "/rajyabharat_4K.png",
    imageAlt: "Rajyabharat News Website",
  },
  {
    title: "Bootcamp Platform - Lejhro",
    date: "December 2024",
    category: ["Web"],
    techs: ["#react.js", "#next.js", "#tailwind.css", "#responsive-design"],
    description:
      "Dynamic and responsive UI components for Lejhro Bootcamp platform with performance-focused frontend architecture. Implemented modern design patterns and optimized rendering for seamless user experience.",
    liveDemo: "https://www.bootcamp.lejhro.com/",
    github: "https://github.com/Lejhro/lejhrobootcamp-5.0",
    projectLink: "https://www.bootcamp.lejhro.com/",
    imageSrc: "/Frame-3.png",
    imageAlt: "Lejhro Bootcamp",
  },
  {
    title: "AZ Shop - E-Commerce Platform",
    date: "Completed",
    category: ["Web", "Dashboard"],
    techs: [
      "#react.js",
      "#next.js",
      "#tailwind.css",
      "#mongodb",
      "#express.js",
      "#node.js",
      "#mongoose",
      "#jwt-auth",
      "#rest-api",
      "#seo",
      "#ssr",
    ],
    description:
      "Modern MERN-based e-commerce platform with user and admin dashboards, comprehensive product management, secure authentication, and SEO-optimized SSR architecture. Features include cart management, order processing, and responsive design.",
    liveDemo: "https://e-commerce-frontend-topaz-delta.vercel.app/",
    github: "https://github.com/arbazmurme/E-Commerce-frontend",
    projectLink: "https://e-commerce-frontend-topaz-delta.vercel.app/",
    imageSrc: "/az-shop.png",
    imageAlt: "AZ Shop",
  },
  {
    title: "AZ Shop - Backend API",
    date: "Completed",
    category: ["API"],
    techs: [
      "#node.js",
      "#express.js",
      "#mongodb",
      "#mongoose",
      "#jwt-auth",
      "#rest-api",
      "#postman",
    ],
    description:
      "Scalable REST API built with Node.js and Express. Includes JWT authentication, cart system, product management, user authorization, and secure routing with comprehensive error handling and data validation.",
    liveDemo: "http://e-commerce-api-ten-sable.vercel.app/api/products",
    github: "https://github.com/arbazmurme/E-Commerce-API",
    projectLink: "http://e-commerce-api-ten-sable.vercel.app/api/products",
    imageSrc: "/API.png",
    imageAlt: "AZ Shop API",
  },
  {
    title: "RentNow - Rental Platform",
    date: "Completed",
    category: ["Web"],
    techs: [
      "#node.js",
      "#express.js",
      "#mongodb",
      "#mongoose",
      "#jquery",
      "#tailwind.css",
      "#rest-api",
      "#jwt-auth",
    ],
    description:
      "Full-stack rental listing platform with booking system, image galleries, and server-rendered dynamic pages. Users can list items for rent, search by category, and manage bookings through an intuitive interface.",
    liveDemo: "https://rentnow-a40f.onrender.com/",
    github: "https://github.com/arbazmurme/RentNow",
    projectLink: "https://rentnow-a40f.onrender.com/",
    imageSrc: "/RentNow.png",
    imageAlt: "RentNow",
  },
  {
    title: "Recipe Web App",
    date: "March 2024",
    category: ["Web"],
    techs: [
      "#react.js",
      "#tailwind.css",
      "#API",
      "#rest-api",
      "#responsive-design",
    ],
    description:
      "Recipe browsing platform with API-based dynamic search, filters, infinite scroll, and smooth UI animations. Users can search for recipes by ingredients, cuisine, or dietary preferences with real-time results.",
    liveDemo: "https://arbazmurme-recipe.netlify.app/",
    github: "https://github.com/arbazmurme/Recipe_App",
    projectLink: "https://arbazmurme-recipe.netlify.app/",
    imageSrc: "/project-1.png",
    imageAlt: "Recipe Web App",
  },
  {
    title: "Sajid Screens Landing Page",
    date: "Freelance Project",
    category: ["Web"],
    techs: [
      "#bootstrap",
      "#javascript",
      "#css",
      "#responsive-design",
      "#jquery",
    ],
    description:
      "Responsive business landing page built with Bootstrap and custom JavaScript for enhanced UI interactions. Features smooth scrolling, animated elements, and cross-browser compatibility.",
    liveDemo: "https://sajidscreens.com/",
    github: "https://github.com/arbazmurme/sajidscreens",
    projectLink: "https://sajidscreens.com/",
    imageSrc: "/project-2.png",
    imageAlt: "Sajid Screens",
  },
];

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
          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
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
  const [activeTab, setActiveTab] = useState("All");

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
            3+
          </div>
          <p className=" text-lg">Years of Experience</p>
          <div className="w-12 h-1 bg-gradient-to-r from-[#ffb400] to-pink-500 mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="group bg-gray-900/10 backdrop-blur-sm p-6 rounded-2xl text-center border border-gray-800 hover:border-[#ffb400] transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-[#ffb400]/10">
          <div className="text-5xl font-bold text-[#ffb400] mb-2 group-hover:scale-110 transition-transform duration-300">
            24+
          </div>
          <p className="text-lg">Finished Projects</p>
          <div className="w-12 h-1 bg-gradient-to-r from-[#ffb400] to-pink-500 mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="group bg-gray-900/10 backdrop-blur-sm p-6 rounded-2xl text-center border border-gray-800 hover:border-[#ffb400] transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-[#ffb400]/10">
          <div className="text-5xl font-bold text-[#ffb400] mb-2 group-hover:scale-110 transition-transform duration-300">
            19+
          </div>
          <p className=" text-lg">Satisfied Clients</p>
          <div className="w-12 h-1 bg-gradient-to-r from-[#ffb400] to-pink-500 mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 relative z-1">
        {CATEGORIES.map((cat) => {
          const count = cat.key === "All"
            ? projects.length
            : projects.filter((p) => p.category?.includes(cat.key)).length;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeTab === cat.key
                  ? "bg-[#ffb400] text-black border-[#ffb400] shadow-lg shadow-[#ffb400]/30"
                  : "bg-gray-900/60 text-gray-400 border-gray-700 hover:border-[#ffb400]/50 hover:text-[#ffb400]"
              }`}
            >
              {cat.label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === cat.key ? "bg-black/20 text-black" : "bg-gray-800 text-gray-400"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3-Column Grid Projects (filtered) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-1">
        {projects
          .filter((p) => activeTab === "All" || p.category?.includes(activeTab))
          .map((project, idx) => (
            <ProjectCard
              key={`${project.title}-${idx}`}
              project={project}
              index={idx}
            />
          ))
        }
      </div>
    </section>
  );
};

export default LatestWorks;
