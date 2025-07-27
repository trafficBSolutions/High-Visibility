import Header from '../components/headers/HomeHeader';
import Footer from '../components/footers/HomeFooter';
import '../css/header.css';
import '../css/footer.css';
import '../css/home.css';
import images from '../utils/images';
import PhotoGallery from '../components/photos';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // npm i react-icons
const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('https://high-vis-server.onrender.com/testimonials/latest');
      console.log("Fetched testimonials:", response.data); // ← Add this
      setTestimonials(response.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };
  fetchTestimonials();
}, []);

 const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  return (
    <div>
        <Header/>
      <div className="home-container">
            <video className="home-video" autoPlay loop muted playsInline>
                <source src={images["tire.mp4"]} type="video/mp4"></source>
                </video>
<div className="logo-container">
    <div className="logo-container-inner">
  <img
    src={images["High Visibility Mobile Detailing PDF.svg"]}
    alt="logo"
    className="home-logo"
  />
  <p className="slogan">
    Bringing Professional Detailing to Your Doorstep. From Shine to Shield, We Deliver a Spotless Drive Every Time.
  </p>
  </div>
</div>
        </div>
        <div className="main-container">
<section className="about-section">
  <div className="about-inner">
    <div className="about-logo">
      <img className="logo-about" src={images["High Visibility PDF.svg"]} alt="Logo" />
    </div>
    <div className="about-container">
      <h2 className="about-title">About High Visibility Mobile Detailing</h2>
      <p className="about-description">
        High Visibility Detailing has a focus on customer service and satisfaction...
      </p>
      <p className="about-description">
        We are happy to service customers in any location...
      </p>
      <p className="about-description">
        Whether you have a truck, sedan, suv, luxury, exotic, or classic car...
      </p>
    </div>
  </div>
</section>

<section className="services-section">
    <div className="services-contain">
    <h2 className="services-title">Our Services</h2>
    <div className="services-container">
    <div className="service-card">
      <h3 className="service-title">Express Detailing</h3>
      <img src={images["carpet2.jpeg"]} alt="Express Detailing" className="service-image" />
      <ul className="service-list">
        <li>Foaming Exterior Hand Wash (Wheels, Tires, Fender Wells)</li>
        <li>Door Jamb Detail</li>
        <li>Compressed Air Blowout (Seats, Tracks, Vents)</li>
        <li>Maintenance Vacuum</li>
        <li>Interior Wipe-down w/ Anti-Static UV Protectant</li>
        <li>Exterior & Interior Glass Cleaning</li>
        <li>Tires Dressed</li>
        <li><strong>Approx. 1.5 Hours • $119–$149</strong></li>
      </ul>
      <a href="/services/service-quote" className="quote-button">Get a Quote</a>
    </div>

    <div className="service-card">
      <h3 className="service-title">Popular Upgrades</h3>
      <img src={images["wash.jpeg"]} alt="Popular Upgrade" className="service-image" />
      <ul className="service-list">
        <li>12-Month Ceramic/Graphene Spray: $89–$99</li>
        <li>Pet Hair Removal: $49–$149</li>
        <li>Steam Cleaning: $69–$159</li>
        <li>Carpet/Upholstery Extraction: $59–$299</li>
        <li>Leather Conditioning: $39–$79</li>
        <li>Engine Detail: $29–$49</li>
        <li>Headlight Restoration: $79–$99</li>
      </ul>
      <a href="/services/service-quote" className="quote-button">Get a Quote</a>
    </div>

    <div className="service-card">
      <h3 className="service-title">Ceramic Coatings</h3>
      <img src={images["washing.jpeg"]} alt="Ceramic Coatings" className="service-image" />
      <ul className="service-list">
        <li>3-Year: $699–$849</li>
        <li>5-Year: $999–$1,149</li>
        <li>9-Year: $1,499–$1,649</li>
        <li>Glass Ceramic Coating: $49–$59</li>
        <li>Wheel Face Ceramic: $49–$69</li>
        <li>Interior Leather Ceramic: $119–$159</li>
        <li>Paint Polish/Enhancement: $149–$199</li>
        <li>1-Step Correction: $299–$399</li>
        <li>2-Step Correction: $599–$799</li>
      </ul>
      <a href="/services/service-quote" className="quote-button">Get a Quote</a>
    </div>
</div>
  </div>
  <div className="photos-container">
        <h2 className="photos-title">Photo Gallery</h2>
        <p className="photos-description">
            Check out our photo gallery to see some of our recent work.
        </p>
        <p className="click-me">
          Click a Photo
        </p>
        <div className="photos-gallery">
            <PhotoGallery/>
        </div>
    </div>
</section>
<section className="reviews-section">
      <div className="reviews-container">
        <h2 className="reviews-title">Customer Reviews</h2>
{testimonials.length > 0 && (
  <div className="review-carousel">
    {testimonials.length > 1 && (
      <button className="navigation-arrow-left" onClick={prevReview}>
        <FaChevronLeft />
      </button>
    )}
    <div className="review-card">
      <p className="review-text">"{testimonials[currentIndex].review}"</p>
      <p className="review-author">– {testimonials[currentIndex].name}</p>
    </div>
    {testimonials.length > 1 && (
      <button className="navigation-arrow-right" onClick={nextReview}>
        <FaChevronRight />
      </button>
    )}
  </div>
)}

        <a href="/testimonials" className="view-all-reviews-button">Read More Reviews</a>
      </div>
    </section>


        </div>
      <Footer/>
    </div>
  )
}
export default Home;
