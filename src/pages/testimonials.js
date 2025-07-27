import '../css/test.css';
import Header from '../components/headers/TestHeader';
import Footer from '../components/footers/TestFooter';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha';
export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
    const [errors, setErrors] = useState('');
  const [form, setForm] = useState({
  name: '', email: '', review: '', rating: 5, token: ''
});
  const recaptchaRef = useRef();
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('https://high-vis-server.onrender.com/testimonials/latest');
        setReviews(res.data);
      } catch (err) {
        console.error('Failed to load reviews:', err);
      }
    };
    fetchReviews();
  }, []);
const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try { const requiredFields = ['name', 'email', 'review', 'rating'];
    const newErrors = {};

    requiredFields.forEach(field => {
      if (!form[field]) {
        let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
        if (field === 'name') fieldLabel = 'Name';
        if (field === 'email') fieldLabel = 'Email';
        if (field === 'review') fieldLabel = 'Review';
        if (field === 'rating') fieldLabel = 'Rating';
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
      const response = await axios.post('/testimonials', form, {
        headers: {
          'Content-Type': 'application/json'
      }})
      console.log(response.data); // Now this works
           
      setForm({
        name: '',
        email: '',
        review: '',
        rating: ''
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
        '✅ Review has been submitted!'
      );}
      catch (err) {
        console.error(err);
        toast.success('✅ Review submitted! Check your email for confirmation.');
        setSubmissionErrorMessage("Something went wrong.");
      } finally {
        setIsSubmitting(false);
      }
  };
  return (
    <div>
      <Header />
      <div className="testimonials-container">
      <h1 className="testimonials-h1">Customer Testimonials</h1>
      <p className="testimonials-p">
        We're proud to have earned the trust of our customers, and we're grateful for their kind words. Here are some of the reviews we've received:
      </p>
      <div className="review-list">
        {reviews.map((r) => (
          <div className="review-card" key={r._id}>
            <h3>{r.name}</h3>
            <p>{'⭐'.repeat(r.rating)}</p>
            <p>{r.review}</p>
            <p className="review-date">{new Date(r.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <form className="testimonial-form" onSubmit={handleSubmit}>
        <label>
            Name:
        </label>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => { 
  setForm({ ...form, name: e.target.value });
if (e.target.value) {
  setErrors((prevErrors) => ({ ...prevErrors, name: '' })); // Clear the error
}
}}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
        <label>
          Email:
          <input
  type="email"
  name="email"
  placeholder="Your Email"
  value={form.email}
  onChange={(e) => { 
  setForm({ ...form, email: e.target.value });
if (e.target.value) {
  setErrors((prevErrors) => ({ ...prevErrors, email: '' })); // Clear the error
}
}}
/>
{errors.email && <div className="error-message">{errors.email}</div>}
        </label>
  <label>
    Review:
    </label>
        <textarea
          name="review"
          placeholder="Your Review"
          value={form.review}
          onChange={(e) => { 
  setForm({ ...form, review: e.target.value });
if (e.target.value) {
  setErrors((prevErrors) => ({ ...prevErrors, review: '' })); // Clear the error
}
}}
        />
        {errors.review && <div className="error-message">{errors.review}</div>}
        <label>
          Rating:
          </label>
        <select name="rating" value={form.rating} onChange={(e) => { 
  setForm({ ...form, rating: e.target.value });
if (e.target.value) {
  setErrors((prevErrors) => ({ ...prevErrors, rating: '' })); // Clear the error
}
}}>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{`${r} Star${r > 1 ? 's' : ''}`}</option>
          ))}
        </select>
        {errors.rating && <div className="error-message">{errors.rating}</div>}
<div className="recaptcha-container">
  <ReCAPTCHA
    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
    ref={recaptchaRef}
    onChange={(token) => setForm({ ...form, token })}
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
        <span className="spinner"></span> Submitting Review...
      </div>
    ) : (
      'Submit Review'
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
