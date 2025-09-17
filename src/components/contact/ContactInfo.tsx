"use client";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const info = [
  {
    icon: FaMapMarkerAlt,
    title: "Address",
    text: "Behind Accord Building, Obadeyi Estate\nSamonda Ibadan",
  },
  {
    icon: FaEnvelope,
    title: "Email",
    text: "contact@mivwordhouse.com",
  },
  {
    icon: FaPhoneAlt,
    title: "Phone",
    text: "+234 (816) 3047-854",
  },
];

export default function ContactInfo() {
  return (
    <section className="py-16 bg-purple-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {info.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition-transform"
            >
              <Icon className="w-10 h-10 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg text-purple-700 mb-2">{item.title}</h3>
              {/* Preserve line breaks in address */}
              <p className="text-gray-600 whitespace-pre-line">{item.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
