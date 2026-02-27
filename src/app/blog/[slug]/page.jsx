import { blogPosts } from "@/data/blogs";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, ClockIcon, UserIcon, TagIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Metadata } from 'next';

export async function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Blog Not Found | Arbaz Murme",
      description: "The requested blog article could not be found.",
    };
  }

  return {
    title: `${post.title} | Arbaz Murme Blog`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://arbazmurme.vercel.app/blog/${post.slug}`,
      siteName: "Arbaz Murme Blog",
      images: [
        {
          url: post.banner,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.banner],
      creator: "@arbazmurme",
    },
    alternates: {
      canonical: `https://arbazmurme.vercel.app/blog/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogDetailPage({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  // Find related posts (same category, exclude current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `https://arbazmurme.vercel.app${post.banner}`,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://arbazmurme.vercel.app",
    },
    publisher: {
      "@type": "Person",
      name: "Arbaz Murme",
      logo: {
        "@type": "ImageObject",
        url: "https://arbazmurme.vercel.app/logo.png",
      },
    },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-12">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffb400]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ffb400] transition-colors duration-300 mb-8 group"
          >
            <ArrowLeftIcon className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <article className="bg-gray-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800">
            {/* Banner Image */}
            <div className="relative h-[400px] w-full">
              <Image
                src={post.banner}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
              
              {/* Category Badge */}
              <span className="absolute top-6 left-6 bg-[#ffb400] text-black font-bold px-4 py-2 rounded-full text-sm">
                {post.category}
              </span>
            </div>

            {/* Article Content */}
            <div className="p-8 md:p-12">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#ffb400]" />
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-[#ffb400]" />
                  {post.readingTime}
                </span>
                <span className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-[#ffb400]" />
                  {post.author}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {post.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-sm bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full"
                  >
                    <TagIcon className="w-3 h-3 text-[#ffb400]" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Article Body */}
              <div className="prose prose-invert prose-lg max-w-none">
                {post.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold text-white mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
                  } else if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold text-[#ffb400] mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
                  } else if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-bold text-gray-200 mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
                  } else if (paragraph.startsWith('- ')) {
                    return <li key={index} className="ml-4 text-gray-300">{paragraph.replace('- ', '')}</li>;
                  } else if (paragraph.trim()) {
                    return <p key={index} className="text-gray-300 mb-4 leading-relaxed">{paragraph}</p>;
                  }
                  return null;
                })}
              </div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-800">
                <h3 className="text-lg font-bold text-white mb-4">Share this article</h3>
                <div className="flex gap-3">
                  {[
                    { name: 'Twitter', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://arbazmurme.vercel.app/blog/${post.slug}`, color: 'hover:bg-blue-400' },
                    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=https://arbazmurme.vercel.app/blog/${post.slug}`, color: 'hover:bg-blue-700' },
                    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=https://arbazmurme.vercel.app/blog/${post.slug}`, color: 'hover:bg-blue-600' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-[#ffb400] hover:text-black transition-all duration-300 ${social.color}`}
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                Related <span className="text-[#ffb400]">Articles</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group bg-gray-900/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-[#ffb400] transition-all duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.banner}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#ffb400] transition-colors duration-300 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                        {relatedPost.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}