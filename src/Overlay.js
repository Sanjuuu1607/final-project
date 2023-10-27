import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

function WebcamWithOverlay() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      imageRef.current.src = imageUrl;
    }
  };

  useEffect(() => {
    const loadFaceAPI = async () => {
      // Load face-api.js models and configurations
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    };

    const startVideo = async () => {
      const video = webcamRef.current;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
        } catch (error) {
          console.error('Error accessing the webcam:', error);
        }
      } else {
        console.error('getUserMedia is not supported by this browser.');
      }
    };

    const detectFaceAndExpressions = async () => {
      const video = webcamRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      video.addEventListener('play', async () => {
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        const faceDetector = new faceapi.TinyFaceDetectorOptions();
        const landmarks = new faceapi.draw.DrawFaceLandmarksOptions();
        const expressions = new faceapi.draw.DrawTextFieldOptions();

        const updateCanvas = async () => {
          const detections = await faceapi.detectAllFaces(video, faceDetector).withFaceLandmarks().withFaceDescriptors().withFaceExpressions();
          context.clearRect(0, 0, canvas.width, canvas.height);

          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections, landmarks);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections, expressions);

          // Overlay the image on top of the canvas
          const overlayImage = imageRef.current;
          context.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);

          requestAnimationFrame(updateCanvas);
        };

        updateCanvas();
      });
    };

    loadFaceAPI();
    startVideo();
    detectFaceAndExpressions();
  }, []);

  return (
    <div className="WebcamWithOverlay">
      <video ref={webcamRef} autoPlay playsInline muted />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <img ref={imageRef} style={{ display: 'none' }} />
    </div>
  );
}

export default WebcamWithOverlay;
