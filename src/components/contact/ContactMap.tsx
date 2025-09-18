"use client";
import { motion } from "framer-motion";

export default function MapSection() {
  return (
    <section className="h-[400px] w-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-full w-full rounded-none md:rounded-t-2xl shadow-lg"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.1868713466464!2d3.9394155999999997!3d7.3748994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039f3584523582b%3A0xb6ec8c1f0aa729ec!2sOlororo%20Street%2C%20Ibadan%20201103%2C%20Oyo!5e0!3m2!1sen!2sng!4v1695068898292!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          className="rounded-none md:rounded-t-2xl"
          title="Map"
        />
      </motion.div>
    </section>
  );
}
