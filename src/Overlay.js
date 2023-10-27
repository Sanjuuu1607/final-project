import React, { useEffect, useRef } from 'react';

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
    const loadOpenCv = async () => {
      const cv = window.cv;

      const video = webcamRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

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

      const overlayImageOnCanvas = () => {
        if (!video) return;

        // Set canvas size to match video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        const overlayImage = imageRef.current;

        if (overlayImage.complete) {
          const overlayX = 0;
          const overlayY = 0;
          const overlayWidth = video.videoWidth;
          const overlayHeight = video.videoHeight;

          context.drawImage(overlayImage, overlayX, overlayY, overlayWidth, overlayHeight);

          requestAnimationFrame(overlayImageOnCanvas);
        }
      };

      overlayImageOnCanvas();
    };

    loadOpenCv();
  }, []);

  return (
    <div className="WebcamWithOverlay">
      <video ref={webcamRef} autoPlay playsInline muted />
      <canvas ref={canvasRef} />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <img ref={imageRef} style={{ display: 'none' }} />
    </div>
  );
}

export default WebcamWithOverlay;
