"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import { TrashIcon, EnvelopeIcon, CheckCircleIcon, PaperAirplaneIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [contactForms, setContactForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    fetchContactMessages();
  }, []);

  const fetchContactMessages = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/v1/contact");
      if (response.data && response.data.data) {
        setContactForms(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching contact messages from API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await api.delete(`/api/v1/contact/delete/${id}`);
      setContactForms(contactForms.filter((form) => form._id !== id));
      setStatusMessage("Message deleted successfully.");
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting message:", error);
      setStatusMessage("Failed to delete message.");
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`/api/v1/contact/read/${id}`);
      setContactForms(
        contactForms.map((item) =>
          item._id === id ? { ...item, isRead: true } : item
        )
      );
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  return (
    <div className="space-y-6 text-gray-100">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/80 border border-gray-800 p-5 rounded-xl">
        <div>
          <h3 className="text-xl font-bold text-[#ffb400]">Portfolio Contact Messages</h3>
          <p className="text-xs text-gray-400 mt-1">
            Messages received through your portfolio contact form (MongoDB Store).
          </p>
        </div>

        <button
          onClick={fetchContactMessages}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-xs font-semibold rounded-lg border border-gray-700 transition-colors"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Refresh Inbox
        </button>
      </div>

      {/* Status Alert */}
      {statusMessage && (
        <div className="p-3 bg-gray-900 border border-[#ffb400]/40 rounded-lg text-xs text-[#ffb400] text-center font-medium">
          {statusMessage}
        </div>
      )}

      {/* Messages List Container */}
      <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6 shadow-xl">
        {loading ? (
          <div className="text-center py-12 text-gray-500">
            <div className="w-8 h-8 border-2 border-[#ffb400] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            Loading contact messages...
          </div>
        ) : contactForms.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <EnvelopeIcon className="w-12 h-12 text-gray-600 mx-auto" />
            <p className="text-gray-400 font-medium">No contact messages available.</p>
            <p className="text-xs text-gray-600">Messages submitted from your website will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contactForms.map((form) => (
              <div
                key={form._id}
                className={`p-5 rounded-xl border transition-all ${
                  form.isRead
                    ? "bg-gray-950/60 border-gray-800/80"
                    : "bg-gray-950 border-[#ffb400]/40 shadow-lg"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="text-base font-bold text-white">{form.name}</h4>
                      <a
                        href={`mailto:${form.email}`}
                        className="text-xs text-[#ffb400] hover:underline"
                      >
                        {form.email}
                      </a>
                      {!form.isRead && (
                        <span className="px-2 py-0.5 bg-[#ffb400]/20 text-[#ffb400] border border-[#ffb400]/40 rounded-full text-[10px] font-bold uppercase">
                          NEW
                        </span>
                      )}
                    </div>

                    <div className="bg-gray-900/90 border border-gray-800/80 p-3.5 rounded-lg text-sm text-gray-300 whitespace-pre-wrap">
                      {form.message}
                    </div>

                    <p className="text-[11px] text-gray-500">
                      Received: {form.createdAt ? new Date(form.createdAt).toLocaleString("en-IN") : "N/A"}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-800">
                    <a
                      href={`mailto:${form.email}?subject=Re:%20Portfolio%20Inquiry`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ffb400] text-black text-xs font-bold rounded-lg hover:bg-[#e09e00] transition-colors"
                    >
                      <PaperAirplaneIcon className="w-3.5 h-3.5" />
                      Reply Email
                    </a>

                    {!form.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(form._id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs font-medium transition-colors"
                      >
                        <CheckCircleIcon className="w-3.5 h-3.5" />
                        Mark Read
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(form._id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-xs font-medium transition-colors"
                    >
                      <TrashIcon className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
