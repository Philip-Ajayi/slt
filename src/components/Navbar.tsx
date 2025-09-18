"use client";

import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const staticRoutes = ["Speakers", "About", "Schedule", "Features", "Contact"];
const toggleRoutes = ["Register", "Volunteer"];

export default function Navbar() {
  const [toggleIndex, setToggleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setToggleIndex((prevIndex) => (prevIndex + 1) % toggleRoutes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Disclosure
      as="nav"
      className="bg-gradient-to-r from-purple-800 via-purple-700 to-purple-900 fixed w-full z-50 shadow-lg"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="flex h-16 justify-between items-center">
              {/* Left: Logo + Date */}
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/main/sltlogo.png"
                    alt="Supernatural Conference Logo"
                    width={48}
                    height={48}
                    className="rounded-md shadow-md"
                    priority
                  />
                </Link>
                <span className="hidden sm:inline-block text-purple-200 font-semibold text-sm tracking-wide select-none">
                  Oct 13 - 17, 2025
                </span>
              </div>

              {/* Center: Desktop Nav */}
              <div className="hidden md:flex ml-12 space-x-6 items-center">
                {staticRoutes.map((route) => (
                  <Link
                    key={route}
                    href={`/${route.toLowerCase()}`}
                    className="text-purple-100 hover:text-white px-4 py-2 rounded-md font-medium transition duration-300 bg-purple-700 hover:bg-purple-600 shadow-sm hover:shadow-lg"
                  >
                    {route}
                  </Link>
                ))}

                {/* Animated Register/Volunteer Link */}
                <Link
                  href="/register"
                  className="relative inline-block px-4 py-2 font-semibold text-white rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-lg hover:brightness-110 transition duration-300"
                  aria-label="Register or Volunteer"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={toggleRoutes[toggleIndex]}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {toggleRoutes[toggleIndex]}
                    </motion.span>
                  </AnimatePresence>
                  {/* Reserve space */}
                  <span className="invisible">{toggleRoutes[0]}</span>
                </Link>
              </div>

              {/* Right: Mobile Menu Button */}
              <div className="md:hidden -mr-2">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-purple-200 hover:text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-white">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <Disclosure.Panel className="md:hidden bg-purple-800 shadow-inner">
            <div className="px-4 pt-4 pb-6 space-y-1">
              {[...staticRoutes, "Register", "Volunteer"].map((route) => {
                // Fix volunteer to /register
                const href = route === "Volunteer" ? "/register" : `/${route.toLowerCase()}`;
                return (
                  <Link
                    key={route}
                    href={href}
                    className="block px-4 py-3 rounded-md font-semibold text-white hover:bg-purple-700 hover:text-pink-300 transition"
                  >
                    {route}
                  </Link>
                );
              })}
              <div className="mt-4 px-4 py-2 text-purple-300 font-semibold text-center text-sm select-none">
                October 13 - 17, 2025
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
