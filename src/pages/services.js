import Header from "../components/headers/ServiceHeader";
import Footer from "../components/footers/ServiceFooter";
import "../css/service.css";
import images from "../utils/images";
import { Link } from "react-router-dom";

const Service = () => {
  return (
    <div>
      <Header />
      <div className="service-container">
        <h1 className="service-title-h1">Our Services</h1>
        <p className="service-intro">
          Mobile detailing that comes to you — at home, work, or your job site. We deliver professional-grade cleaning, protective coatings, and vehicle upgrades for all types of vehicles.
        </p>

        <div className="services-wrapper">
          <div className="service-card-container">
            <h2>Express Detailing</h2>
            <img src={images["carpet2.jpeg"]} alt="Express Detailing" />
            <p>
              A full-service wash and interior clean for regular maintenance. Quick, thorough, and affordable.
            </p>
          </div>

          <div className="service-card-container">
            <h2>Popular Upgrades</h2>
            <img src={images["wash.jpeg"]} alt="Upgrades" />
            <p>
              Add-ons for pet hair, stains, faded trim, or tough grime. Perfect for deeper cleans or restoring your vehicle’s look.
            </p>
          </div>

          <div className="service-card-container">
            <h2>Ceramic Coatings</h2>
            <img src={images["washing.jpeg"]} alt="Ceramic Coating" />
            <p>
              Long-term protection for your paint, glass, wheels, and interior. Available in 3–9 year packages.
            </p>
          </div>
        </div>

        <div className="service-cta">
          <h3>Not sure what you need?</h3>
          <p>
            Fill out a short form and we’ll help you choose the right services. No pressure — just expert help and a free quote.
          </p>
          <Link to="/services/service-quote" className="quote-service-button">
            Get a Personalized Quote
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Service;
