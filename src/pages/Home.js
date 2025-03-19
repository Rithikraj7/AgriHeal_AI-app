import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ImageUpload from '../components/ImageUpload';
import DiseaseResult from '../components/DiseaseResult';
import VideoTutorials from '../components/VideoTutorials';
import DeficiencyResult from '../components/DeficiencyResult';
import DiseaseAnalysis from '../components/DiseaseAnalysis';
import DownloadReport from '../components/DownloadReport';
import "./Home.css";
// Fills the viewport (minus ~64px for navbar) and allows scroll only if needed
const PageWrapper = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;  /* Vertically center if there's little content */
  align-items: center;
  overflow-y: auto;         /* Only scroll if content exceeds the viewport */
  background-color: #f5f5f5;
  padding: 20px 0;          /* Some vertical spacing */
`;

const GlassContainer = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  /* Responsive width to avoid forcing scroll on small screens */
  width: 90%;
  max-width: 800px;
  margin: 0 auto;

  /* Reduced padding so a single card won't trigger scroll */
  padding: 30px;
  text-align: center; 
  font-size: 1.1rem;
`;

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  const [result, setResult] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading , setLoading] = useState();
  const [uploadedFile, setUploadedFile] = useState(null); // Store uploaded file

  const handleImageUpload = async (file) => {
    setUploadedFile(file); // Store file in state for use in DownloadReport
    console.log("Uploading image:", file);
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        console.log("API Response:", jsonResponse);

        if (jsonResponse.status === "success") {
            const data = jsonResponse.data;

            // Function to clean and convert Base64 to Blob
            const base64ToBlob = (base64String, mimeType = "image/png") => {
                if (!base64String) return null;

                // Remove metadata if present (e.g., "data:image/png;base64,")
                const cleanBase64 = base64String.includes("base64,")
                    ? base64String.split("base64,")[1]
                    : base64String;

                try {
                    const byteCharacters = atob(cleanBase64);
                    const byteArrays = [];
                    for (let i = 0; i < byteCharacters.length; i += 512) {
                        const slice = byteCharacters.slice(i, i + 512);
                        const byteNumbers = new Array(slice.length);
                        for (let j = 0; j < slice.length; j++) {
                            byteNumbers[j] = slice.charCodeAt(j);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        byteArrays.push(byteArray);
                    }
                    return new Blob(byteArrays, { type: mimeType });
                } catch (error) {
                    console.error("Invalid Base64 string:", error);
                    return null;
                }
            };

            // Convert base64 images to Blobs and create URLs
            const diseaseAffectedBlob = base64ToBlob(data.disease_affected);
            const affectedGraphBlob = base64ToBlob(data.affected_graph);
            const yieldGraphBlob = base64ToBlob(data.yield_graph);
            console.log(diseaseAffectedBlob)

            const result = {
                disease: data.disease,
                severity: data.severity,
                confidence: `${(data.confidence * 100).toFixed(0)}`,
                precautions: data.precautions.join("\n"),
                timestamp: new Date().toLocaleString(),
                predictedDeficiency: data.predicted_deficiency,
                deficiencyScore: `${data.deficiency_score.toFixed(2)}%`,
                deficiencyScoresList: data.deficiency_scores_list || [],
                diseaseAffectedImage: diseaseAffectedBlob ? URL.createObjectURL(diseaseAffectedBlob) : null,
                affectedGraph: affectedGraphBlob ? URL.createObjectURL(affectedGraphBlob) : null,
                yieldGraph: yieldGraphBlob ? URL.createObjectURL(yieldGraphBlob) : null,
                diseaseAnalysis: data.disease_analysis || [],
                affectedAnalysis: data.affected_analysis || [],
            };

            // Retrieve existing history from localStorage
            const existingHistory = JSON.parse(localStorage.getItem("detectionHistory")) || [];

            // Add new result to history and save it
            const updatedHistory = [result, ...existingHistory]; // Newest first
            localStorage.setItem("detectionHistory", JSON.stringify(updatedHistory));

            const videos = data.video_link
                .filter((link) => link.includes("youtube.com"))
                .map((link, index) => ({
                    url: link,
                    title: `Treatment Video ${index + 1}`,
                }));

            console.log(videos);

            setResult(result);
            setVideos(videos);
        } else {
            console.error("Error from API:", jsonResponse.message);
        }
    } catch (error) {
        console.error("Error uploading image:", error);
    }
    finally {
      setLoading(false); // Stop loading after API response
  }
};

  
  
  
  

  return (
    <PageWrapper>
      <GlassContainer>
        {/* 1. Image Upload */}
        <ImageUpload onImageUpload={handleImageUpload} />
        {/* Show Loading Spinner if API is processing */}
    {loading && (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Processing... Please wait</p>
      </div>
    )}


        {/* 2. Disease Result (appears only after image upload) */}
        <DiseaseResult result={result} />

        <DeficiencyResult result={result} />

        <DiseaseAnalysis result={result} />
        {/* 3. Video Tutorials (appears only after image upload) */}
        <VideoTutorials videos={videos} />

        <DownloadReport result={result} file={uploadedFile} />
      </GlassContainer>
    </PageWrapper>
  );
};

export default Home;
