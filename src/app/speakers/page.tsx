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
    biography: [
      "Pastor Ope Rowland is a preacher of God's word, public speaker and trainer, consultant and coach, and writer in Nigeria",
      "He believes in the ministry of every saint. Hence, he talks  and writes about believers finding, grooming and operating in their ministries.",
      "He currently serves as the Personal Assistant to Rev. Samson Ajetomobi (the President of The Men of Issachar Vision Inc. and Chairman of the Oyo State Chapter of the Pentecostal Fellowship of Nigeria).",
      "He is also the National Youth Pastor of the Men of Issachar Vision Inc. and the Lead Pastor at MIV Word House, Samonda. Ibadan, Nigeria and he runs an itinerant preaching and teaching ministry across campuses and churches.",
      "In years past, serving as President of ASF FUTA, President of JCCF FUTA, President of NCCF Enugu, Assistant Pastor of MIV Youth Church (now MIV Harvest House) and other platforms he's been privileged to serve had in no little measure contributed to the hewing of his leadership capacity.",
      "His marriage to Atinuke Rowland has been a blessing and their children are signs of the wonders to come.",
    ],
  },
  {
    name: "Apostle Toluwalogo Agboola",
    title: "Founder of His Worship Christian Network (HWCN Global)",
    image: "/ministers/Agboola.png",
    biography: [
      "Apostle Toluwalogo Oluwapelumi Agboola is the Esteemed Founder of His Worship Christian Network (HWCN Global), born on 23rd November 1982 (age 41 Years old), He is a Seasoned Teacher of Gospel of Christ, talented song Composer, and a dedicated worshiper of Christ.",
      "In the year 1990, he made a life-changing decision to commit his life to Christ. He pursued his education and obtained a degree in Chemical Engineering from the Federal University of Technology, Minna.",
      "He is the spiritual son of the esteemed Apostle Arome Osayi, a revered mentor and spiritual father. Apostle Agboola's connection to his spiritual heritage is deeply rooted, and he honors the fatherhood of distinguished Fathers of faith, including Prophet Michael Olaosebikan Adio: A respected spiritual leader and mentor, known for his wisdom and Prophetic guidance. Apostle Agboola acknowledges the spiritual guidance and support received from various spiritual leaders, fostering his growth and ministry.",
      "With a strong foundation in spiritual guidance, Apostle Toluwalogo Agboola continues to inspire and lead others, perpetuating a legacy of faith, wisdom, and compassion. His connection to his spiritual roots is a testament to the significance of mentorship and the impact of spiritual fatherhood in shaping lives and ministries.",
      "Apostle Tolu Agboola received a divine commission from God with the powerful mandate to 'Take My Worship to The Ends Of The Earth'. As a result, he now serves as the head of His Worship Christian Network (HWCN Global), which is situated at The Ark of Preservation, Behind Facebook Market, UnderG, in the city of Ogbomoso. His guiding philosophy is deeply rooted in the belief that faith in God forms a solid foundation for the building of destinies.",
      "Furthermore, Apostle Tolu Agboola found love and happiness in marriage with Mrs. Ademidoyin Agboola, and they solemnized their union in November 2019.",
    ],
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
    title: "Visioneer of WALL foundation",
    image: "/ministers/Ayoola.png",
    biography: [
      "Born on October 29th, Princess Omolara Ayoola PMH is a Gospel movie actress, drama minister, script writer, film director and producer. She is also a voice over Artist and a TV/Radio presenter. She graduated from the Department of Mass Communication, Ambrose Alli University Ekpoma.",
      "Omolara Ayoola, popularly known as PMH (which means Princess of the Most High), is the Visioneer of WALL foundation where she currently serves as a sexual purity minister asides being a Bible Study Teacher at the Sexual Purity Academy (SPA).",
      "Having spoken at different sister’s conferences both on campuses and NCCF, she is also a teenage teacher at Global Harvest Church Headquarters. She publishes a daily write up on sexual purity via her organisation's social media handles and a weekly video series on sexual purity in Yoruba (which is subtitled in English).",
      "Omolara Ayoola PMH's ministry, Wall foundation is a sexual purity organization for girls only, aimed at raising ladies of worth and character. The Wall Foundation was born out of a desire to fulfill purpose of helping young ladies discover themselves. The Journey began as far back as 2008 with only 4 teenagers in a living room. But the name WALL Foundation came to being in October 29, 2013 where our members grew up to 9 ladies. WALL is an acronym for WAR AGAINST LUST AND LIES and now we have over 200 ladies both in Nigeria and in Diaspora.",
      "In aims and objectives, the WALL Foundation seeks to empower young ladies through vocational trainings, thus improving their social economic status. The foundation also offers mentoring for young ladies to stay sexually pure through mentoring classes, programs, seminars and counseling sessions.",
      "The greater goal is to raise female leaders who would in turn raise other leaders; create a bond between daughters and mothers; cater for the welfare of members and non-members alike in the area of shelter, food, paying of school fees, health and all. The ministry also helps young ladies come out of addiction and educates the girl child on how to avoid molestation and also help victims heal and regain confidence.",
      "Mrs. Omolara Ayoola is happily married to her heartthrob, Mr. Olugbenga Ayoola SMH. They tied the knot on 13th July, 2009.",
    ],
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
