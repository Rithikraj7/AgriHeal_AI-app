import React from "react";
import { Facebook, X, LinkedIn, Instagram } from "@mui/icons-material";
import "./Footer.css"; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">AgriHeal AI</div>
        <p className="footer-text">AI-Powered Crop Protection: Detect, Prevent, and Optimize Yields.</p>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/rithik-r-b14144244/" target="_blank" rel="noopener noreferrer">
            <Facebook className="icon" />
          </a>
          <a href="https://www.linkedin.com/in/rithik-r-b14144244/" target="_blank" rel="noopener noreferrer">
            <X className="icon" />
          </a>
          <a href="https://www.linkedin.com/in/rithik-r-b14144244/" target="_blank" rel="noopener noreferrer">
            <LinkedIn className="icon" />
          </a>
          <a href="https://www.linkedin.com/in/rithik-r-b14144244/" target="_blank" rel="noopener noreferrer">
            <Instagram className="icon" />
          </a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} AgriHeal AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
