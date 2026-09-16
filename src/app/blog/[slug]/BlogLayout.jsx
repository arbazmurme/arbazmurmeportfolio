"use client";

import Image from "next/image";
import Link from "next/link";
import ShareButton from "./ShareButton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import {
  CalendarIcon,
  ClockIcon,
  TagIcon,
  ChevronRightIcon,
  UserCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function BlogLayout({ post, relatedPosts = [] }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-[#ffb400] transition">
                Home
              </Link>
            </li>
            <li>
              <ChevronRightIcon className="w-3 h-3 text-gray-600" />
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#ffb400] transition">
                Blog
              </Link>
            </li>
            {post.category && (
              <>
                <li>
                  <ChevronRightIcon className="w-3 h-3 text-gray-600" />
                </li>
                <li className="text-gray-400">{post.category}</li>
              </>
            )}
            <li>
              <ChevronRightIcon className="w-3 h-3 text-gray-600" />
            </li>
            <li className="text-[#ffb400] font-medium truncate max-w-[200px] sm:max-w-xs">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Featured Image */}
        <div className="relative h-[260px] sm:h-[380px] rounded-2xl overflow-hidden mb-8 shadow-2xl border border-gray-800">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-400 mb-6">
          <span className="flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-[#ffb400]" />
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>

          <span className="flex items-center gap-1.5">
            <ClockIcon className="w-4 h-4 text-[#ffb400]" />
            {post.readingTime}
          </span>

          {post.difficulty && (
            <span className="px-3 py-1 bg-[#ffb400]/10 text-[#ffb400] border border-[#ffb400]/20 rounded-full text-xs font-semibold">
              {post.difficulty}
            </span>
          )}

          <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-semibold">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
          {post.title}
        </h1>

        {/* Short Description */}
        <p className="text-base sm:text-lg text-gray-300 mb-8 border-l-4 border-[#ffb400] pl-4 italic bg-gray-900/50 py-3 rounded-r-xl">
          {post.shortDescription}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-2 sm:gap-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-800/80 hover:bg-gray-700 transition text-gray-300 px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1 border border-gray-700"
              >
                <TagIcon className="w-3.5 h-3.5 text-[#ffb400]" />#{tag}
              </span>
            ))}
          </div>
        )}

        {/* Blog Sections */}
        <article className="space-y-12">
          {post.sections.map((section, index) => (
            <section key={index} className="space-y-4">
              {/* Section Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white border-l-4 border-[#ffb400] pl-4">
                {section.title}
              </h2>

              {/* Markdown Content */}
              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-white
                  prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-strong:text-white
                  prose-a:text-[#ffb400] prose-a:underline hover:prose-a:text-[#ffc83b]
                  prose-li:text-gray-300
                  break-words overflow-hidden
                  prose-pre:overflow-x-auto prose-pre:max-w-full prose-pre:bg-gray-900/90 prose-pre:border prose-pre:border-gray-800
                  prose-code:break-words prose-code:text-[#ffb400]"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {section.content}
                </ReactMarkdown>
              </div>
            </section>
          ))}
        </article>

        {/* Author Bio Box (E-E-A-T) */}
        <div className="mt-16 p-6 sm:p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/80 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#ffb400] shrink-0">
            <Image
              src="/arbaz_murme.png"
              alt="Arbaz Murme"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
              <h3 className="text-xl font-bold text-white">Written by Arbaz Murme</h3>
              <span className="text-xs bg-[#ffb400]/20 text-[#ffb400] px-2.5 py-0.5 rounded-full font-semibold">
                MERN Stack Developer
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Arbaz Murme is a Full-Stack Engineer specializing in high-performance React & Next.js web applications, scalable backend microservices, and modern UI engineering.
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-semibold">
              <Link
                href="/about"
                className="text-[#ffb400] hover:underline inline-flex items-center gap-1"
              >
                About the Author <ArrowRightIcon className="w-3 h-3" />
              </Link>
              <a
                href="https://www.linkedin.com/in/arbaj-murme-4493031a3/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#ffb400] transition"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/arbazmurme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#ffb400] transition"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <ShareButton title={post.title} description={post.shortDescription} />
        </div>

        {/* Related Articles (Internal Links for Crawlers & Users) */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-[#ffb400] rounded-full" />
              Related Articles & Guides
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block bg-gray-900/80 hover:bg-gray-800 rounded-xl overflow-hidden border border-gray-800 hover:border-[#ffb400]/40 transition p-5 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs text-[#ffb400] font-semibold uppercase tracking-wider block mb-2">
                      {related.category}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-[#ffb400] transition line-clamp-2 mb-2">
                      {related.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-3">
                      {related.shortDescription}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs text-[#ffb400] font-semibold group-hover:translate-x-1 transition-transform">
                    Read guide <ArrowRightIcon className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

