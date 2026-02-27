"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaCss3Alt,
  FaBootstrap,
  FaNodeJs,
  FaNode,
  FaGithub,
  FaFigma,
  FaSearch,
  FaGithubSquare,
  FaPython,
  FaServer,
  FaTools,
  FaCloudflare,
} from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import {
  TbBrandJavascript,
  TbBrandNextjs,
  TbBrandTailwind,
  TbBrandMongodb,
  TbBrandDjango,
  TbBrandGoogleAnalytics,
} from "react-icons/tb";
import { TiHtml5 } from "react-icons/ti";
import {
  SiMysql,
  SiAdobephotoshop,
  SiCanva,
  SiFirebase,
  SiSkillshare,
  SiNotion,
  SiPostman,
  SiNativescript,
} from "react-icons/si";
const Skills = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className=" text-6xl my-4">
            MY <span className="text-[#ffb400]">SKILLS</span>
          </p>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Frontend Technologies */}
          <motion.div
            className="p-6 rounded-lg shadow-md border-2 border-[#ffb400]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-[#ffb400]">
              Frontend Technologies
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center ">
                <TiHtml5 className="w-5 h-5 mr-2 text-[#ffb400] " />
                HTML5
              </li>
              <li className="flex items-center">
                <FaCss3Alt className="w-5 h-5 text-[#ffb400] mr-2" />
                CSS3
              </li>
              <li className="flex items-center">
                <TbBrandTailwind className="w-5 h-5 text-[#ffb400] mr-2" />
                Tailwind CSS
              </li>
              <li className="flex items-center">
                <FaBootstrap className="w-5 h-5 text-[#ffb400] mr-2" />
                Bootstrap 5
              </li>
              <li className="flex items-center">
                <TbBrandJavascript className="w-5 h-5 text-[#ffb400] mr-2" />
                JavaScript (ES6+)
              </li>
              <li className="flex items-center">
                <FaReact className="w-5 h-5 text-[#ffb400] mr-2" />
                React.js
              </li>
              <li className="flex items-center">
                <RiNextjsFill className="w-5 h-5 text-[#ffb400] mr-2" />
                Next.js
              </li>
              <li className="flex items-center">
                <SiNativescript className="w-5 h-5 text-[#ffb400] mr-2" />
                React Native
              </li>

              <li className="flex items-center">
                <FaReact className="w-5 h-5 text-[#ffb400] mr-2" />
                Redux Toolkit
              </li>

              <li className="flex items-center">
                <TbBrandNextjs className="w-5 h-5 text-[#ffb400] mr-2" />
                Server Side Rendering (SSR)
              </li>
            </ul>
          </motion.div>

          {/* Backend Technologies */}
          <motion.div
            className="p-6 rounded-lg shadow-md  border-2 border-[#ffb400]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-[#ffb400]">
              Backend Technologies
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaNode FaNode className="w-5 h-5 text-[#ffb400] mr-2" />
                Node.js
              </li>
              <li className="flex items-center">
                <TbBrandMongodb className="w-5 h-5 text-[#ffb400] mr-2" />
                MongoDB
              </li>
              <li className="flex items-center">
                <FaNodeJs className="w-5 h-5 text-[#ffb400] mr-2" />
                RESTful APIs
              </li>
              <li className="flex items-center">
                <FaPython className="w-5 h-5 text-[#ffb400] mr-2" />
                Python
              </li>
              <li className="flex items-center">
                <TbBrandDjango className="w-5 h-5 text-[#ffb400] mr-2" />
                Django
              </li>
              <li className="flex items-center">
                <SiMysql className="w-5 h-5 text-[#ffb400] mr-2" />
                Mysql
              </li>
              <li className="flex items-center">
                <SiFirebase className="w-5 h-5 text-[#ffb400] mr-2" />
                Firebase OTP Authentication
              </li>

              <li className="flex items-center">
                <FaNodeJs className="w-5 h-5 text-[#ffb400] mr-2" />
                JWT Authentication
              </li>

              <li className="flex items-center">
                <FaNodeJs className="w-5 h-5 text-[#ffb400] mr-2" />
                Role-Based Access Control (RBAC)
              </li>

              <li className="flex items-center">
                <FaNodeJs className="w-5 h-5 text-[#ffb400] mr-2" />
                AI Search Optimization
              </li>

              <li className="flex items-center">
                <FaNodeJs className="w-5 h-5 text-[#ffb400] mr-2" />
                Advanced Filtering System
              </li>

              <li className="flex items-center">
                <FaNodeJs className="w-5 h-5 text-[#ffb400] mr-2" />
                Redis Caching
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="p-6 rounded-lg shadow-md border-2 border-[#ffb400]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-[#ffb400]">
              DevOps & Deployment
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaGithub className="w-5 h-5 text-[#ffb400] mr-2" />
                Git Version Control
              </li>

              <li className="flex items-center">
                <FaGithubSquare className="w-5 h-5 text-[#ffb400] mr-2" />
                GitHub Actions (CI/CD)
              </li>

              <li className="flex items-center">
                <FaServer className="w-5 h-5 text-[#ffb400] mr-2" />
                Continuous Integration & Deployment
              </li>

              <li className="flex items-center">
                <FaServer className="w-5 h-5 text-[#ffb400] mr-2" />
                Automated Production Deployment
              </li>
              <li className="flex items-center">
                <FaServer className="w-5 h-5 text-[#ffb400] mr-2" />
                Nginx Load Balancer
              </li>
              <li className="flex items-center">
                <FaServer className="w-5 h-5 text-[#ffb400] mr-2" />
                PM2 Cluster Mode
              </li>
              <li className="flex items-center">
                <FaNodeJs className="w-5 h-5 text-[#ffb400] mr-2" />
                CDN Integration
              </li>
              <li className="flex items-center">
                <FaServer className="w-5 h-5 text-[#ffb400] mr-2" />
                Production Deployment
              </li>
              <li className="flex items-center">
                <FaCloudflare className="w-5 h-5 text-[#ffb400] mr-2" />
                Cloudflare
              </li>
            </ul>
          </motion.div>

          {/* Tools */}
          <motion.div
            className="p-6 rounded-lg shadow-md  border-2 border-[#ffb400]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-[#ffb400]">Tools</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaGithub className="w-5 h-5 text-[#ffb400] mr-2" />
                Git
              </li>
              <li className="flex items-center">
                <SiFirebase className="w-5 h-5 text-[#ffb400] mr-2" />
                Firebase
              </li>
              <li className="flex items-center">
                <SiAdobephotoshop className="w-5 h-5 text-[#ffb400] mr-2" />
                Photoshop cs6
              </li>
              <li className="flex items-center">
                <FaFigma className="w-5 h-5 text-[#ffb400] mr-2" />
                Figma
              </li>
              <li className="flex items-center">
                <SiCanva className="w-5 h-5 text-[#ffb400] mr-2" />
                Canva
              </li>
              <li className="flex items-center">
                <SiPostman className="w-5 h-5 text-[#ffb400] mr-2" />
                Postman, Lighthouse, etc
              </li>
              <li className="flex items-center">
                <FaTools  className="w-5 h-5 text-[#ffb400] mr-2" />
                DevTools
              </li>
              
            </ul>
          </motion.div>

          {/* Other Skills */}
          <motion.div
            className="p-6 rounded-lg shadow-md  border-2 border-[#ffb400]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-[#ffb400]">
              Other Skills
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaSearch className="w-5 h-5 text-[#ffb400] mr-2" />
                Metadata Optimization
              </li>
              <li className="flex items-center">
                <TbBrandGoogleAnalytics className="w-5 h-5 text-[#ffb400] mr-2" />
                Google Analytics
              </li>
              <li className="flex items-center">
                <FaGithubSquare className="w-5 h-5 text-[#ffb400] mr-2" />
                Git Version Control
              </li>
            </ul>
          </motion.div>

          {/* Business Logic & Architecture */}
          <motion.div
            className="p-6 rounded-lg shadow-md border-2 border-[#ffb400]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-[#ffb400]">
              Architecture & Business Systems
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <SiSkillshare className="w-5 h-5 text-[#ffb400] mr-2" />
                Multi-Vendor Architecture
              </li>
              <li className="flex items-center">
                <SiSkillshare className="w-5 h-5 text-[#ffb400] mr-2" />
                Order Lifecycle Management
              </li>
              <li className="flex items-center">
                <SiSkillshare className="w-5 h-5 text-[#ffb400] mr-2" />
                Stock & Inventory Management
              </li>
              <li className="flex items-center">
                <SiSkillshare className="w-5 h-5 text-[#ffb400] mr-2" />
                Commission System
              </li>
              <li className="flex items-center">
                <SiSkillshare className="w-5 h-5 text-[#ffb400] mr-2" />
                Dynamic SEO Rendering
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
