"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const gallery = [
  "/gallery/gallery1.jpg",
  "/gallery/gallery2.jpg",
  "/gallery/gallery3.jpg",
  "/gallery/gallery4.jpg",
  "/gallery/gallery5.jpg",
  "/gallery/gallery6.jpg",
  "/gallery/gallery7.jpg",
  "/gallery/gallery8.jpg",
];

// Duration in seconds for one full scroll
const DURATION = 30;

export default function Gallery() {
  // Duplicate images to create seamless looping
  const doubledGallery = [...gallery, ...gallery];

  return (
    <section className="py-20 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">Past Events</h2>

        {/* First row: scrolls left to right */}
        <div className="overflow-hidden whitespace-nowrap relative mb-8">
          <motion.div
            className="flex space-x-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, repeatType: "loop", duration: DURATION, ease: "linear" }}
            style={{ willChange: "transform" }}
          >
            {doubledGallery.map((img, i) => (
              <div
                key={"top" + i}
                className="flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden shadow-lg"
              >
                <img src={img} alt={`Past Event ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second row: scrolls right to left */}
        <div className="overflow-hidden whitespace-nowrap relative">
          <motion.div
            className="flex space-x-6"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, repeatType: "loop", duration: DURATION, ease: "linear" }}
            style={{ willChange: "transform" }}
          >
            {doubledGallery.map((img, i) => (
              <div
                key={"bottom" + i}
                className="flex-shrink-0 w-64 h-40 rounded-xl overflow-hidden shadow-lg"
              >
                <img src={img} alt={`Past Event ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
