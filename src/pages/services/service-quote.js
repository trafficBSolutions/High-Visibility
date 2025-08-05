import React, { useState } from 'react';
import Header from '../../components/headers/QuoteHeader';
import Footer from '../../components/footers/QuoteFooter';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ServiceQuote = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', vehicleType: '', make: '', model: '', color: '', city: '',
    services: [], notes: '', photos: ''
  });
const liabilityChecklist = [
  "Release of Liability - I hereby waive, release, and discharge High Visibility Detailing LLC, its owners, employees, agents, and contractors from any and all claims, damages, or liability for any loss, damage, or injury to my vehicle or personal property that may arise during or after the detailing process, regardless of cause.",
  "Voluntary Services Request - I am voluntarily requesting and authorizing services provided by High Visibility Detailing LLC. These services may include, but are not limited to, exterior/interior cleaning, waxing, polishing, paint correction, steam cleaning, and/or ceramic coating.",
  "As-Is and Pre-Existing Conditions - I acknowledge that my vehicle is being detailed in as-is condition. High Visibility Detailing LLC is not responsible for pre-existing damage including, but not limited to, scratches, dents, paint imperfections, rust, clear coat failure, or damaged interior materials.",
  "Photos and Documentation - I authorize High Visibility Detailing LLC to take before/after photos of my vehicle for documentation and/or marketing purposes. No identifying personal information will be disclosed.",
  "Personal Items and Car Seats - I acknowledge that I am responsible for removing all valuables and personal items from my vehicle PRIOR to service, including but not limited to electronics, accessories, child car seats, and booster seats. Removal of these items by High Visibility Detailing LLC during service may incur additional charges. High Visibility Detailing LLC is not responsible for any lost, stolen, damaged, or improperly reinstalled items. I understand that if a car seat is left in the vehicle, it may be moved or adjusted during cleaning, and I release High Visibility Detailing LLC from any liability related to its reinstallation, fitment, or use after service. It is my sole responsibility to check and reinstall any car seat properly before transporting a child.",
  "Pet Hair, Stains, and Build-Up/Grime - I understand that pet hair, stains, and heavy build-up/grime is difficult to remove entirely. High Visibility Detailing LLC will make a reasonable effort, but I acknowledge that full removal may not be possible and/or may incur additional charges.",
  "Engine Detailing/Cleaning - I understand that while care is taken during engine bay cleaning, this area contains sensitive electrical components and aftermarket modifications. I release High Visibility Detailing LLC from any liability related to damage, starting issues, check engine lights, or other complications that may arise during or after engine bay detailing.",
  "Non-OEM and Aftermarket Parts/Accessories - I acknowledge that aftermarket parts, wraps, decals, emblems, and accessories may be more prone to damage during detailing. High Visibility Detailing LLC will take precautions but is not responsible for damage to any non-OEM parts or improperly installed components.",
  "Headliners - I understand that vehicle headliners are delicate and often glued to foam or fabric that can loosen or sag if agitated or overly wet. High Visibility Detailing LLC will only perform light cleaning on headliners and assumes no responsibility for any sagging, detachment, or staining that may occur during or after cleaning.",
  "Aftercare and Maintenance - I understand that certain services such as ceramic coatings, interior treatments, etc. may require proper aftercare. High Visibility Detailing LLC is not responsible for any issues arising from failure to follow provided aftercare instructions.",
  "Cancellation Policies - I agree to any posted cancellation policy and agree that payment is due upon completion of services unless otherwise arranged. I understand and acknowledge that if I cancel or reschedule my appointment within 36 hours of the scheduled service time, or fail to be present at the agreed-upon location and time, I may be charged a late cancellation fee of $49. This fee covers lost time and travel costs. These cancellation charges apply to all bookings through the website, phone, text, email, social media, in-person, etc.",
  "Mobile-Service Risk Factors - I understand that High Visibility Detailing LLC is a mobile service and factors beyond control can be affected by detailing outside, sunlight exposure during service, and in locations where the environment cannot be controlled will affect the outcome of results. Even though deionized water is used, water spotting can still occur due to weather and sunlight exposure during service. To minimize and avoid water spotting, it is best for the vehicle to be placed in a location where there is little to no direct sunlight."
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
  const [photos, setPhotos] = useState([]);
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
      'make', 'model', 'color', 'city'];
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
        if (field === 'city') fieldLabel = 'City';
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
const formData = new FormData();
for (let key in form) {
  formData.append(key, form[key]);
}
photos.forEach((photo) => {
  formData.append('photos', photo);
});

const response = await axios.post('/service-quote', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
      console.log(response.data); // Now this works
           
      setForm({
        name: '',
        email: '',
        phone: '',
        vehicleType: '',
        make: '',
        model: '',
        color: '',
        city: '',
        services: [],
        notes: '',
        photos: ''
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
<p className="condition-note">
  *All Detail Services and Pricing is based on vehicle size and condition. Please be aware and understand the condition of your vehicle and the service you can expect. A pre-Inspection will be completed each and every service visit and documented via photographs/video to determine both condition and if services booked meet each customer's final expectations. Prices subject to change due to vehicle's additional services required.
</p>

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
<label>
            Location *
            <p className="travel-note">
  *Travel fees of $1 per minute outside of 30 minutes from Calhoun, Georgia.
</p>

          <input name="city" placeholder="Location" value={form.city} onChange={(e) => {
            setForm({ ...form, city: e.target.value});
            if (e.target.value) {
                setErrors((prevErrors) => ({ ...prevErrors, city: ''}));
            }
            setTimeout(checkAllFieldsFilled, 0);
          }}/></label>
          {errors.city && <div className="error-message">{errors.city}</div>}
<fieldset>
  <legend className="legend-service">Select Services *</legend>
  <p className="legend-apply">Select all that apply</p>
  {[
  "Express Detail - $119–$149",
  "12-Month Ceramic/Graphene Spray (lasts up to 12 months and includes light clay treatment and chemical decontamination of the paint) - $89–$99",
  "Pet Hair Removal - $49–$149",
  "Steam Cleaning - $69–$159",
  "Carpet/Upholstery Extraction - $59–$299",
  "Leather Conditioning - $39–$79",
  "Engine Detail - $29–$49",
  "Headlight Restoration - $79–$99",
  "Truck Bed Detail - $29–$59",
  "Headliner Detail - $29–$69",
  "Interior Stains Spot Detail - $19",
  "Water Spot Removal - $29–$129",
  "Artillery Fungus/Overspray Removal - $69–$199",
  "Moderate to Heavy Clay Treatment of Paint - $69–$129",
  "3-Year Ceramic Coating - $699–$849",
  "5-Year Ceramic Coating - $999–$1,149",
  "9-Year Ceramic Coating - $1,499–$1,649",
  "Glass Ceramic Coating - $49–$59",
  "Wheel Face Ceramic Coating - $49–$69",
  "Interior Leather Ceramic Coating - $119–$159",
  "Paint Polish/Enhancement - $149–$199",
  "1-Step Paint Correction - $299–$399",
  "2-Step Paint Correction - $599–$799"
]
.map((service, index) => (
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
  <div className="ceramic-coating-note">
  <h4 className="ceramic-title">Important Ceramic Coating Guidelines</h4>
  <ul className="ceramic-list">
    <li>🛑 <strong>HIGHLY RECOMMENDED:</strong> A garage or enclosed space is ideal for proper curing.</li>
    <li>🚗 Vehicle should not be driven and must stay indoors for <strong>12–48 hours</strong> after service (depending on coating type).</li>
    <li>☔ After that, the vehicle may be driven and is safe in wet/rainy conditions.</li>
    <li>🧼 <strong>Do not wash</strong> the vehicle until <strong>7 days</strong> after coating is applied.</li>
  </ul>
</div>

</fieldset>

            <label>
                Additional Notes:
          <textarea name="notes" placeholder="Additional Notes" value={form.notes} onChange={handleChange} /></label>
<div className="photo-upload-wrapper">
  <label htmlFor="photo-upload" className="custom-upload-button">
    📷 Upload Vehicle Photos
  </label>
  <input
    id="photo-upload"
    type="file"
    name="photos"
    accept="image/*"
    multiple
    style={{ display: 'none' }}
    onChange={(e) => {
      const selectedFiles = Array.from(e.target.files);
      setPhotos((prev) => [...prev, ...selectedFiles]);
    }}
  />

  {photos.length > 0 && (
    <div className="photo-preview-grid">
      {photos.map((photo, index) => (
        <div key={index} className="photo-preview-item">
          <img
            src={URL.createObjectURL(photo)}
            alt={`preview-${index}`}
            className="photo-thumb"
          />
          <button
            type="button"
            className="remove-photo-button"
            onClick={() => {
              const updated = [...photos];
              updated.splice(index, 1);
              setPhotos(updated);
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )}
</div>
          <div className="liability-section">
  <h2 className="liability-title">Liability Agreement</h2>
  <p className="liability-intro">Before proceeding, please read and acknowledge each item below:</p>
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
