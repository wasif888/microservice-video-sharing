import React, { useState } from 'react';
import axios from 'axios';

const UploadVideo = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Upload successful!');
    } catch (error) {
      alert(error.response ? error.response.data.error : 'Upload failed');
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadVideo;
