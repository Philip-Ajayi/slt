"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface AboutEntity {
  name: string;
  slogan: string;
  description: string[];
  website: string;
  logo: string;
}

interface Props {
  entity: AboutEntity;
}

export default function AboutCard({ entity }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform"
    >
      <div className="w-32 h-32 mb-6 relative">
        <Image
          src={entity.logo}
          alt={`${entity.name} Logo`}
          fill
          style={{ objectFit: "contain" }}
          sizes="128px"
          priority
        />
      </div>
      <h3 className="text-3xl font-bold text-purple-700 mb-2">{entity.name}</h3>
      <p className="text-purple-500 italic mb-4">“{entity.slogan}”</p>
      <div className="space-y-2 mb-6">
        {entity.description.map((p, idx) => (
          <p key={idx} className="text-gray-700">
            {p}
          </p>
        ))}
      </div>
      <Link
        href={entity.website}
        target="_blank"
        className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-6 rounded-xl transition"
      >
        Visit Website
      </Link>
    </motion.div>
  );
}
