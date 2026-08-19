"use client";

import React, { useState, useEffect } from "react";
import api from "@/utils/api";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  LinkIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const initialFormState = {
  companyName: "",
  rolePosition: "",
  jobLocation: "Remote",
  salaryPackage: "",
  platform: "LinkedIn",
  dateApplied: new Date().toISOString().split("T")[0],
  status: "Applied",
  companyContacts: [{ name: "", email: "", phone: "", designation: "" }],
  interviewRounds: [
    {
      roundName: "Round 1 - Technical",
      roundDate: "",
      status: "Pending",
      interviewerName: "",
      questions: [""],
      whereIGotStuck: "",
      feedback: "",
    },
  ],
  responseFeedback: [{ date: new Date().toISOString().split("T")[0], responseType: "Email", status: "", notes: "" }],
  whereIGotStuck: [{ topic: "", description: "" }],
  actionItems: [{ task: "", isCompleted: false }],
  usefulLinksNotes: [{ title: "", url: "", note: "" }],
};

export default function JobTracker() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/v1/job-applications");
      if (response.data && response.data.data) {
        setApplications(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching job applications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (appItem) => {
    setEditingId(appItem._id);
    setFormData({
      companyName: appItem.companyName || "",
      rolePosition: appItem.rolePosition || "",
      jobLocation: appItem.jobLocation || "Remote",
      salaryPackage: appItem.salaryPackage || "",
      platform: appItem.platform || "LinkedIn",
      dateApplied: appItem.dateApplied ? new Date(appItem.dateApplied).toISOString().split("T")[0] : "",
      status: appItem.status || "Applied",
      companyContacts: appItem.companyContacts?.length ? appItem.companyContacts : [{ name: "", email: "", phone: "", designation: "" }],
      interviewRounds: appItem.interviewRounds?.length ? appItem.interviewRounds : [{ roundName: "", roundDate: "", status: "Pending", interviewerName: "", questions: [""], whereIGotStuck: "", feedback: "" }],
      responseFeedback: appItem.responseFeedback?.length ? appItem.responseFeedback : [{ date: "", responseType: "Email", status: "", notes: "" }],
      whereIGotStuck: appItem.whereIGotStuck?.length ? appItem.whereIGotStuck : [{ topic: "", description: "" }],
      actionItems: appItem.actionItems?.length ? appItem.actionItems : [{ task: "", isCompleted: false }],
      usefulLinksNotes: appItem.usefulLinksNotes?.length ? appItem.usefulLinksNotes : [{ title: "", url: "", note: "" }],
    });
    setIsModalOpen(true);
  };

  // Open modal for View Details
  const handleOpenView = (appItem) => {
    setSelectedApp(appItem);
    setIsViewModalOpen(true);
  };

  // Delete Handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job application?")) return;
    try {
      await api.delete(`/api/v1/job-applications/${id}`);
      setApplications(applications.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting job application:", error);
      alert("Failed to delete application");
    }
  };

  // Submit Handler (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.rolePosition) {
      alert("Company Name and Role/Position are required!");
      return;
    }

    try {
      setSubmitting(true);
      if (editingId) {
        await api.put(`/api/v1/job-applications/${editingId}`, formData);
      } else {
        await api.post("/api/v1/job-applications", formData);
      }
      setIsModalOpen(false);
      fetchApplications();
    } catch (error) {
      console.error("Error saving job application:", error);
      alert("Failed to save job application");
    } finally {
      setSubmitting(false);
    }
  };

  // Dynamic Array Helper Functions
  const handleArrayChange = (arrayName, index, field, value) => {
    const updatedArray = [...formData[arrayName]];
    if (field) {
      updatedArray[index][field] = value;
    } else {
      updatedArray[index] = value;
    }
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const handleAddArrayItem = (arrayName, newItemTemplate) => {
    setFormData({
      ...formData,
      [arrayName]: [...formData[arrayName], newItemTemplate],
    });
  };

  const handleRemoveArrayItem = (arrayName, index) => {
    const updatedArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  // Nested Questions inside Interview Rounds
  const handleQuestionChange = (roundIndex, qIndex, value) => {
    const updatedRounds = [...formData.interviewRounds];
    updatedRounds[roundIndex].questions[qIndex] = value;
    setFormData({ ...formData, interviewRounds: updatedRounds });
  };

  const handleAddQuestion = (roundIndex) => {
    const updatedRounds = [...formData.interviewRounds];
    updatedRounds[roundIndex].questions.push("");
    setFormData({ ...formData, interviewRounds: updatedRounds });
  };

  const handleRemoveQuestion = (roundIndex, qIndex) => {
    const updatedRounds = [...formData.interviewRounds];
    updatedRounds[roundIndex].questions = updatedRounds[roundIndex].questions.filter((_, i) => i !== qIndex);
    setFormData({ ...formData, interviewRounds: updatedRounds });
  };

  // Filtered Applications
  const filteredApps = applications.filter((appItem) => {
    const matchesSearch =
      appItem.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appItem.rolePosition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appItem.platform?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || appItem.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Metrics
  const totalApps = applications.length;
  const interviewingApps = applications.filter((a) => a.status === "Interviewing").length;
  const offerApps = applications.filter((a) => a.status === "Offer").length;
  const rejectedApps = applications.filter((a) => a.status === "Rejected").length;

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Offer":
        return "bg-green-500/20 text-green-400 border-green-500/40";
      case "Interviewing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
      case "Screening":
        return "bg-purple-500/20 text-purple-400 border-purple-500/40";
      case "Rejected":
        return "bg-red-500/20 text-red-400 border-red-500/40";
      case "On Hold":
        return "bg-orange-500/20 text-orange-400 border-orange-500/40";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/40";
    }
  };

  return (
    <div className="space-y-6 text-gray-100">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-[#ffb400]/10 border border-[#ffb400]/30 rounded-lg text-[#ffb400]">
            <BriefcaseIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Total Applied</p>
            <h4 className="text-2xl font-bold text-white">{totalApps}</h4>
          </div>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400">
            <ClockIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Interviewing</p>
            <h4 className="text-2xl font-bold text-white">{interviewingApps}</h4>
          </div>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
            <CheckCircleIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Offers Received</p>
            <h4 className="text-2xl font-bold text-white">{offerApps}</h4>
          </div>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            <XCircleIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Rejected / On Hold</p>
            <h4 className="text-2xl font-bold text-white">{rejectedApps}</h4>
          </div>
        </div>
      </div>

      {/* Controls Bar (Search, Filter & Add Button) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900/80 border border-gray-800 p-4 rounded-xl">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search company or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ffb400]"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <FunnelIcon className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb400]"
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Screening">Screening</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="On Hold">On Hold</option>
              <option value="No Response">No Response</option>
            </select>
          </div>
        </div>

        {/* Add Application Button */}
        <button
          onClick={handleOpenCreate}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#ffb400] text-black font-semibold rounded-lg hover:bg-[#e09e00] transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Add Job Application
        </button>
      </div>

      {/* Applications Table */}
      <div className="bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-950 text-gray-400 uppercase text-xs tracking-wider border-b border-gray-800">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Company Name</th>
                <th className="px-6 py-4">Role / Position</th>
                <th className="px-6 py-4">Contacts</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Applied Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-gray-500">
                    Loading job applications...
                  </td>
                </tr>
              ) : filteredApps.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-gray-500">
                    No job applications found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((item, idx) => (
                  <tr key={item._id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-400">{item.sNo || idx + 1}</td>
                    <td className="px-6 py-4 font-semibold text-white">
                      {item.companyName}
                      {item.jobLocation && (
                        <span className="block text-xs text-gray-500 font-normal">{item.jobLocation}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {item.rolePosition}
                      {item.salaryPackage && (
                        <span className="block text-xs text-[#ffb400]">{item.salaryPackage}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {item.companyContacts?.length > 0 && item.companyContacts[0].name ? (
                        <div className="text-xs space-y-0.5">
                          <p className="text-gray-200 font-medium">{item.companyContacts[0].name}</p>
                          {item.companyContacts[0].email && (
                            <p className="text-gray-400">{item.companyContacts[0].email}</p>
                          )}
                          {item.companyContacts[0].phone && (
                            <p className="text-gray-400">{item.companyContacts[0].phone}</p>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-600 italic">No contact</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{item.platform || "LinkedIn"}</td>
                    <td className="px-6 py-4 text-gray-400">
                      {item.dateApplied ? new Date(item.dateApplied).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenView(item)}
                          className="p-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 bg-[#ffb400]/10 text-[#ffb400] hover:bg-[#ffb400]/20 border border-[#ffb400]/30 rounded-lg transition-colors"
                          title="Edit Application"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-colors"
                          title="Delete Application"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 text-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h3 className="text-xl font-bold text-[#ffb400]">
                {editingId ? "Edit Job Application" : "Add New Job Application"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SECTION 1: BASIC DETAILS */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-[#ffb400] uppercase tracking-wider border-b border-gray-800 pb-2 flex items-center gap-2">
                  <BuildingOfficeIcon className="w-4 h-4" /> Basic Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Google, Microsoft"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb400]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Role / Position *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Full Stack Developer"
                      value={formData.rolePosition}
                      onChange={(e) => setFormData({ ...formData, rolePosition: e.target.value })}
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb400]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="Remote / Solapur / Pune"
                      value={formData.jobLocation}
                      onChange={(e) => setFormData({ ...formData, jobLocation: e.target.value })}
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb400]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Salary Package</label>
                    <input
                      type="text"
                      placeholder="e.g. 6-8 LPA"
                      value={formData.salaryPackage}
                      onChange={(e) => setFormData({ ...formData, salaryPackage: e.target.value })}
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb400]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Platform</label>
                    <input
                      type="text"
                      placeholder="LinkedIn / Indeed / Naukri"
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb400]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Date Applied</label>
                    <input
                      type="date"
                      value={formData.dateApplied}
                      onChange={(e) => setFormData({ ...formData, dateApplied: e.target.value })}
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb400]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Application Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffb400]"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Screening">Screening</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                      <option value="On Hold">On Hold</option>
                      <option value="No Response">No Response</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: COMPANY CONTACTS ARRAY */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <h4 className="text-sm font-semibold text-[#ffb400] uppercase tracking-wider flex items-center gap-2">
                    <UserGroupIcon className="w-4 h-4" /> Company Contacts (HR / Recruiter)
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem("companyContacts", { name: "", email: "", phone: "", designation: "" })}
                    className="text-xs text-[#ffb400] hover:underline flex items-center gap-1"
                  >
                    <PlusIcon className="w-3.5 h-3.5" /> Add Contact
                  </button>
                </div>

                {formData.companyContacts.map((contact, idx) => (
                  <div key={idx} className="p-3 bg-gray-950 border border-gray-800 rounded-xl relative space-y-3">
                    {formData.companyContacts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("companyContacts", idx)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xs"
                      >
                        Remove
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <input
                        type="text"
                        placeholder="Name"
                        value={contact.name}
                        onChange={(e) => handleArrayChange("companyContacts", idx, "name", e.target.value)}
                        className="bg-gray-900 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={contact.email}
                        onChange={(e) => handleArrayChange("companyContacts", idx, "email", e.target.value)}
                        className="bg-gray-900 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={contact.phone}
                        onChange={(e) => handleArrayChange("companyContacts", idx, "phone", e.target.value)}
                        className="bg-gray-900 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Designation / Role"
                        value={contact.designation}
                        onChange={(e) => handleArrayChange("companyContacts", idx, "designation", e.target.value)}
                        className="bg-gray-900 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* SECTION 3: INTERVIEW ROUNDS ARRAY */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                  <h4 className="text-sm font-semibold text-[#ffb400] uppercase tracking-wider flex items-center gap-2">
                    <AcademicCapIcon className="w-4 h-4" /> Interview Rounds & Questions
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      handleAddArrayItem("interviewRounds", {
                        roundName: "",
                        roundDate: "",
                        status: "Pending",
                        interviewerName: "",
                        questions: [""],
                        whereIGotStuck: "",
                        feedback: "",
                      })
                    }
                    className="text-xs text-[#ffb400] hover:underline flex items-center gap-1"
                  >
                    <PlusIcon className="w-3.5 h-3.5" /> Add Interview Round
                  </button>
                </div>

                {formData.interviewRounds.map((round, rIdx) => (
                  <div key={rIdx} className="p-4 bg-gray-950 border border-gray-800 rounded-xl space-y-3 relative">
                    {formData.interviewRounds.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("interviewRounds", rIdx)}
                        className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xs"
                      >
                        Remove Round
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Round Name (e.g. Round 1 Coding)"
                        value={round.roundName}
                        onChange={(e) => handleArrayChange("interviewRounds", rIdx, "roundName", e.target.value)}
                        className="bg-gray-900 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                      <input
                        type="date"
                        value={round.roundDate ? new Date(round.roundDate).toISOString().split("T")[0] : ""}
                        onChange={(e) => handleArrayChange("interviewRounds", rIdx, "roundDate", e.target.value)}
                        className="bg-gray-900 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                      <select
                        value={round.status}
                        onChange={(e) => handleArrayChange("interviewRounds", rIdx, "status", e.target.value)}
                        className="bg-gray-900 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Passed">Passed</option>
                        <option value="Failed">Failed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* Questions Array inside Round */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-400">Questions Asked:</span>
                        <button
                          type="button"
                          onClick={() => handleAddQuestion(rIdx)}
                          className="text-[11px] text-[#ffb400] hover:underline"
                        >
                          + Add Question
                        </button>
                      </div>
                      {round.questions.map((q, qIdx) => (
                        <div key={qIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder={`Question #${qIdx + 1}`}
                            value={q}
                            onChange={(e) => handleQuestionChange(rIdx, qIdx, e.target.value)}
                            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-2.5 py-1 text-xs text-white"
                          />
                          {round.questions.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveQuestion(rIdx, qIdx)}
                              className="text-red-400 text-xs px-1"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <textarea
                        rows="2"
                        placeholder="Where I got stuck in this round..."
                        value={round.whereIGotStuck}
                        onChange={(e) => handleArrayChange("interviewRounds", rIdx, "whereIGotStuck", e.target.value)}
                        className="bg-gray-900 border border-gray-800 rounded-lg p-2 text-xs text-white"
                      />
                      <textarea
                        rows="2"
                        placeholder="Interviewer Feedback..."
                        value={round.feedback}
                        onChange={(e) => handleArrayChange("interviewRounds", rIdx, "feedback", e.target.value)}
                        className="bg-gray-900 border border-gray-800 rounded-lg p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* SECTION 4: ACTION ITEMS & STUCK POINTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Where I Got Stuck */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <h4 className="text-xs font-semibold text-[#ffb400] uppercase tracking-wider">
                      Where I Got Stuck
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleAddArrayItem("whereIGotStuck", { topic: "", description: "" })}
                      className="text-xs text-[#ffb400] hover:underline"
                    >
                      + Add
                    </button>
                  </div>
                  {formData.whereIGotStuck.map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-gray-950 border border-gray-800 rounded-lg space-y-2 relative">
                      {formData.whereIGotStuck.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem("whereIGotStuck", idx)}
                          className="absolute top-1 right-2 text-red-400 text-[11px]"
                        >
                          ✕
                        </button>
                      )}
                      <input
                        type="text"
                        placeholder="Topic (e.g. System Design)"
                        value={item.topic}
                        onChange={(e) => handleArrayChange("whereIGotStuck", idx, "topic", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-2 py-1 text-xs text-white"
                      />
                      <textarea
                        rows="2"
                        placeholder="Description..."
                        value={item.description}
                        onChange={(e) => handleArrayChange("whereIGotStuck", idx, "description", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded p-2 text-xs text-white"
                      />
                    </div>
                  ))}
                </div>

                {/* Action Items */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <h4 className="text-xs font-semibold text-[#ffb400] uppercase tracking-wider">
                      Action Items (What to Improve)
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleAddArrayItem("actionItems", { task: "", isCompleted: false })}
                      className="text-xs text-[#ffb400] hover:underline"
                    >
                      + Add Task
                    </button>
                  </div>
                  {formData.actionItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-950 border border-gray-800 rounded-lg">
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={(e) => handleArrayChange("actionItems", idx, "isCompleted", e.target.checked)}
                        className="accent-[#ffb400] rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        placeholder="Task (e.g. Revise Redis Caching)"
                        value={item.task}
                        onChange={(e) => handleArrayChange("actionItems", idx, "task", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-2 py-1 text-xs text-white"
                      />
                      {formData.actionItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveArrayItem("actionItems", idx)}
                          className="text-red-400 text-xs px-1"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-gray-800 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-[#ffb400] text-black font-bold text-sm rounded-lg hover:bg-[#e09e00] disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingId ? "Update Application" : "Save Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {isViewModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 text-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-[#ffb400]">{selectedApp.companyName}</h3>
                <p className="text-sm text-gray-400">{selectedApp.rolePosition} {selectedApp.jobLocation && `• ${selectedApp.jobLocation}`}</p>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Application Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-950 border border-gray-800 rounded-xl text-center">
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeClass(selectedApp.status)}`}>
                  {selectedApp.status}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500">Platform</p>
                <p className="text-sm font-semibold text-white mt-1">{selectedApp.platform || "LinkedIn"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Applied Date</p>
                <p className="text-sm font-semibold text-white mt-1">
                  {selectedApp.dateApplied ? new Date(selectedApp.dateApplied).toLocaleDateString() : "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Package</p>
                <p className="text-sm font-semibold text-[#ffb400] mt-1">{selectedApp.salaryPackage || "N/A"}</p>
              </div>
            </div>

            {/* Contacts */}
            {selectedApp.companyContacts?.length > 0 && selectedApp.companyContacts[0].name && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-[#ffb400] uppercase tracking-wider">Company Contacts</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedApp.companyContacts.map((c, i) => (
                    <div key={i} className="p-3 bg-gray-950 border border-gray-800 rounded-lg text-xs space-y-1">
                      <p className="font-bold text-white">{c.name} {c.designation && <span className="font-normal text-gray-400">({c.designation})</span>}</p>
                      {c.email && <p className="text-gray-300">Email: {c.email}</p>}
                      {c.phone && <p className="text-gray-300">Phone: {c.phone}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interview Rounds */}
            {selectedApp.interviewRounds?.length > 0 && selectedApp.interviewRounds[0].roundName && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-[#ffb400] uppercase tracking-wider">Interview Rounds</h4>
                <div className="space-y-3">
                  {selectedApp.interviewRounds.map((r, i) => (
                    <div key={i} className="p-4 bg-gray-950 border border-gray-800 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">{r.roundName}</span>
                        <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300">{r.status}</span>
                      </div>
                      {r.interviewerName && <p className="text-gray-400">Interviewer: {r.interviewerName}</p>}
                      {r.questions?.length > 0 && r.questions[0] && (
                        <div className="pt-2">
                          <p className="font-semibold text-gray-300 mb-1">Questions Asked:</p>
                          <ul className="list-disc list-inside space-y-1 text-gray-400">
                            {r.questions.map((q, qI) => (
                              <li key={qI}>{q}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {r.whereIGotStuck && (
                        <div className="pt-2">
                          <p className="font-semibold text-red-400">Where I got stuck:</p>
                          <p className="text-gray-300">{r.whereIGotStuck}</p>
                        </div>
                      )}
                      {r.feedback && (
                        <div className="pt-2">
                          <p className="font-semibold text-yellow-400">Feedback:</p>
                          <p className="text-gray-300">{r.feedback}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Items */}
            {selectedApp.actionItems?.length > 0 && selectedApp.actionItems[0].task && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-[#ffb400] uppercase tracking-wider">Action Items</h4>
                <ul className="space-y-2 text-xs">
                  {selectedApp.actionItems.map((a, i) => (
                    <li key={i} className="flex items-center gap-2 p-2 bg-gray-950 border border-gray-800 rounded-lg">
                      <span className={a.isCompleted ? "text-green-400" : "text-gray-500"}>
                        {a.isCompleted ? "✓ Done" : "○ Pending"}
                      </span>
                      <span className={a.isCompleted ? "line-through text-gray-500" : "text-white"}>{a.task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
