"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import api from "@/utils/api";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, message } = formData;

    // Validation
    if (!name || !email || !message) {
      setStatus({
        type: "error",
        message: "Please fill in all fields",
      });
      setIsSubmitting(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const data = {
        name,
        email,
        message,
      }
      console.log("data", data);
      
      // ✅ SEND TO BACKEND (MongoDB)
      await api.post("/api/v1/contact/add", data);

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setStatus({
        type: "success",
        message: "Message sent successfully! I’ll get back to you soon.",
      });

      setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 5000);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-white mb-3">Get In Touch</h2>
        <p className="text-gray-400">
          Have a project in mind? Let's discuss how we can work together.
        </p>
      </div>

      <form id="contactForm" onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#ffb400] mb-2 uppercase tracking-wider"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="given-name"
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ffb400] focus:ring-1 focus:ring-[#ffb400] transition-all duration-300"
              value={formData.name}
              onChange={handleChange}
            />
          </motion.div>

          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#ffb400] mb-2 uppercase tracking-wider"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ffb400] focus:ring-1 focus:ring-[#ffb400] transition-all duration-300"
              value={formData.email}
              onChange={handleChange}
            />
          </motion.div>
        </div>

        {/* Message Textarea */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label
            htmlFor="message"
            className="block text-sm font-medium text-[#ffb400] mb-2 uppercase tracking-wider"
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Tell me about your project or inquiry..."
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#ffb400] focus:ring-1 focus:ring-[#ffb400] transition-all duration-300 resize-none"
            value={formData.message}
            onChange={handleChange}
          />
        </motion.div>

        {/* Status Message */}
        {status.message && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`p-4 rounded-lg ${
              status.type === "success"
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}
          >
            <div className="flex items-center gap-3">
              {status.type === "success" ? (
                <CheckCircleIcon className="h-5 w-5" />
              ) : (
                <ExclamationCircleIcon className="h-5 w-5" />
              )}
              <p className="text-sm">{status.message}</p>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center pt-4"
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative inline-flex items-center gap-4 px-8 py-4 text-lg font-semibold text-white rounded-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Background Gradient */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#ffb400]/10 via-[#ffb400]/20 to-[#ffb400]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

            {/* Animated Border */}
            <span className="absolute inset-0 border-2 border-[#ffb400] rounded-lg">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffb400] to-transparent animate-shimmer"></span>
            </span>

            {/* Button Content */}
            <span className="relative flex items-center gap-3">
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#ffb400] border-t-transparent"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span className="uppercase tracking-wider">Send Message</span>
                  <PaperAirplaneIcon className="h-5 w-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </>
              )}
            </span>
          </button>
        </motion.div>
      </form>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 pt-8 border-t border-gray-800"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 rounded-lg bg-gray-900/30">
            <div className="text-2xl font-bold text-[#ffb400] mb-2">24-48h</div>
            <div className="text-sm text-gray-400">Response Time</div>
          </div>
          <div className="p-4 rounded-lg bg-gray-900/30">
            <div className="text-2xl font-bold text-[#ffb400] mb-2">100%</div>
            <div className="text-sm text-gray-400">Message Read</div>
          </div>
          <div className="p-4 rounded-lg bg-gray-900/30">
            <div className="text-2xl font-bold text-[#ffb400] mb-2">Secure</div>
            <div className="text-sm text-gray-400">Data Protected</div>
          </div>
        </div>
      </motion.div>

      {/* Add shimmer animation style */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </motion.div>
  );
};

export default ContactForm;
