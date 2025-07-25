import React, { useState } from 'react';
import Header from '../../components/headers/QuoteHeader';
import Footer from '../../components/footers/QuoteFooter';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ServiceQuote = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', vehicleType: '', make: '', model: '', color: '',
    services: [], notes: ''
  });
const liabilityChecklist = [
  "I understand all services are performed with care but are not guaranteed to fix all cosmetic or mechanical issues.",
  "I acknowledge that pet hair, stains, and severe grime may not be 100% removable in one visit.",
  "I authorize High Visibility to document before/after conditions for quality and marketing purposes.",
  "I understand ceramic coatings require proper maintenance and have limitations on protection.",
  "I acknowledge that correction or extraction may incur additional costs depending on condition.",
  "I agree to avoid automatic car washes and follow aftercare instructions provided.",
  "I understand no refunds will be issued after services are performed.",
  "I accept that no scheduling was made online and a rep will follow up to schedule service time.",
  "I agree to the service terms and conditions outlined during communication.",
  "I authorize the use of my information for scheduling and contact purposes only.",
  "I confirm all information I provided is accurate to the best of my knowledge."
];

const [waiverChecks, setWaiverChecks] = useState(
  new Array(liabilityChecklist.length).fill(false)
);
  const [phone, setPhone] = useState('');
  const [checkAllFieldsFilled] =  useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');
  const [errors, setErrors] = useState('');
  const [signature, setSignature] = useState("");
  const handlePhoneChange = (event) => {
    const input = event.target.value;
    const rawInput = input.replace(/\D/g, ''); // Remove non-digit characters
    const formatted = rawInput.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    
    setPhone(formatted);
    setForm({ ...form, phone: formatted });
  
    // Check if the input has 10 digits and clear the error if it does
    if (rawInput.length === 10) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phone: 'Please enter a valid 10-digit phone number.' }));
    }
    setTimeout(checkAllFieldsFilled, 0);
  };
const handleCheckboxChange = (index) => {
  const updatedChecks = [...waiverChecks];
  updatedChecks[index] = !updatedChecks[index];
  setWaiverChecks(updatedChecks);
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
const handleServiceToggle = (e) => {
  const { value, checked } = e.target;
  let updatedServices = [...form.services];

  if (checked) {
    updatedServices.push(value);
  } else {
    updatedServices = updatedServices.filter(service => service !== value);
  }

  setForm({ ...form, services: updatedServices });

  if (updatedServices.length === 0) {
    setErrors((prev) => ({ ...prev, services: 'Please select at least one service.' }));
  } else {
    setErrors((prev) => ({ ...prev, services: '' }));
  }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try { const requiredFields = ['name', 'email', 'phone', 'vehicleType',
      'make', 'model', 'color'];
    const newErrors = {};

    requiredFields.forEach(field => {
      if (!form[field]) {
        let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
        if (field === 'name') fieldLabel = 'Name';
        if (field === 'email') fieldLabel = 'Email';
        if (field === 'phone') fieldLabel = 'Phone Number';
        if (field === 'vehicleType') fieldLabel = 'Vehicle Type';
        if (field === 'make') fieldLabel = 'Make';
        if (field === 'model') fieldLabel = 'Model';
        if (field === 'color') fieldLabel = 'Color';
        newErrors[field] = `${fieldLabel} is required!`;
      }
    });
    if (form.services.length === 0) {
      newErrors.services = 'Please select at least one service.';
    }
if (Object.keys(newErrors).length > 0) {
  setErrorMessage('Required fields are missing.');
  setErrors(newErrors);
  return;
} else {
  setErrorMessage(''); // ✅ Clear general error if all fields are now valid
}  
  setIsSubmitting(true);
      const response = await axios.post('/service-quote', form, {
        headers: {
          'Content-Type': 'application/json'
      }})
      console.log(response.data); // Now this works
           
      setForm({
        name: '',
        email: '',
        phone: '',
        vehicleType: '',
        make: '',
        model: '',
        color: '',
        services: [],
        notes: ''
      });
    if (form.services.length === 0) {
      newErrors.services = 'Please select at least one service.';
    }
if (Object.keys(newErrors).length > 0) {
  setErrorMessage('Required fields are missing.');
  setErrors(newErrors);
  return;
} else {
  setErrorMessage(''); // ✅ Clear general error if all fields are now valid
}
      setErrors({});
      setPhone('');
      setSubmissionMessage(
        '✅ Your job has been submitted! A confirmation email has been sent. A representative will call you shortly to schedule your service.'
      );}
      catch (err) {
        console.error(err);
        toast.success('✅ Job submitted! Check your email for confirmation.');
        setSubmissionErrorMessage("Something went wrong.");
      } finally {
        setIsSubmitting(false);
      }
  };

  return (
    <div>
      <Header />
      <div className="quote-container">
        <h1>Request a Quote</h1>
        <p className="service-detail-intro">
  Fill out the form below to request a quote. We'll get back to you promptly!
</p>
        <form className="quote-form" onSubmit={handleSubmit}>
<h3 className="fill-info">Fields marked with * are required.</h3>
            <label>
                Name *
          <input name="name" placeholder="Your Name" value={form.name} onChange={(e) => { 
  setForm({ ...form, name: e.target.value });
if (e.target.value) {
  setErrors((prevErrors) => ({ ...prevErrors, name: '' })); // Clear the error
}
setTimeout(checkAllFieldsFilled, 0);
}}/></label>
{errors.name && <div className="error-message">{errors.name}</div>}
          <label>
            Email *
          <input name="email" placeholder="Your Email" value={form.email} onChange={(e) => { 
  setForm({ ...form, email: e.target.value });
if (e.target.value) {
  setErrors((prevErrors) => ({ ...prevErrors, email: '' })); // Clear the error
}
setTimeout(checkAllFieldsFilled, 0);
}}/></label>
{errors.email && <div className="error-message">{errors.email}</div>}
          <label>
            Phone *
            <input
                    name="phone"
                    type="text"
                    className="phone-box"
                    text="phone--input"
                    placeholder="Enter Phone Number"
                    value={phone} // Bind to phone state
                    onChange={handlePhoneChange}
                  />
          </label>
          {errors.phone && <div className="error-message">{errors.phone}</div>}
          <label>
            Vehicle Type *
          <select name="vehicleType" value={form.vehicleType} onChange={(e) => {
            setForm({ ...form, vehicleType: e.target.value});
            if (e.target.value) {
                setErrors((prevErrors) => ({ ...prevErrors, vehicleType: ''}));
            }
            setTimeout(checkAllFieldsFilled, 0);
          }}>
            <option value="">Select Vehicle Type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Truck">Truck</option>
          </select>
</label>
{errors.vehicleType && <div className="error-message">{errors.vehicleType}</div>}
<label>
    Make *
          <input name="make" placeholder="Vehicle Make" value={form.make} onChange={(e) => {
            setForm({ ...form, make: e.target.value});
            if (e.target.value) {
                setErrors((prevErrors) => ({ ...prevErrors, make: ''}));
            }
            setTimeout(checkAllFieldsFilled, 0);
          }}/></label>
          {errors.make && <div className="error-message">{errors.make}</div>}
          <label>
            Model *
          <input name="model" placeholder="Vehicle Model" value={form.model} onChange={(e) => {
            setForm({ ...form, model: e.target.value});
            if (e.target.value) {
                setErrors((prevErrors) => ({ ...prevErrors, model: ''}));
            }
            setTimeout(checkAllFieldsFilled, 0);
          }}/></label>
          {errors.model && <div className="error-message">{errors.model}</div>}
          <label>
            Color *
          <input name="color" placeholder="Vehicle Color" value={form.color} onChange={(e) => {
            setForm({ ...form, color: e.target.value});
            if (e.target.value) {
                setErrors((prevErrors) => ({ ...prevErrors, color: ''}));
            }
            setTimeout(checkAllFieldsFilled, 0);
          }}/></label>
          {errors.color && <div className="error-message">{errors.color}</div>}

<fieldset>
  <legend className="legend-service">Select Services *</legend>
  <p className="legend-apply">Select all that apply</p>
  {[
    "Express Detail",
    "12-Month Ceramic/Graphene Spray",
    "Pet Hair Removal",
    "Steam Cleaning",
    "Carpet/Upholstery Extraction",
    "Leather Conditioning",
    "Engine Detail",
    "Headlight Restoration",
    "3-Year Ceramic Coating",
    "5-Year Ceramic Coating",
    "9-Year Ceramic Coating",
    "Glass Ceramic Coating",
    "Wheel Face Ceramic Coating",
    "Interior Leather Ceramic Coating",
    "Paint Polish/Enhancement",
    "1-Step Paint Correction",
    "2-Step Paint Correction"
  ].map((service, index) => (
    <label key={index}>
      <input
        type="checkbox"
        value={service}
        checked={form.services.includes(service)}
        onChange={handleServiceToggle}
      />
      {service}
    </label>
  ))}
  {errors.services && <div className="error-message">{errors.services}</div>}
</fieldset>

            <label>
                Additional Notes:
          <textarea name="notes" placeholder="Additional Notes" value={form.notes} onChange={handleChange} /></label>
          <div className="liability-section">
  <h2 className="liability-title">Liability Agreement</h2>
  <p className="liability-intro">Before proceeding, please read and acknowledge each item below:</p>
<ul className="service-summary">
  <li>Full Exterior Prep & Decontamination</li>
  <li>1–3 Layer Ceramic Coating Application</li>
  <li>Wheels and Windows Optionally Coated</li>
  <li>Protection Duration: 2–5 Years</li>
  <li><strong>$399–$799 (Approx. 4–6 hrs)</strong></li>
</ul>
  {liabilityChecklist.map((item, index) => (
    <label key={index} className="liability-checkbox">
      <input
        type="checkbox"
        checked={waiverChecks[index]}
        onChange={() => handleCheckboxChange(index)}
      />
      {item}
    </label>
  ))}

  <label className="signature-label">
    Signature (type your full name) *
    <input
      type="text"
      name="signature"
      value={signature}
      onChange={(e) => setSignature(e.target.value)}
    />
  </label>
  {waiverChecks.includes(false) || signature.trim() === '' ? (
  <p className="important-note">
    Please read, check all checkboxes and type your full name before submitting quote.
  </p>
) : null}
</div>
 <div className="submit-button-wrapper">
<button
  type="submit"
  className="quote-service-button"
  disabled={
    isSubmitting ||
    waiverChecks.includes(false) || 
    signature.trim() === ''
  }
>
    {isSubmitting ? (
      <div className="spinner-button">
        <span className="spinner"></span> Submitting...
      </div>
    ) : (
      'Request Quote'
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

        <p className="quote-info-note">
          📞 A representative will call you shortly to schedule your service.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default ServiceQuote;
