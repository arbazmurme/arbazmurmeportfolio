"use client";
import { useState } from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import CustomIconHome from "./MainSidebar/CustomIconHome";
import CustomIconAbout from "./MainSidebar/CustomIconAbout";
import CustomIconportfolio from "./MainSidebar/CustomIconportfolio";
import CustomIconContact from "./MainSidebar/CustomIconContact";
import CustomIconWork from "./MainSidebar/CustomIconWork";
import BottomNavigation from "./BottomNavigation";
const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className="fixed top-0 right-0 h-screen p-6 z-10">
        <ThemeToggleButton />
      </div>
      {/* SidebarNavigation */}
      <div className="hidden md:flex ">
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4 z-10">
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
        </div>
      </div>
      {/* BottomNavigation for mobile screens */}
      <div className="fixed bottom-0 left-0 z-50 w-full md:hidden">
        <BottomNavigation />
      </div>
    </>
  );
};

export default Sidebar;
