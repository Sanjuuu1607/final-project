import React from "react";
import Webcam from "react-webcam";
import WebcamWithOverlay from "./Overlay";

function WebcamVideo() {
  return (
    <div>
      <WebcamWithOverlay /> {/* Render the WebcamWithOverlay component */}
    </div>
  );
}

export default WebcamVideo;
