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
}

type AttendanceType = "attended" | "absent" | "never" | "accommodation";
type GenderFilter = "all" | "male" | "female";

export default function AttendancePage() {
  const [year, setYear] = useState<number>(2025);
  const [type, setType] = useState<AttendanceType>("attended");
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("all");
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState<{ userId: string; action: "mark" | "unmark" } | null>(null);

  // Load users based on year and type
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

  // Filter by search + gender
  useEffect(() => {
    const query = search.toLowerCase();
    let filteredUsers = users.filter(
      (u) =>
        u.firstName?.toLowerCase().includes(query) ||
        u.lastName?.toLowerCase().includes(query) ||
        u.email?.toLowerCase().includes(query) ||
        u.uniqueId?.toLowerCase().includes(query)
    );

    // Apply gender filter (only for accommodation)
    if (type === "accommodation" && genderFilter !== "all") {
      filteredUsers = filteredUsers.filter(
        (u) => u.gender?.toLowerCase() === genderFilter.toLowerCase()
      );
    }

    setFiltered(filteredUsers);
  }, [search, users, genderFilter, type]);

  async function handleConfirm(userId: string, action: "mark" | "unmark") {
    setConfirming({ userId, action });
  }

  async function executeAction() {
    if (!confirming) return;
    const { userId, action } = confirming;
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
    await loadUsers();
  }

  const showAction = type !== "never" && type !== "accommodation";

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
        Attendance Management
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        <div className="flex gap-2 items-center flex-wrap">
          {/* Year Filter */}
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border rounded px-3 py-2 text-sm"
          >
            {[2025, 2024, 2023, 2022].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value as AttendanceType);
              setGenderFilter("all"); // reset gender filter on type change
            }}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="attended">Attended</option>
            <option value="absent">Absent</option>
            <option value="never">Never Attended</option>
            <option value="accommodation">Accommodation</option>
          </select>

          {/* ✅ Gender Filter (Only for Accommodation) */}
          {type === "accommodation" && (
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value as GenderFilter)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="all">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          )}
        </div>

        {/* Search */}
        <input
          type="text"
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
                {type !== "accommodation" ? (
                  <>
                    <th className="p-3 border text-center">Unique ID</th>
                    <th className="p-3 border text-left">WhatsApp</th>
                    <th className="p-3 border text-left">Email</th>
                    <th className="p-3 border text-left">Accommodation</th>
                    <th className="p-3 border text-center">Gender</th>
                    <th className="p-3 border text-center">Year</th>
                    {showAction && <th className="p-3 border text-center">Action</th>}
                  </>
                ) : (
                  <>
                    <th className="p-3 border text-left">Accommodation</th>
                    <th className="p-3 border text-center">Gender</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, index) => (
                <motion.tr key={u._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-center border">{index + 1}</td>
                  <td className="p-3 border">
                    {u.firstName} {u.lastName}
                  </td>

                  {type !== "accommodation" ? (
                    <>
                      <td className="p-3 text-center border">{u.uniqueId}</td>
                      <td className="p-3 border">{u.whatsapp}</td>
                      <td className="p-3 border">{u.email}</td>
                      <td className="p-3 border">{u.accommodation}</td>
                      <td className="p-3 text-center border">{u.gender}</td>
                      <td className="p-3 text-center border">{u.year}</td>
                      {showAction && (
                        <td className="p-3 text-center border">
                          {type === "attended" ? (
                            <button
                              onClick={() => handleConfirm(u._id, "unmark")}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm"
                            >
                              Unmark
                            </button>
                          ) : (
                            <button
                              onClick={() => handleConfirm(u._id, "mark")}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm"
                            >
                              Mark Present
                            </button>
                          )}
                        </td>
                      )}
                    </>
                  ) : (
                    <>
                      <td className="p-3 border">{u.accommodation}</td>
                      <td className="p-3 text-center border">{u.gender}</td>
                    </>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Confirmation Modal */}
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
    </div>
  );
}
