"use client";

interface Session {
  name: string;
  time: string;
}

interface ScheduleDayProps {
  day: string;
  date: string;
  sessions: Session[];
}

export default function ScheduleDay({ day, date, sessions }: ScheduleDayProps) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-purple-700 mb-2">{day}</h2>
      <p className="text-purple-600 mb-4">{date}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sessions.map((session, i) => (
          <div
            key={i}
            className="p-4 rounded-xl shadow-md bg-white hover:shadow-lg transition"
          >
            <span className="font-semibold text-purple-700">{session.name}</span>
            <p className="text-gray-700">{session.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
