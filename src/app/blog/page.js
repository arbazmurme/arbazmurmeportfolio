import Blog from "./Blog.jsx";

export const metadata = {
  title: "Arbaz Murme | Blog - Web Development & MERN Stack Tutorials",
  description:
    "Explore expert blogs on React.js, MERN Stack, Next.js, JavaScript, and modern web development. Learn full-stack development with practical tutorials and real-world projects.",
  
  keywords: [
    "Arbaz Murme blog",
    "React JS blog",
    "MERN Stack tutorials",
    "JavaScript articles",
    "Web development blog",
    "Frontend development",
    "Next.js tutorials",
    "Full stack developer blog"
  ],

  openGraph: {
    title: "Arbaz Murme | Blog - Web Development Tutorials",
    description:
      "Master React.js, MERN Stack, and modern web technologies with in-depth tutorials and guides by Arbaz Murme.",
    url: "https://arbazmurme.vercel.app/blog",
    siteName: "Arbaz Murme Portfolio",
    images: [
      {
        url: "/blog-og.png",
        width: 1200,
        height: 630,
        alt: "Arbaz Murme Blog - Web Development Tutorials",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Arbaz Murme | Blog - Web Development",
    description:
      "Learn React.js, MERN Stack & modern web development from Arbaz Murme's blog.",
    images: ["/blog-og.png"],
    creator: "@arbazmurme",
  },

  alternates: {
    canonical: "https://arbazmurme.vercel.app/blog",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogPage() {
  return <Blog />;
}