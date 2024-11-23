import Image from "next/image";
import Link from "next/link";
import {
  FaReact,
  FaNodeJs,
  FaCss3Alt,
  FaJsSquare,
  FaFigma,
  FaBootstrap,
} from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiSwiper,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

const techIcons = {
  "#react.js": <FaReact className="text-[#ffb400]" />,
  "#express.js": <SiExpress className="text-[#ffb400]" />,
  "#node.js": <FaNodeJs className="text-[#ffb400]" />,
  "#swiper.js": <SiSwiper className="text-[#ffb400]" />,
  "#mongoDB": <SiMongodb className="text-[#ffb400]" />,
  "#mongoose": <SiMongodb className="text-[#ffb400]" />, // Mongoose shares the MongoDB icon
  "#css": <FaCss3Alt className="text-[#F7DF1E]" />,
  "#javascript": <FaJsSquare className="text-[#F7DF1E]" />,
  "#figma": <FaFigma className="text-[#ffb400]" />,
  "#next.js": <SiNextdotjs className="text-[#ffb400]" />,
  "#tailwind.css": <SiTailwindcss className="text-[#ffb400]" />,
  "#bootstrap": <FaBootstrap className="text-[#ffb400]" />,
  "#API": <TbApi className="text-[#ffb400]" />,
};

const Project = ({
  title,
  date,
  techs,
  description,
  link,
  gitLink,
  liveDemo,
  imageSrc,
  imageAlt,
  isLeft,
}) => (
  <div
    className={`relative flex flex-col md:flex-row ${
      isLeft ? "md:flex-row-reverse" : ""
    } gap-10 md:gap-20 items-center mt-12`}
  >
    {imageSrc && (
      <Link href={link} className="w-full md:w-1/2 relative group">
        <Image
          className="max-w-full md:max-w-[400px] filter drop-shadow-[0_4px_15px_rgba(255,180,0,0.7)]"
          src={imageSrc}
          alt={imageAlt}
          width={400}
          height={300}
          priority
        />
      </Link>
    )}
    <div className="w-full md:w-1/2">
      <h3 className="text-[#ffb400] font-bold text-2xl md:text-4xl">{title}</h3>
      <span className="text-[#ffb400] text-md md:text-lg">({date})</span>
      <p className="text-justify mt-4">{description}</p>

      <ul className="flex flex-wrap gap-3 mt-4">
        {techs.map((tag) => (
          <li
            key={tag}
            className="border rounded-full border-[#ffb400] px-3 py-1 text-sm flex items-center gap-2"
          >
            {techIcons[tag]} {tag}
          </li>
        ))}
      </ul>

      <div className="flex gap-4 mt-6">
        {liveDemo && (
          <a
            href={liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-[#ffb400] px-4 py-2 rounded-md font-semibold hover:bg-[#e09e00] transition duration-300"
          >
            Live Demo
          </a>
        )}
        {gitLink && (
          <a
            href={gitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-700 transition duration-300"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  </div>
);

const LatestWorks = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="pt-12 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#ffb400]">
              My Work
            </h2>
          </div>
        </div>
        <div className="mt-10 pb-12 sm:pb-16">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 "></div>
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl">
                <dl className="rounded-lg  shadow-lg sm:grid sm:grid-cols-3">
                  <div className="flex flex-col border-b p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-normal leading-6">
                      Years of Experience
                    </dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-[#ffb400]">
                      <span>1</span>+
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-b border-gray-100 dark:border-gray-700 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-normal leading-6 ">
                      finished projects
                    </dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-[#ffb400]">
                      <span>6</span>+
                    </dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 dark:border-gray-700 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg font-normal leading-6">
                      satisfied clients
                    </dt>
                    <dd className="order-1 text-5xl font-bold tracking-tight text-[#ffb400]">
                      <span>1</span>+
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl w-max mx-auto text-center text-[#ffb400] border-b-2 border-[#ffb400] my-10 md:my-20">
          Latest Works
        </h2>

        {/* Timeline Container */}
        <div className="relative">
          {/* center time line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-[#ffb400] hidden md:block">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#ffb400] rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-[#ffb400] rounded-full"></div>
          </div>

          {/* Project Entries */}
          <div className="space-y-12 md:space-y-24">
            <Project
              title="Bootcamp Project at Lejhro"
              date="Currently Working"
              techs={["#react.js", "#next.js", "#tailwind.css"]}
              description="Collaborating on the development of a bootcamp website as part of my internship at Lejhro Technology. Responsible for creating dynamic and responsive UI components."
              liveDemo="https://www.bootcamp.lejhro.com/"
              gitLink="https://github.com/Lejhro/lejhrobootcamp-5.0"
              link="https://www.bootcamp.lejhro.com/"
              imageSrc="/Frame-3.png"
              imageAlt="EazyGrad project screenshot"
              isLeft={false}
            />

            <Project
              title="Recipe Web"
              date="March 2024"
              techs={["#react.js", "#tailwind.css", "#API"]}
              description="Developed a recipe browsing and management application with meal type filtering and dynamic API-based search. Currently implementing scrolling functionality on component load and adding a spring loader for a smoother user experience."
              link="https://arbazmurme-recipe.netlify.app/"
              liveDemo="https://arbazmurme-recipe.netlify.app/"
              gitLink="https://github.com/arbazmurme/Recipe_App"
              imageSrc="/project-1.png"
              imageAlt="EazyGrad project screenshot"
              isLeft={true}
            />

            <Project
              title="Sajid Screens Landing Page"
              date="Freelance Project"
              techs={["#bootstrap", "#javascript", "#css"]}
              description="Created a responsive and visually appealing landing page for Sajid Screens."
              link="https://sajidscreens.com/"
              liveDemo="https://github.com/arbazmurme/sajidscreens"
              gitLink="https://sajidscreens.com/"
              imageSrc="/project-2.png"
              imageAlt="EazyGrad project screenshot"
              isLeft={false}
            />
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
    </div>
  );
};

export default LatestWorks;
