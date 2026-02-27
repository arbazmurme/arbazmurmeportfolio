"use client";
import { blogPosts } from "@/data/blogs";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon, TagIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function BlogCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#ffb400]/10 transition-all duration-500 border border-gray-700 hover:border-[#ffb400]/50"
    >
      {/* Banner Image */}
      <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden h-48">
        <Image
          src={post.banner}
          alt={post.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
        
        {/* Category Tag */}
        <span className="absolute top-4 left-4 bg-[#ffb400] text-black text-xs font-bold px-3 py-1.5 rounded-full">
          {post.category}
        </span>
        
        {/* Reading Time */}
        <span className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
          <ClockIcon className="w-3 h-3" />
          {post.readingTime}
        </span>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <CalendarIcon className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
          <span className="flex items-center gap-1">
            <UserIcon className="w-3 h-3" />
            {post.author}
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#ffb400] transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full flex items-center gap-1"
            >
              <TagIcon className="w-3 h-3 text-[#ffb400]" />
              {tag}
            </span>
          ))}
        </div>

        {/* Read More */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-[#ffb400] font-medium hover:gap-3 transition-all duration-300 group/link"
        >
          <span>Read Full Article</span>
          <svg 
            className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#ffb400]/20 rounded-2xl transition-colors duration-500 pointer-events-none"></div>
    </motion.article>
  );
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories
  const categories = ["All", ...new Set(blogPosts.map(post => post.category))];

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-20">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffb400]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            My <span className="text-[#ffb400] relative inline-block">
              Blog
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#ffb400] to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Insights, tutorials, and guides on web development, MERN stack, and modern JavaScript frameworks.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="w-full md:w-96">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#ffb400] focus:ring-1 focus:ring-[#ffb400] transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-[#ffb400] text-black font-medium"
                      : "bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
          </motion.div>
        )}

        {/* Blog Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-6 p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <div className="px-4 py-2">
              <span className="text-2xl font-bold text-[#ffb400]">{blogPosts.length}+</span>
              <span className="text-gray-400 ml-2">Articles</span>
            </div>
            <div className="w-px h-8 bg-gray-800 my-auto hidden sm:block"></div>
            <div className="px-4 py-2">
              <span className="text-2xl font-bold text-[#ffb400]">
                {blogPosts.reduce((acc, post) => acc + parseInt(post.readingTime), 0)}+
              </span>
              <span className="text-gray-400 ml-2">Minutes Read</span>
            </div>
            <div className="w-px h-8 bg-gray-800 my-auto hidden sm:block"></div>
            <div className="px-4 py-2">
              <span className="text-2xl font-bold text-[#ffb400]">
                {new Set(blogPosts.map(post => post.category)).size}
              </span>
              <span className="text-gray-400 ml-2">Categories</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}