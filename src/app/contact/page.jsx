import Contact from "@/components/pages/Contact";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Arbaz Murme for software engineering, full-stack web development projects, freelance opportunities, or technical consultations.",
  keywords:
    "Arbaz Murme, Arbaj Murme, React JS Developer, MERN Stack Developer, Next.js Developer, Frontend Web Developer, Full Stack Developer, JavaScript Developer, Hire Web Developer India, Freelance Web Developer Solapur, Web Developer in Solapur, Best Developer in Solapur, React Developer Maharashtra, Custom Website Development, UI/UX Developer, Arbaz Murme Portfolio",
  alternates: {
    canonical: "https://arbazmurme.vercel.app/contact",
  },
  openGraph: {
    title: "Contact Arbaz Murme | MERN Stack Developer",
    description:
      "Contact Arbaz Murme for any professional inquiries, hiring, or collaboration opportunities.",
    url: "https://arbazmurme.vercel.app/contact",
    type: "website",
    images: [
      {
        url: "/arbaz_murme.png",
        width: 800,
        height: 600,
        alt: "Contact Arbaz Murme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Arbaz Murme | MERN Stack Developer",
    description:
      "Reach out to Arbaz Murme for modern web development and freelance projects.",
    images: ["/arbaz_murme.png"],
  },
};

export default function ContactPage() {
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
            name: "Contact",
            item: "https://arbazmurme.vercel.app/contact",
          },
        ],
      },
      {
        "@type": "ContactPage",
        name: "Contact Arbaz Murme",
        url: "https://arbazmurme.vercel.app/contact",
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Contact />
    </>
  );
}

