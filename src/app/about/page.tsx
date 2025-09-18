"use client";

import AboutCard from "@/components/about/Card";
import Timeline from "@/components/about/TimeLine";

const host = {
  name: "Word House",
  slogan: "Strong, Vigorous and Victorious",
  description: [
    "WORD HOUSE is a Young People's Church of The Men of Issachar Vision Inc.",
    `"I have written to you, young men, because you are strong and vigorous, and the word of God remains [always] in you, and you have been victorious over the evil one [by accepting Jesus as Savior]" - 1 John 2:14 (AMP)`,
    "Welcome to WORD HOUSE, where young people are strong, vigorous and victorious.",
  ],
  website: "https://mivwordhouse.com",
  logo: "/main/whitewhlogo.png", // Replace with actual logo path
};

const headquarters = {
  name: "The Men of Issachar Vision Inc.",
  slogan: "—", // No slogan provided
  description: [
    "The Men Of Issachar Vision Inc. (MIV), founded in 1989 under the leadership of Rev. Samson Ajetomobi, is a Christian organization committed to awakening and missions.",
    "Our awakening efforts focus on reawakening the church to her responsibilities, especially through leadership development and conferences.",
    "In missions, we reach the unreached at all cost—through sending missionaries, mobilizing resources, training, research, medical outreach, and literacy projects.",
    "MIV is actively engaged in nations including Benin Republic, Brazil, Cameroon, Cote D’Ivoire, Egypt, Ghana, Liberia, Morocco, Nigeria, Senegal, South Africa, The Gambia, Tanzania, Togo, United Kingdom, and United States.",
  ],
  website: "https://menofissacharvision.com/",
  logo: "https://menofissacharvision.com/wp-content/uploads/2020/03/logo-miv.png", // Replace with actual logo path
};


export default function About() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-purple-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-purple-800 text-center mb-16 drop-shadow-md">
          About Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AboutCard entity={host} />
          <AboutCard entity={headquarters} />
        </div>
         <Timeline />
      </div>
    </section>
  );
}
