import advancedBlogs from "@/data/advancedBlogs";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ShareButton from "./ShareButton";
import {
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

export async function generateStaticParams() {
  return advancedBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = advancedBlogs.find((blog) => blog.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.shortDescription,
    openGraph: {
      title: post.title,
      description: post.shortDescription,
      images: [post.featuredImage.url],
    },
  };
}

export default function BlogDetailPage({ params }) {
  const post = advancedBlogs.find((blog) => blog.slug === params.slug);
  if (!post) return notFound();

  // Find related posts (same category, excluding current)
  const relatedPosts = advancedBlogs
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-16 px-6">
      <div className="max-w-6xl mx-auto">
       <ShareButton title={post.title} description={post.shortDescription} />
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-400 hover:text-[#ffb400] transition-colors mb-8 group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to all blogs
        </Link>

        {/* Featured Image with overlay */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl mb-8">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        </div>

        {/* Title & Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              {new Date(post.createdAt).toDateString()}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              {post.readingTime}
            </span>
            <span className="px-2 py-1 bg-[#ffb400]/10 text-[#ffb400] rounded-full text-xs font-semibold">
              {post.difficulty}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                <TagIcon className="w-4 h-4 text-[#ffb400]" />#{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Article content */}
        <article className="prose prose-invert prose-lg max-w-none">
          {post.sections.map((section, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-[#ffb400] pl-4">
                {section.title}
              </h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </article>

        {/* Share & Author (placeholder) */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffb400] to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <div>
              <p className="text-white font-medium">Arbaz Murme</p>
              <p className="text-sm text-gray-400">MERN Stack Developer</p>
            </div>
          </div>

          <ShareButton title={post.title} description={post.shortDescription} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">
              Related Articles
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-[#ffb400]/50 transition-all"
                >
                  <div className="relative h-40">
                    <Image
                      src={related.featuredImage.url}
                      alt={related.featuredImage.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-semibold group-hover:text-[#ffb400] transition line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                      {related.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
