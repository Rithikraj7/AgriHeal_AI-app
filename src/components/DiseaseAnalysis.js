import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";

const DiseaseAnalysis = ({ result }) => {
  if (!result) return null;

  // Extract data with fallback values
  const diseaseImage = result.diseaseAffectedImage || "";
  const affectedGraph = result.affectedGraph || "";
  const yieldGraph = result.yieldGraph || "";
  const diseaseAnalysis = result.diseaseAnalysis || [];
  const affectedAnalysis = result.affectedAnalysis || [];


  // Function to render analysis as bullet points
  const renderAnalysis = (analysis) =>
    analysis.map((point, index) => (
      <li key={index}>
        <Typography variant="body2">{point}</Typography>
      </li>
    ));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 900,
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        p: 3,
        backgroundColor: "#fff",
        mt: 2,
      }}
    >
      <Card sx={{ width: "100%", textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }} color="primary">
            Disease Analysis Report
          </Typography>

          {/* Disease Image */}
          {diseaseImage && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Disease Affected Leaf
              </Typography>
              <img
                src={diseaseImage}
                alt="Disease Affected"
                style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "8px", marginTop: 8 }}
              />
            </Box>
          )}

          {/* Disease Analysis */}
          <Divider />
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
            Disease Analysis
          </Typography>
          <ul style={{ textAlign: "left", marginLeft: "20px" }}>{renderAnalysis(diseaseAnalysis)}</ul>

          {/* Affected Area Graph */}
          {affectedGraph && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Affected Leaf Area
              </Typography>
              <img
                src={affectedGraph}
                alt="Affected Leaf Area"
                style={{ width: "100%", maxHeight: "550px", objectFit: "cover", borderRadius: "8px", marginTop: 8 }}
              />
            </Box>
          )}

          {/* Affected Analysis */}
          <Divider />
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
            Affected Area Analysis
          </Typography>
          <ul style={{ textAlign: "left", marginLeft: "20px" }}>{renderAnalysis(affectedAnalysis)}</ul>

          {/* Yield Loss Graph */}
          {yieldGraph && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Estimated Yield Loss
              </Typography>
              <img
                src={yieldGraph}
                alt="Yield Loss"
                style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "8px", marginTop: 8 }}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DiseaseAnalysis;
