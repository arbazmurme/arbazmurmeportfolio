import BlogPage from "./Blog";

export const metadata = {
  title: "Blog",
  description:
    "Advanced blogs on MERN architecture, performance optimization, and deployment by Arbaz Murme.",
  keywords: "Arbaz Murme, Arbaj Murme, React JS Developer, MERN Stack Developer, Next.js Developer, Frontend Web Developer, Full Stack Developer, JavaScript Developer, Hire Web Developer India, Freelance Web Developer Solapur, Web Developer in Solapur, Best Developer in Solapur, React Developer Maharashtra, Custom Website Development, UI/UX Developer, Arbaz Murme Portfolio",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Arbaz Murme | Blog",
    description:
      "Advanced blogs on MERN architecture, performance optimization, and deployment by Arbaz Murme.",
    url: "https://arbazmurme.vercel.app/blog",
    type: "website",
  },
};

export default function Page() {
  return <BlogPage />;
}