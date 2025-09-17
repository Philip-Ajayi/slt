"use client";

interface SpeakerProps {
  name: string;
  title?: string;
  biography: string[]; // <-- change from string to string[]
  image?: string;
}

export default function Speaker({ name, title, biography, image }: SpeakerProps) {
  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 group">
      {image && (
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover object-top"
        />
      )}

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-purple-700">{name}</h3>
        {title && <p className="text-gray-600 text-sm">{title}</p>}
      </div>

      {/* Hover overlay with full biography */}
      <div className="absolute inset-0 bg-black bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity p-6 overflow-y-auto">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        {title && <p className="text-purple-300 mb-4">{title}</p>}
        <div className="text-white text-sm space-y-2">
          {biography.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
