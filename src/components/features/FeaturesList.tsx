"use client";
import { motion } from "framer-motion";

interface FeatureSectionProps {
  title: string;
  paragraphs: string[];
  image: string;
  reverse?: boolean;
}

export default function FeatureSection({ title, paragraphs, image, reverse = false }: FeatureSectionProps) {
  return (
    <section className={`max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12 ${reverse ? "md:flex-row-reverse" : ""}`}>
      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, x: reverse ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img src={image} alt={title} className="rounded-2xl shadow-xl w-full object-cover" />
      </motion.div>

      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, x: reverse ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-purple-800 mb-4">{title}</h2>
        {paragraphs.map((p, i) => (
          <p key={i} className="text-gray-700 mb-4 leading-relaxed">{p}</p>
        ))}
      </motion.div>
    </section>
  );
}
