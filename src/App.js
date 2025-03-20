import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HistoryPage from './pages/HistoryPage';
import About from './pages/About';
import Navbar from './components/Navbar';
import GlobalStyles from './styles/GlobalStyles';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router basename="/AgriHeal_AI-app">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/detect" element={<Home />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
