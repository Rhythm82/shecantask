import { useRef, useState } from "react";
import About from "../components/About.jsx";
import ContactForm from "../components/ContactForm.jsx";
import DonationSection from "../components/DonationSection.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";
import Impact from "../components/Impact.jsx";
import Mission from "../components/Mission.jsx";
import Navbar from "../components/Navbar.jsx";

const Home = () => {
  const contactRef = useRef(null);
  const [contactPrefill, setContactPrefill] = useState(null);

  const handleDonationInterest = (amount) => {
    setContactPrefill({
      interestType: "Donation Interest",
      message: `I am interested in donating ₹${amount}.`
    });

    window.setTimeout(() => {
      contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff7fb] text-purple-950">
      <Navbar />
      <Hero />
      <About />
      <Impact />
      <Mission />
      <DonationSection onDonationInterest={handleDonationInterest} />
      <ContactForm ref={contactRef} prefill={contactPrefill} />
      <Footer />
    </main>
  );
};

export default Home;
