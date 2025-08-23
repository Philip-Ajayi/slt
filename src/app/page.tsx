import Hero from "../components/Hero";
import About from "../components/About";
import Programs from "../components/Programs";
import Speakers from "../components/Speakers";
import Gallery from "../components/Gallery";
import RegistrationSection from "../components/RegistrationSection";
import MediaSection from "../components/MediaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Programs />
      <Speakers />
      <Gallery />
      <RegistrationSection />
      <MediaSection />
    </>
  );
}
