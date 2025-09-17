"use client";
import { motion } from "framer-motion";

// Ministers' data with name, title, and image only
const ministers = [
  {
    name: "Rev. Samson Ajetomobi",
    title: "President, Men of Issachar Vision (MIV), Host",
    image: "/ministers/Ajetomobi.png",
  },
  {
    name: "Pastor Ope Rowland",
    title: "Host",
    image: "/ministers/Rowland.png",
  },
  {
    name: "Apostle Toluwalogo Agboola",
    title: "",
    image: "/ministers/Agboola.png",
  },
  {
    name: "Pastor Ademola Awoyele",
    title: "Lead Pastor, Destiny Impact Church",
    image: "/ministers/Awoyele.png",
  },
  {
    name: "Pastor Yomi Ajayi",
    title: "Pastor, Christ Life Church",
    image: "/ministers/Ajayi.png",
  },
  {
    name: "Joshua Mike-Bamiloye",
    title: "Gospel Singer, Filmmaker & Evangelist",
    image: "/ministers/Bamiloye.jpg",
  },
  {
    name: "Dr. Olayinka Kotila",
    title: "Lecturer, Pharmaceutical Chemistry, University of Ibadan",
    image: "/ministers/Kotila.png",
  },
  {
    name: "Pastor Femi Dairo",
    title: "Director of Sapphire Pre-varsity",
    image: "/ministers/Dairo.png",
  },
  {
    name: "Dr. Lola Ayo-Fashida",
    title: "Finance & Management Consultant",
    image: "/ministers/Fashida.png", // No image provided
  },
  {
    name: "Evang. Omolara Ayoola",
    title: "",
    image: "/ministers/Ayoola.png", // No image provided
  },
];

export default function Speakers() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">Our Ministers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {ministers.map((minister, i) => (
            <motion.div
              key={minister.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition relative group"
            >
              {/* If there's no image, show a placeholder */}
              {minister.image ? (
                <img
                  src={minister.image}
                  alt={minister.name}
                  className="w-full h-64 object-cover object-top" // Keeps head visible
                />
              ) : (
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
                  <span className="text-white text-lg">No Image</span>
                </div>
              )}
              
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-purple-700">{minister.name}</h3>
                <p className="text-gray-600 text-sm">{minister.title}</p>
              </div>
              {/* Removed the black overlay */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
