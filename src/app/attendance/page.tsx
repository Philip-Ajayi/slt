"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  year: number;
  uniqueId: string;
  whatsapp?: string;
  accommodation?: string;
  gender?: string;
  certificatedTraining?: string;
  schoolOfMinistry?: string;
  status?: "firsttime" | "member" | "none";
}

type AttendanceType = "attended" | "absent" | "never" | "accommodation";
type GenderFilter = "all" | "male" | "female";
type StatusFilter = "all" | "member" | "firsttime";

const CertificatedTrainings = [
  "Health Safety (HSE)",
  "Project Management Professional (PMP)",
  "Data Analysis",
  "Human Resources Management",
  "Social Marketing Management",
];

const SchoolsOfMinistry = [
  "Arts, Music, Drama, Media Ministries",
  "Ministry as Pastors, Prophets, Evangelist, Teachers and Church Administrators",
  "Youth, Campus, Teenagers, School Ministries",
];

export default function AttendancePage() {
  const [year, setYear] = useState<number>(2025);
  const [type, setType] = useState<AttendanceType>("attended");
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState<{ userId: string; action: "mark" | "unmark" } | null>(null);
  const [confirmingField, setConfirmingField] = useState<{
    userId: string;
    field: "certificatedTraining" | "schoolOfMinistry";
    value: string;
  } | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [markingUserId, setMarkingUserId] = useState<string | null>(null);

  // Load users
  async function loadUsers() {
    setLoading(true);
    const res = await fetch(`/api/attendance?year=${year}&type=${type}`);
    const data = await res.json();
    setUsers(data.users || []);
    setFiltered(data.users || []);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, [year, type]);

  // Search + filters
  useEffect(() => {
    const query = search.toLowerCase();
    let filteredUsers = users.filter(
      (u) =>
        u.firstName?.toLowerCase().includes(query) ||
        u.lastName?.toLowerCase().includes(query) ||
        u.email?.toLowerCase().includes(query) ||
        u.uniqueId?.toLowerCase().includes(query)
    );

    if (genderFilter !== "all") {
      filteredUsers = filteredUsers.filter(
        (u) => u.gender?.toLowerCase() === genderFilter.toLowerCase()
      );
    }

    if (statusFilter !== "all") {
      filteredUsers = filteredUsers.filter((u) => u.status === statusFilter);
    }

    setFiltered(filteredUsers);
  }, [search, users, genderFilter, statusFilter]);

  // Attendance confirm + action
  async function handleConfirm(userId: string, action: "mark" | "unmark") {
    setConfirming({ userId, action });
  }

  async function executeAction() {
    if (!confirming) return;
    const { userId, action } = confirming;
    setMarkingUserId(userId);

    await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        session: 1,
        marked: action === "mark",
      }),
    });

    setConfirming(null);
    setMarkingUserId(null);
    await loadUsers();
  }

  // Toggle accommodation
  async function toggleAccommodation(user: User) {
    setUpdatingUserId(user._id);
    const newValue = user.accommodation?.toLowerCase() === "yes" ? "no" : "yes";

    await fetch("/api/attendance", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, accommodation: newValue }),
    });

    await loadUsers();
    setUpdatingUserId(null);
  }

  // Set gender
  async function setGender(userId: string, gender: string) {
    setUpdatingUserId(userId);
    await fetch("/api/attendance", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, gender }),
    });
    await loadUsers();
    setUpdatingUserId(null);
  }

  // 🆕 Confirm and set certificated training
  function confirmCertificatedTraining(userId: string, certificatedTraining: string) {
    setConfirmingField({ userId, field: "certificatedTraining", value: certificatedTraining });
  }

  async function setCertificatedTraining(userId: string, certificatedTraining: string) {
    setUpdatingUserId(userId);
    await fetch("/api/attendance", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, certificatedTraining }),
    });
    await loadUsers();
    setUpdatingUserId(null);
  }

  // 🆕 Confirm and set school of ministry
  function confirmSchoolOfMinistry(userId: string, schoolOfMinistry: string) {
    setConfirmingField({ userId, field: "schoolOfMinistry", value: schoolOfMinistry });
  }

  async function setSchoolOfMinistry(userId: string, schoolOfMinistry: string) {
    setUpdatingUserId(userId);
    await fetch("/api/attendance", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, schoolOfMinistry }),
    });
    await loadUsers();
    setUpdatingUserId(null);
  }

  const showAction = type === "attended" || type === "absent";

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
        Attendance Management
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        <div className="flex gap-2 items-center flex-wrap">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border rounded px-3 py-2 text-sm"
          >
            {[2025, 2024, 2023, 2022].map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>

          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value as AttendanceType);
              setGenderFilter("all");
              setStatusFilter("all");
            }}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="attended">Attended</option>
            <option value="absent">Absent</option>
            <option value="never">Never Attended</option>
            <option value="accommodation">Accommodation</option>
          </select>

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value as GenderFilter)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="member">Member</option>
            <option value="firsttime">First Time</option>
          </select>
        </div>

        <input
          placeholder="Search name, email or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-64 text-sm"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No users found.</div>
      ) : (
        <motion.div layout className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border text-center">S/N</th>
                <th className="p-3 border text-left">Name</th>
                <th className="p-3 border text-center">Unique ID</th>
                {showAction && <th className="p-3 border text-center">Action</th>}
                <th className="p-3 border text-center">Accommodation</th>
                <th className="p-3 border text-center">Gender</th>
                <th className="p-3 border text-center">Certificated Training</th>
                <th className="p-3 border text-center">School of Ministry</th>
                <th className="p-3 border text-left">WhatsApp</th>
                <th className="p-3 border text-left">Email</th>
                <th className="p-3 border text-center">Status</th>
                <th className="p-3 border text-center">Year</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, index) => (
                <motion.tr key={u._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-center border">{index + 1}</td>
                  <td className="p-3 border">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="p-3 text-center border">{u.uniqueId}</td>

                  {/* Attendance */}
                  {showAction && (
                    <td className="p-3 text-center border">
                      {type === "attended" ? (
                        <button
                          onClick={() => handleConfirm(u._id, "unmark")}
                          disabled={markingUserId === u._id}
                          className={`px-3 py-1.5 rounded text-sm text-white ${
                            markingUserId === u._id
                              ? "bg-red-400 cursor-not-allowed"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          {markingUserId === u._id ? <Spinner /> : "Unmark"}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleConfirm(u._id, "mark")}
                          disabled={markingUserId === u._id}
                          className={`px-3 py-1.5 rounded text-sm text-white ${
                            markingUserId === u._id
                              ? "bg-green-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700"
                          }`}
                        >
                          {markingUserId === u._id ? <Spinner /> : "Mark Present"}
                        </button>
                      )}
                    </td>
                  )}

                  {/* Accommodation */}
                  <td className="p-3 text-center border">
                    <button
                      onClick={() => toggleAccommodation(u)}
                      disabled={updatingUserId === u._id}
                      className={`px-3 py-1 rounded text-white ${
                        u.accommodation?.toLowerCase() === "yes"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-500 hover:bg-gray-600"
                      } ${updatingUserId === u._id ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                      {updatingUserId === u._id ? <Spinner /> : u.accommodation?.toLowerCase() === "yes" ? "Yes" : "No"}
                    </button>
                  </td>

                  {/* Gender */}
                  <td className="p-3 text-center border">
                    {u.gender ? (
                      u.gender
                    ) : (
                      <select
                        disabled={updatingUserId === u._id}
                        onChange={(e) => setGender(u._id, e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                        defaultValue=""
                      >
                        <option value="" disabled>Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    )}
                  </td>

                  {/* Certificated Training */}
                  <td className="p-3 text-center border">
                    {u.certificatedTraining ? (
                      u.certificatedTraining
                    ) : (
                      <select
                        disabled={updatingUserId === u._id}
                        onChange={(e) =>
                          confirmCertificatedTraining(u._id, e.target.value)
                        }
                        className="border rounded px-2 py-1 text-sm"
                        defaultValue=""
                      >
                        <option value="" disabled>Select</option>
                        {CertificatedTrainings.map((ct) => (
                          <option key={ct} value={ct}>
                            {ct}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>

                  {/* School of Ministry */}
                  <td className="p-3 text-center border">
                    {u.schoolOfMinistry ? (
                      u.schoolOfMinistry
                    ) : (
                      <select
                        disabled={updatingUserId === u._id}
                        onChange={(e) =>
                          confirmSchoolOfMinistry(u._id, e.target.value)
                        }
                        className="border rounded px-2 py-1 text-sm"
                        defaultValue=""
                      >
                        <option value="" disabled>Select</option>
                        {SchoolsOfMinistry.map((sm) => (
                          <option key={sm} value={sm}>
                            {sm}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>

                  <td className="p-3 border">{u.whatsapp}</td>
                  <td className="p-3 border">{u.email}</td>
                  <td className="p-3 text-center border capitalize">{u.status}</td>
                  <td className="p-3 text-center border">{u.year}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* ✅ Confirmation Modal for Attendance */}
      {confirming && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-80 shadow-lg text-center"
          >
            <h3 className="text-lg font-semibold mb-2">
              {confirming.action === "mark" ? "Mark Attendance" : "Unmark Attendance"}
            </h3>
            <p className="text-gray-600 mb-5">
              Are you sure you want to{" "}
              <strong>{confirming.action === "mark" ? "mark" : "unmark"}</strong> this user?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setConfirming(null)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={executeAction}
                className={`px-4 py-2 rounded text-white ${
                  confirming.action === "mark"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Yes
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ✅ Confirmation Modal for Training / School */}
      {confirmingField && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-80 shadow-lg text-center"
          >
            <h3 className="text-lg font-semibold mb-2">
              Confirm Selection
            </h3>
            <p className="text-gray-600 mb-5">
              Are you sure you want to select{" "}
              <strong>{confirmingField.value}</strong> as this user’s{" "}
              <strong>
                {confirmingField.field === "certificatedTraining"
                  ? "Certificated Training"
                  : "School of Ministry"}
              </strong>
              ?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setConfirmingField(null)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const { userId, field, value } = confirmingField;
                  if (field === "certificatedTraining") {
                    await setCertificatedTraining(userId, value);
                  } else {
                    await setSchoolOfMinistry(userId, value);
                  }
                  setConfirmingField(null);
                }}
                className="px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700"
              >
                Yes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// Spinner component
function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );
}
