import React from 'react';
import {Routes, Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {Home} from "./pages";
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true
function App() {
  return (
    <>
    <Toaster position="top-center" toastOptions={{duration: 2000}}></Toaster>
    <Routes>
      <Route path="/" element={<Home/>}/>
      </Routes>
    </>
  );
};
export default App;
