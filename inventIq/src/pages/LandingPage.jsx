import "./LandingPage.css";

import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />

      <main className="landing-main">
        <Hero />
      </main>

      <Footer />
    </div>
    
  );
}

export default LandingPage;