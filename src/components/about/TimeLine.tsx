"use client";

import { motion } from "framer-motion";

const timelineEvents = [
  {
    year: "1989",
    title: "Men of Issachar Vision Founded",
    description: "Rev. Samson Ajetomobi founded MIV as a Christian organization committed to awakening and missions.",
  },
  {
    year: "2005",
    title: "First International Missionary Sent",
    description: "MIV began global missions by sending missionaries to other nations, expanding the work beyond Nigeria.",
  },
  {
    year: "2023",
    title: "Word House Launched",
    description: "Word House was established as the youth expression of MIV, focused on raising strong, vigorous, and victorious young believers.",
  },
  {
    year: "2024",
    title: "Salt and Light Launched",
    description: "The Salt and Light began as a dynamic convergence of training, worship, and spiritual alignment.",
  },
];

export default function Timeline() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-purple-800 mb-12 text-center">Our Journey</h2>

        <div className="relative border-l-4 border-purple-600 ml-4">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="mb-10 pl-6 relative"
            >
              <div className="absolute -left-3 top-1 w-6 h-6 bg-purple-600 rounded-full border-4 border-white shadow-md" />
              <h3 className="text-xl font-semibold text-purple-700">{event.year} — {event.title}</h3>
              <p className="text-gray-700 mt-2">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
