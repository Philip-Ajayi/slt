"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface FeatureSectionProps {
  title: string;
  paragraphs: string[];
  image: string;
  reverse?: boolean;
}

export default function FeatureSection({ title, paragraphs, image, reverse = false }: FeatureSectionProps) {
  return (
    <section
      className={`max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <motion.div
        className="md:w-1/2 relative h-64 md:h-auto" // set height for Image fill to work
        initial={{ opacity: 0, x: reverse ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover", borderRadius: "1rem" }} // rounded-2xl is 1rem radius approx
          className="shadow-xl"
          priority
        />
      </motion.div>

      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, x: reverse ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-purple-800 mb-4">{title}</h2>
        {paragraphs.map((p, i) => (
          <p key={i} className="text-gray-700 mb-4 leading-relaxed">
            {p}
          </p>
        ))}
      </motion.div>
    </section>
  );
}
