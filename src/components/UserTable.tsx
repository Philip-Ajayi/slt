"use client";

import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  whatsapp: string;
  certificatedTraining?: string;
  schoolOfMinistry?: string;
  volunteerRole?: string;
  accommodation?: string;
  gender?: string;
  status: string;
  year: number;
  uniqueId: string;
}

const DISPLAY_COLUMNS: (keyof User)[] = [
  "firstName",
  "lastName",
  "email",
  "location",
  "whatsapp",
  "certificatedTraining",
  "schoolOfMinistry",
  "volunteerRole",
  "accommodation",
  "gender",
  "status",
  "year",
  "uniqueId",
];

export default function UserTable({
  title,
  accommodationOnly = false,
}: {
  title: string;
  accommodationOnly?: boolean;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [year, setYear] = useState<number>(2025);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `/api/list?year=${year}&accommodation=${accommodationOnly}`
      );
      const data = await res.json();

      // Safely map data without any
      const cleaned = data.map((user: unknown) => {
        const filtered: Partial<User> = {};
        if (typeof user === "object" && user !== null) {
          for (const key of DISPLAY_COLUMNS) {
            const value = (user as Record<string, unknown>)[key];
            if (
              typeof value === "string" ||
              typeof value === "number" ||
              value === undefined
            ) {
              filtered[key] = value as never;
            }
          }
        }
        return filtered;
      });

      setUsers(cleaned as User[]);
    };

    fetchUsers();
  }, [year, accommodationOnly]);

  const exportToCSV = () => {
    if (!users.length) return;

    const header = DISPLAY_COLUMNS.join(",");
    const rows = users.map((u) =>
      DISPLAY_COLUMNS.map((key) => `"${String(u[key] ?? "")}"`).join(",")
    );

    const csvContent = [header, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${title.replace(/\s+/g, "_")}_${year}.csv`);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm">Year:</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border p-2 rounded"
          >
            {[2025, 2024, 2023].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <button
            onClick={exportToCSV}
            className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={users.length === 0}
          >
            Export to CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {users.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="border px-2 py-1">#</th>
                {DISPLAY_COLUMNS.map((key) => (
                  <th key={key} className="border px-2 py-1 capitalize">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={idx} className="text-sm">
                  <td className="border px-2 py-1">{idx + 1}</td>
                  {DISPLAY_COLUMNS.map((key, i) => (
                    <td key={i} className="border px-2 py-1">
                      {u[key] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4 text-center">No data found for {year}.</p>
        )}
      </div>
    </div>
  );
}
