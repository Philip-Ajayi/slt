"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const ministers = [
  {
    name: "Rev. Samson Ajetomobi",
    title: "President, Men of Issachar Vision (MIV), Host",
    image: "/ministers/Ajetomobi.png",
  },
  {
    name: "Pastor Ope Rowland",
    title: "Lead Pastor, MIV Word House, Host",
    image: "/ministers/Rowland.png",
  },
  {
    name: "Apostle Toluwalogo Agboola",
    title: "Founder of His Worship Christian Network (HWCN Global)",
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
    image: "/ministers/Bamiloye.png",
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
    image: "/ministers/Fashida.png", 
  },
  {
    name: "Evang. Omolara Ayoola",
    title: "Visioneer of WALL foundation",
    image: "/ministers/Ayoola.png",
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
              {minister.image ? (
                <div className="relative w-full h-64">
                  <Image
                    src={minister.image}
                    alt={`${minister.name} portrait`}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                    priority={i < 4}
                    loading={i >= 4 ? "lazy" : undefined}
                  />
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 text-lg italic">No Image</span>
                </div>
              )}

              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-purple-700">{minister.name}</h3>
                {minister.title && (
                  <p className="text-gray-600 text-sm">{minister.title}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
