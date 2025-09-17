"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-purple-800 mb-12 text-center">About Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* MIV Word House */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-purple-50 p-6 rounded-xl shadow-lg text-center"
        >
          <h3 className="text-2xl font-bold text-purple-700 mb-2">MIV Word House</h3>
          <p className="text-gray-700 mb-4">Strong, Vigorous and Victorious</p>
          <p className="text-gray-700 mb-6 font-semibold italic">A Young People's Church of The Men of Issachar Vision Inc.</p>
          <img
            src="/main/whitewhlogo.png"
            alt="MIV Word House Logo"
            className="mx-auto w-32"
          />
        </motion.div>

        {/* The Men Of Issachar Vision Inc */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-purple-50 p-6 rounded-xl shadow-lg text-center"
        >
          <h3 className="text-2xl font-bold text-purple-700 mb-2">The Men Of Issachar Vision Inc.</h3>
          <p className="text-gray-700 mb-6">
            Founded in 1989, a Christian organization committed to awakening and missions. Our focus on these two themes emanates from our understanding of the times we are in and what the church should be doing in such a crucial time just as the Issachar of old had understanding of the times and knew what Israel ought to do.
          </p>
          <img
            src="https://menofissacharvision.com/wp-content/uploads/2020/03/logo-miv.png"
            alt="The Men Of Issachar Vision Logo"
            className="mx-auto w-32"
          />
        </motion.div>
      </div>
    </section>
  );
}
