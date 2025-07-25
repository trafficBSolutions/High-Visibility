import React from 'react';
import images from "../../utils/images";
import { IoLogoInstagram, IoLogoFacebook } from 'react-icons/io5';
const footer = () => {
    return (
        <footer className="footer">
            <div className="footer-div">
                <div className="footer-container">
                    <div className="footer-logo">
                        <img src={images["High Visibility PDF.svg"]} alt="logo" className="footer-logo-img" />
                    </div>
                    <div className="footer-nav">
                        <h3>Navigation</h3>
                        <ul className="footer-nav-list">
                            <li><a href="/services" className="footer-nav-link">Services</a></li>
                            <li><a href="/contact-us" className="footer-nav-link">Contact Us</a></li>
                            <li><a href="/testimonials" className="footer-nav-link">Testimonials</a></li>
                        </ul>
                    </div>
                    <li className="header-nav-social-list quote-dropdown">
  <a href="/services/express-detailing" className="main-footer-quote-link">Get a Quote</a>
  </li>
                <div className="footer-nav-social">
                    <a href="https://www.facebook.com/highvisibilitydetailing" className="footer-nav-social-link">
                    <IoLogoFacebook className="footer-nav-social-icon" />
                    </a>
                    <a href="https://www.instagram.com/highvisibilitydetailing?fbclid=IwY2xjawLmByVleHRuA2FlbQIxMABicmlkETFETEZnekRMM3BaVDk5TGl4AR4VRwW090QAaEb8XRYeVpf2uYUad_cAmdGh0TgNvN4Q1bubd--OoG1mnrWctA_aem_NJLzxQQzO5tiRXAGXjnUrg" className="footer-nav-social-link">
                    <IoLogoInstagram className="footer-nav-social-icon" />
                    </a>
                    </div>
                            </div>
                            </div>
                            <div className="footer-copyright">
      <p className="footer-copy-p">&copy; 2025 High Visibility Detailing - 
         Website MERN Stack Coded & Deployed by <a className="footer-face"href="https://www.facebook.com/will.rowell.779" target="_blank" rel="noopener noreferrer">William Rowell</a> - All Rights Reserved.</p>
    </div>
                            </footer>
    )
};
export default footer;
