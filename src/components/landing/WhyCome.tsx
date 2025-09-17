"use client";
import { motion } from "framer-motion";

const highlights = [
  { 
    title: "Spiritual Strength & Victory", 
    sub: "Become a strong, vigorous, and victorious believer empowered by God's Word." 
  },
  { 
    title: "Purposeful Leadership Development", 
    sub: "Learn to lead with vision and understand your role in advancing God's kingdom." 
  },
  { 
    title: "Practical Ministry Skills", 
    sub: "Receive hands-on, certified training to serve effectively in church and community." 
  },
  { 
    title: "Deep Spiritual Disciplines", 
    sub: "Experience transformative prayer, worship, and spiritual growth practices." 
  },
  { 
    title: "Meaningful Connection & Community", 
    sub: "Join a vibrant network of like-minded young people committed to faith and mission." 
  },
];

export default function WhyCome() {
  return (
    <section className="py-20 bg-purple-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">Why Attend?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="font-bold text-xl text-purple-700 mb-2">{h.title}</h3>
              {h.sub && <p className="text-gray-700">{h.sub}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
