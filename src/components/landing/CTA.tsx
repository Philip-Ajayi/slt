"use client";
import { motion } from "framer-motion";
import { FaPodcast, FaBlog, FaVideo, FaInfoCircle } from "react-icons/fa";

const ctas = [
  { title: "Radio", href: "https://mivwordhouse.com/radio", description: "Listen to live broadcasts", icon: FaPodcast },
  { title: "Blog", href: "https://mivwordhouse.com/blog", description: "Read latest articles", icon: FaBlog },
  { title: "Sermon", href: "https://mivwordhouse.com/sermons", description: "Watch inspiring sermons", icon: FaVideo },
  { title: "External Info", href: "https://mivwordhouse.com", description: "More resources here", icon: FaInfoCircle },
];

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-purple-100">
      <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">Explore More</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {ctas.map((cta, i) => {
          const Icon = cta.icon;
          return (
            <motion.a
              key={cta.title}
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer"
            >
              <Icon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">{cta.title}</h3>
              <p className="text-gray-700">{cta.description}</p>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
