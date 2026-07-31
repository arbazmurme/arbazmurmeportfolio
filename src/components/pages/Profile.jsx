"use client";
import { useRef, useEffect } from "react";
import {
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaLaptop,
  FaBook,
} from "react-icons/fa";

const ExperienceEducation = () => {
  const cardRefs = useRef([]);

  // Simple 3D tilt effect on mousemove
  useEffect(() => {
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
    };

    const handleMouseLeave = (card) => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    const cards = cardRefs.current;
    const moveHandlers = [];
    const leaveHandlers = [];

    cards.forEach((card) => {
      if (card) {
        const onMove = (e) => handleMouseMove(e, card);
        const onLeave = () => handleMouseLeave(card);
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        moveHandlers.push(onMove);
        leaveHandlers.push(onLeave);
      }
    });

    return () => {
      cards.forEach((card, i) => {
        if (card) {
          card.removeEventListener("mousemove", moveHandlers[i]);
          card.removeEventListener("mouseleave", leaveHandlers[i]);
        }
      });
    };
  }, []);

  const timeline = [
    {
      icon: FaBriefcase,
      title: "Full Stack Developer",
      org: "Dexterous Technology",
      period: "Nov 2024 – Present",
      points: [
        "Building enterprise multi-vendor marketplace (EWShopping) — 3000+ sellers, 80k+ traffic",
        "AI-powered search & advanced filtering system",
        "Dynamic SEO rendering for product pages via Next.js SSR",
        "Firebase OTP auth & multi-role access control",
        "Redis caching, Nginx load balancing, CI/CD automation",
      ],
    },
    {
      icon: FaCode,
      title: "React JS Developer Intern",
      org: "Lejhro Technology, Bhubaneswar",
      period: "Jul 2024 – Oct 2024",
      points: [
        "Built dynamic, user-centric web apps with React.js",
        "Managed Git version control across the team",
        "Set up user interaction tracking with Google Analytics",
        "Optimized metadata & SEO strategy",
        "Integrated Next.js for better performance",
      ],
    },
    {
      icon: FaBook,
      title: "Python & Full Stack Course",
      org: "NareshIT, Hyderabad",
      period: "Feb 2023 – Jul 2023",
      points: [
        "Python programming with backend focus",
        "UI design principles",
        "React application development",
        "Full-stack apps with Django + React",
      ],
    },
    {
      icon: FaLaptop,
      title: "Freelance Hardware & Tech Support",
      org: "Self-Employed, Solapur",
      period: "Oct 2020 – Nov 2022",
      points: [
        "Technical support for laptops and PCs",
        "Diagnosed and resolved complex hardware issues",
      ],
    },
    {
      icon: FaGraduationCap,
      title: "BCA — Bachelor of Computer Applications",
      org: "DAV Velankar College, Solapur University",
      period: "Feb 2018 – Oct 2020",
      points: ["Percentage: 73.03%"],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-[#ffb400]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-10 relative z-10">
        My <span className="text-[#ffb400]">Journey</span>
      </h2>

      <div className="relative z-10">
        <div className="absolute top-0 left-6 md:left-1/2 md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#ffb400] via-[#ffb400]/40 to-[#ffb400]" />

        <div className="space-y-6">
          {timeline.map((item, i) => {
            const Icon = item.icon;
            const isRight = i % 2 === 1;
            return (
              <div
                key={item.title}
                className={`relative flex items-start gap-4 md:gap-6 group ${isRight ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Icon node */}
                <div className="shrink-0 relative z-10 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#1e1e1e] border-2 border-[#ffb400] shadow-[0_0_12px_rgba(255,180,0,0.35)] group-hover:shadow-[0_0_20px_rgba(255,180,0,0.6)] group-hover:scale-110 transition-all duration-300">
                    <Icon className="text-[#ffb400] text-base" />
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`flex-1 md:w-1/2 ${isRight ? "md:pr-[calc(50%+2rem)]" : "md:pl-[calc(50%+2rem)]"
                    }`}
                >
                  <div
                    ref={(el) => (cardRefs.current[i] = el)}
                    className="backdrop-blur-sm bg-[#1a1a1a]/90 p-5 rounded-xl border border-[#ffb400]/25 hover:border-[#ffb400]/60 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#ffb400]/10"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                      <h3 className="text-lg font-bold text-[#ffb400]">
                        {item.title}
                      </h3>
                      <span className="text-xs text-gray-500">{item.period}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{item.org}</p>

                    <ul className="space-y-1.5 text-sm text-gray-300">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="text-[#ffb400] mt-1 text-[10px] shrink-0">
                            ●
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExperienceEducation;