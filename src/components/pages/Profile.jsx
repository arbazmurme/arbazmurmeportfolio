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
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleMouseLeave = (card) => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    cardRefs.current.forEach((card) => {
      if (card) {
        card.addEventListener("mousemove", (e) => handleMouseMove(e, card));
        card.addEventListener("mouseleave", () => handleMouseLeave(card));
      }
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) {
          card.removeEventListener("mousemove", (e) =>
            handleMouseMove(e, card),
          );
          card.removeEventListener("mouseleave", () => handleMouseLeave(card));
        }
      });
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-24 lg:py-28 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#ffb400]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#ffb400]/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-16 relative z-1">
        My <span className="text-[#ffb400]">Journey</span>
      </h2>

      <div className="relative z-1">
        {/* Animated timeline line with moving light */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#ffb400] via-[#ffb400]/50 to-[#ffb400] hidden lg:block">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-32 bg-[#ffb400] rounded-full blur-md animate-moveLight"></div>
        </div>

        {/* Sections Container */}
        <div className="space-y-16 lg:space-y-24">
          {/* Dexterous Technology */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 group opacity-0 animate-fadeInUp [animation-fill-mode:forwards]">
            <div className="w-full lg:w-1/2 lg:pl-8">
              <div
                ref={(el) => (cardRefs.current[0] = el)}
                className="relative backdrop-blur-sm bg-[#1a1a1a]/90 p-8 rounded-2xl border-2 border-transparent [background:linear-gradient(#1a1a1a,#1a1a1a)_padding-box,linear-gradient(120deg,#ffb400,#ff6b6b,#ffb400)_border-box] hover:[background:linear-gradient(#1a1a1a,#1a1a1a)_padding-box,linear-gradient(120deg,#ffb400,#ff6b6b,#ffb400)_border-box] transition-all duration-500 group-hover:translate-y-[-4px] shadow-xl hover:shadow-2xl hover:shadow-[#ffb400]/20"
                style={{ borderRadius: "1rem" }}
              >
                <h3 className="text-2xl font-bold text-[#ffb400]">
                  Full Stack Developer
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Dexterous Technology | November 2024 – Present
                </p>

                <ul className="mt-6 space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse">
                      ✦
                    </span>
                    <span>
                      Developing and maintaining{" "}
                      <span className="font-medium text-[#ffb400]">
                        enterprise-level multi-vendor marketplace
                      </span>{" "}
                      (EWShopping) handling 3000+ sellers and 80k+ traffic
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse">
                      ✦
                    </span>
                    <span>
                      Implemented{" "}
                      <span className="font-medium text-[#ffb400]">
                        AI-powered search optimization
                      </span>{" "}
                      and advanced filtering system
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse">
                      ✦
                    </span>
                    <span>
                      Designed{" "}
                      <span className="font-medium text-[#ffb400]">
                        dynamic SEO rendering
                      </span>{" "}
                      for product pages using Next.js SSR
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse">
                      ✦
                    </span>
                    <span>
                      Integrated{" "}
                      <span className="font-medium text-[#ffb400]">
                        Firebase OTP authentication & multi-role access control
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse">
                      ✦
                    </span>
                    <span>
                      Optimized system performance using{" "}
                      <span className="font-medium text-[#ffb400]">
                        Redis caching, Nginx load balancing, and CI/CD
                        automation
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="hidden lg:block lg:w-1/2 relative">
              <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center bg-[#1e1e1e] border-2 border-[#ffb400] shadow-[0_0_20px_rgba(255,180,0,0.3)] group-hover:shadow-[0_0_30px_rgba(255,180,0,0.6)] group-hover:scale-110 transition-all duration-500 z-1 animate-float">
                <FaBriefcase className="text-[#ffb400] text-3xl group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* React JS Developer Intern */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 group opacity-0 animate-fadeInUp [animation-fill-mode:forwards] [animation-delay:200ms]">
            <div className="hidden lg:block lg:w-1/2 relative">
              <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center bg-[#1e1e1e] border-2 border-[#ffb400] shadow-[0_0_20px_rgba(255,180,0,0.3)] group-hover:shadow-[0_0_30px_rgba(255,180,0,0.6)] group-hover:scale-110 transition-all duration-500 z-1 animate-float animation-delay-1000">
                <FaCode className="text-[#ffb400] text-3xl group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>

            <div className="w-full lg:w-1/2 lg:pl-8">
              <div
                ref={(el) => (cardRefs.current[1] = el)}
                className="relative backdrop-blur-sm bg-[#1a1a1a]/90 p-8 rounded-2xl border-2 border-transparent [background:linear-gradient(#1a1a1a,#1a1a1a)_padding-box,linear-gradient(120deg,#ffb400,#ff6b6b,#ffb400)_border-box] hover:[background:linear-gradient(#1a1a1a,#1a1a1a)_padding-box,linear-gradient(120deg,#ffb400,#ff6b6b,#ffb400)_border-box] transition-all duration-500 group-hover:translate-y-[-4px] shadow-xl hover:shadow-2xl hover:shadow-[#ffb400]/20"
                style={{ borderRadius: "1rem" }}
              >
                <h3 className="text-2xl font-bold text-[#ffb400]">
                  React JS Developer Intern
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  July 2024 – October 2024
                </p>
                <p className="text-gray-300 mb-1">
                  <span className="text-[#ffb400] font-medium">
                    Lejhro Technology
                  </span>
                  , Bhubaneswar, Odisha
                </p>

                <ul className="mt-6 space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse">
                      ✦
                    </span>
                    <span>
                      Spearheaded the development of{" "}
                      <span className="font-medium text-[#ffb400]">
                        dynamic, user-centric web applications
                      </span>{" "}
                      using React.js
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse">
                      ✦
                    </span>
                    <span>
                      Streamlined collaboration within the team by managing{" "}
                      <span className="font-medium text-[#ffb400]">
                        Git version control
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse">
                      ✦
                    </span>
                    <span>
                      Implemented{" "}
                      <span className="font-medium text-[#ffb400]">
                        user interaction tracking
                      </span>{" "}
                      through Google Analytics
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse">
                      ✦
                    </span>
                    <span>
                      Boosted website visibility by optimizing{" "}
                      <span className="font-medium text-[#ffb400]">
                        metadata and SEO strategies
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse">
                      ✦
                    </span>
                    <span>
                      Integrated{" "}
                      <span className="font-medium text-[#ffb400]">
                        Next.js
                      </span>{" "}
                      to elevate application performance
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* NareshIT Course */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 group opacity-0 animate-fadeInUp [animation-fill-mode:forwards] [animation-delay:400ms]">
            <div className="w-full lg:w-1/2 lg:pr-8 lg:text-right">
              <div
                ref={(el) => (cardRefs.current[2] = el)}
                className="relative backdrop-blur-sm bg-[#1a1a1a]/90 p-8 rounded-2xl border-2 border-transparent [background:linear-gradient(#1a1a1a,#1a1a1a)_padding-box,linear-gradient(120deg,#ffb400,#ff6b6b,#ffb400)_border-box] hover:[background:linear-gradient(#1a1a1a,#1a1a1a)_padding-box,linear-gradient(120deg,#ffb400,#ff6b6b,#ffb400)_border-box] transition-all duration-500 group-hover:translate-y-[-4px] shadow-xl hover:shadow-2xl hover:shadow-[#ffb400]/20"
                style={{ borderRadius: "1rem" }}
              >
                <h3 className="text-2xl font-bold text-[#ffb400]">
                  Six-Month Python & Full Stack Course
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  February 2023 – July 2023
                </p>
                <p className="text-gray-300 mb-1">
                  <span className="text-[#ffb400] font-medium">NareshIT</span>,
                  Hyderabad
                </p>

                <ul className="mt-6 space-y-3 text-gray-300 lg:text-right">
                  <li className="flex lg:justify-end items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse order-1">
                      ✦
                    </span>
                    <span className="flex-1">
                      Learned{" "}
                      <span className="font-medium text-[#ffb400]">
                        Python programming
                      </span>{" "}
                      with backend focus
                    </span>
                  </li>
                  <li className="flex lg:justify-end items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse order-1">
                      ✦
                    </span>
                    <span className="flex-1">
                      Mastered{" "}
                      <span className="font-medium text-[#ffb400]">
                        UI design principles
                      </span>
                    </span>
                  </li>
                  <li className="flex lg:justify-end items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse order-1">
                      ✦
                    </span>
                    <span className="flex-1">
                      Developed applications using{" "}
                      <span className="font-medium text-[#ffb400]">React</span>
                    </span>
                  </li>
                  <li className="flex lg:justify-end items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse order-1">
                      ✦
                    </span>
                    <span className="flex-1">
                      Built{" "}
                      <span className="font-medium text-[#ffb400]">
                        full-stack web applications
                      </span>{" "}
                      with Django and React
                    </span>
                  </li>
                  <li className="flex lg:justify-end items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse order-1">
                      ✦
                    </span>
                    <span className="flex-1">
                      Gained{" "}
                      <span className="font-medium text-[#ffb400]">
                        real-world project experience
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="hidden lg:block lg:w-1/2 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center bg-[#1e1e1e] border-2 border-[#ffb400] shadow-[0_0_20px_rgba(255,180,0,0.3)] group-hover:shadow-[0_0_30px_rgba(255,180,0,0.6)] group-hover:scale-110 transition-all duration-500 z-1 animate-float animation-delay-2000">
                <FaBook className="text-[#ffb400] text-3xl group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Freelance Experience */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 group opacity-0 animate-fadeInUp [animation-fill-mode:forwards] [animation-delay:600ms]">
            <div className="hidden lg:block lg:w-1/2 relative">
              <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center bg-[#1e1e1e] border-2 border-[#ffb400] shadow-[0_0_20px_rgba(255,180,0,0.3)] group-hover:shadow-[0_0_30px_rgba(255,180,0,0.6)] group-hover:scale-110 transition-all duration-500 z-1 animate-float animation-delay-3000">
                <FaLaptop className="text-[#ffb400] text-3xl group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>

            <div className="w-full lg:w-1/2 lg:pl-8">
              <div
                ref={(el) => (cardRefs.current[3] = el)}
                className="relative backdrop-blur-sm bg-[#1a1a1a]/90 p-8 rounded-2xl border-2 border-transparent [background:linear-gradient(#1a1a1a,#1a1a1a)_padding-box,linear-gradient(120deg,#ffb400,#ff6b6b,#ffb400)_border-box] hover:[background:linear-gradient(#1a1a1a,#1a1a1a)_padding-box,linear-gradient(120deg,#ffb400,#ff6b6b,#ffb400)_border-box] transition-all duration-500 group-hover:translate-y-[-4px] shadow-xl hover:shadow-2xl hover:shadow-[#ffb400]/20"
                style={{ borderRadius: "1rem" }}
              >
                <h3 className="text-2xl font-bold text-[#ffb400]">
                  Freelance Hardware and Technical Support Specialist
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  October 2020 – November 2022
                </p>
                <p className="text-gray-300 mb-1">
                  <span className="text-[#ffb400] font-medium">
                    Self-Employed
                  </span>
                  , Solapur, Maharashtra
                </p>

                <ul className="mt-6 space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse">
                      ✦
                    </span>
                    <span>
                      Delivered{" "}
                      <span className="font-medium text-[#ffb400]">
                        expert-level technical support
                      </span>{" "}
                      for laptops and PCs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-3 mt-1 text-lg animate-pulse">
                      ✦
                    </span>
                    <span>
                      Diagnosed{" "}
                      <span className="font-medium text-[#ffb400]">
                        complex hardware issues
                      </span>{" "}
                      with precision
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 group opacity-0 animate-fadeInUp [animation-fill-mode:forwards] [animation-delay:800ms]">
            <div className="w-full lg:w-1/2 lg:pr-8 lg:text-right">
              <div
                ref={(el) => (cardRefs.current[4] = el)}
                className="relative backdrop-blur-sm bg-[#1a1a1a]/90 p-8 rounded-2xl border-2 border-transparent [background:linear-gradient(#1a1a1a,#1a1a1a)_padding-box,linear-gradient(120deg,#ffb400,#ff6b6b,#ffb400)_border-box] hover:[background:linear-gradient(#1a1a1a,#1a1a1a)_padding-box,linear-gradient(120deg,#ffb400,#ff6b6b,#ffb400)_border-box] transition-all duration-500 group-hover:translate-y-[-4px] shadow-xl hover:shadow-2xl hover:shadow-[#ffb400]/20"
                style={{ borderRadius: "1rem" }}
              >
                <h3 className="text-2xl font-bold text-[#ffb400]">
                  Bachelor of Computer Applications (BCA)
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  February 2018 - October 2020
                </p>
                <p className="text-gray-300 mb-1">
                  <span className="text-[#ffb400] font-medium">
                    DAV Velankar College of Commerce
                  </span>
                  , Solapur University
                </p>
                <p className="mt-4 text-gray-300 font-medium">
                  Percentage: <span className="text-[#ffb400]">73.03%</span>
                </p>
              </div>
            </div>

            <div className="hidden lg:block lg:w-1/2 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center bg-[#1e1e1e] border-2 border-[#ffb400] shadow-[0_0_20px_rgba(255,180,0,0.3)] group-hover:shadow-[0_0_30px_rgba(255,180,0,0.6)] group-hover:scale-110 transition-all duration-500 z-1 animate-float animation-delay-4000">
                <FaGraduationCap className="text-[#ffb400] text-3xl group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes moveLight {
          0% {
            top: -10%;
          }
          100% {
            top: 100%;
          }
        }
        .animate-moveLight {
          animation: moveLight 4s linear infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ExperienceEducation;
