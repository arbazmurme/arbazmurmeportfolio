"use client";

import advancedBlogs from "@/data/advancedBlogs";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  ClockIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

function BlogCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-[#ffb400]/50 transition-all"
    >
      {/* Banner */}
      <Link href={`/blog/${post.slug}`} className="block relative h-48">
        <Image
          src={post.featuredImage?.url}
          alt={post.featuredImage?.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover group-hover:scale-110 transition duration-700"
        />

        <span className="absolute top-4 left-4 bg-[#ffb400] text-black text-xs font-bold px-3 py-1 rounded-full">
          {post.category}
        </span>

        <span className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <ClockIcon className="w-3 h-3" />
          {post.readingTime}
        </span>
      </Link>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <CalendarIcon className="w-3 h-3" />
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#ffb400] transition line-clamp-2">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {post.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full flex items-center gap-1"
            >
              <TagIcon className="w-3 h-3 text-[#ffb400]" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(advancedBlogs.map((post) => post.category)),
  ];

  const filteredPosts = advancedBlogs.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.shortDescription
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      post.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" ||
      post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Advanced <span className="text-[#ffb400]">Blogs</span>
          </h1>
          <p className="text-gray-400">
            Deep dive into MERN architecture, performance, and deployment.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-full text-white focus:outline-none focus:border-[#ffb400]"
          />

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition ${
                  selectedCategory === category
                    ? "bg-[#ffb400] text-black"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            No articles found.
          </div>
        )}

        {/* Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex gap-10 p-6 bg-gray-900 rounded-2xl border border-gray-800">
            <div>
              <span className="text-2xl font-bold text-[#ffb400]">
                {advancedBlogs.length}
              </span>
              <span className="text-gray-400 ml-2">Articles</span>
            </div>

            <div>
              <span className="text-2xl font-bold text-[#ffb400]">
                {new Set(advancedBlogs.map((p) => p.category)).size}
              </span>
              <span className="text-gray-400 ml-2">Categories</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}