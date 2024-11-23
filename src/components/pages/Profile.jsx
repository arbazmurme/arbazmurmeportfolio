import {
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaLaptop,
  FaBook,
} from "react-icons/fa";

const ExperienceEducation = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#ffb400] mb-14">
        My Journey
      </h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-[#ffb400] hidden lg:block"></div>

        {/* Sections Container */}
        <div className="space-y-16">
          {/* React JS Developer Intern */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="hidden lg:block lg:w-1/2 relative">
              <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-lg">
                <FaCode className="text-[#ffb400] text-4xl" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <FaBriefcase className="text-5xl text-[#ffb400] lg:mr-0 mb-4" />
              <h3 className="text-2xl font-bold text-[#1788ae]">
                React JS Developer Intern
              </h3>
              <p className="text-sm text-gray-600">July 2024 – Present</p>
              <p className="mt-4">
                <span className="text-[#ffb400] font-semibold">
                  Lejhro Technology
                </span>
                , Bhubaneswar, Odisha
              </p>
              <ul className="list-none text-left mt-4 space-y-2">
                <li>
                  Spearheaded the development of <span className="font-bold text-[#ffb400]">dynamic, user-centric web applications</span> using React.js, delivering innovative solutions tailored to client needs.
                </li>
                <li>
                  Streamlined collaboration within the development team by efficiently managing <span className="font-bold text-[#ffb400]">Git version control</span>, ensuring seamless code integration and deployment.
                </li>
                <li>
                  Implemented <span className="font-bold text-[#ffb400]">comprehensive user interaction tracking</span> through Google Analytics, enhancing data-driven decision-making processes.
                </li>
                <li>
                  Boosted website visibility and performance by optimizing <span className="font-bold text-[#ffb400]">metadata and SEO strategies</span>, leading to increased organic traffic.
                </li>
                <li>
                  Successfully integrated <span className="font-bold text-[#ffb400]">Next.js</span> to elevate application performance, resulting in faster load times and an improved user experience.
                </li>
              </ul>
            </div>
          </div>

          {/* NareshIT Course */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="w-full lg:w-1/2 text-center lg:text-right">
              <FaBook className="text-5xl text-[#ffb400] mx-auto lg:mr-0 mb-4" />
              <h3 className="text-2xl font-bold text-[#1788ae]">
                Six-Month Python & Full Stack Course
              </h3>
              <p className="text-sm text-gray-600">February 2021 – July 2021</p>
              <p className="mt-4">
                <span className="text-[#ffb400] font-semibold">NareshIT</span>,
                Hyderabad
              </p>
              <ul className="lg:text-right text-left mt-4 space-y-2">
                <li>
                  Learned <span className="font-bold text-[#ffb400]">Python programming</span> with a focus on backend development.
                </li>
                <li>
                  Mastered <span className="font-bold text-[#ffb400]">UI design principles</span> to create intuitive and visually appealing layouts.
                </li>
                <li>
                  Developed front-end applications using <span className="font-bold text-[#ffb400]">React</span>.
                </li>
                <li>
                  Built <span className="font-bold text-[#ffb400]">full-stack web applications</span> using Django and React.
                </li>
                <li>
                  Gained hands-on experience through <span className="font-bold text-[#ffb400]">real-world project work</span>.
                </li>
              </ul>
            </div>
            <div className="hidden lg:block lg:w-1/2 relative">
              <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-lg">
                <FaBook className="text-[#ffb400] text-4xl" />
              </div>
            </div>
          </div>

          {/* Freelance Experience */}
          <div className="relative flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <FaBriefcase className="text-5xl text-[#ffb400] mx-auto lg:ml-0 mb-4" />
              <h3 className="text-2xl font-bold text-[#ffb400]">
                Freelance Hardware and Technical Support Specialist
              </h3>
              <p className="text-sm text-gray-600">
                October 2020 – February 2022
              </p>
              <p className="mt-4">
                <span className="text-[#ffb400] font-semibold">
                  Self-Employed
                </span>
                , Solapur, Maharashtra
              </p>
              <ul className="list-none lg:text-left text-left mt-4 space-y-2">
                <li>
                  Delivered <span className="font-bold text-[#ffb400]">expert-level technical support</span> and maintenance for laptops and PCs, ensuring clients experienced minimal downtime and uninterrupted workflows.
                </li>
                <li>
                  Diagnosed <span className="font-bold text-[#ffb400]">complex hardware issues</span> with precision, implementing effective solutions to restore optimal system performance quickly and efficiently.
                </li>
              </ul>
            </div>
            <div className="hidden lg:block lg:w-1/2 relative">
              <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-lg">
                <FaLaptop className="text-[#ffb400] text-4xl" />
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="w-full lg:w-1/2 text-center lg:text-right">
              <FaGraduationCap className="text-5xl text-[#ffb400] mx-auto lg:mr-0 mb-4" />
              <h3 className="text-2xl font-bold text-[#1788ae]">
                Bachelor of Computer Applications (BCA)
              </h3>
              <p className="text-sm text-gray-600">
                February 2018 - October 2020
              </p>
              <p className="mt-4">
                <span className="text-[#ffb400] font-semibold">
                  DAV Velankar College of Commerce
                </span>
                , Solapur University
              </p>
              <p className="mt-2 font-semibold">CGPA: 73.03%</p>
            </div>
            <div className="hidden lg:block lg:w-1/2 relative">
              <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center bg-white shadow-lg">
                <FaGraduationCap className="text-[#ffb400] text-4xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceEducation;
