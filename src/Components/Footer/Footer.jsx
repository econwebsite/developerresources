import React from "react";
import './Footer.css'; 
// import ModalButton from '../../ModelForm/ModalButton';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <ul> 
<li><a href="https://www.e-consystems.com/aboutus.asp" target="_blank" rel="noopener noreferrer">About Us</a></li>
<li><a href="https://www.e-consystems.com/webstore.asp" target="_blank" rel="noopener noreferrer">Online Store</a></li>
<li><a href="https://www.e-consystems.com/RMA-Policy.asp" target="_blank" rel="noopener noreferrer">RMA Policy</a></li>
<li><a href="https://store.e-consystems.com/cart" target="_blank" rel="noopener noreferrer">View Cart</a></li>
<li><a href="https://www.e-consystems.com/warranty.asp" target="_blank" rel="noopener noreferrer">Warranty</a></li>
<li><a href="https://www.e-consystems.com/privacy_policy.asp" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>



        </ul>
      </div>

      <div className="footer-column social">
        
      <ul>
      <li><a href="https://www.e-consystems.com/getquote.asp" target="_blank" rel="noopener noreferrer">COntact Us</a></li>
      <li><a href="https://www.e-consystems.com/getquote.asp" target="_blank" rel="noopener noreferrer">Get Quote</a></li>
<li><a href="https://www.e-consystems.com/product-compliance-declaration.asp" target="_blank" rel="noopener noreferrer">Product Compliance</a></li>
<li><a href="https://www.e-consystems.com/support.asp" target="_blank" rel="noopener noreferrer">Support Center</a></li>
<li><a href="https://www.e-consystems.com/terms-and-conditions.asp" target="_blank" rel="noopener noreferrer">Terms and Conditions</a></li>

        </ul>
       
      </div>

      <div className="footer-column3">
        <h3>Get Latest Update</h3>
        <div className="footer-email-section">
          <input type="email" placeholder="Enter your email" />
          <button>Proceed</button>
        </div>
        <br></br>
        <div className="footer-social-icons">
        <a href="https://twitter.com/econsystems" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-twitter"></i>
</a>
<a href="https://www.facebook.com/econSystems" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-facebook-f"></i>
</a>
<a href="https://www.youtube.com/user/econsystems" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-youtube"></i>
</a>
<a href="http://www.linkedin.com/company/209967" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-linkedin-in"></i>
</a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
