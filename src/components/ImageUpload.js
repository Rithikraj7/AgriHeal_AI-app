import React, { useState, useRef } from 'react';
import {
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [permissionDenied, setPermissionDenied] = useState(false);


  // Open File Dialog
  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle Image Upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImage(imgURL);
      onImageUpload(file);
    }
  };

  // Drag & Drop Handlers
  const handleDragOver = (event) => event.preventDefault();
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImage(imgURL);
      onImageUpload(file);
    }
  };

  // Open Camera
  const handleOpenCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setPermissionDenied(true);
    }
  };

  // Capture Image
const handleCaptureImage = async () => {
  if (!videoRef.current) return;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = videoRef.current.videoWidth;
  canvas.height = videoRef.current.videoHeight;
  context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

  canvas.toBlob((blob) => {
    if (blob) {
      // Convert Blob to File
      const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });

      const imageURL = URL.createObjectURL(file); // Create URL for preview
      setImage(imageURL); // Display the captured image on the screen
      onImageUpload(file); // Send the file to the server

      // Stop the camera after capturing
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      setShowCamera(false); // Hide camera preview
    }
  }, 'image/jpeg');
};

// Stop camera and close preview
const handleCloseCamera = () => {
  if (videoRef.current.srcObject) {
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
  }
  setShowCamera(false);
};

// Remove uploaded/captured image & clear results
const handleCancelImage = () => {
  setImage(null);
};

  

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '40vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: { xs: 400, sm: 600, md: 900 },
          boxShadow: 4,
          borderRadius: 2,
          minHeight: { xs: 'auto', sm: '50vh' },
        }}
      >
        <CardContent
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="div" gutterBottom textAlign="center" color="#27AE60" sx={{ fontWeight: 'bold' }}>
            Crop Disease Detection
          </Typography>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />

          {/* Drag & Drop Box */}
          {!image && !showCamera && (
            <Box
              sx={{
                width: '100%',
                border: '4px dashed #4caf50',
                borderRadius: 2,
                padding: { xs: 3, sm: 2 },
                textAlign: 'center',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column', // Stack items vertically
                justifyContent: 'center',
                alignItems: 'center',
                margin: 6,
              }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleFileInputClick}
            >
              <Typography variant="h6" color="textSecondary">
                Drag &amp; drop an image here, or click to select
              </Typography>
              <UploadFileIcon sx={{ fontSize: 100, color: '#4caf50', marginTop: 2 }} />
            </Box>
          )}

          {/* Capture Button */}
          {!showCamera && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<CameraAltIcon />}
              size="large"
              onClick={handleOpenCamera}
            >
              Capture
            </Button>
          )}

          {/* Camera Preview */}
          {showCamera && (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '500px',
                textAlign: 'center',
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ marginTop: 2 }}
                onClick={handleCaptureImage}
              >
                Capture Image
              </Button>
              <Button
            variant="outlined"
            color="error"
            sx={{ marginTop: 1 }}
            onClick={handleCloseCamera}
          >
            Close Camera
          </Button>
            </Box>
          )}


          {/* Image Preview */}
          {image && !showCamera && (
            <Box
              sx={{
                mt: 3,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={handleFileInputClick}
            >
              <img
                src={image}
                alt="Crop Preview"
                style={{
                  width: '100%',
                  maxWidth: '800px',
                  maxHeight: '60vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              />
              <Button
                variant="contained"
                color="error"
                sx={{ position: 'absolute', right: 10 }}
                onClick={handleCancelImage}
              >
                X
              </Button>
            </Box>
          )}

          {/* Canvas for Capturing Image */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </CardContent>
      </Card>
      {/* Permission Denied Dialog */}
      <Dialog open={permissionDenied} onClose={() => setPermissionDenied(false)}>
        <DialogTitle>Camera Permission Denied</DialogTitle>
        <DialogContent>Please enable camera access in your browser settings.</DialogContent>
        <DialogActions>
          <Button onClick={() => setPermissionDenied(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageUpload;
