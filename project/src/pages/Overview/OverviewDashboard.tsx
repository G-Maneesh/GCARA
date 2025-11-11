import { useState, useEffect } from 'react';
import { Activity, AlertTriangle, TrendingUp, Shield } from 'lucide-react';
import Navbar from '../../components/Navbar';
import LiveCard from '../../components/LiveCard';
import AIInsightCard from '../../components/AIInsightCard';
import RefreshIndicator from '../../components/RefreshIndicator';
import { apiService } from '../../utils/api';

export default function OverviewDashboard() {
  const [climateData, setClimateData] = useState<any>(null);
  const [financeData, setFinanceData] = useState<any>(null);
  const [healthData, setHealthData] = useState<any>(null);
  const [energyData, setEnergyData] = useState<any>(null);
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timestamp, setTimestamp] = useState(new Date().toISOString());

  const fetchAllData = async () => {
    setLoading(true);
    const [climate, finance, health, energy, aiInsights] = await Promise.all([
      apiService.getClimateData(),
      apiService.getFinanceData(),
      apiService.getHealthData(),
      apiService.getEnergyData(),
      apiService.getAIInsights()
    ]);

    setClimateData(climate);
    setFinanceData(finance);
    setHealthData(health);
    setEnergyData(energy);
    setInsights(aiInsights);
    setTimestamp(new Date().toISOString());
    setLoading(false);
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 45000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !climateData || !financeData || !healthData || !energyData) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-400">Loading system overview...</div>
      </div>
    );
  }

  const systemStatus = {
    climate: climateData.temperature > 18 || climateData.co2Level > 420 ? 'warning' : 'normal',
    finance: financeData.volatilityIndex > 25 ? 'critical' : financeData.volatilityIndex > 20 ? 'warning' : 'normal',
    health: healthData.outbreaks.length > 3 ? 'critical' : healthData.outbreaks.length > 1 ? 'warning' : 'normal',
    energy: energyData.oilPrice > 85 ? 'warning' : 'normal'
  };

  const criticalCount = Object.values(systemStatus).filter(s => s === 'critical').length;
  const warningCount = Object.values(systemStatus).filter(s => s === 'warning').length;
  const overallStatus = criticalCount > 0 ? 'critical' : warningCount > 0 ? 'warning' : 'normal';

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="System Overview" />

      <div className="flex-1 overflow-auto p-6 bg-gray-950">
        <div className="mb-6">
          <RefreshIndicator lastUpdate={timestamp} onRefresh={fetchAllData} />
        </div>

        <div className="bg-gradient-to-r from-blue-600/10 to-emerald-600/10 border border-blue-500/30 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${
              overallStatus === 'critical' ? 'bg-gradient-to-r from-red-600 to-red-700' :
              overallStatus === 'warning' ? 'bg-gradient-to-r from-amber-600 to-amber-700' :
              'bg-gradient-to-r from-emerald-600 to-emerald-700'
            }`}>
              <Activity size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">Global Crisis Monitoring System</h2>
              <p className="text-gray-300 mb-4">
                Real-time analysis of climate, financial, health, and energy systems worldwide.
                AI-powered predictions help anticipate and prevent global crises.
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Overall Status</div>
                  <div className={`text-lg font-bold uppercase ${
                    overallStatus === 'critical' ? 'text-red-400' :
                    overallStatus === 'warning' ? 'text-amber-400' :
                    'text-emerald-400'
                  }`}>
                    {overallStatus}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Critical Alerts</div>
                  <div className="text-lg font-bold text-white">{criticalCount}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Warnings</div>
                  <div className="text-lg font-bold text-white">{warningCount}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Active Monitors</div>
                  <div className="text-lg font-bold text-white">4</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <LiveCard
            icon={Activity}
            title="Climate Status"
            value={`${climateData.temperature}°C`}
            subtitle={`CO₂: ${climateData.co2Level} ppm`}
            severity={systemStatus.climate}
          >
            <p className="text-xs text-gray-400 mt-2">
              {climateData.alerts.length} active alert(s)
            </p>
          </LiveCard>

          <LiveCard
            icon={TrendingUp}
            title="Market Status"
            value={financeData.volatilityIndex.toFixed(1)}
            subtitle="Volatility Index"
            severity={systemStatus.finance}
          >
            <p className="text-xs text-gray-400 mt-2">
              {financeData.stockIndices[0].name}: {financeData.stockIndices[0].value.toFixed(0)}
            </p>
          </LiveCard>

          <LiveCard
            icon={Shield}
            title="Health Status"
            value={healthData.outbreaks.length}
            subtitle="Active outbreaks"
            severity={systemStatus.health}
          >
            <p className="text-xs text-gray-400 mt-2">
              Vaccination: {healthData.vaccinationRate}%
            </p>
          </LiveCard>

          <LiveCard
            icon={AlertTriangle}
            title="Energy Status"
            value={`$${energyData.oilPrice}`}
            subtitle="Oil price per barrel"
            severity={systemStatus.energy}
          >
            <p className="text-xs text-gray-400 mt-2">
              Renewable: {energyData.renewablePercentage}%
            </p>
          </LiveCard>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4">AI-Predicted Risks</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <AIInsightCard key={index} insight={insight} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Domain Status Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    systemStatus.climate === 'critical' ? 'bg-red-500' :
                    systemStatus.climate === 'warning' ? 'bg-amber-500' :
                    'bg-emerald-500'
                  }`}></div>
                  <span className="text-sm font-medium text-white">Climate Systems</span>
                </div>
                <span className="text-xs text-gray-400">
                  Temp: {climateData.temperature}°C | CO₂: {climateData.co2Level} ppm
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    systemStatus.finance === 'critical' ? 'bg-red-500' :
                    systemStatus.finance === 'warning' ? 'bg-amber-500' :
                    'bg-emerald-500'
                  }`}></div>
                  <span className="text-sm font-medium text-white">Financial Markets</span>
                </div>
                <span className="text-xs text-gray-400">
                  VIX: {financeData.volatilityIndex.toFixed(1)}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    systemStatus.health === 'critical' ? 'bg-red-500' :
                    systemStatus.health === 'warning' ? 'bg-amber-500' :
                    'bg-emerald-500'
                  }`}></div>
                  <span className="text-sm font-medium text-white">Global Health</span>
                </div>
                <span className="text-xs text-gray-400">
                  {healthData.outbreaks.length} outbreak(s) tracked
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    systemStatus.energy === 'critical' ? 'bg-red-500' :
                    systemStatus.energy === 'warning' ? 'bg-amber-500' :
                    'bg-emerald-500'
                  }`}></div>
                  <span className="text-sm font-medium text-white">Energy & Power</span>
                </div>
                <span className="text-xs text-gray-400">
                  Oil: ${energyData.oilPrice} | Gas: ${energyData.gasPrice}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">System Capabilities</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                <div>
                  <div className="text-sm font-semibold text-white">Real-Time Monitoring</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Continuous data collection from global sources with 30-60 second refresh cycles
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                <div>
                  <div className="text-sm font-semibold text-white">AI-Powered Predictions</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Machine learning models analyze patterns to predict potential crises before they occur
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                <div>
                  <div className="text-sm font-semibold text-white">Multi-Domain Integration</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Unified view of climate, finance, health, and energy systems in one platform
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                <div>
                  <div className="text-sm font-semibold text-white">Backend Ready</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Architecture prepared for Spring Boot API and Python ML model integration
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
