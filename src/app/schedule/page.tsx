"use client";

import ScheduleDay from "@/components/schedule/ScheduleDay";

const scheduleData = [
  {
    day: "Monday",
    date: "Oct 13, 2025",
    sessions: [
      { name: "Influence Night", time: "05:30 PM" },
    ],
  },
  {
    day: "Tuesday",
    date: "Oct 14, 2025",
    sessions: [
      { name: "Shiftings and Turnings", time: "06:00 AM" },
      { name: "Certified Trainings", time: "11:00 AM" },
      { name: "School of Ministry", time: "01:30 PM" },
      { name: "Exhibition", time: "04:00 PM" },
      { name: "Influence Night", time: "05:30 PM" },
    ],
  },
  {
    day: "Wednesday",
    date: "Oct 15, 2025",
    sessions: [
      { name: "Shiftings and Turnings", time: "06:00 AM" },
      { name: "Certified Trainings", time: "11:00 AM" },
      { name: "School of Ministry", time: "01:30 PM" },
      { name: "Exhibition", time: "04:00 PM" },
      { name: "Influence Night", time: "05:30 PM" },
    ],
  },
  {
    day: "Thursday",
    date: "Oct 16, 2025",
    sessions: [
      { name: "Shiftings and Turnings", time: "06:00 AM" },
      { name: "Certified Trainings", time: "11:00 AM" },
      { name: "School of Ministry", time: "01:30 PM" },
      { name: "Exhibition", time: "04:00 PM" },
      { name: "Influence Night", time: "05:30 PM" },
    ],
  },
  {
    day: "Friday",
    date: "Oct 17, 2025",
    sessions: [
      { name: "Shiftings and Turnings", time: "06:00 AM" },
      { name: "Certified Trainings", time: "11:00 AM" },
      { name: "School of Ministry", time: "01:30 PM" },
      { name: "Exhibition", time: "04:00 PM" },
      { name: "Influence Night", time: "05:30 PM" },
    ],
  },
];


export default function SchedulePage() {
  return (
    <main className="py-20 bg-purple-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-12">Salt and Light 2025 Schedule</h1>
        {scheduleData.map((day, i) => (
          <ScheduleDay key={i} day={day.day} date={day.date} sessions={day.sessions} />
        ))}
      </div>
    </main>
  );
}
