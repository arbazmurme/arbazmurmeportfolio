import Profile from "@/components/pages/Profile";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Portfolio & Projects",
  description:
    "Explore the portfolio, projects, and professional journey of Arbaz Murme, a skilled MERN Stack & React JS Developer.",
  keywords:
    "Arbaz Murme, Arbaj Murme, React JS Developer, MERN Stack Developer, Next.js Developer, Frontend Web Developer, Full Stack Developer, JavaScript Developer, Hire Web Developer India, Freelance Web Developer Solapur, Web Developer in Solapur, Best Developer in Solapur, React Developer Maharashtra, Custom Website Development, UI/UX Developer, Arbaz Murme Portfolio",
  alternates: {
    canonical: "https://arbazmurme.vercel.app/portfolio",
  },
  openGraph: {
    title: "Arbaz Murme | Portfolio & Projects",
    description:
      "Explore the work, projects, and professional achievements of Arbaz Murme, a MERN Stack & React JS Developer.",
    url: "https://arbazmurme.vercel.app/portfolio",
    type: "website",
    images: [
      {
        url: "/arbaz_murme.png",
        width: 800,
        height: 600,
        alt: "Arbaz Murme Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbaz Murme | Portfolio & Projects",
    description:
      "Explore the work, projects, and professional achievements of Arbaz Murme.",
    images: ["/arbaz_murme.png"],
  },
};

export default function PortfolioPage() {
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
            name: "Portfolio",
            item: "https://arbazmurme.vercel.app/portfolio",
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Arbaz Murme Portfolio",
        description:
          "Portfolio and project showcase of Arbaz Murme, MERN Stack Developer.",
        url: "https://arbazmurme.vercel.app/portfolio",
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Profile />
    </>
  );
}

