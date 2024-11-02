import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UploadVideo from './components/UploadVideo';
import DownloadVideo from './components/DownloadVideo';

function App() {
  return (
    <Router>
      <div>
        <h1>Video Upload and Download Service</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/upload" element={<UploadVideo />} />
          <Route path="/download" element={<DownloadVideo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
