"use client";
import { useTheme } from "../context/ThemeContext";
import {
  HomeIcon,
  BriefcaseIcon,
  CodeBracketSquareIcon,
  UserIcon,
  EnvelopeIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import TransitionLink from "../components/TransitionLink"; // Import TransitionLink

const BottomNavigation = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const iconStyles = {
    light: {
      container: "",
      icon: "text-[#0f0f0f] hover:text-[#ffb400]",
      background: "bg-gray-300",
      active: "text-[#ffb400]", // Style for active icon in light theme
    },
    dark: {
      container: "",
      icon: "text-[#ffb400] hover:text-blue-500",
      background: "bg-gray-800",
      active: "text-white", // Style for active icon in dark theme
    },
  };

  const styles = iconStyles[theme] || iconStyles.light;

  const navigationItems = [
    { href: "/", icon: HomeIcon },
    { href: "/about", icon: UserIcon },
    { href: "/work", icon: CodeBracketSquareIcon },
    { href: "/portfolio", icon: BriefcaseIcon },
    { href: "/contact", icon: EnvelopeIcon },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 z-50 w-full h-16 ${styles.background}`}
    >
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto items-center font-medium">
        {navigationItems.map((item, index) => (
          <TransitionLink
            href={item.href}
            label="" // Empty label, as the label is not displayed here
            key={index}
            className={`inline-flex flex-col items-center justify-center px-4 py-2 ${styles.container} group cursor-pointer`}
            onClick={() => setActiveIndex(index)}
          >
            <item.icon
              className={`w-6 h-6 ${
                activeIndex === index ? styles.active : styles.icon
              }`}
            />
          </TransitionLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
