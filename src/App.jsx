import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css"
import Loginform from "./Components/LoginModal/LoginForm"
import Navbar from "./Components/Navbar/Navbarcomp"
import Footer from "./Components/Footer/Footer"
import DeveloperResources from "./Components/DevRescomp/DeveloperResource"


const App = () => {

// Function to check authentication
const isAuthenticated = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify`, { withCredentials: true });
    return response.data.success;
  } catch (error) {
    return false;
  }
};
const getAuthToken = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find(row => row.startsWith("authToken="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};
// Protected Route Wrapper
const ProtectedRoute = ({ element }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
       const authenticated = await isAuthenticated();
      // if (!authenticated) {
      //   document.cookie = "site=dev; path=/; domain=localhost";
      //   window.location.href = "http://localhost:49440/Account/Login"; // Redirect on failure
      // }
      // setAuth(authenticated);
      const token = getAuthToken();
  if (token) {
    console.log("Encrypted Token:", token);
    setAuth(true);
  } else {
    document.cookie = "site=dev; path=/;SameSite=None; Secure; domain=sandbox.e-consystems.com";
    window.location.href = "https://www.sandbox.e-consystems.com/auth/Account/Login"; // Redirect to auth app if no token
  }
    };
    checkAuth();
  }, []);

  if (auth === null) return <p>Loading...</p>; // Prevents flickering
  return auth ? element : <Navigate to="" replace />;
};


  return (
      <BrowserRouter>
        <div className='fixed-container'>

      <Navbar />
      <Routes>
        <Route path="/login" element={<Loginform />} />
        <Route path="/" element={<ProtectedRoute element={<DeveloperResources />} />} />
      </Routes>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
