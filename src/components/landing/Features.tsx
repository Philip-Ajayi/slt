"use client";
import { BoltIcon, LightBulbIcon, AcademicCapIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const features = [
  { 
    icon: BoltIcon, 
    title: "Powerful Prayer Experience", 
    description: "Start your day renewed and spiritually aligned through impactful prayer sessions." 
  },
  { 
    icon: LightBulbIcon, 
    title: "Practical Skills", 
    description: "Equip yourself with certified trainings to lead and serve effectively in your community." 
  },
  { 
    icon: AcademicCapIcon, 
    title: "In-depth Ministry Knowledge", 
    description: "Grow your understanding of God’s word and ministry through structured learning." 
  },
  { 
    icon: SpeakerWaveIcon, 
    title: "Dynamic Word Teaching & Worship", 
    description: "Engage with inspiring messages that fuel your faith and encourage spiritual growth." 
  },
];

export default function Features() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">Program Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-purple-100 p-6 rounded-xl text-center shadow-lg hover:scale-105 transform transition"
          >
            <feature.icon className="w-12 h-12 mx-auto text-purple-700 mb-4" />
            <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
