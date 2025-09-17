import Hero from "@/components/landing/Hero";
import Speakers from "@/components/landing/Speakers";
import CTA from "@/components/landing/CTA";
import Schedule from "@/components/landing/Schedule";
import Features from "@/components/landing/Features";
import WhyCome from "@/components/landing/WhyCome";
import Gallery from "@/components/landing/Gallery";
import About from "@/components/landing/About";

export default function Page() {
  return (
    <div>
      <Hero />
      <Speakers />
      <Features />
      <WhyCome />
      <Schedule />
      <Gallery />
      <CTA />
      <About />
    </div>
  );
}
