import { useEffect, useState } from "react";
import { Typography } from '@mui/material';

const VideoTutorials = ({ videos }) => {
  const [validVideos, setValidVideos] = useState([]);

  useEffect(() => {
    const checkEmbeddableVideos = async () => {
      const filteredVideos = [];

      for (const video of videos) {
        const videoId = video.url.split("v=")[1]?.split("&")[0];
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        try {
          const response = await fetch(`https://www.youtube.com/oembed?url=${video.url}&format=json`);
          
          if (response.ok) {
            filteredVideos.push({ ...video, embedUrl });
          }
        } catch (error) {
          console.error("Error checking video:", error);
        }
      }

      setValidVideos(filteredVideos);
    };

    checkEmbeddableVideos();
  }, [videos]);

  if (!validVideos.length) return null;

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <Typography variant="h5" gutterBottom>
        Treatment Videos
      </Typography>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {validVideos.map((video, index) => (
          <iframe
            key={index}
            width="300"
            height="200"
            src={video.embedUrl} // Only display embeddable videos
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ margin: "10px" }}
          />
        ))}
      </div>
    </div>
  );
};


export default VideoTutorials;