import { useState, useEffect } from "react";
import images from "../../utils/images";
import { useNavigate } from 'react-router-dom';
import { IoLogoFacebook, IoLogoInstagram, IoMenuOutline } from 'react-icons/io5';
function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const storedAdmin = localStorage.getItem('adminUser');
        setIsAdmin(!!storedAdmin); // true if logged in
    }, []);
    const toggle = () => 
        setIsOpen(!isOpen);
const handleAdminClick = () => {
        if (isAdmin) {
            // Logging out
            localStorage.removeItem('adminUser');
            setIsAdmin(false);
            navigate('/admin-login');
        } else {
            // Navigate to login
            navigate('/admin-login');
        }
    };
return (
    <header className="header">
        <div className="header-nav">
            <button className="header-nav-toggle" onClick={toggle}>
                <IoMenuOutline className="icon-mobile-nav" />
                </button>
        </div>
        <nav className={`header-nav-list ${isOpen ? 'open' : ''}`}>
            <a href="/" className="header-nav-link">
            <img src={images["High Visibility PDF.svg"]} alt="logo" className="header-nav-logo" />
            </a>
            <ul className="main-header-nav-list">
                <li><a className="main-link" href="/about-us">About Us</a></li>
                <li><a href="/contact-us" className="main-link">Contact Us</a></li>
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
  <p className="main-quote-link">Get a Quote</p>
  <ul className="sub-header-nav-list">
    <li><a className="sub-link" href="/services/express-detail">Express Detail</a></li>
    <li><a className="sub-link" href="/services/upgrades">Upgrades</a></li>
    <li><a className="sub-link" href="/services/express-detail">Ceramic Coatings</a></li>
  </ul>
</li>
                     <li className="admin-options">
            {isAdmin && (
                <a className="btn-main main-nav-link-view" href="/admin-dashboard">
                    Admin Dashboard
                </a>
            )}
            <button className="btn-main main-nav-link" onClick={handleAdminClick}>
                {isAdmin ? 'Log Out' : 'Login'}
            </button>
        </li>
            </nav>
    </header>
)
}
export default Header;
