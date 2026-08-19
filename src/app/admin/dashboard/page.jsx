"use client";

import React, { useState, useEffect } from "react";
import JobTracker from "@/components/JobTracker";
import Dashboard from "@/components/Dashboard";
import { BriefcaseIcon, EnvelopeIcon, ArrowRightOnRectangleIcon, UserCircleIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("jobTracker");
  const [authenticated, setAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  // Strict Auth Guard - Check JWT token validity
  useEffect(() => {
    const verifyAuth = async () => {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("admin_token");

      // NO TOKEN -> Redirect immediately to /admin
      if (!token) {
        setAuthenticated(false);
        setCheckingAuth(false);
        router.replace("/admin");
        return;
      }

      try {
        const response = await api.get("/api/v1/auth/me");
        if (response.data && response.data.user) {
          setAdminUser(response.data.user);
          setAuthenticated(true);
        } else {
          throw new Error("Invalid admin session");
        }
      } catch (error) {
        console.error("Auth verification failed:", error);
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        setAuthenticated(false);
        router.replace("/admin");
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setAuthenticated(false);
    router.replace("/admin");
  };

  // 1. Show full-screen loading spinner while verifying authorization
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-10 h-10 border-4 border-[#ffb400] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-gray-400 font-medium">Verifying admin credentials...</p>
      </div>
    );
  }

  // 2. Prevent rendering any dashboard UI if NOT authenticated
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white space-y-4 p-4 text-center">
        <ShieldExclamationIcon className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-bold text-red-400">Access Denied</h2>
        <p className="text-sm text-gray-400">You must be logged in to view the admin dashboard.</p>
        <button
          onClick={() => router.replace("/admin")}
          className="px-4 py-2 bg-[#ffb400] text-black font-bold text-xs rounded-lg hover:bg-[#e09e00]"
        >
          Go to Login Page
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-[#ffb400]">Admin Workspace</h1>
              {adminUser && (
                <span className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs text-gray-300 flex items-center gap-1.5">
                  <UserCircleIcon className="w-4 h-4 text-[#ffb400]" />
                  {adminUser.name} ({adminUser.email})
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Manage your job applications, interview rounds, and portfolio messages in one place.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-sm font-semibold transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex border-b border-gray-800 space-x-4">
          <button
            onClick={() => setActiveTab("jobTracker")}
            className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 transition-all ${
              activeTab === "jobTracker"
                ? "border-[#ffb400] text-[#ffb400] bg-[#ffb400]/5"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            <BriefcaseIcon className="w-5 h-5" />
            Job Applications Tracker
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 transition-all ${
              activeTab === "contacts"
                ? "border-[#ffb400] text-[#ffb400] bg-[#ffb400]/5"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            <EnvelopeIcon className="w-5 h-5" />
            Contact Messages
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-2">
          {activeTab === "jobTracker" && <JobTracker />}
          {activeTab === "contacts" && <Dashboard />}
        </div>
      </div>
    </div>
  );
}
