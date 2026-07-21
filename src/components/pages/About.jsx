"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import SkillsOne from "../skills_2";

// ─── Icons (inline SVG — no extra deps) ────────────────────────────────────────
const LocationIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>;
const MailIcon       = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>;
const PhoneIcon      = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.26.2 2.47.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z"/></svg>;
const GithubIcon     = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.57v-2.24c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .31.21.69.82.57C20.57 21.8 24 17.31 24 12c0-6.63-5.37-12-12-12z"/></svg>;
const LinkedinIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM6.78 20.45H3.9V9h2.88v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.23 0z"/></svg>;
const DownloadIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const FlagIcon       = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M4 4h16v9H4zm0 11h16v2H4z"/></svg>;
const LangIcon       = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>;

// ─── Personal info rows ────────────────────────────────────────────────────────
const personalInfo = [
  { icon: <LocationIcon />, label: "Location",    value: "Maharashtra, Solapur" },
  { icon: <FlagIcon />,     label: "Nationality",  value: "Indian" },
  { icon: <LangIcon />,     label: "Languages",    value: "English, Hindi, Marathi" },
  { icon: <MailIcon />,     label: "Email",        value: "arbazmurme@gmail.com",        href: "mailto:arbazmurme@gmail.com" },
  { icon: <PhoneIcon />,    label: "Phone",        value: "+91 90281 21976",              href: "tel:+919028121976" },
  { icon: <LinkedinIcon />, label: "LinkedIn",     value: "arbaj-murme-4493031a3",       href: "https://www.linkedin.com/in/arbaj-murme-4493031a3/" },
  { icon: <GithubIcon />,   label: "GitHub",       value: "arbazmurme",                  href: "https://github.com/arbazmurme" },
];

// ─── Skill bars ───────────────────────────────────────────────────────────────
const skills = [
  { name: "React.js",                   pct: 90 },
  { name: "Next.js (SSR)",              pct: 92 },
  { name: "Tailwind CSS",               pct: 95 },
  { name: "Node.js & Express",          pct: 88 },
  { name: "REST API Architecture",      pct: 90 },
  { name: "MongoDB & Mongoose",         pct: 85 },
  { name: "Redis Caching",              pct: 75 },
  { name: "Firebase OTP Auth",          pct: 80 },
  { name: "JWT & Role-Based Access",    pct: 85 },
  { name: "Advanced Search/Filtering",  pct: 88 },
  { name: "Dynamic SEO & Metadata",     pct: 87 },
  { name: "CI/CD & Deployment",         pct: 78 },
];

// ─── Stat cards ───────────────────────────────────────────────────────────────
const stats = [
  { value: "2+",  label: "Years Experience" },
  { value: "20+", label: "Projects Built"   },
  { value: "10+", label: "Happy Clients"    },
  { value: "∞",   label: "Lines of Code"   },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 40 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true         },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

// ══════════════════════════════════════════════════════════════════════════════
const About = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bg   = isDark ? "#04060f" : "#f8f9fa";
  const card = isDark ? "rgba(255,180,0,0.05)" : "rgba(255,255,255,0.85)";
  const border = "rgba(255,180,0,0.18)";
  const text   = isDark ? "#ffffff"  : "#0f0f1a";
  const muted  = isDark ? "#9ca3af"  : "#6b7280";

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: bg, color: text }}
    >
      {/* ── Background decoration ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
        <div className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,180,0,0.08) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-60 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,140,0,0.06) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,180,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,180,0,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
      </div>

      <div className="relative z-1 max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-12">

        {/* ── Section Header ── */}
        <motion.div {...fadeUp(0)} className="text-center mb-8">
          <span className="inline-block text-xs tracking-[0.35em] uppercase font-semibold text-[#ffb400] mb-2">
            Get to know me
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase leading-none">
            About{" "}
            <span style={{
              background: "linear-gradient(135deg, #ffb400, #ff8c00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Me
            </span>
          </h1>
          <div className="mt-3 mx-auto w-16 h-1 rounded-full"
            style={{ background: "linear-gradient(90deg, #ffb400, #ff8c00)" }} />
        </motion.div>

        {/* ── Bio Section ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-6 rounded-3xl blur-2xl opacity-20"
                style={{ background: "radial-gradient(circle, #ffb400, transparent)" }} />
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-3xl border border-dashed border-[#ffb400]/20"
              />
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 0 0 1px rgba(255,180,0,0.15), 0 30px 80px rgba(0,0,0,0.5)" }}>
                <Image
                  src="/about.png"
                  alt="Arbaz Murme"
                  width={480}
                  height={520}
                  priority
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(4,6,15,0.4) 0%, transparent 60%)" }} />
              </div>
              {/* Freelance badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-5 -right-4 flex items-center gap-2 rounded-2xl px-4 py-3 border"
                style={{ background: card, borderColor: border, backdropFilter: "blur(12px)" }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#ffb400]">Freelance Open</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Info */}
          <motion.div {...fadeUp(0.2)}>
            <h2 className="text-2xl sm:text-3xl font-black uppercase mb-2">
              Personal{" "}
              <span className="text-[#ffb400]">Infos</span>
            </h2>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: muted }}>
              I'm a passionate <strong style={{ color: text }}>MERN Stack Developer</strong> from Solapur, Maharashtra,
              building modern, scalable & high-performance web applications. I love clean code, seamless UX,
              and crafting backends that just work.
            </p>

            {/* Info grid */}
            <div className="grid sm:grid-cols-2 gap-2 mb-4">
              {personalInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-2 rounded-xl p-2.5 border transition-colors duration-200"
                  style={{ background: card, borderColor: border }}
                >
                  <span className="mt-0.5 text-[#ffb400]">{item.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: muted }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer"
                        className="text-sm font-semibold text-[#ffb400] hover:underline truncate block">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold truncate" style={{ color: text }}>{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download CV */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/arbaz-murme.pdf"
                target="_blank"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 font-bold uppercase tracking-wider text-sm text-black transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #ffb400, #ff8c00)",
                  boxShadow: "0 0 30px rgba(255,180,0,0.3)",
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 50px rgba(255,180,0,0.55)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 0 30px rgba(255,180,0,0.3)"}
              >
                <DownloadIcon />
                <span>Download CV</span>
                {/* shine sweep */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <motion.div
          {...fadeUp(0.1)}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="rounded-xl p-4 text-center border"
              style={{ background: card, borderColor: border, backdropFilter: "blur(10px)" }}
            >
              <div className="text-3xl font-black text-[#ffb400]">{s.value}</div>
              <div className="text-[10px] uppercase tracking-widest mt-1" style={{ color: muted }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Skill Progress Bars ── */}
        <motion.div {...fadeUp(0)} className="mb-8">


          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-semibold" style={{ color: text }}>{skill.name}</span>
                  <span className="text-sm font-bold text-[#ffb400]">{skill.pct}%</span>
                </div>
                {/* Track */}
                <div className="relative h-2 rounded-full overflow-hidden"
                  style={{ background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #ffb400, #ff8c00)" }}
                  >
                    {/* Shimmer */}
                    <span className="absolute right-0 top-0 h-full w-6 rounded-full blur-sm opacity-80"
                      style={{ background: "#ffb400" }} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Tech Stack (SkillsOne) ── */}
        <motion.div {...fadeUp(0)}>
          <div className="text-center mb-6">
            <span className="text-xs tracking-[0.35em] uppercase font-semibold text-[#ffb400] block mb-1">
              Tools & Technologies
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase">
              Tech{" "}
              <span style={{
                background: "linear-gradient(135deg, #ffb400, #ff8c00)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Stack
              </span>
            </h2>
          </div>
          <SkillsOne />
        </motion.div>

      </div>
    </div>
  );
};

export default About;
