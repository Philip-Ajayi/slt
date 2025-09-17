"use client";
import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-purple-700 to-purple-600 text-white text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 px-6"
      >
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Get in Touch
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-purple-100">
          We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, our team is here to help.
        </p>
      </motion.div>
    </section>
  );
}
