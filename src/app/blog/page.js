import BlogPage from "./Blog";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Blog - MERN Architecture, Performance & Web Development",
  description:
    "Explore in-depth technical blogs and guides on React, Next.js, Node.js, MongoDB, DevOps, and Full-Stack Web Development by Arbaz Murme.",
  keywords:
    "Arbaz Murme, React JS Developer, MERN Stack Developer, Next.js Developer, Web Development Tutorials, Full Stack Blog, Performance Optimization, Node.js Architecture",
  alternates: {
    canonical: "https://arbazmurme.vercel.app/blog",
  },
  openGraph: {
    title: "Technical Blog | Arbaz Murme",
    description:
      "Advanced guides and architectural tutorials on MERN stack, performance optimization, and web engineering by Arbaz Murme.",
    url: "https://arbazmurme.vercel.app/blog",
    type: "website",
    images: [
      {
        url: "/arbaz_murme.png",
        width: 1200,
        height: 630,
        alt: "Arbaz Murme Technical Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Blog | Arbaz Murme",
    description:
      "Advanced guides and architectural tutorials on MERN stack, performance optimization, and web engineering.",
    images: ["/arbaz_murme.png"],
  },
};

export default function Page() {
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
            name: "Blog",
            item: "https://arbazmurme.vercel.app/blog",
          },
        ],
      },
      {
        "@type": "Blog",
        name: "Arbaz Murme Technical Blog",
        description:
          "Advanced blogs on MERN architecture, performance optimization, and modern web development.",
        url: "https://arbazmurme.vercel.app/blog",
        publisher: {
          "@type": "Person",
          name: "Arbaz Murme",
          url: "https://arbazmurme.vercel.app",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogPage />
    </>
  );
}