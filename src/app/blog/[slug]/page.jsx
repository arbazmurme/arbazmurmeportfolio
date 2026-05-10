import advancedBlogs from "@/data/advancedBlogs";
import BlogLayout from "./BlogLayout";
import { notFound } from "next/navigation";

/* ===============================
   STATIC PARAMS
================================ */
export async function generateStaticParams() {
  return advancedBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

/* ===============================
   METADATA (SEO)
================================ */
export async function generateMetadata({ params }) {
  const post = advancedBlogs.find((blog) => blog.slug === params.slug);
  if (!post) return {};

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.shortDescription,
    keywords: post.tags?.join(", "),
    authors: [{ name: "Arbaz Murme" }],
    alternates: {
      canonical: `https://arbazmurme.vercel.app/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.shortDescription,
      url: `https://arbazmurme.vercel.app/blog/${post.slug}`,
      type: "article",
      publishedTime: post.createdAt,
      images: [
        {
          url: post.featuredImage.url,
          width: 1200,
          height: 630,
          alt: post.featuredImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.shortDescription,
      images: [post.featuredImage.url],
    },
  };
}

/* ===============================
   PAGE
================================ */
export default function Page({ params }) {
  const post = advancedBlogs.find((blog) => blog.slug === params.slug);
  if (!post) return notFound();

  return <BlogLayout post={post} />;
}