"use client";
import { motion } from "framer-motion";

export default function MapSection() {
  return (
    <section className="h-[400px] w-full relative">
      <motion.iframe
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151... (replace with real map link)"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        className="rounded-none md:rounded-t-2xl shadow-lg"
      ></motion.iframe>
    </section>
  );
}
