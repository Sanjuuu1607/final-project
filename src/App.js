import React from "react";
import Navbar from "./Navbar";
import WebcamVideo from "./video";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Customize from "./customize";

const headingStyle = {
  color: "white",
  fontSize: "46px",
  fontFamily: "monospace",
  textAlign: "center", // Center align the text
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/customize' element={<Customize />} />
        <Route path='/video' element={<WebcamVideo />} />
      </Routes>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === '/' && (
        <center>
          <h1 style={headingStyle}>Avatars for webcam</h1>
        </center>
      )}
    </div>
  );
};

export default App;
