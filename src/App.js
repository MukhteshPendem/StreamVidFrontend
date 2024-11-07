import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadVideoPage from './pages/uploadpage/UploadVideoPage';
import GetVideoPage from './pages/getvideo/GetVideoPage';

function App() {
  return (
      <Router>
        <div>

          <Routes>
            <Route path="/upload" element={<UploadVideoPage />} />
            <Route path="/get-video" element={<GetVideoPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
