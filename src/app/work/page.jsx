import Work from "@/components/pages/Work";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Work & Experience",
  description:
    "Explore the professional projects, work experience, and tech stacks built by Arbaz Murme, a MERN Stack Developer.",
  keywords:
    "Arbaz Murme, Arbaj Murme, React JS Developer, MERN Stack Developer, Next.js Developer, Frontend Web Developer, Full Stack Developer, JavaScript Developer, Hire Web Developer India, Freelance Web Developer Solapur, Web Developer in Solapur, Best Developer in Solapur, React Developer Maharashtra, Custom Website Development, UI/UX Developer, Arbaz Murme Portfolio",
  alternates: {
    canonical: "https://arbazmurme.vercel.app/work",
  },
  openGraph: {
    title: "Arbaz Murme | Work & Experience",
    description:
      "Discover the projects and professional experience of Arbaz Murme, including web development, architecture, and UI/UX design.",
    url: "https://arbazmurme.vercel.app/work",
    type: "website",
    images: [
      {
        url: "/arbaz_murme.png",
        width: 800,
        height: 600,
        alt: "Work Projects of Arbaz Murme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbaz Murme | Work & Experience",
    description:
      "View the professional work and projects of Arbaz Murme, a skilled MERN Stack & React JS Developer.",
    images: ["/arbaz_murme.png"],
  },
};

export default function WorkPage() {
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
            name: "Work",
            item: "https://arbazmurme.vercel.app/work",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Arbaz Murme - Work & Projects",
        url: "https://arbazmurme.vercel.app/work",
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Work />
    </>
  );
}

