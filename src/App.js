import React from 'react';
import {Routes, Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {Home, Error, Services, Testimonials, ContactUs, ServiceQuote} from "./pages";
import axios from 'axios';
axios.defaults.baseURL = 'https://high-vis-server.onrender.com'
axios.defaults.withCredentials = true
function App() {
  return (
    <>
    <Toaster position="top-center" toastOptions={{duration: 2000}}></Toaster>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="*" element={<Error/>}/>
      <Route path="/testimonials" element={<Testimonials/>}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/services/service-quote" element={<ServiceQuote/>}/>
      <Route path="/contact-us" element={<ContactUs/>}/>
      </Routes>
    </>
  );
};
export default App;
