import About from "@/components/pages/About";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "About Me",
  description:
    "Learn more about Arbaz Murme, a passionate MERN Stack and React JS Developer with expertise in building scalable, modern, and high-performance web applications.",
  keywords:
    "Arbaz Murme, Arbaj Murme, React JS Developer, MERN Stack Developer, Next.js Developer, Frontend Web Developer, Full Stack Developer, JavaScript Developer, Hire Web Developer India, Freelance Web Developer Solapur, Web Developer in Solapur, Best Developer in Solapur, React Developer Maharashtra, Custom Website Development, UI/UX Developer, Arbaz Murme Portfolio",
  alternates: {
    canonical: "https://arbazmurme.vercel.app/about",
  },
  openGraph: {
    title: "About Arbaz Murme | MERN Stack Developer",
    description:
      "Explore the background, skills, and experience of Arbaz Murme, a talented React JS & MERN Stack Developer.",
    url: "https://arbazmurme.vercel.app/about",
    type: "profile",
    images: [
      {
        url: "/arbaz_murme.png",
        width: 800,
        height: 600,
        alt: "About Arbaz Murme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Arbaz Murme | MERN Stack Developer",
    description:
      "Discover more about Arbaz Murme's journey and expertise in web development.",
    images: ["/arbaz_murme.png"],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://arbazmurme.vercel.app",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: "https://arbazmurme.vercel.app/about",
          },
        ],
      },
      {
        "@type": "ProfilePage",
        mainEntity: {
          "@type": "Person",
          name: "Arbaz Murme",
          jobTitle: "MERN Stack Developer",
          url: "https://arbazmurme.vercel.app/about",
          sameAs: [
            "https://www.linkedin.com/in/arbaj-murme-4493031a3/",
            "https://github.com/arbazmurme",
          ],
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <About />
    </>
  );
}

