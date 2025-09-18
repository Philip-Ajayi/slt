"use client";

import Image from "next/image";

interface SpeakerProps {
  name: string;
  title?: string;
  biography: string[];
  image?: string;
}

export default function Speaker({ name, title, biography, image }: SpeakerProps) {
  const hasBio = biography && biography.length > 0 && biography.some(para => para.trim() !== "");

  return (
    <div
      tabIndex={0}
      role="button"
      aria-expanded="false"
      className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 group hover:scale-105 focus:scale-105 outline-none"
      aria-describedby={`${name.replace(/\s+/g, "-").toLowerCase()}-bio`}
    >
      {image ? (
        <div className="relative w-full h-64">
          <Image
            src={image}
            alt={`${name} portrait`}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            style={{ objectFit: "cover", objectPosition: "top" }}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600 text-lg italic">No Image</span>
        </div>
      )}

      <div className="p-4 text-center relative">
        <h3 className="text-lg font-semibold text-purple-700">{name}</h3>
        {title && <p className="text-gray-600 text-sm">{title}</p>}

        {/* HINT BADGE */}
        {hasBio && (
          <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded shadow group-hover:opacity-0 group-focus:opacity-0 transition-opacity">
            📖 Tap or Hover to read bio
          </span>
        )}
      </div>

      {/* BIOGRAPHY OVERLAY */}
      {hasBio && (
        <div
          id={`${name.replace(/\s+/g, "-").toLowerCase()}-bio`}
          aria-label={`Biography of ${name}`}
          className="absolute inset-0 bg-black bg-opacity-90 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity p-6 overflow-y-auto max-h-full"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
          {title && <p className="text-purple-300 mb-4">{title}</p>}
          <div className="text-white text-sm space-y-2">
            {biography.map((para, i) =>
              para.trim() !== "" ? <p key={i}>{para}</p> : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}
