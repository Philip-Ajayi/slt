"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div
      className="relative flex items-center justify-center text-center bg-gradient-to-r from-black via-purple-800 to-purple-900"
      style={{ height: '700px' }}
    >
      <Image
        src="/main/flier.png"
        alt="Salt and Light 2025 Conference"
        fill
        className="object-cover object-top opacity-40"
        priority
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 px-4 max-w-4xl"
      >
        <h1 className="text-white text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-xl">
          Salt and Light 2025
        </h1>
        <p className="text-purple-100 text-lg md:text-2xl mb-4 drop-shadow-lg italic">
          “A Convocation of and for Influence in the World Mountains”
        </p>
        <p className="text-purple-200 text-md md:text-xl mb-6 drop-shadow-lg">
          Organized by <span className="font-bold">MIV Word House</span>
        </p>
        <p className="text-purple-100 text-lg md:text-xl mb-2 drop-shadow-lg">
          October 13 - 17, 2025
        </p>
        <p className="text-purple-100 text-md md:text-lg mb-6 drop-shadow-lg">
          Behind Accord Building, Obadeyi Estate, Samonda, Ibadan
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/register"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition"
          >
            Register
          </Link>
          <Link
            href="/contact"
            className="border border-white text-white hover:bg-white hover:text-purple-700 font-bold py-3 px-6 rounded-lg transition"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
