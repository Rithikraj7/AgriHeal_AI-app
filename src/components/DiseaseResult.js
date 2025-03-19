import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box
} from '@mui/material';

const DiseaseResult = ({ result }) => {
  // If no result is available, do not render anything
  if (!result) return null;
  console.log(typeof result.confidence)
  // Severity is expected to be a number between 0-100
  const severityValue = typeof result.confidence === 'string' ? result.confidence : 50;

  // Convert the recommendation string into bullet points
  // Example: "Apply fungicide. Remove infected leaves." -> ["Apply fungicide", "Remove infected leaves"]
  const precautionsList = result.precautions
    ? result.precautions.split('.').map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <Box
      sx={{
        width: '100%',
    maxWidth: 800,
    margin: '1 auto',
    boxShadow: 3,
    borderRadius: 2,
    p: 2,
    backgroundColor: '#fff',
    marginTop:2,
      }}
    >
      <Card sx={{
          // Make the card responsive and centered
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          // Ensure we can see the button on mobile by reducing minHeight for smaller screens
        }}>
        <CardContent 
        sx={{
            width: '100%',
            height: '40%',
            flexDirection: 'column',
          }}>
          {/* Disease in bold */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold' }}
            color="warning.main"
          >
            Detected Disease: {result.disease}
          </Typography>

          {/* Progress bar showing severity percentage */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Severity: {severityValue}% {result.severity}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={severityValue}
              sx={{ height: 10, borderRadius: 5, mt: 1 }}
            />
          </Box>

          {/* Precautions heading */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 3 }}>
            Precautions
          </Typography>
          {/* Bullet list of precautions */}
          <Box
            component="ul"
            sx={{
              textAlign: 'left',
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: '80%',
              mt: 1,
            }}
          >
            {precautionsList.map((point, index) => (
              <li key={index}>
                <Typography variant="body2">{point}</Typography>
              </li>
            ))}
          </Box>
        </CardContent>
      </Card>

    </Box>
  );
};

export default DiseaseResult;
