"use client";
import { motion } from "framer-motion";

const days = [
  {
    day: "Day 1 (Monday)",
    sessions: [
      { tag: "Influence Night", time: "5:30 PM", available: true },
    ],
  },
  {
    day: "Day 2 (Tuesday)",
    sessions: [
      { tag: "Shiftings and Turnings", time: "6:00 AM", available: true },
      { tag: "Certified Trainings", time: "11:00 AM", available: true },
      { tag: "School of Ministry", time: "1:30 PM", available: true },
      { tag: "Exhibition", time: "4:00 PM", available: true },
      { tag: "Influence Night", time: "5:30 PM", available: true },
    ],
  },
  {
    day: "Day 3 (Wednesday)",
    sessions: [
      { tag: "Shiftings and Turnings", time: "6:00 AM", available: true },
      { tag: "Certified Trainings", time: "11:00 AM", available: true },
      { tag: "School of Ministry", time: "1:30 PM", available: true },
      { tag: "Exhibition", time: "4:00 PM", available: true },
      { tag: "Influence Night", time: "5:30 PM", available: true },
    ],
  },
  {
    day: "Day 4 (Thursday)",
    sessions: [
      { tag: "Shiftings and Turnings", time: "6:00 AM", available: true },
      { tag: "Certified Trainings", time: "11:00 AM", available: true },
      { tag: "School of Ministry", time: "1:30 PM", available: true },
      { tag: "Exhibition", time: "4:00 PM", available: true },
      { tag: "Influence Night", time: "5:30 PM", available: true },
    ],
  },
  {
    day: "Day 5 (Friday)",
    sessions: [
      { tag: "Shiftings and Turnings", time: "6:00 AM", available: true },
      { tag: "Certified Trainings", time: "11:00 AM", available: true },
      { tag: "School of Ministry", time: "1:30 PM", available: true },
      { tag: "Exhibition", time: "4:00 PM", available: true },
      { tag: "Influence Night", time: "5:30 PM", available: true },
    ],
  },
];

export default function Schedule() {
  return (
    <section className="py-20 bg-purple-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">
          Schedule
        </h2>
        {days.map((day, i) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-purple-700 mb-4">{day.day}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {day.sessions.map((session, j) => (
                <div
                  key={j}
                  className={`p-4 rounded-xl shadow-lg ${
                    session.available ? "bg-white" : "bg-gray-200"
                  }`}
                >
                  <span className="font-semibold text-purple-700">{session.tag}</span>
                  <p className="text-gray-700">{session.time}</p>
                  {!session.available && (
                    <p className="text-red-500 text-sm">Time TBA</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
