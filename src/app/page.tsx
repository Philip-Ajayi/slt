'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function RegistrationPage() {
  const volunteerRoles = [
    'Registration', 'Media', 'Publicity', 'Ushering',
    'Medicals', 'Technical', 'Sanitation', 'Greeters', 'Intercessors'
  ];

  const certificatedTrainings = ['PMP', 'HSE'];

  const schoolOfMinistry = [
    'Arts, Music, Drama, Media Ministries',
    'Ministry as Pastors, Prophets, Evangelist, Teachers and Church administrator',
    'Youth, Campus, Teanagers, School Ministries'
  ];

  const volunteerGroupLinks: Record<string, string> = {
    Registration: 'https://chat.whatsapp.com/BoAgzTWBA5bBnY1YeMM3kA?mode=ac_t',
    Media: 'https://chat.whatsapp.com/L9DwyWM1BVcBZdBVFPYIh5?mode=ac_t',
    Publicity: 'https://chat.whatsapp.com/EIxpdUKykTgCeX0AzlqGig?mode=ac_t',
    Ushering: 'https://chat.whatsapp.com/JseeyOoMkaUAFwhxIgCJU5?mode=ac_t',
    Medicals: 'https://chat.whatsapp.com/EHKt04WS8MF90o9gOw0GCm?mode=ac_t',
    Technical: 'https://chat.whatsapp.com/LRk18JC3fNJGY0qRDObJLn?mode=ac_t',
    Sanitation: 'https://chat.whatsapp.com/I08y3bqMKM4Iv6JyFJOrII?mode=ac_t',
    Greeters: 'https://chat.whatsapp.com/Ii1l0mGrHAv3U65CpvLRp1?mode=ac_t',
    Intercessors: 'https://chat.whatsapp.com/FZwx2Fp3eL6Ap6ucfJuoAL',
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    whatsapp: '',
    certificatedTraining: '',
    schoolOfMinistry: '',
    volunteerRole: '',
    accommodation: '',
  });

  const [volunteer, setVolunteer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? value : '') : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          volunteerRole: volunteer ? formData.volunteerRole : '',
        }),
      });

      const data = await res.json();
      if (res.ok) {
        let successText = 'Registration successful! Check your email for the QR code.';

        if (volunteer && formData.volunteerRole && volunteerGroupLinks[formData.volunteerRole]) {
          const link = volunteerGroupLinks[formData.volunteerRole];
          successText += `<br/>Join your volunteer group here: <a href="${link}" target="_blank" class="text-blue-600 underline">${formData.volunteerRole} WhatsApp Group</a>`;
        }

        setStatusMessage({
          type: 'success',
          text: successText,
        });

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          location: '',
          whatsapp: '',
          certificatedTraining: '',
          schoolOfMinistry: '',
          volunteerRole: '',
          accommodation: '',
        });
        setVolunteer(false);
      } else {
        setStatusMessage({
          type: 'error',
          text: data.error || 'Registration failed.',
        });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: 'Something went wrong. Try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-[#470184] mb-6 text-center"
        >
          Salt and Light Conference 2025 Registration
        </motion.h1>

        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center max-w-2xl mx-auto"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          We’re so excited to have you join us!
          </h2>
          <p className="text-gray-600">
          Please take a moment to fill out the registration form below to secure your spot at this year’s conference. Whether you’re attending for the first time or returning, we can’t wait to experience all that God has in store—together.
          </p>
          <p className="text-gray-600">
          If you’d like to be part of the team that helps bring Salt and Light Conference 2025 to life, there’s also an option to sign up as a volunteer. From welcoming guests to helping with logistics or prayer support, there’s a place for you to serve and make a difference.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Responsive Flyer */}
          <div className="lg:w-1/3 w-full flex-shrink-0">
            <Image
              src="/events/hero.png"
              alt="Salt and Light Conference 2025 Flyer"
              width={4200}
              height={2400}
              layout="responsive"
              className="rounded-lg shadow-lg"
              priority
            />
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-2/3 space-y-6 bg-gray-50 p-8 rounded-lg shadow-lg"
          >
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#470184]"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#470184]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#470184]"
              />
            </div>

            {/* Location & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#470184]"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  WhatsApp Phone Number
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#470184]"
                />
              </div>
            </div>

            {/* Certificated Training */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Certificated Training (optional)
              </label>
              <select
                name="certificatedTraining"
                value={formData.certificatedTraining}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Select a training</option>
                {certificatedTrainings.map((t, i) => (
                  <option key={i} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* School of Ministry */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                School of Ministry Class (optional)
              </label>
              <select
                name="schoolOfMinistry"
                value={formData.schoolOfMinistry}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Select a class</option>
                {schoolOfMinistry.map((cls, i) => (
                  <option key={i} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            {/* Volunteer Checkbox */}
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-[#470184] border-gray-300 rounded"
                  checked={volunteer}
                  onChange={() => setVolunteer(!volunteer)}
                />
                <span className="ml-2 text-gray-700">I want to volunteer</span>
              </label>
            </div>

            {/* Volunteer Roles */}
            {volunteer && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {volunteerRoles.map((role, i) => (
                  <label key={i} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="volunteerRole"
                      value={role}
                      checked={formData.volunteerRole === role}
                      onChange={handleChange}
                      className="h-5 w-5 text-[#470184] border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">{role}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Accommodation */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Do you need accommodation? (optional)
              </label>
              <select
                name="accommodation"
                value={formData.accommodation}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#470184] text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-[#5a01a6] transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>

            {/* Status Message */}
            <div className="mt-4 text-center">
              {statusMessage && (
                <p
                  className={`mt-2 font-medium ${
                    statusMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                  dangerouslySetInnerHTML={{ __html: statusMessage.text }}
                />
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
