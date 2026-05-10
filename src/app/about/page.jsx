import About from "@/components/pages/About";

export const metadata = {
  title: "About",
  description:
    "Learn more about Arbaz Murme, a passionate React JS Developer with a strong background in web development.",
  keywords: "Arbaz Murme, Arbaj Murme, React JS Developer, MERN Stack Developer, Next.js Developer, Frontend Web Developer, Full Stack Developer, JavaScript Developer, Hire Web Developer India, Freelance Web Developer Solapur, Web Developer in Solapur, Best Developer in Solapur, React Developer Maharashtra, Custom Website Development, UI/UX Developer, Arbaz Murme Portfolio",
  openGraph: {
    title: "Arbaz Murme | About",
    description:
      "Explore the background, skills, and experience of Arbaz Murme, a talented React JS Developer.",
    url: "https://arbazmurme.vercel.app/about",
    images: [
      {
        url: "/about.png",
        width: 800,
        height: 600,
        alt: "About Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbaz Murme | About",
    description:
      "Discover more about Arbaz Murme's journey and expertise in web development.",
    images: ["/about.png"],
  },
};

// app/page.jsx
export default function Home() {
  return (
    <>
      <About />
    </>
  );
}
