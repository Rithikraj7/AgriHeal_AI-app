import React from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const DownloadReport = ({ result, file }) => {
  if (!result) return null;

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const {height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText('AgriHeal AI Plant Disease Report', {
      x: 150,
      y: height - 50,
      size: 20,
      font,
      color: rgb(0, 0.5, 0),
    });

    page.drawText(`Date: ${result.timestamp}`, { x: 50, y: height - 80, size: 12, font });
    // **Embed Original Uploaded Image**
    if (file) {
        try {
          const imgBytes = await file.arrayBuffer();
          const img = await pdfDoc.embedJpg(imgBytes);
          page.drawImage(img, { x: 50, y: height - 250, width: 200, height: 150 });
        } catch (error) {
          console.error("Error embedding uploaded image:", error);
        }
      }
    page.drawText(`Detected Disease: ${result.disease}`, { x: 270, y: height - 110, size: 14, font });
    page.drawText(`Severity: ${result.severity}`, { x: 270, y: height - 140, size: 14, font });
    page.drawText(`Confidence: ${result.confidence}%`, { x: 270, y: height - 170, size: 14, font });

    page.drawText('Deficiency Analysis:', { x: 50, y: height - 270, size: 14, font, color: rgb(0, 0, 0.5) });

    result.deficiencyScoresList.forEach((score, index) => {
      page.drawText(`${score}`, { x: 50, y: height - 290 - index * 20, size: 12, font });
    });

    // Embed images if available
    if (result.diseaseAffectedImage) {
        const imgBytes = await fetch(result.diseaseAffectedImage).then(res => res.arrayBuffer());
        const img = await pdfDoc.embedPng(imgBytes);
        page.drawImage(img, { x: 330, y: height - 390, width: 200, height: 200 });
      }


    // Convert precautions to an array (handling case where it is a string)
    const precautionsList = result.precautions
      ? result.precautions.split('.').map((s) => s.trim()).filter(Boolean)
      : [];

    page.drawText('Precautions:', { x: 50, y: height - 390, size: 14, font, color: rgb(0.8, 0, 0) });

    precautionsList.forEach((precaution, index) => {
      page.drawText(`- ${precaution}`, { x: 60, y: height - 410 - index * 15, size: 12, font });
    });

    // Embed images if available
    if (result.affectedGraph) {
        const imgBytes = await fetch(result.affectedGraph).then(res => res.arrayBuffer());
        const img = await pdfDoc.embedPng(imgBytes);
        page.drawImage(img, { x: 50, y: height - 670, width: 200, height: 200 });
      }

      // Embed images if available
    if (result.yieldGraph) {
        const imgBytes = await fetch(result.yieldGraph).then(res => res.arrayBuffer());
        const img = await pdfDoc.embedPng(imgBytes);
        page.drawImage(img, { x: 330, y: height - 670, width: 200, height: 200 });
      }

      // Ensure diseaseAnalysis exists
    if (result.affectedAnalysis?.length > 0) {
        result.affectedAnalysis.forEach((line, index) => {
          page.drawText(`- ${line}`, { x: 60, y: height - 700 - index * 20, size: 12, font });
        });
      } else {
        page.drawText("No detailed disease analysis available.", { x: 60, y: height - 260, size: 12, font });
      }


    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Plant_Disease_Report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={generatePDF}
      style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
      }}
    >
      Download Report
    </button>
  );
};

export default DownloadReport;
