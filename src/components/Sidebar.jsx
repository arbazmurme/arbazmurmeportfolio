"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggleButton from "./ThemeToggleButton";
import CustomIconHome from "./MainSidebar/CustomIconHome";
import CustomIconAbout from "./MainSidebar/CustomIconAbout";
import CustomIconportfolio from "./MainSidebar/CustomIconPortfolio";
import CustomIconContact from "./MainSidebar/CustomIconContact";
import CustomIconWork from "./MainSidebar/CustomIconWork";
import CustomIconBlog from "./MainSidebar/CustomIconBlog";
import BottomNavigation from "./BottomNavigation";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = usePathname();

  // Hide sidebar navigation on all admin routes
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      {/* Theme Toggle Button (Top Right) */}
      <div className="fixed top-0 right-0 p-6 z-[100] pointer-events-auto">
        <ThemeToggleButton />
      </div>

      {/* Sidebar Navigation for Desktop */}
      <div className="hidden md:flex">
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4 z-[100] pointer-events-auto pr-3 sm:pr-4">
          <CustomIconHome
            isActive={activeIndex === 0}
            sendDataToParent={handleItemClick}
          />
          <CustomIconAbout
            isActive={activeIndex === 1}
            sendDataToParent={handleItemClick}
          />
          <CustomIconportfolio
            isActive={activeIndex === 3}
            sendDataToParent={handleItemClick}
          />
          <CustomIconWork
            isActive={activeIndex === 2}
            sendDataToParent={handleItemClick}
          />
          <CustomIconContact
            isActive={activeIndex === 4}
            sendDataToParent={handleItemClick}
          />
          <CustomIconBlog
            isActive={activeIndex === 5}
            sendDataToParent={handleItemClick}
          />
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 z-[100] w-full md:hidden pointer-events-auto">
        <BottomNavigation />
      </div>
    </>
  );
};

export default Sidebar;
