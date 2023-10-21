import React, { useEffect, useRef } from 'react';

function WebcamWithOverlay() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Load an image from a URL
  const loadImage = async (imageUrl) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = imageUrl;
    });
  };

  // Overlay the image on the canvas using OpenCV.js
  const overlayImageOnCanvas = (image, cv, canvas, video) => {
    const context = canvas.getContext('2d');

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the webcam frame
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    // Adjust the position and size as needed
    const overlayX = 50;
    const overlayY = 50;
    const overlayWidth = 100;
    const overlayHeight = 100;

    // Use OpenCV.js to overlay the image
    const src = cv.matFromImageData(image);
    const dst = cv.matFromImageData(canvas);
    const overlay = src.clone();

    cv.resize(src, overlay, new cv.Size(overlayWidth, overlayHeight));
    overlay.copyTo(dst.rowRange(overlayY, overlayY + overlayHeight).colRange(overlayX, overlayX + overlayWidth));

    src.delete();
    dst.delete();
    overlay.delete();
  };

  useEffect(() => {
    const loadOpenCv = async () => {
      const cv = await window.cv;

      // Initialize webcam and canvas
      const video = webcamRef.current; // Assign the 'video' variable
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Capture the webcam feed and overlay the image
      const captureFrame = async () => {
        if (video.paused || video.ended) return;

        // Capture webcam frame
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        // Load and process your overlay image
        const overlayImage = await loadImage('avatar/src/avatar (5).png');
        overlayImageOnCanvas(overlayImage, cv, canvas, video);

        // Request the next frame
        requestAnimationFrame(captureFrame);
      };

      // Start capturing frames
      captureFrame();
    };

    loadOpenCv();
  }, []);

  return (
    <div className="WebcamWithOverlay">
      <video ref={webcamRef} autoPlay playsInline muted />
      <canvas ref={canvasRef} />
    </div>
  );
}

export default WebcamWithOverlay;
