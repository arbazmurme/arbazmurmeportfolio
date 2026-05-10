import BlogPage from "./Blog";

export const metadata = {
  title: "Blog",
  description:
    "Advanced blogs on MERN architecture, performance optimization, and deployment by Arbaz Murme.",
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