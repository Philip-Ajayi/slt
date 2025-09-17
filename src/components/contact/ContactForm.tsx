"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-purple-800 mb-12"
        >
          Send Us a Message
        </motion.h2>

        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 gap-6"
          >
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
              disabled={loading}
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
              disabled={loading}
            />
            <textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
              disabled={loading}
            />
            {error && <p className="text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500"
              } text-white font-bold py-3 px-6 rounded-lg transition`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-50 text-green-700 p-8 rounded-2xl text-center shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p>Your message has been received. We’ll get back to you soon.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
