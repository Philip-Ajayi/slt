import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import MapSection from "@/components/contact/ContactMap";

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-purple-50 to-white">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <MapSection />
    </div>
  );
}
