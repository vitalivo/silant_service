import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MachinesPage from './pages/MachinesPage';
import MaintenancePage from './pages/MaintenancePage';
import ComplaintsPage from './pages/ComplaintsPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/machines" element={<MachinesPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;