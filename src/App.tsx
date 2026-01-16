
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PanVerification from './pages/PanVerification';
import GstVerification from './pages/GstVerification';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify-pan" element={<PanVerification />} />
        <Route path="/verify-gst" element={<GstVerification />} />
      </Routes>
    </Router>
  );
};

export default App;
