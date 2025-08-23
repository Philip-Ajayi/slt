'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center">
      {/* Error Code */}
      <h1 className="text-[#470184] text-9xl font-extrabold mb-6">404</h1>

      {/* Message */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-700">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mb-6 max-w-md">
        The page you are looking for does not exist, has been moved, or is temporarily unavailable.
      </p>

      {/* Call-to-Action */}
      <Link
        href="/"
        className="bg-[#470184] hover:bg-[#5a01a6] text-white font-semibold px-6 py-3 rounded-md transition"
      >
        Back to Home
      </Link>

      {/* Optional image or illustration */}
      <div className="mt-10 max-w-xs md:max-w-md">
        <img
          src="/images/404-illustration.svg" 
          alt="404 Illustration"
          className="w-full"
        />
      </div>
    </div>
  );
}
