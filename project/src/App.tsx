import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Explicitly importing all files with the .tsx extension to resolve Vite/TypeScript errors.
import LandingPage from './pages/LandingPage.tsx';
import AnalystDashboard from './pages/AnalystDashboard.tsx';
import ResponderDashboard from './pages/ResponderDashboard.tsx';
import EconomicAnalystDashboard from './pages/EconomicAnalystDashboard.tsx'; // NEW: Renamed dashboard import
import TrainerDashboard from './pages/TrainerDashboard.tsx';
import Login from './pages/Login.tsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboards */}
          <Route path="/analyst" element={<AnalystDashboard />} />
          <Route path="/responder" element={<ResponderDashboard />} />
          {/* UPDATED: Replaced /admin path with /economic-analyst path */}
          <Route path="/economic-analyst" element={<EconomicAnalystDashboard />} /> 
          <Route path="/trainer" element={<TrainerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
