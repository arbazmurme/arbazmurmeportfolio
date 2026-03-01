"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  ClockIcon,
  TagIcon,
  MagnifyingGlassIcon as SearchIcon,
} from "@heroicons/react/24/outline";
import advancedBlogs from "@/data/advancedBlogs";

function BlogCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-transparent transition-all duration-300"
    >
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ffb400] via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      <div className="absolute inset-[1px] rounded-2xl bg-gray-900/95 -z-10" />

      {/* Image with overlay */}
      <Link href={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden">
        <Image
          src={post.featuredImage?.url}
          alt={post.featuredImage?.alt}
          fill
          className="object-cover group-hover:scale-105 transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

        <span className="absolute top-4 left-4 bg-[#ffb400] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {post.category}
        </span>
        <span className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
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
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full flex items-center gap-1"
            >
              <TagIcon className="w-3 h-3 text-[#ffb400]" />
              {tag}
            </span>
          ))}
        </div>

        {/* Read more link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-medium text-[#ffb400] hover:text-white transition-colors group/link"
        >
          Read article
          <svg
            className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
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
      post.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-16 py-16 text-center overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#ffb400]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
              Advanced <span className="text-[#ffb400] drop-shadow-lg">Blogs</span>
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Deep dive into MERN architecture, performance, and deployment.
            </p>

            {/* Quick stats */}
            <div className="mt-8 flex justify-center gap-6 text-sm">
              <div>
                <span className="text-[#ffb400] font-bold text-xl">
                  {advancedBlogs.length}
                </span>
                <span className="text-gray-400 ml-2">Articles</span>
              </div>
              <div>
                <span className="text-[#ffb400] font-bold text-xl">
                  {new Set(advancedBlogs.map((p) => p.category)).size}
                </span>
                <span className="text-gray-400 ml-2">Categories</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="relative flex-1 max-w-md w-full">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffb400]/50 focus:border-transparent transition"
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-[#ffb400] text-black shadow-lg shadow-[#ffb400]/30 scale-105"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
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
      </div>
    </div>
  );
}