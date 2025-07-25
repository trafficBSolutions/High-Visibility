import { useState, useRef } from 'react';
import Header from '../components/headers/ContactHeader'
import Footer from '../components/footers/ContactFooter'
import '../css/contact.css'
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios'
import { toast } from 'react-toastify';
export default function ContactUs() {
  const recaptchaRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
    const [errors, setErrors] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try { const requiredFields = ['name', 'email', 'subject', 'message'];
    const newErrors = {};

    requiredFields.forEach(field => {
      if (!formData[field]) {
        let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
        if (field === 'name') fieldLabel = 'Name';
        if (field === 'email') fieldLabel = 'Email';
        if (field === 'subject') fieldLabel = 'Subject';
        if (field === 'message') fieldLabel = 'Message';
        newErrors[field] = `${fieldLabel} is required!`;
      }
    });
if (Object.keys(newErrors).length > 0) {
  setErrorMessage('Required fields are missing.');
  setErrors(newErrors);
  return;
} else {
  setErrorMessage(''); // ✅ Clear general error if all fields are now valid
}  
  setIsSubmitting(true);
      const response = await axios.post('/contact-us', formData, {
        headers: {
          'Content-Type': 'application/json'
      }})
      console.log(response.data); // Now this works
           
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
if (Object.keys(newErrors).length > 0) {
  setErrorMessage('Required fields are missing.');
  setErrors(newErrors);
  return;
} else {
  setErrorMessage(''); // ✅ Clear general error if all fields are now valid
}
      setErrors({});
      setSubmissionMessage(
        '✅ Message has been sent!'
      );}
      catch (err) {
        console.error(err);
        toast.success('✅ Message has been sent! Check your email for confirmation.');
        setSubmissionErrorMessage("Something went wrong.");
      } finally {
        setIsSubmitting(false);
      }
  };

  return (
    <div>
      <Header />
      <div className="testimonials-container">
        <h1 className="testimonials-h1">Contact Us</h1>
        <p className="testimonials-p">
          Have a question, concern, or special request? Send us a message below!
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
            <p className="contact-p">
            We're here to help! Whether you have a question, a concern, or a special request, we're just a message away.
        </p>
          <label>
            Name *
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => { 
  setFormData({ ...formData, name: e.target.value });
if (e.target.value) {
  setErrors((prevErrors) => ({ ...prevErrors, name: '' })); // Clear the error
}
}}
            />
          </label>
{errors.name && <div className="error-message">{errors.name}</div>}
          <label>
            Email *
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => { 
  setFormData({ ...formData, email: e.target.value });
if (e.target.value) {
  setErrors((prevErrors) => ({ ...prevErrors, email: '' })); // Clear the error
}
}}
            />
          </label>
{errors.email && <div className="error-message">{errors.email}</div>}
          <label>
            Subject *
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={(e) => { 
  setFormData({ ...formData, subject: e.target.value });
if (e.target.value) {
  setErrors((prevErrors) => ({ ...prevErrors, subject: '' })); // Clear the error
}
}}
            />
          </label>
{errors.subject && <div className="error-message">{errors.subject}</div>}
          <label>
            Message *
            <textarea
            className="contact-text"
              name="message"
              rows="5"
              value={formData.message}
              onChange={(e) => { 
  setFormData({ ...formData, message: e.target.value });
if (e.target.value) {
  setErrors((prevErrors) => ({ ...prevErrors, message: '' })); // Clear the error
}
}}
            ></textarea>
          </label>
        {errors.message && <div className="error-message">{errors.message}</div>}
<div className="recaptcha-container">
  <ReCAPTCHA
    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
    ref={recaptchaRef}
    onChange={(token) => setFormData({ ...formData, token })}
  />
</div>
  <div className="submit-button-wrapper">
  <button
    type="submit"
    className="submit"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <div className="spinner-button">
        <span className="spinner"></span> Sending Message...
      </div>
    ) : (
      'Send Message'
    )}
  </button>
  {/* Toast-like message */}
  {submissionMessage && (
    <div className="custom-toast success">{submissionMessage}</div>
  )}
  {submissionErrorMessage && (
    <div className="custom-toast error">{submissionErrorMessage}</div>
  )}
  {
  errorMessage && (
    <div className="custom-toast error">{errorMessage}</div>
  )}
</div>
        </form>
      </div>
      <Footer />
    </div>
  );
}