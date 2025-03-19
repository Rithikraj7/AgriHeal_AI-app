import React from 'react';
import { useEffect } from "react";
import { Container } from '@mui/material';
import History from '../components/History';

const HistoryPage = () => {
  useEffect(() => {
    document.title = "History";
  }, []);
  // Simulated history data; in a real app, this might be fetched from an API.
  const historyData = [
    { disease: 'Leaf Spot', severity: 'Moderate' },
    { disease: 'Blight', severity: 'Severe' },
  ];

  return (
    <Container style={{ marginTop: '20px' }}>
      <History history={historyData} />
    </Container>
  );
};

export default HistoryPage;
