import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import OverviewDashboard from './pages/Overview/OverviewDashboard';
import ClimateDashboard from './pages/Climate/ClimateDashboard';
import FinanceDashboard from './pages/Finance/FinanceDashboard';
import HealthDashboard from './pages/Health/HealthDashboard';
import EnergyDashboard from './pages/Energy/EnergyDashboard';
import AIInsightsDashboard from './pages/AIInsights/AIInsightsDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<OverviewDashboard />} />
          <Route path="/climate" element={<ClimateDashboard />} />
          <Route path="/finance" element={<FinanceDashboard />} />
          <Route path="/health" element={<HealthDashboard />} />
          <Route path="/energy" element={<EnergyDashboard />} />
          <Route path="/ai-insights" element={<AIInsightsDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
