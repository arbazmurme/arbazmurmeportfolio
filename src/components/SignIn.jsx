"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { LockClosedIcon, UserIcon, EnvelopeIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isRegister ? "/api/v1/auth/register" : "/api/v1/auth/login";
      const payload = isRegister ? { name, email, password } : { email, password };

      const response = await api.post(endpoint, payload);

      if (response.data && response.data.token) {
        // Store JWT token securely in localStorage
        localStorage.setItem("admin_token", response.data.token);
        localStorage.setItem("admin_user", JSON.stringify(response.data.user));
        
        router.push("/admin/dashboard");
      } else {
        setError("Authentication failed. Token not received.");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(
        err.response?.data?.message ||
          "Authentication failed. Check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12 text-white">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#ffb400]/10 border border-[#ffb400]/30 rounded-xl flex items-center justify-center mx-auto text-[#ffb400]">
            <LockClosedIcon className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            {isRegister ? "Register Admin Account" : "Admin Portal Login"}
          </h1>
          <p className="text-xs text-gray-400">
            {isRegister
              ? "Create your secure admin credentials"
              : "Enter your credentials to access your workspace"}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs text-gray-400 mb-1 font-medium">Full Name</label>
              <div className="relative">
                <UserIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Arbaz Murme"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb400]"
                  required={isRegister}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-400 mb-1 font-medium">Email Address</label>
            <div className="relative">
              <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                placeholder="admin@arbazmurme.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb400]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1 font-medium">Password</label>
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb400]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-[#ffb400] text-black font-bold text-sm rounded-lg hover:bg-[#e09e00] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{isRegister ? "Register Account" : "Access Workspace"}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Toggle Register / Login */}
        <div className="text-center pt-2 border-t border-gray-800">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            className="text-xs text-gray-400 hover:text-[#ffb400] underline transition-colors"
          >
            {isRegister
              ? "Already have an admin account? Log In"
              : "Need to create an admin account? Register"}
          </button>
        </div>

      </div>
    </div>
  );
}
