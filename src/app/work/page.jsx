import Work from "@/components/pages/Work";

export const metadata = {
  title: "Arbaz Murme | Work",
  description:
    "Explore the professional projects and work experience of Arbaz Murme, showcasing his skills in web development and design.",
  keywords: "Arbaz Murme, Arbaj Murme, React JS Developer, MERN Stack Developer, Next.js Developer, Frontend Web Developer, Full Stack Developer, JavaScript Developer, Hire Web Developer India, Freelance Web Developer Solapur, Web Developer in Solapur, Best Developer in Solapur, React Developer Maharashtra, Custom Website Development, UI/UX Developer, Arbaz Murme Portfolio",
  openGraph: {
    title: "Arbaz Murme | Work",
    description:
      "Discover the projects and professional experience of Arbaz Murme, including web development, design, and more.",
    url: "https://arbazmurme.vercel.app/work",
    images: [
      {
        url: "/project-1.png", // Example image from your public folder
        width: 800,
        height: 600,
        alt: "Work Project Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbaz Murme | Work",
    description:
      "View the professional work and projects of Arbaz Murme, a skilled React JS Developer with a focus on web development.",
    images: ["/project-1.png"], // Same image for Twitter
  },
};

// app/page.jsx
export default function Home() {
  return <Work />;
}
