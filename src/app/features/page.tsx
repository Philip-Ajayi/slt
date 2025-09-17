import FeatureSection from "@/components/features/FeaturesList";

const features = [
  {
    title: "Shiftings and Turning",
    paragraphs: [
      "This powerful opening session sets the spiritual tone for the entire program. It is a time of intense intercession, prophetic declarations, and spiritual realignment.",
      "Objectives include spiritual awakening, divine alignment, breaking strongholds, and releasing prophetic directions.",
      "There will be prayers over societal spheres—government, media, economy, education, and arts—and activation of spiritual gifts and callings.",
      "Led by seasoned intercessors and prophetic voices, this session includes worship, spontaneous prayer, and prophetic actions aimed at personal and territorial shifts."
    ],
    image: "/gallery/gallery7.jpg",
  },
  {
    title: "School of Ministry",
    paragraphs: [
      "The School of Ministry offers specialized spiritual and practical classes to equip believers in their areas of calling.",
      "Tracks include Art, Music & Drama Ministry—empowering creatives for evangelism; Fivefold Ministry—training pastors, prophets, and leaders; and Youth & Campus Ministry—equipping revivalists for generational impact.",
      "These sessions blend theology, mentorship, leadership development, and practical engagement for ministry effectiveness."
    ],
    image: "/gallery/gallery9.jpg",
  },
  {
    title: "Certified Training Classes",
    paragraphs: [
      "Professional, skill-based trainings that are certified and heavily subsidized to promote Christian excellence in the marketplace.",
      "Courses include HSE, Project Management (PMP), Data Analysis, HRM, and Social Media & Digital Marketing.",
      "Each class is designed to enhance both ministry and professional competence, ensuring believers are impactful in their fields."
    ],
    image: "/gallery/gallery11.jpg",
  },
  {
    title: "Exhibition",
    paragraphs: [
      "A vibrant platform for participants, ministries, and entrepreneurs to showcase their goods and services.",
      "It fosters Christian entrepreneurship, economic empowerment, and kingdom-driven innovation.",
      "Expect booths with books, crafts, fashion, food, tech, and more—alongside powerful networking opportunities."
    ],
    image: "",
  },
  {
    title: "Influence Night",
    paragraphs: [
      "A climactic night of revelatory teaching, prophetic impartation, and spiritual empowerment.",
      "Focuses on understanding kingdom leadership, cultural influence, and transforming systems through divine wisdom.",
      "Includes intense worship, prayer, and release of grace for personal and national impact."
    ],
    image: "/gallery/gallery10.jpg",
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-purple-50">
      <header className="py-20 text-center">
        <h1 className="text-5xl font-extrabold text-purple-800">Features of the Conference</h1>
        <p className="text-purple-700 mt-4 text-lg max-w-2xl mx-auto">
          Discover what makes our conference an unforgettable experience.
        </p>
      </header>

      <main className="space-y-24">
        {features.map((feature, index) => (
          <FeatureSection
            key={feature.title}
            title={feature.title}
            paragraphs={feature.paragraphs}
            image={feature.image}
            reverse={index % 2 === 1}
          />
        ))}
      </main>
    </div>
  );
}
