import {
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaLaptop,
  FaBook,
} from "react-icons/fa";

const ExperienceEducation = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-24 lg:py-28">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#ffb400] mb-16">
        My <span className="text-white">Journey</span>
      </h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#ffb400] via-[#ffb400]/70 to-[#ffb400] hidden lg:block"></div>

        {/* Sections Container */}
        <div className="space-y-20 lg:space-y-24">
          {/* React JS Developer Intern */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 group">
            {/* Icon for desktop */}
            <div className="hidden lg:block lg:w-1/2 relative">
              <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center bg-[#1a1a1a] border-2 border-[#ffb400] shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaCode className="text-[#ffb400] text-3xl" />
              </div>
            </div>
            
            {/* Content */}
            <div className="w-full lg:w-1/2 lg:pl-8">
              <div className="bg-[#1a1a1a] p-8 rounded-xl border-l-4 border-[#ffb400] shadow-lg hover:shadow-xl hover:shadow-[#ffb400]/10 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4 lg:hidden">
                  <FaBriefcase className="text-3xl text-[#ffb400]" />
                  <div>
                    <h3 className="text-xl font-bold text-[#1788ae]">React JS Developer Intern</h3>
                    <p className="text-xs text-gray-400">July 2024 – Present</p>
                  </div>
                </div>
                
                <div className="hidden lg:block mb-4">
                  <h3 className="text-2xl font-bold text-[#1788ae]">React JS Developer Intern</h3>
                  <p className="text-sm text-gray-400">July 2024 – Present</p>
                </div>
                
                <p className="text-gray-300 mb-1">
                  <span className="text-[#ffb400] font-medium">Lejhro Technology</span>, Bhubaneswar, Odisha
                </p>
                
                <ul className="mt-6 space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-2 mt-1">•</span>
                    <span>Spearheaded the development of <span className="font-medium text-[#ffb400]">dynamic, user-centric web applications</span> using React.js</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-2 mt-1">•</span>
                    <span>Streamlined collaboration within the team by managing <span className="font-medium text-[#ffb400]">Git version control</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-2 mt-1">•</span>
                    <span>Implemented <span className="font-medium text-[#ffb400]">user interaction tracking</span> through Google Analytics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-2 mt-1">•</span>
                    <span>Boosted website visibility by optimizing <span className="font-medium text-[#ffb400]">metadata and SEO strategies</span></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-2 mt-1">•</span>
                    <span>Integrated <span className="font-medium text-[#ffb400]">Next.js</span> to elevate application performance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* NareshIT Course */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 group">
            {/* Content */}
            <div className="w-full lg:w-1/2 lg:pr-8 lg:text-right">
              <div className="bg-[#1a1a1a] p-8 rounded-xl border-r-4 border-[#ffb400] shadow-lg hover:shadow-xl hover:shadow-[#ffb400]/10 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4 lg:hidden">
                  <FaBook className="text-3xl text-[#ffb400]" />
                  <div>
                    <h3 className="text-xl font-bold text-[#1788ae]">Six-Month Python & Full Stack Course</h3>
                    <p className="text-xs text-gray-400">February 2021 – July 2021</p>
                  </div>
                </div>
                
                <div className="hidden lg:block mb-4">
                  <h3 className="text-2xl font-bold text-[#1788ae]">Six-Month Python & Full Stack Course</h3>
                  <p className="text-sm text-gray-400">February 2021 – July 2021</p>
                </div>
                
                <p className="text-gray-300 mb-1">
                  <span className="text-[#ffb400] font-medium">NareshIT</span>, Hyderabad
                </p>
                
                <ul className="mt-6 space-y-3 text-gray-300 lg:text-right">
                  <li className="flex lg:justify-end items-start">
                    <span className="text-[#ffb400] mr-2 mt-1">•</span>
                    <span>Learned <span className="font-medium text-[#ffb400]">Python programming</span> with backend focus</span>
                  </li>
                  <li className="flex lg:justify-end items-start">
                    <span className="text-[#ffb400] mr-2 mt-1">•</span>
                    <span>Mastered <span className="font-medium text-[#ffb400]">UI design principles</span></span>
                  </li>
                  <li className="flex lg:justify-end items-start">
                    <span className="text-[#ffb400] mr-2 mt-1">•</span>
                    <span>Developed applications using <span className="font-medium text-[#ffb400]">React</span></span>
                  </li>
                  <li className="flex lg:justify-end items-start">
                    <span className="text-[#ffb400] mr-2 mt-1">•</span>
                    <span>Built <span className="font-medium text-[#ffb400]">full-stack web applications</span> with Django and React</span>
                  </li>
                  <li className="flex lg:justify-end items-start">
                    <span className="text-[#ffb400] mr-2 mt-1">•</span>
                    <span>Gained <span className="font-medium text-[#ffb400]">real-world project experience</span></span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Icon for desktop */}
            <div className="hidden lg:block lg:w-1/2 relative">
              <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center bg-[#1a1a1a] border-2 border-[#ffb400] shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaBook className="text-[#ffb400] text-3xl" />
              </div>
            </div>
          </div>

          {/* Freelance Experience */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 group">
            {/* Icon for desktop */}
            <div className="hidden lg:block lg:w-1/2 relative">
              <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center bg-[#1a1a1a] border-2 border-[#ffb400] shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaLaptop className="text-[#ffb400] text-3xl" />
              </div>
            </div>
            
            {/* Content */}
            <div className="w-full lg:w-1/2 lg:pl-8">
              <div className="bg-[#1a1a1a] p-8 rounded-xl border-l-4 border-[#ffb400] shadow-lg hover:shadow-xl hover:shadow-[#ffb400]/10 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4 lg:hidden">
                  <FaBriefcase className="text-3xl text-[#ffb400]" />
                  <div>
                    <h3 className="text-xl font-bold text-[#ffb400]">Freelance Hardware and Technical Support Specialist</h3>
                    <p className="text-xs text-gray-400">October 2020 – February 2022</p>
                  </div>
                </div>
                
                <div className="hidden lg:block mb-4">
                  <h3 className="text-2xl font-bold text-[#ffb400]">Freelance Hardware and Technical Support Specialist</h3>
                  <p className="text-sm text-gray-400">October 2020 – February 2022</p>
                </div>
                
                <p className="text-gray-300 mb-1">
                  <span className="text-[#ffb400] font-medium">Self-Employed</span>, Solapur, Maharashtra
                </p>
                
                <ul className="mt-6 space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-2 mt-1">•</span>
                    <span>Delivered <span className="font-medium text-[#ffb400]">expert-level technical support</span> for laptops and PCs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#ffb400] mr-2 mt-1">•</span>
                    <span>Diagnosed <span className="font-medium text-[#ffb400]">complex hardware issues</span> with precision</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 group">
            {/* Content */}
            <div className="w-full lg:w-1/2 lg:pr-8 lg:text-right">
              <div className="bg-[#1a1a1a] p-8 rounded-xl border-r-4 border-[#ffb400] shadow-lg hover:shadow-xl hover:shadow-[#ffb400]/10 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4 lg:hidden">
                  <FaGraduationCap className="text-3xl text-[#ffb400]" />
                  <div>
                    <h3 className="text-xl font-bold text-[#1788ae]">Bachelor of Computer Applications (BCA)</h3>
                    <p className="text-xs text-gray-400">February 2018 - October 2020</p>
                  </div>
                </div>
                
                <div className="hidden lg:block mb-4">
                  <h3 className="text-2xl font-bold text-[#1788ae]">Bachelor of Computer Applications (BCA)</h3>
                  <p className="text-sm text-gray-400">February 2018 - October 2020</p>
                </div>
                
                <p className="text-gray-300 mb-1">
                  <span className="text-[#ffb400] font-medium">DAV Velankar College of Commerce</span>, Solapur University
                </p>
                
                <p className="mt-4 text-gray-300 font-medium">
                  CGPA: <span className="text-[#ffb400]">73.03%</span>
                </p>
              </div>
            </div>
            
            {/* Icon for desktop */}
            <div className="hidden lg:block lg:w-1/2 relative">
              <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center bg-[#1a1a1a] border-2 border-[#ffb400] shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaGraduationCap className="text-[#ffb400] text-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceEducation;