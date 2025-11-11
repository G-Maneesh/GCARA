import { useState, useEffect } from 'react';
import { Zap, Droplet, Wind, TrendingUp } from 'lucide-react';
import Navbar from '../../components/Navbar';
import LiveCard from '../../components/LiveCard';
import ChartWidget from '../../components/ChartWidget';
import RefreshIndicator from '../../components/RefreshIndicator';
import { apiService, EnergyData } from '../../utils/api';

export default function EnergyDashboard() {
  const [data, setData] = useState<EnergyData | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const newData = await apiService.getEnergyData();
    setData(newData);

    setChartData(prev => {
      const updated = [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          generation: newData.globalGeneration / 1000,
          renewable: newData.renewablePercentage,
          oil: newData.oilPrice,
          gas: newData.gasPrice
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
        <div className="text-gray-400">Loading energy data...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Energy & Power Systems" />

      <div className="flex-1 overflow-auto p-6 bg-gray-950">
        <div className="mb-6">
          <RefreshIndicator lastUpdate={data.timestamp} onRefresh={fetchData} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <LiveCard
            icon={Zap}
            title="Global Generation"
            value={`${(data.globalGeneration / 1000).toFixed(1)}k`}
            subtitle="TWh per year"
            trend="up"
            trendValue="2.3%"
            severity="normal"
          >
            <p className="text-xs text-gray-400 mt-2">Increasing demand</p>
          </LiveCard>

          <LiveCard
            icon={Wind}
            title="Renewable Energy"
            value={`${data.renewablePercentage}%`}
            subtitle="Of total generation"
            trend={data.renewablePercentage > 30 ? 'up' : 'neutral'}
            trendValue={`${(data.renewablePercentage - 28).toFixed(1)}%`}
            severity={data.renewablePercentage > 30 ? 'normal' : 'warning'}
          >
            <p className="text-xs text-gray-400 mt-2">Target: 40% by 2030</p>
          </LiveCard>

          <LiveCard
            icon={Droplet}
            title="Oil Price"
            value={`$${data.oilPrice}`}
            subtitle="Per barrel (WTI)"
            trend={data.oilPrice > 80 ? 'up' : 'down'}
            trendValue={`$${Math.abs(data.oilPrice - 80).toFixed(2)}`}
            severity={data.oilPrice > 85 ? 'warning' : 'normal'}
          >
            <p className="text-xs text-gray-400 mt-2">Benchmark price</p>
          </LiveCard>

          <LiveCard
            icon={TrendingUp}
            title="Natural Gas"
            value={`$${data.gasPrice}`}
            subtitle="Per MMBtu"
            trend={data.gasPrice > 4 ? 'up' : 'down'}
            trendValue={`$${Math.abs(data.gasPrice - 4).toFixed(2)}`}
            severity={data.gasPrice > 4.5 ? 'warning' : 'normal'}
          >
            <p className="text-xs text-gray-400 mt-2">Henry Hub spot</p>
          </LiveCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartWidget
            title="Global Energy Generation"
            subtitle="Total electricity production (thousands TWh)"
            data={chartData}
            type="area"
            dataKey="generation"
            xAxisKey="time"
            color="#3b82f6"
          />

          <ChartWidget
            title="Renewable Energy Share"
            subtitle="Percentage of total generation"
            data={chartData}
            type="line"
            dataKey="renewable"
            xAxisKey="time"
            color="#10b981"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartWidget
            title="Oil Price Trends"
            subtitle="WTI crude oil ($/barrel)"
            data={chartData}
            type="line"
            dataKey="oil"
            xAxisKey="time"
            color="#f59e0b"
          />

          <ChartWidget
            title="Natural Gas Prices"
            subtitle="Henry Hub ($/MMBtu)"
            data={chartData}
            type="bar"
            dataKey="gas"
            xAxisKey="time"
            color="#8b5cf6"
          />
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Energy Mix Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Wind className="text-emerald-400" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Renewable</h4>
                  <p className="text-xs text-gray-400">Clean energy</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{data.renewablePercentage}%</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${data.renewablePercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Droplet className="text-amber-400" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Fossil Fuels</h4>
                  <p className="text-xs text-gray-400">Coal, oil, gas</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{(100 - data.renewablePercentage - 15).toFixed(1)}%</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="h-full rounded-full bg-amber-500"
                  style={{ width: `${100 - data.renewablePercentage - 15}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Zap className="text-blue-400" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Nuclear</h4>
                  <p className="text-xs text-gray-400">Zero carbon</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">15.0%</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="h-full rounded-full bg-blue-500" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Energy Insights</h3>
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-2">Market Overview</h4>
              <p className="text-sm text-gray-400">
                Global energy prices remain {data.oilPrice > 85 ? 'elevated' : 'stable'} with oil at ${data.oilPrice}/barrel.
                Renewable energy capacity continues to expand, currently representing {data.renewablePercentage}% of total generation.
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-2">Supply & Demand</h4>
              <p className="text-sm text-gray-400">
                Current global generation capacity: {data.globalGeneration.toLocaleString()} TWh annually.
                Peak demand periods require careful grid management and optimization.
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-2">Transition Progress</h4>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">Renewable Target</span>
                    <span className="text-xs font-bold text-emerald-400">
                      {data.renewablePercentage}/40%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500"
                      style={{ width: `${(data.renewablePercentage / 40) * 100}%` }}
                    ></div>
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
