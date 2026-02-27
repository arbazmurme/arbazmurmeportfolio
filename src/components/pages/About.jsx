import { ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  IoLocation,
  IoLanguageSharp,
  IoMailUnread,
  IoLogoLinkedin,
} from "react-icons/io5";
import { FaCode, FaSquareGithub, FaMobileScreenButton } from "react-icons/fa6";
import { GiIndianPalace } from "react-icons/gi";
import { SiFreelancer } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import "../../common/progress-bar.css";
import SkillsOne from "../skills_2";
import { PiMouseScroll } from "react-icons/pi";

const About = () => {
  // Skill data array – add or remove objects here and the UI will update automatically
  const skills = [
    { name: "React.js", value: 90 },
    { name: "Next.js (SSR)", value: 92 },
    { name: "Tailwind CSS", value: 95 },
    { name: "Node.js & Express", value: 88 },
    { name: "REST API Architecture", value: 90 },
    { name: "MongoDB & Mongoose", value: 85 },
    { name: "Redis Caching", value: 75 },
    { name: "Firebase OTP Authentication", value: 80 },
    { name: "JWT & Role-Based Access", value: 85 },
    { name: "Advanced Search & Filtering", value: 88 },
    { name: "Dynamic SEO & Metadata", value: 87 },
    { name: "CI/CD & Deployment", value: 78 },
    { name: "Nginx & Load Balancing", value: 72 },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4">
      <>
        <div className="mx-auto text-center mt-7">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffb400] to-pink-500">
              ABOUT <span className="text-primary">ME</span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#ffb400] to-pink-500"></span>
          </h1>
        </div>
        <div className="sm:flex items-center">
          <div className="sm:w-1/2 p-10">
            <div className="image object-center text-center">
              <Image
                height={500}
                width={500}
                src="/about.png"
                alt="ArbazMurme About"
                className="opacity-80"
              />
            </div>
          </div>
          <div className="sm:w-1/2 p-5">
            <h2 className="my-4 font-bold text-3xl sm:text-4xl uppercase">
              personal <span className="text-[#ffb400]">infos</span>
            </h2>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="md:w-1/2 p-4">
                <ul className="list-none">
                  <li className="mb-4 flex items-center">
                    <FaCode className="text-[#ffb400] mr-2" />
                    <strong>First Name&nbsp;:&nbsp;</strong> Arbaz
                  </li>
                  <li className="mb-4 flex items-center">
                    <FaCode className="text-[#ffb400] mr-2" />
                    <strong>Last Name&nbsp;:&nbsp;</strong> Murme
                  </li>
                  <li className="mb-4 flex items-center">
                    <IoLocation className="text-[#ffb400] mr-2" />
                    <strong>Address&nbsp;:&nbsp;</strong> Maharashtra - Solapur
                  </li>
                  <li className="mb-4 flex items-center">
                    <GiIndianPalace className="text-[#ffb400] mr-2" />
                    <strong>Nationality&nbsp;:&nbsp;</strong> India
                  </li>
                  <li className="mb-4 flex items-center">
                    <IoLanguageSharp className="text-[#ffb400] mr-2" />
                    <strong>Languages&nbsp;:&nbsp;</strong>English, Hindi
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 p-4">
                <ul className="list-none">
                  <li className="mb-4 flex items-center">
                    <IoMailUnread className="text-[#ffb400] mr-2" />
                    <strong>Email&nbsp;:&nbsp;</strong>
                    <Link
                      href={"arbazmurme@gamil.com"}
                      className="text-blue-600"
                    >
                      arbazmurme@gmail.com
                    </Link>
                  </li>
                  <li className="mb-4 flex items-center">
                    <FaMobileScreenButton className="text-[#ffb400] mr-2" />
                    <strong>Phone&nbsp;:&nbsp;</strong>
                    <a className="text-blue-600">+91 90281 21976</a>
                  </li>
                  <li className="mb-4 flex items-center">
                    <IoLogoLinkedin className="text-[#ffb400] mr-2" />
                    <strong>Linkedin&nbsp;:&nbsp;</strong>
                    <Link
                      href={
                        "https://www.linkedin.com/in/arbaj-murme-4493031a3/"
                      }
                      className="text-blue-600"
                    >
                      arbaj-murme-4493031a3
                    </Link>
                  </li>
                  <li className="mb-4 flex items-center">
                    <FaSquareGithub className="text-[#ffb400] mr-2" />
                    <strong>GitHub&nbsp;:&nbsp;</strong>
                    <Link
                      href={"https://github.com/arbazmurme"}
                      className="text-blue-600"
                    >
                      arbazmurme
                    </Link>
                  </li>
                  <li className="mb-4 flex items-center">
                    <SiFreelancer className="text-[#ffb400] mr-2" />
                    <strong>Freelance&nbsp;:&nbsp;</strong>{" "}
                    <samp className="text-[#ffb400]">Available</samp>
                  </li>
                </ul>
              </div>
            </div>
            <Link
              href="/arbaz-murme.pdf"
              className="mt-8 relative group overflow-hidden font-medium inline-block rounded-full border border-[#ffb400] px-auto"
            >
              <span className="absolute inset-0 bg-[#ffb400] transform translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 opacity-90"></span>
              <span className="relative flex items-center space-x-2">
                <span className="mx-8 uppercase">Download CV</span>
                <ArrowRightIcon className="h-14 w-14 bg-[#ffb400] rounded-full p-4" />
              </span>
            </Link>
          </div>
        </div>
        <PiMouseScroll className="h-10 w-10 text-[#ffb400] m-auto" />
      </>
      <SkillsOne />

      {/* Skills section – dynamically generated from array */}
      <div className="flex flex-wrap">
        {skills.map((skill, index) => (
          <div key={index} className="w-1/2 md:w-1/4 p-4">
            <div className="shadow-lg rounded-lg p-6 text-center">
              <div
                role="progressbar"
                aria-valuenow={skill.value}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ "--value": skill.value }}
                className="m-auto rounded-full mb-4"
              >
                {/* Progress bar inner content handled by CSS */}
              </div>
              <h3 className="text-lg font-bold">{skill.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <br />
      <br />
    </div>
  );
};

export default About;
