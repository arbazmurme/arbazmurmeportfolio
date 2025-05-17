import Image from "next/image";
import Link from "next/link";
import {
  FaReact, FaNodeJs, FaCss3Alt, FaJsSquare, FaFigma, FaBootstrap,
} from "react-icons/fa";
import {
  SiExpress, SiMongodb, SiSwiper, SiNextdotjs, SiTailwindcss,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

const techIcons = {
  "#react.js": <FaReact />,
  "#express.js": <SiExpress />,
  "#node.js": <FaNodeJs />,
  "#swiper.js": <SiSwiper />,
  "#mongoDB": <SiMongodb />,
  "#mongoose": <SiMongodb />,
  "#css": <FaCss3Alt />,
  "#javascript": <FaJsSquare />,
  "#figma": <FaFigma />,
  "#next.js": <SiNextdotjs />,
  "#tailwind.css": <SiTailwindcss />,
  "#bootstrap": <FaBootstrap />,
  "#API": <TbApi />,
};

const Project = ({
  title, date, techs, description, link, gitLink, liveDemo, imageSrc, imageAlt, isLeft,
}) => (
  <div className={`relative flex flex-col md:flex-row ${isLeft ? "md:flex-row-reverse" : ""} gap-10 items-center`}>
    <Link href={link} className="w-full md:w-1/2 relative group">
      <Image
        className="rounded-xl transition duration-300 hover:scale-105 shadow-lg"
        src={imageSrc}
        alt={imageAlt}
        width={500}
        height={350}
        priority
      />
    </Link>

    <div className="w-full md:w-1/2">
      <h3 className="text-[#ffb400] font-bold text-2xl md:text-3xl">{title}</h3>
      <p className="text-sm mt-1 text-gray-500">({date})</p>
      <p className="text-gray-200 mt-4 text-justify leading-relaxed">{description}</p>

      <ul className="flex flex-wrap gap-3 mt-4">
        {techs.map((tag) => (
          <li key={tag} className="border border-[#ffb400] text-white px-3 py-1 text-sm rounded-full flex items-center gap-2 hover:bg-[#ffb400] hover:text-black transition">
            <span className="text-[#ffb400] group-hover:text-black">{techIcons[tag]}</span>
            {tag}
          </li>
        ))}
      </ul>

      <div className="flex gap-4 mt-6">
        {liveDemo && (
          <a href={liveDemo} target="_blank" rel="noopener noreferrer"
            className="bg-[#ffb400] text-black font-semibold px-4 py-2 rounded-md hover:bg-[#e09e00] transition">
            Live Demo
          </a>
        )}
        {gitLink && (
          <a href={gitLink} target="_blank" rel="noopener noreferrer"
            className="bg-gray-800 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-700 transition">
            GitHub
          </a>
        )}
      </div>
    </div>
  </div>
);

const LatestWorks = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 text-white">
      <div className="text-center pt-16">
        <h2 className="text-4xl font-bold tracking-tight text-[#ffb400]">
          My Work
        </h2>
      </div>

      {/* Metrics Section */}
      <div className="mt-12 pb-16">
        <div className="mx-auto max-w-4xl grid sm:grid-cols-3 gap-6 text-center">
          {[
            ["Years of Experience", "1+"],
            ["Finished Projects", "6+"],
            ["Satisfied Clients", "1+"],
          ].map(([label, value]) => (
            <div key={label} className="bg-gray-900 p-6 rounded-xl shadow-lg">
              <div className="text-4xl font-bold text-[#ffb400]">{value}</div>
              <p className="mt-2 text-lg text-gray-300">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Header */}
      <h2 className="text-3xl md:text-4xl text-center font-bold text-[#ffb400] mb-16 border-b-2 border-[#ffb400] w-max mx-auto">
        Latest Works
      </h2>

      {/* Timeline Container */}
      <div className="relative space-y-24">
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-[2px] bg-[#ffb400]" />
        {/* Project Components */}
        <Project
          title="Bootcamp Project at Lejhro"
          date="December 2024"
          techs={["#react.js", "#next.js", "#tailwind.css"]}
          description="Collaborated on developing a bootcamp website at Lejhro Technology. Built dynamic, responsive UI components."
          liveDemo="https://www.bootcamp.lejhro.com/"
          gitLink="https://github.com/Lejhro/lejhrobootcamp-5.0"
          link="https://www.bootcamp.lejhro.com/"
          imageSrc="/Frame-3.png"
          imageAlt="Bootcamp"
          isLeft={false}
        />

        <Project
          title="AZ Shop - E-Commerce Platform"
          date="Currently Working"
          techs={["#react.js", "#next.js", "#tailwind.css", "#express.js", "#mongoDB"]}
          description="A modern e-commerce platform built with MERN stack featuring dashboards, product management, and SSR for SEO."
          liveDemo="https://e-commerce-frontend-topaz-delta.vercel.app/"
          gitLink="https://github.com/arbazmurme/E-Commerce-frontend"
          link="https://e-commerce-frontend-topaz-delta.vercel.app"
          imageSrc="/az-shop.png"
          imageAlt="AZ Shop"
          isLeft={true}
        />

        <Project
          title="E-Commerce API - AZ Shop Backend"
          date="Currently Working"
          techs={["#node.js", "#express.js", "#mongoDB", "#API"]}
          description="Backend API for AZ Shop using Node, Express, and MongoDB. Includes JWT auth, cart, and product management."
          liveDemo="http://e-commerce-api-ten-sable.vercel.app/api/products"
          gitLink="https://github.com/arbazmurme/E-Commerce-API"
          link="https://e-commerce-api-ten-sable.vercel.app/api/products"
          imageSrc="/API.png"
          imageAlt="AZ API"
          isLeft={false}
        />

        <Project
          title="RentNow - Rental Home Platform"
          date="Completed"
          techs={["#node.js", "#express.js", "#ejs", "#tailwind.css"]}
          description="Browse and book rentals. Built with Node, Express, EJS, and Tailwind. Features listings, image galleries, and more."
          liveDemo="https://rentnow-a40f.onrender.com/"
          gitLink="https://github.com/arbazmurme/RentNow"
          link="https://rentnow-a40f.onrender.com/"
          imageSrc="/RentNow.png"
          imageAlt="RentNow"
          isLeft={true}
        />

        <Project
          title="Recipe Web"
          date="March 2024"
          techs={["#react.js", "#tailwind.css", "#API"]}
          description="Browse recipes using dynamic API search with filters. Scroll-triggered loading and smooth UI animations."
          liveDemo="https://arbazmurme-recipe.netlify.app/"
          gitLink="https://github.com/arbazmurme/Recipe_App"
          link="https://arbazmurme-recipe.netlify.app/"
          imageSrc="/project-1.png"
          imageAlt="Recipe Web"
          isLeft={false}
        />

        <Project
          title="Sajid Screens Landing Page"
          date="Freelance Project"
          techs={["#bootstrap", "#javascript", "#css"]}
          description="Responsive landing page designed for a local business. Built with Bootstrap and custom scripts."
          liveDemo="https://sajidscreens.com/"
          gitLink="https://github.com/arbazmurme/sajidscreens"
          link="https://sajidscreens.com/"
          imageSrc="/project-2.png"
          imageAlt="Sajid Screens"
          isLeft={true}
        />
      </div>

      <div className="h-24" />
    </div>
  );
};

export default LatestWorks;
