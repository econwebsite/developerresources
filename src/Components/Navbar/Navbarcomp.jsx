import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiHomeFill, RiCustomerService2Fill, RiArticleFill, RiAccountCircleFill, RiShoppingCartFill, RiPhoneFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import axios from "axios";
import "./Navbar.css";
import logo from "../../assets/footerlogo-1.svg";

const Navbar = () => {
  const navigate = useNavigate();
 
  const handleLogout = async () => {
    try {
      

      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, { withCredentials: true });
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      Cookies.remove("authToken", { path: "/" });
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login"); 
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
    

    
  
  return (
<div className="total-nav">
    <nav className="nav-bar">
          <div className="mainContainer">
<div className="nav-bar">
      <div className="nav-bar-left">
        <img src={logo} className="nav-bar-logo" alt="LOGO" />
      </div>

      <ul className="nav-bar-links">
        <li>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <RiHomeFill className="nav-icon" /> Home
          </a>
        </li>
        <li>
          <a href="https://www.e-consystems.com/support.asp" target="_blank" rel="noopener noreferrer">
            <RiCustomerService2Fill className="nav-icon" /> Tech Support
          </a>
        </li>
        <li>
          <a href="https://www.e-consystems.com/blog/camera/" target="_blank" rel="noopener noreferrer">
            <RiArticleFill className="nav-icon" /> Blog
          </a>
        </li>
        <li>
          <a href="https://developer.e-consystems.com/Account/Profile" target="_blank" rel="noopener noreferrer">
            <RiAccountCircleFill className="nav-icon" /> My Account
          </a>
        </li>
        <li>
          <a href="https://www.e-consystems.com/webstore.asp" target="_blank" rel="noopener noreferrer">
            <RiShoppingCartFill className="nav-icon" /> Store
          </a>
        </li>
      </ul>

      {/* Contact & Logout Buttons */}
      <div className="nav-bar-right">
        <button className="nav-bar-contact" onClick={() => window.location.href = "tel:+914087667503"}>
          <RiPhoneFill className="nav-bar-phone-icon" />
          <span>+1 408 766 7503</span>
        </button>
        <button className="nav-bar-logout" onClick={handleLogout}>
          <FiLogOut className="nav-bar-logout-icon" />
          <span>Logout</span>
        </button>
      </div>
      </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
