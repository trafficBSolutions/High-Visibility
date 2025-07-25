import { useState } from "react";
import images from "../../utils/images";
import { IoLogoFacebook, IoLogoInstagram, IoMenuOutline } from 'react-icons/io5';
function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => 
        setIsOpen(!isOpen);
return (
    <header className="header">
        <div className="header-nav">
            <button className="header-nav-toggle" onClick={toggle}>
                <IoMenuOutline className="icon-mobile-nav" />
                </button>
        </div>
        <nav className={`header-nav-list ${isOpen ? 'active' : ''}`}>
            <a href="/" className="header-nav-link">
            <img src={images["High Visibility PDF.svg"]} alt="logo" className="header-nav-logo" />
            </a>
            <ul className="main-header-nav-list">
                <li><a className="main-link" href="/">Home</a></li>
                <li><a className="main-link" href="/services">Services</a></li>
                <li><a href="/contact-us" className="main-link-view">Contact Us</a></li>
                <li><a href="/testimonials" className="main-link">Testimonials</a></li>
                </ul>
                                <div className="header-nav-social">
                    <a href="https://www.facebook.com/highvisibilitydetailing" className="header-nav-social-link">
                    <IoLogoFacebook className="header-nav-social-icon" />
                    </a>
                    <a href="https://www.instagram.com/highvisibilitydetailing?fbclid=IwY2xjawLmByVleHRuA2FlbQIxMABicmlkETFETEZnekRMM3BaVDk5TGl4AR4VRwW090QAaEb8XRYeVpf2uYUad_cAmdGh0TgNvN4Q1bubd--OoG1mnrWctA_aem_NJLzxQQzO5tiRXAGXjnUrg" className="header-nav-social-link">
                    <IoLogoInstagram className="header-nav-social-icon" />
                    </a>
                    </div>
<li className="header-nav-social-list quote-dropdown">
                    <a href="/services/service-quote" className="main-quote-link">Get a Quote</a>
</li>
            </nav>
    </header>
)
}
export default Header;