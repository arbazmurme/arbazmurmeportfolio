"use client";

import React, { useState } from "react";
import JobTracker from "@/components/JobTracker";
import Dashboard from "@/components/Dashboard";
import { BriefcaseIcon, EnvelopeIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("jobTracker");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#ffb400]">Admin Workspace</h1>
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
