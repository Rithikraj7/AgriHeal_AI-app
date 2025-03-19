import React from "react";
import { Card, CardContent, Typography, LinearProgress, Box } from "@mui/material";

const DeficiencyResult = ({ result }) => {
  if (!result) return null;

  console.log(result)
  // Extract the highest deficiency
  const predictedDeficiency = result.predictedDeficiency;
  const deficiencyScore = result.deficiencyScore;
  console.log(predictedDeficiency)
  // Parse deficiency scores from strings to structured data
  const deficiencyScores = result.deficiencyScoresList?.map((entry) => {
    const match = entry.match(/(.+): Similarity Score = ([\d.]+)%/);
    return match ? { name: match[1], score: parseFloat(match[2]) } : null;
  }).filter(Boolean);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 800,
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        p: 2,
        backgroundColor: "#fff",
        marginTop: 2,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CardContent sx={{ width: "100%", height: "40%", flexDirection: "column" }}>
          {/* Predicted Deficiency */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }} color="warning.main">
            Predicted Deficiency: {predictedDeficiency} {deficiencyScore}
          </Typography>

          {/* Progress bars for each deficiency */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
              Deficiency Similarity Scores
            </Typography>
            {deficiencyScores.map((def, index) => (
              <Box key={index} sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {def.name}: {def.score}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={def.score}
                  sx={{ height: 10, borderRadius: 5, mt: 1 }}
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DeficiencyResult;
