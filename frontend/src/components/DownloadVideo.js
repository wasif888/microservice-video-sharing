import React, { useState } from 'react';
import axios from 'axios';

const DownloadVideo = () => {
  const [videoId, setVideoId] = useState('');

  const handleDownload = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/download/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${videoId}.mp4`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert(error.response ? error.response.data.error : 'Download failed');
    }
  };

  return (
    <div>
      <h2>Download Video</h2>
      <input type="text" value={videoId} onChange={(e) => setVideoId(e.target.value)} placeholder="Video ID" />
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default DownloadVideo;
