"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import TypingText from "../../context/TypingText";
import { useMemo } from "react";

const HomeDetails = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${5 + Math.random() * 10}s`,
      })),
    [],
  );
  
  return (
    <>
      <div className="relative flex flex-col lg:flex-row min-h-screen items-center overflow-hidden transition-colors duration-500">
        {/* Animated Gradient Background */}
        <div className="" />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
            <span
              key={i}
              className="absolute w-2 h-2 bg-[#ffb400] rounded-full opacity-20 animate-float"
              style={{
                top: p.top,
                left: p.left,
                animationDuration: p.animationDuration,
              }}
            />
          ))}
        </div>

        {/* LEFT IMAGE */}
        <div className="hidden lg:flex lg:w-1/2 fixed h-screen items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute -z-10 w-[520px] h-[620px] bg-[#ffb400] blur-[140px] opacity-15 rounded-full"></div>

            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Image
                alt="hero"
                src="/arbazmurme.webp"
                width={480}
                height={600}
                priority
                sizes="(min-width: 1024px) 480px, 0px"
                className="relative z-10 rounded-3xl shadow-2xl border border-white/20 hover:scale-105 transition duration-500"
              />
            </motion.div>
          </div>
        </div>

        {/* RIGHT TEXT */}
        <div className="relative w-full lg:w-1/2 lg:ml-auto px-6 lg:px-16 py-16 z-1">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl lg:text-6xl font-extrabold uppercase leading-tight"
          >
            Hi, I'm <span className="text-[#ffb400]">Arbaz Murme</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-3 text-xl text-[#ffb400] font-semibold"
          >
            <TypingText />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-lg leading-relaxed max-w-xl"
          >
            MERN Stack Developer building modern, scalable, and high-performance
            web applications. Passionate about crafting smooth UI & powerful
            backend systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4"
          >
            {[
              { href: "/about", label: "More About Me" },
              { href: "/blog", label: "Blog" },
            ].map((btn, i) => (
              <Link
                key={i}
                href={btn.href}
                className="inline-flex items-center group relative overflow-hidden 
                           rounded-full border border-[#ffb400] px-8 py-4 min-w-[200px] justify-center"
              >
                <span
                  className="absolute inset-0 bg-[#ffb400] 
                             transform translate-x-full 
                             group-hover:translate-x-0 
                             transition duration-300"
                ></span>

                <span className="relative flex items-center space-x-3 font-semibold uppercase group-hover:text-black transition">
                  <span>{btn.label}</span>
                  <ArrowRightIcon className="h-6 w-6 group-hover:translate-x-2 transition" />
                </span>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HomeDetails;
