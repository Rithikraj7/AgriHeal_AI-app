import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Paper, Avatar } from '@mui/material';
import { Spa, Grass, LocalFlorist } from '@mui/icons-material'; // Import icons

const History = () => {
  const [history, setHistory] = useState([]);

  // Load history from localStorage on component mount
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('detectionHistory')) || [];
    setHistory(storedHistory);
  }, []);

  // Function to get a random icon
  const getRandomIcon = () => {
    const icons = [<Spa />, <Grass />, <LocalFlorist />]; // List of icons
    return icons[Math.floor(Math.random() * icons.length)];
  };

  return (
    <Paper
      sx={{
        padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding
        margin: { xs: 1, sm: 2 },
        maxWidth: '100%',
        overflowX: 'auto', // Prevents overflow on small screens
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Adjust for small screens
        }}
      >
        Detection History
      </Typography>

      <List>
        {history.length === 0 ? (
          <Typography sx={{ textAlign: 'center', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            No history available
          </Typography>
        ) : (
          history.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' }, // Column layout for mobile
                textAlign: { xs: 'center', sm: 'left' }, // Centered on mobile
                padding: 2,
              }}
            >
              <Avatar sx={{ backgroundColor: '#4CAF50', mb: { xs: 1, sm: 0 }, mr: { sm: 2 } }}>
                {getRandomIcon()} {/* Random plant-related icon */}
              </Avatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Disease: {item.disease}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    Severity: {item.severity} | {item.confidence}% | Time: {item.timestamp}
                  </Typography>
                }
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default History;
