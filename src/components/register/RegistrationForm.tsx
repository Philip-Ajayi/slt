"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const volunteerGroupLinks: Record<string, string> = {
  Registration: "https://chat.whatsapp.com/BoAgzTWBA5bBnY1YeMM3kA?mode=ac_t",
  Media: "https://chat.whatsapp.com/L9DwyWM1BVcBZdBVFPYIh5?mode=ac_t",
  Publicity: "https://chat.whatsapp.com/EIxpdUKykTgCeX0AzlqGig?mode=ac_t",
  Ushering: "https://chat.whatsapp.com/JseeyOoMkaUAFwhxIgCJU5?mode=ac_t",
  Medicals: "https://chat.whatsapp.com/EHKt04WS8MF90o9gOw0GCm?mode=ac_t",
  Technical: "https://chat.whatsapp.com/LRk18JC3fNJGY0qRDObJLn?mode=ac_t",
  Sanitation: "https://chat.whatsapp.com/I08y3bqMKM4Iv6JyFJOrII?mode=ac_t",
  Greeters: "https://chat.whatsapp.com/Ii1l0mGrHAv3U65CpvLRp1?mode=ac_t",
  Intercessors: "https://chat.whatsapp.com/FZwx2Fp3eL6Ap6ucfJuoAL",
  ChildrenTeacher:
    "https://chat.whatsapp.com/BlzC9DSEu6yC2EWwebpIP0?mode=ac_t",
};

const volunteerUnits = Object.keys(volunteerGroupLinks).map((name) => ({
  name,
  link: volunteerGroupLinks[name],
}));

const schools = [
  "Arts, Music, Drama, Media Ministries",
  "Ministry as Pastors, Prophets, Evangelist, Teachers and Church Administrators",
  "Youth, Campus, Teenagers, School Ministries",
];

const trainings = [
  "Health Safety (HSE)",
  "Project Management Professional (PMP)",
  "Data Analysis",
  "Human Resources Management",
  "Social Marketing Management",
];

export default function RegistrationForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    whatsapp: "",
    schoolOfMinistry: "",
    certificatedTraining: "",
    volunteerRole: "",
    accommodation: "",
    gender: "",
    status: "none",
    referralSource: "", // ✅ New field
    otherReferral: "", // ✅ Extra for "Others"
  });

  const [volunteer, setVolunteer] = useState(false);
  const [accommodation, setAccommodation] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<
    { type: "success" | "error"; text: string } | null
  >(null);

  const [redirecting, setRedirecting] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.location ||
      !form.whatsapp
    ) {
      throw new Error("All required fields must be filled.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      throw new Error("Invalid email format.");
    }
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (!phoneRegex.test(form.whatsapp)) {
      throw new Error("Invalid phone number format.");
    }
    if (accommodation && !form.gender) {
      throw new Error("Gender is required when requesting accommodation.");
    }
    if (volunteer && !selectedUnit) {
      throw new Error("Please select a volunteer unit.");
    }
    if (!form.referralSource) {
      throw new Error("Please select how you heard about us.");
    }
    if (form.referralSource === "others" && !form.otherReferral) {
      throw new Error("Please specify your referral source.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      validateForm();

      const payload = {
        ...form,
        referralSource:
          form.referralSource === "others"
            ? form.otherReferral
            : form.referralSource,
        volunteerRole: volunteer ? selectedUnit || "" : "",
        accommodation: accommodation ? "yes" : "",
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setMessage({
        type: "success",
        text: "🎉 Registration successful! A QR code has been sent to your email. Please check your inbox.",
      });

      if (volunteer && selectedUnit) {
        setShowVolunteerModal(true);
        setTimeout(() => {
          const unitLink =
            volunteerUnits.find((u) => u.name === selectedUnit)?.link || "/";
          window.location.href = unitLink;
        }, 3000);
      } else {
        setRedirecting(true);
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        location: "",
        whatsapp: "",
        schoolOfMinistry: "",
        certificatedTraining: "",
        volunteerRole: "",
        accommodation: "",
        gender: "",
        status: "none",
        referralSource: "",
        otherReferral: "",
      });
      setVolunteer(false);
      setAccommodation(false);
      setSelectedUnit(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: "error", text: err.message });
      } else {
        setMessage({ type: "error", text: "An unknown error occurred" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Redirecting splash screen */}
      <AnimatePresence>
        {redirecting && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image
              src="/main/flier.png"
              alt="Salt and Light 2025"
              width={128}
              height={128}
              className="animate-pulse object-contain"
            />
            <p className="mt-4 text-purple-700 font-semibold">
              Redirecting to homepage...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Volunteer modal */}
      <AnimatePresence>
        {showVolunteerModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold text-purple-700 mb-4">
                Volunteer Registration
              </h2>
              <p className="text-gray-700 mb-6">
                Thank you for volunteering! You’ll be redirected to your{" "}
                <span className="font-semibold text-purple-600">
                  {selectedUnit}
                </span>{" "}
                page shortly...
              </p>
              <div className="animate-pulse text-purple-600 font-medium">
                Redirecting...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-2xl rounded-2xl p-8 space-y-6 max-w-3xl mx-auto"
      >
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-purple-700">
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-purple-700">
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-purple-700">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-purple-700">
              City
            </label>
            <input
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-purple-700">
              WhatsApp Number
            </label>
            <input
              name="whatsapp"
              type="tel"
              value={form.whatsapp}
              onChange={handleChange}
              required
              placeholder="+2348012345678"
              className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        {/* Referral Source */}
        <div>
          <label className="block text-sm font-semibold text-purple-700">
            How did you hear about us?
          </label>
          <select
            name="referralSource"
            value={form.referralSource}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="">Select an option</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="socialmedia">Other Social Media</option>
            <option value="billboard">Billboard</option>
            <option value="friend">Friend</option>
            <option value="search">Search Engine</option>
            <option value="others">Others (please specify)</option>
          </select>

          {form.referralSource === "others" && (
            <input
              type="text"
              name="otherReferral"
              value={form.otherReferral}
              onChange={handleChange}
              placeholder="Please specify"
              className="w-full mt-3 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            />
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-purple-700">
            I am a...
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="none">None</option>
            <option value="firsttime">First Timer</option>
            <option value="member">Member</option>
          </select>
        </div>

        {/* Schools */}
        <div>
          <label className="block text-sm font-semibold text-purple-700">
            School of Ministry Class (Optional)
          </label>
          <select
            name="schoolOfMinistry"
            value={form.schoolOfMinistry}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="">Select a class</option>
            {schools.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Trainings */}
        <div>
          <label className="block text-sm font-semibold text-purple-700">
            Certified Trainings (Optional)
          </label>
          <select
            name="certificatedTraining"
            value={form.certificatedTraining}
            onChange={handleChange}
            className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
          >
            <option value="">Select a training</option>
            {trainings.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Volunteer checkbox */}
        <div>
          <label className="inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={volunteer}
              onChange={(e) => setVolunteer(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="font-semibold text-purple-700">
              I want to be a Volunteer
            </span>
          </label>

          {volunteer && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block mb-2 font-semibold text-purple-700">
                Select Volunteer Unit
              </label>
              <select
                name="volunteerRole"
                value={selectedUnit || ""}
                onChange={(e) => setSelectedUnit(e.target.value || null)}
                required={volunteer}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="">Choose a unit</option>
                {volunteerUnits.map((unit) => (
                  <option key={unit.name} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </motion.div>
          )}
        </div>

        {/* Accommodation checkbox */}
        <div>
          <label className="inline-flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={accommodation}
              onChange={(e) => setAccommodation(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="font-semibold text-purple-700">
              I will need Accommodation
            </span>
          </label>

          {accommodation && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block mb-2 font-semibold text-purple-700">
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required={accommodation}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </motion.div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-700 text-white font-semibold rounded-xl hover:bg-purple-800 transition"
        >
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
        {/* Info consent notice */}
        <p className="text-xs text-gray-500 text-center mt-2">
          By submitting this form, you agree to share your information with the organizers of Salt and Light 2025 for communication and event-related purposes.
        </p>


        {/* Message */}
        {message && (
          <motion.div
            className={`text-center text-sm mt-4 font-semibold ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message.text}
          </motion.div>
        )}
      </motion.form>
    </>
  );
}
