import advancedBlogs from "@/data/advancedBlogs.json";
import BlogLayout from "./BlogLayout";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";

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

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.shortDescription;
  const url = `https://arbazmurme.vercel.app/blog/${post.slug}`;
  const imageUrl = post.featuredImage?.url?.startsWith("http")
    ? post.featuredImage.url
    : `https://arbazmurme.vercel.app${post.featuredImage?.url || "/arbaz_murme.png"}`;

  return {
    title,
    description,
    keywords: post.tags?.join(", "),
    authors: [{ name: "Arbaz Murme", url: "https://arbazmurme.vercel.app" }],
    creator: "Arbaz Murme",
    publisher: "Arbaz Murme",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
      modifiedTime: post.updatedAt ? new Date(post.updatedAt).toISOString() : post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
      authors: ["https://arbazmurme.vercel.app/about"],
      tags: post.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.featuredImage?.alt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@arbazmurme",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/* ===============================
   PAGE
================================ */
export default function Page({ params }) {
  const post = advancedBlogs.find((blog) => blog.slug === params.slug);
  if (!post) return notFound();

  // Find related posts (same category or shared tags, excluding current post)
  const relatedPosts = advancedBlogs
    .filter((b) => b.slug !== post.slug)
    .map((b) => {
      let score = 0;
      if (b.category === post.category) score += 3;
      if (b.tags && post.tags) {
        const sharedTags = b.tags.filter((t) => post.tags.includes(t));
        score += sharedTags.length;
      }
      return { ...b, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const publishedDate = post.createdAt ? new Date(post.createdAt).toISOString() : new Date().toISOString();
  const modifiedDate = post.updatedAt ? new Date(post.updatedAt).toISOString() : publishedDate;
  const postUrl = `https://arbazmurme.vercel.app/blog/${post.slug}`;
  const imageUrl = post.featuredImage?.url?.startsWith("http")
    ? post.featuredImage.url
    : `https://arbazmurme.vercel.app${post.featuredImage?.url || "/arbaz_murme.png"}`;

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
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: postUrl,
          },
        ],
      },
      {
        "@type": "TechArticle",
        headline: post.metaTitle || post.title,
        description: post.metaDescription || post.shortDescription,
        datePublished: publishedDate,
        dateModified: modifiedDate,
        author: {
          "@type": "Person",
          name: "Arbaz Murme",
          url: "https://arbazmurme.vercel.app/about",
          jobTitle: "MERN Stack Developer",
        },
        publisher: {
          "@type": "Person",
          name: "Arbaz Murme",
          url: "https://arbazmurme.vercel.app",
        },
        image: [imageUrl],
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": postUrl,
        },
        keywords: post.tags?.join(", "),
        articleSection: post.category,
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogLayout post={post} relatedPosts={relatedPosts} />
    </>
  );
}