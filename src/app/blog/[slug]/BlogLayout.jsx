"use client";

import Image from "next/image";
import Link from "next/link";
import ShareButton from "./ShareButton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import { CalendarIcon, ClockIcon, TagIcon } from "@heroicons/react/24/outline";

export default function BlogLayout({ post }) {
  return (
    <div className="min-h-screen bg-gradient-to-br py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-400 hover:text-[#ffb400] mb-8 transition"
        >
          ← Back to all blogs
        </Link>

        {/* Featured Image */}
        <div className="relative h-[380px] rounded-2xl overflow-hidden mb-10 shadow-2xl">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-sm  mb-6">
          <span className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            {new Date(post.createdAt).toDateString()}
          </span>

          <span className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            {post.readingTime}
          </span>

          <span className="px-3 py-1 bg-[#ffb400]/10 text-[#ffb400] rounded-full text-xs font-semibold">
            {post.difficulty}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold  leading-tight mb-6">
          {post.title}
        </h1>

        {/* Short Description */}
        <p className="text-lg text-gray-300 mb-8 border-l-4 border-[#ffb400] pl-4 italic">
          {post.shortDescription}
        </p>

        {/* Tags */}
        <div className="mb-12 flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-800 hover:bg-gray-700 transition text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              <TagIcon className="w-4 h-4 text-[#ffb400]" />#{tag}
            </span>
          ))}
        </div>

        {/* Blog Sections */}
        <article className="space-y-16">
          {post.sections.map((section, index) => (
            <section key={index} className="space-y-6">
              {/* Section Title */}
              <h2 className="text-3xl font-bold text-[#ffb400] border-l-4 border-[#ffb400] pl-4">
                {section.title}
              </h2>

              {/* Markdown Content */}
              <div
                className=" prose prose-invert prose-lg max-w-none
    prose-headings:text-white
    prose-p:text-gray-300
    prose-strong:text-white
    prose-a:text-[#ffb400]
    prose-li:text-gray-300

    break-words
    overflow-hidden

    prose-pre:overflow-x-auto
    prose-pre:max-w-full
    prose-code:break-words"
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

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <ShareButton title={post.title} description={post.shortDescription} />
        </div>
      </div>
    </div>
  );
}
