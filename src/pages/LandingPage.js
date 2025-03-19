import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Import the external CSS file
import aiFarming from "../img/AI-agriculture.jpeg";
import diseaseDetection from "../img/Plant Disease Detection.jpg";
import nutrientDeficiency from "../img/Nutrient Deficiency Analysis.jpg";
import cropMonitoring from "../img/AI-Powered Crop Monitoring.png";
import reports from "../img/Customized Reports & Insights.jpg";
import screenSOne from "../img/ss1.png"
import screenSTwo from "../img/ss2.png"
import screenSThree from "../img/ss4.png"

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">AgriHeal AI</h1>
        <p className="hero-subtitle">Harnessing AI to Detect Diseases & Nutrient Deficiencies in Crops</p>

        <button onClick={() => navigate("AgriHeal_AI-app/detect")} className="detect-button">
          Detect Now
        </button>
      </div>

      {/* About Section */}
      <section className="about-section">
        <h2 className="section-title">About AgriHeal AI</h2>

        <div className="about-content">
          <img
            src={aiFarming}
            alt="AI in Farming"
            className="about-image"
          />
          <p className="about-text">
            AgriHeal AI is an <b>AI-powered plant disease detection</b> system designed to help farmers and agricultural 
            professionals identify plant diseases, nutrient deficiencies, and recommend treatment solutions.  
            <br /><br />
            Using <b>computer vision, deep learning, and AI-driven analytics</b>, AgriHeal AI ensures <b>real-time, accurate diagnosis</b> 
            and suggests the best interventions to <b>improve crop health and maximize yield</b>.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="section-title">Our Services</h2>

        <div className="services-container">
          <div className="service-card">
            <img src={diseaseDetection} alt="Disease Detection" className="service-image" />
            <h4 className="service-title">Plant Disease Detection</h4>
            <p className="service-description">
              Detect plant diseases using AI-powered image analysis and get <b>instant diagnosis</b> along with treatment recommendations.
            </p>
          </div>

          <div className="service-card">
            <img src={nutrientDeficiency} alt="Nutrient Deficiency" className="service-image" />
            <h4 className="service-title">Nutrient Deficiency Analysis</h4>
            <p className="service-description">
              Identify <b>nutrient deficiencies</b> like <b>Nitrogen, Phosphorus, Potassium</b> and get precise recommendations 
              to improve soil and plant health.
            </p>
          </div>

          <div className="service-card">
            <img src={cropMonitoring} alt="AI Crop Monitoring" className="service-image" />
            <h4 className="service-title">AI-Powered Crop Monitoring</h4>
            <p className="service-description">
              Use <b>AI and satellite imaging</b> to monitor crop growth, detect stress, and <b>prevent losses before they happen</b>.
            </p>
          </div>

          <div className="service-card">
            <img src={reports} alt="Reports & Insights" className="service-image" />
            <h4 className="service-title">Customized Reports & Insights</h4>
            <p className="service-description">
              Generate <b>detailed reports</b> with AI-driven insights, yield predictions, and <b>treatment recommendations</b> 
              for better farm management.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
<section className="how-it-works">
  <h2 className="section-title">How It Works</h2>
  <div className="steps-container">
    
    {/* Step 1: Upload Image */}
    <div className="step">
      <img src={screenSOne} alt="Upload" className="step-img"/>
      <h3>1. Upload an Image</h3>
      <p>Take a photo of your plant and upload it to our AI-powered system.</p>
    </div>

    {/* Step 2: AI Detection */}
    <div className="step">
      <img src={screenSTwo} alt="AI Analysis" className="step-img"/>
      <h3>2. AI Analysis</h3>
      <p>Our deep-learning model identifies diseases and nutrient deficiencies.</p>
    </div>

    {/* Step 3: Get Solutions */}
    <div className="step">
      <img src={screenSThree} alt="Get Solution" className="step-img"/>
      <h3>3. Get Treatment & Reports</h3>
      <p>Receive AI-driven treatment suggestions and a downloadable report.</p>
    </div>
  
  </div>
</section>

    </div>
  );
};

export default LandingPage;
