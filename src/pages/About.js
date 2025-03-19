import React from "react";
import { Container, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

const About = () => {
  const plantDiseases = [
    { plant: "Apple", diseases: ["Apple Scab", "Cedar Apple Rust", "Black Rot"] },
    { plant: "Blueberry", diseases: ["No diseases listed (only healthy plant monitoring)"] },
    { plant: "Cherry (including sour)", diseases: ["Powdery Mildew"] },
    { plant: "Corn (Maize)", diseases: ["Common Rust", "Cercospora Leaf Spot (Gray Leaf Spot)", "Northern Leaf Blight"] },
    { plant: "Grape", diseases: ["Black Rot", "Leaf Blight (Isariopsis Leaf Spot)", "Esca (Black Measles)"] },
    { plant: "Orange", diseases: ["Haunglongbing (Citrus Greening)"] },
    { plant: "Peach", diseases: ["Bacterial Spot"] },
    { plant: "Pepper (Bell)", diseases: ["Bacterial Spot"] },
    { plant: "Potato", diseases: ["Early Blight", "Late Blight"] },
    { plant: "Raspberry", diseases: ["No diseases listed (only healthy plant monitoring)"] },
    { plant: "Soybean", diseases: ["No diseases listed (only healthy plant monitoring)"] },
    { plant: "Squash", diseases: ["Powdery Mildew"] },
    { plant: "Strawberry", diseases: ["Leaf Scorch"] },
    { plant: "Tomato", diseases: ["Early Blight", "Late Blight", "Septoria Leaf Spot", "Target Spot", "Leaf Mold", "Bacterial Spot", "Tomato Yellow Leaf Curl Virus", "Tomato Mosaic Virus", "Spider Mites (Two-Spotted Spider Mite)"] },
  ];

  return (
    <Container maxWidth="md" style={{ padding: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h4" component="h1" textAlign="center" fontWeight="bold" gutterBottom>
          About Crop Disease Detection
        </Typography>
        <Typography variant="body1" paragraph>
          This application helps in predicting diseases for various plants based on leaf analysis. Below is a list of plants and their predictable diseases:
        </Typography>
      </Paper>

      {plantDiseases.map((plant, index) => (
        <Paper key={index} elevation={2} style={{ padding: "15px", marginBottom: "10px" }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {plant.plant}
          </Typography>
          <List>
            {plant.diseases.map((disease, i) => (
              <ListItem key={i}>
                <ListItemText primary={disease} />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}

      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Contact Information
        </Typography>
        <Typography variant="body1">Creator: Mr. Rithik R</Typography>
        <Typography variant="body1">Email: Rithikraj1617@gmail.com</Typography>
        <Typography variant="body1">Phone: +918310180317</Typography>
      </Paper>
    </Container>
  );
};

export default About;
