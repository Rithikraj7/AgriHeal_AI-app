import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Paper, Avatar, Box } from '@mui/material';
import { Spa, Grass, LocalFlorist } from '@mui/icons-material';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('detectionHistory')) || [];
    setHistory(storedHistory);
  }, []);

  const getRandomIcon = () => {
    const icons = [<Spa />, <Grass />, <LocalFlorist />];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '80vh' 
      }}
    >
      <Paper
        sx={{
          padding: { xs: 2, sm: 3, md: 4 },
          margin: { xs: 1, sm: 2 },
          maxWidth: '100%',
          overflowX: 'auto',
          flexGrow: 1, // Makes sure content expands to push footer down
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: 2,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
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
                  flexDirection: { xs: 'column', sm: 'row' },
                  textAlign: { xs: 'center', sm: 'left' },
                  padding: 2,
                  wordWrap: 'break-word', 
                  overflowWrap: 'break-word',
                  whiteSpace: 'normal',
                  maxWidth: '100%' 
                }}
              >
                <Avatar sx={{ backgroundColor: '#4CAF50', mb: { xs: 1, sm: 0 }, mr: { sm: 2 } }}>
                  {getRandomIcon()}
                </Avatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      Disease: {item.disease.replace(/_/g, ' ')}
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
    </Box>
  );
};

export default History;
