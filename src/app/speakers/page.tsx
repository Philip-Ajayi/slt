"use client";
import { motion } from "framer-motion";
import Speaker from "@/components/speakers/Card";

// Convert minister bio strings to array of paragraphs for the component
const ministersData = [
  {
    name: "Rev. Samson Ajetomobi",
    title: "President, Men of Issachar Vision (MIV), Host",
    image: "/ministers/Ajetomobi.png",
    biography: [
      "Rev. Samson Ajetomobi is the President of The Men of Issachar Vision Incorporated (MIV), which commenced in 1989. He is a man called by God with the mandate to reach the unreached at all cost and reawaken the Church to her responsibilities. He is gripped with a great passion for souls in reaching the unreached at all cost. Since the inception of MIV ministry, his strong drive has helped several lives to discover the essence of living for God.",
      "Rev. Samson Ajetomobi, an alumnus member of Haggai Institute Maui, USA is the President of Mission and Leadership Academy (MLA), Compact Leadership Training and the coordinator of the ever growing Leadership Update for strategic leaders. A member of NEMA (Nigeria Evangelical Missions Association) and DAI, he chairs, MANI Oyo State and the Pentecostal Fellowship of Nigeria (PFN), Oyo State Chapter. Rev. Ajetomobi also oversees the Redemption Faith Churches and several other networks with missions and leadership thrust.",
      "He is much sought after in trainings, conferences, crusades and church revivals across the continents and because of his leadership thrust of over 34 years he is involved with the leadership of several Christian organizations and mission agencies.",
      "He is married to Rev. Stellamaris and their marriage is blessed with four young adults.",
    ],
  },
  {
    name: "Pastor Ope Rowland",
    title: "Host",
    image: "/ministers/Rowland.png",
    biography: [],
  },
  {
    name: "Apostle Toluwalogo Agboola",
    title: "Founder of His Worship Christian Network (HWCN Global)",
    image: "/ministers/Agboola.png",
    biography: [],
  },
  {
    name: "Pastor Ademola Awoyele",
    title: "Lead Pastor, Destiny Impact Church",
    image: "/ministers/Awoyele.png",
    biography: [
      "He's a writer, life coach, an insightful teacher and an inspirational preacher.",
    ],
  },
  {
    name: "Pastor Yomi Ajayi",
    title: "Pastor, Christ Life Church",
    image: "/ministers/Ajayi.png",
    biography: [
      "A pastor currently serving in Christ Life Church. He's also a worship minister, songwriter, recording artist and a youth enthusiast.",
    ],
  },
  {
    name: "Joshua Mike-Bamiloye",
    title: "Gospel Singer, Filmmaker & Evangelist",
    image: "/ministers/Bamiloye.png",
    biography: [
      "He is a gospel singer and film maker, graphic designer and an evangelist.",
    ],
  },
  {
    name: "Dr. Olayinka Kotila",
    title: "Lecturer, Pharmaceutical Chemistry, University of Ibadan",
    image: "/ministers/Kotila.png",
    biography: [
      "Dr Olayinka Kotila is a researcher in the field of pharmacokinetics and an excellent lecturer of Pharmaceutical Chemistry in the University of Ibadan. She's happily married to Reverend Gbenga Kotila and together they pastor the Centre for Reality International Church, Ibadan. Dr Olayinka Kotila is a rugged preacher of the undiluted word of God.",
    ],
  },
  {
    name: "Pastor Femi  Dairo",
    title: "Director of Sapphire Pre-varsity",
    image: "/ministers/Dairo.png",
    biography: [
      "Femi Emmanuel Dairo is a graduate of the prestigious University of Ibadan, with a degree in Biochemistry.",
      "Femi Dairo is a dedicated and visionary Christian leader, zealously passionate about spreading the Gospel of Christ, with leadership and apostolic mandate of raising giant teenagers and youths across the globe!",
      "His ministerial outreaches are characterized by Holy Ghost and Fire outpouring, with visible Pentecost showers and realities.",
      "He, with his wife, are conveners of Fresh Fire Festival, which is an annual gathering that ignites the flames of revival and spiritual renewal and Students Conference, a revival meeting targeted to capture the younger generation specifically secondary schools students for God. They're also the conveners of Glory Seekers Meeting, which is a monthly meeting that holds every last Sunday of the month, where believers come together to seek God's glory and Presence.",
      "In addition to his ministry roles, Femi Emmanuel Dairo, by the Grace of God, is the Director of Sapphire Pre-varsity, where he oversees the educational and personal development of students preparing for higher education.",
      "He's happily married to Elizabeth Dairo, and they are blessed with a beautiful baby girl - Glory Dairo.",
    ],
  },
  {
    name: "Dr. Lola Ayo-Fashida",
    title: "Finance & Management Consultant",
    image: "/ministers/Fashida.png",
    biography: [
      "She is a finance and management consultant, an author and a minister with two albums. She's also a personnel psychologist and a life coach. She is the lead consultant with Lolyan Consults and President of the Outpour of Fragrance initiative.",
    ],
  },
  {
    name: "Evang. Omolara Ayoola",
    title: "",
    image: "/ministers/Ayoola.png",
    biography: [""],
  },
];

export default function SpeakersPage() {
  return (
    <div className="py-20 bg-gradient-to-r from-purple-50 to-purple-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-purple-800 mb-16">
          Meet Our Ministers
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {ministersData.map((speaker, i) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Speaker {...speaker} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
