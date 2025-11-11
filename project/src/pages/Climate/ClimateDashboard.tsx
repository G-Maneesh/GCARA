import { useState, useEffect } from 'react';
import { CloudRain, Thermometer, Wind, Droplets } from 'lucide-react';
import Navbar from '../../components/Navbar';
import LiveCard from '../../components/LiveCard';
import ChartWidget from '../../components/ChartWidget';
import RefreshIndicator from '../../components/RefreshIndicator';
import { apiService, ClimateData } from '../../utils/api';

export default function ClimateDashboard() {
  const [data, setData] = useState<ClimateData | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const newData = await apiService.getClimateData();
    setData(newData);

    setChartData(prev => {
      const updated = [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          temperature: newData.temperature,
          co2: newData.co2Level,
          rainfall: newData.rainfall
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
        <div className="text-gray-400">Loading climate data...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Climate Monitoring" />

      <div className="flex-1 overflow-auto p-6 bg-gray-950">
        <div className="mb-6">
          <RefreshIndicator lastUpdate={data.timestamp} onRefresh={fetchData} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <LiveCard
            icon={Thermometer}
            title="Global Temperature"
            value={`${data.temperature}°C`}
            subtitle="Average surface temperature"
            trend={data.temperature > 17 ? 'up' : 'down'}
            trendValue={`${Math.abs(data.temperature - 17).toFixed(1)}°C`}
            severity={data.temperature > 18 ? 'warning' : 'normal'}
          >
            <p className="text-xs text-gray-400 mt-2">Historical avg: 17.0°C</p>
          </LiveCard>

          <LiveCard
            icon={Wind}
            title="CO₂ Levels"
            value={`${data.co2Level} ppm`}
            subtitle="Atmospheric concentration"
            trend={data.co2Level > 415 ? 'up' : 'neutral'}
            trendValue={`${(data.co2Level - 410).toFixed(1)} ppm`}
            severity={data.co2Level > 420 ? 'critical' : data.co2Level > 415 ? 'warning' : 'normal'}
          >
            <p className="text-xs text-gray-400 mt-2">Safe threshold: 350 ppm</p>
          </LiveCard>

          <LiveCard
            icon={Droplets}
            title="Rainfall Index"
            value={`${data.rainfall} mm`}
            subtitle="7-day average"
            trend="neutral"
            severity="normal"
          >
            <p className="text-xs text-gray-400 mt-2">Regional measurement</p>
          </LiveCard>

          <LiveCard
            icon={CloudRain}
            title="Active Alerts"
            value={data.alerts.length}
            subtitle="Climate warnings"
            severity={data.alerts.some(a => a.severity === 'critical') ? 'critical' :
                     data.alerts.some(a => a.severity === 'warning') ? 'warning' : 'normal'}
          >
            <div className="mt-2 space-y-1">
              {data.alerts.slice(0, 2).map((alert, i) => (
                <p key={i} className="text-xs text-gray-400 truncate">{alert.message}</p>
              ))}
            </div>
          </LiveCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartWidget
            title="Temperature Trend"
            subtitle="Real-time temperature monitoring"
            data={chartData}
            type="line"
            dataKey="temperature"
            xAxisKey="time"
            color="#f59e0b"
          />

          <ChartWidget
            title="CO₂ Concentration"
            subtitle="Atmospheric CO₂ levels over time"
            data={chartData}
            type="area"
            dataKey="co2"
            xAxisKey="time"
            color="#ef4444"
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <ChartWidget
            title="Rainfall Distribution"
            subtitle="7-day rainfall measurements"
            data={chartData}
            type="bar"
            dataKey="rainfall"
            xAxisKey="time"
            color="#3b82f6"
          />
        </div>

        <div className="mt-6 bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Climate Alerts</h3>
          <div className="space-y-3">
            {data.alerts.map((alert, index) => {
              const severityColors = {
                normal: 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400',
                warning: 'bg-amber-500/10 border-amber-500/50 text-amber-400',
                critical: 'bg-red-500/10 border-red-500/50 text-red-400'
              };

              return (
                <div key={index} className={`p-4 rounded-lg border ${severityColors[alert.severity]}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold mb-1">{alert.type}</h4>
                      <p className="text-sm opacity-80">{alert.message}</p>
                    </div>
                    <span className="text-xs uppercase font-semibold px-2 py-1 bg-white/10 rounded">
                      {alert.severity}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
