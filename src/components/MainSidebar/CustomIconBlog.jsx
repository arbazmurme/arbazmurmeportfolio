"use client";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";
import TransitionLink from "../TransitionLink";

const CustomIconBlog = ({ isActive, sendDataToParent }) => {
  const { theme } = useTheme();
  const handleClick = () => {
    sendDataToParent(5);
  };

  return (
    <div className="relative flex items-center group my-2 ml-6">
      <TransitionLink
        href="/blog"
        label="blog"
        className={`rounded-full flex items-center bg-transparent transition-all duration-300 transform ${
          theme === "light" ? "hover:bg-gray-300" : "hover:bg-gray-800"
        }`}
        onClick={handleClick}
      >
        <h1 className="opacity-0 transform translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap uppercase tracking-widest mx-6">
          Blog
        </h1>

        <span
          className={`p-2 rounded-full transition-colors duration-300 ${
            theme === "light" ? "bg-gray-300" : "bg-gray-800"
          }`}
        >
          <BookOpenIcon
            className={`w-8 h-8 transition-colors duration-300 ${
              theme === "light"
                ? isActive
                  ? "text-[#ffb400]"
                  : "text-[#000000]"
                : isActive
                  ? "text-gray-300"
                  : "text-[#ffb400]"
            }`}
          />
        </span>
      </TransitionLink>
    </div>
  );
};

export default CustomIconBlog;

