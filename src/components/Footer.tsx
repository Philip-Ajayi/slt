import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaSpotify,
  FaTelegram,
} from "react-icons/fa";

const routes = ["Speakers", "About", "Schedule", "Features", "Contact", "Register"];

export default function Footer() {
  return (
    <footer className="bg-purple-800 text-white mt-20">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Column 1: Info */}
        <div>
          <Image
            src="/main/sltlogo.png"
            alt="Salt and Light 2025 Logo"
            width={128}  // 32 * 4 (Tailwind w-32 = 8rem = 128px)
            height={128} // maintain square or adjust as needed
            className="mb-4"
            priority
          />
          <h3 className="text-xl font-bold mb-2">
            “A convocation of and for influence in the World Mountains”
          </h3>
          <p className="text-sm mb-1">📍 Word House, Behind Accord Building, Obadeyi Estate Samonda Ibadan</p>
          <p className="text-sm mb-1">📧 contact@mivwordhouse.com</p>
          <p className="text-sm">📞 +234 (816) 3047-854</p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h4 className="font-semibold mb-2">Links</h4>
          <ul>
            {routes.map((route) => (
              <li key={route}>
                <Link href={`/${route.toLowerCase()}`} className="hover:text-purple-300">
                  {route}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Social Icons */}
        <div>
          <h4 className="font-semibold mb-2">Social</h4>
          <div className="flex space-x-3">
            <a
              href="https://instagram.com/mivwordhouse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5 hover:text-purple-300" />
            </a>
            <a
              href="https://facebook.com/mivwordhouse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-5 h-5 hover:text-purple-300" />
            </a>
            <a
              href="https://x.com/mivwordhouse?lang=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
            >
              <FaTwitter className="w-5 h-5 hover:text-purple-300" />
            </a>
            <a
              href="https://www.youtube.com/@mivwordhouse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube className="w-5 h-5 hover:text-purple-300" />
            </a>
            <a
              href="https://www.tiktok.com/@mivwordhouse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok className="w-5 h-5 hover:text-purple-300" />
            </a>
            <a
              href="https://creators.spotify.com/pod/show/mivwordhouse/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
            >
              <FaSpotify className="w-5 h-5 hover:text-purple-300" />
            </a>
            <a
              href="https://t.me/mivwordhouse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <FaTelegram className="w-5 h-5 hover:text-purple-300" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-sm border-t border-purple-700">
        © {new Date().getFullYear()} Salt and Light. All rights reserved.
      </div>
    </footer>
  );
}
