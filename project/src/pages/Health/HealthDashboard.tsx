import { useState, useEffect } from 'react';
import { Heart, Activity, Shield, AlertTriangle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import LiveCard from '../../components/LiveCard';
import ChartWidget from '../../components/ChartWidget';
import RefreshIndicator from '../../components/RefreshIndicator';
import { apiService, HealthData } from '../../utils/api';

export default function HealthDashboard() {
  const [data, setData] = useState<HealthData | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const newData = await apiService.getHealthData();
    setData(newData);

    setChartData(prev => {
      const updated = [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          vaccination: newData.vaccinationRate,
          cases: newData.outbreaks.reduce((sum, o) => sum + o.cases, 0) / 100
        }
      ];
      return updated.slice(-10);
    });

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-400">Loading health data...</div>
      </div>
    );
  }

  const totalCases = data.outbreaks.reduce((sum, outbreak) => sum + outbreak.cases, 0);

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Global Health Monitoring" />

      <div className="flex-1 overflow-auto p-6 bg-gray-950">
        <div className="mb-6">
          <RefreshIndicator lastUpdate={data.timestamp} onRefresh={fetchData} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <LiveCard
            icon={Shield}
            title="Vaccination Rate"
            value={`${data.vaccinationRate}%`}
            subtitle="Global coverage"
            trend={data.vaccinationRate > 75 ? 'up' : 'neutral'}
            trendValue={`${(data.vaccinationRate - 70).toFixed(1)}%`}
            severity={data.vaccinationRate > 80 ? 'normal' : 'warning'}
          >
            <p className="text-xs text-gray-400 mt-2">Target: 85% coverage</p>
          </LiveCard>

          <LiveCard
            icon={Activity}
            title="Active Outbreaks"
            value={data.outbreaks.length}
            subtitle="Tracked diseases"
            severity={data.outbreaks.length > 3 ? 'critical' : data.outbreaks.length > 1 ? 'warning' : 'normal'}
          >
            <p className="text-xs text-gray-400 mt-2">Requiring monitoring</p>
          </LiveCard>

          <LiveCard
            icon={Heart}
            title="Total Cases"
            value={totalCases.toLocaleString()}
            subtitle="Across all regions"
            trend="neutral"
            severity={totalCases > 10000 ? 'warning' : 'normal'}
          >
            <p className="text-xs text-gray-400 mt-2">Last 24 hours</p>
          </LiveCard>

          <LiveCard
            icon={AlertTriangle}
            title="Health Alerts"
            value={data.healthAlerts.length}
            subtitle="Active warnings"
            severity={data.healthAlerts.some(a => a.severity === 'critical') ? 'critical' :
                     data.healthAlerts.some(a => a.severity === 'warning') ? 'warning' : 'normal'}
          >
            <p className="text-xs text-gray-400 mt-2">Monitoring status</p>
          </LiveCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartWidget
            title="Vaccination Progress"
            subtitle="Global vaccination rate over time"
            data={chartData}
            type="area"
            dataKey="vaccination"
            xAxisKey="time"
            color="#10b981"
          />

          <ChartWidget
            title="Case Trends"
            subtitle="Total reported cases (scaled)"
            data={chartData}
            type="line"
            dataKey="cases"
            xAxisKey="time"
            color="#ef4444"
          />
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Active Disease Outbreaks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.outbreaks.map((outbreak, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold">{outbreak.disease}</h4>
                    <p className="text-sm text-gray-400 mt-1">{outbreak.region}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    outbreak.cases > 5000
                      ? 'bg-red-500/10 text-red-400'
                      : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {outbreak.cases > 5000 ? 'High' : 'Moderate'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">
                    {outbreak.cases.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400">cases</span>
                </div>
                <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-full rounded-full ${
                      outbreak.cases > 5000 ? 'bg-red-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min((outbreak.cases / 10000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Health Alerts & Advisories</h3>
          <div className="space-y-3">
            {data.healthAlerts.map((alert, index) => {
              const severityConfig = {
                normal: {
                  bg: 'bg-emerald-500/10',
                  border: 'border-emerald-500/50',
                  text: 'text-emerald-400'
                },
                warning: {
                  bg: 'bg-amber-500/10',
                  border: 'border-amber-500/50',
                  text: 'text-amber-400'
                },
                critical: {
                  bg: 'bg-red-500/10',
                  border: 'border-red-500/50',
                  text: 'text-red-400'
                }
              };

              const config = severityConfig[alert.severity];

              return (
                <div key={index} className={`p-4 rounded-lg border ${config.bg} ${config.border}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${config.text}`}>{alert.message}</p>
                    </div>
                    <span className={`text-xs uppercase font-semibold px-2 py-1 bg-white/10 rounded ${config.text}`}>
                      {alert.severity}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <h4 className="text-sm font-semibold text-white mb-3">Preventive Measures</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                <span>Maintain vaccination schedules for vulnerable populations</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                <span>Enhance disease surveillance in high-risk regions</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                <span>Coordinate international health response protocols</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
