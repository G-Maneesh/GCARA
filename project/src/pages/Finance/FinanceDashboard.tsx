import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Activity, AlertCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import LiveCard from '../../components/LiveCard';
import ChartWidget from '../../components/ChartWidget';
import RefreshIndicator from '../../components/RefreshIndicator';
import { apiService, FinanceData } from '../../utils/api';

export default function FinanceDashboard() {
  const [data, setData] = useState<FinanceData | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const newData = await apiService.getFinanceData();
    setData(newData);

    setChartData(prev => {
      const updated = [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          sp500: newData.stockIndices[0].value,
          nasdaq: newData.stockIndices[1].value / 3,
          volatility: newData.volatilityIndex
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
        <div className="text-gray-400">Loading financial data...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="Financial Markets" />

      <div className="flex-1 overflow-auto p-6 bg-gray-950">
        <div className="mb-6">
          <RefreshIndicator lastUpdate={data.timestamp} onRefresh={fetchData} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {data.stockIndices.map((index, i) => (
            <LiveCard
              key={i}
              icon={TrendingUp}
              title={index.name}
              value={index.value.toFixed(2)}
              subtitle="Stock Index"
              trend={index.change > 0 ? 'up' : 'down'}
              trendValue={`${Math.abs(index.change).toFixed(2)}%`}
              severity={Math.abs(index.change) > 2 ? 'warning' : 'normal'}
            >
              <p className="text-xs text-gray-400 mt-2">
                {index.change > 0 ? 'Bullish' : 'Bearish'} market sentiment
              </p>
            </LiveCard>
          ))}

          <LiveCard
            icon={Activity}
            title="Volatility Index"
            value={data.volatilityIndex}
            subtitle="Market uncertainty"
            trend={data.volatilityIndex > 20 ? 'up' : 'down'}
            trendValue={`${Math.abs(data.volatilityIndex - 20).toFixed(1)}`}
            severity={data.volatilityIndex > 25 ? 'critical' : data.volatilityIndex > 20 ? 'warning' : 'normal'}
          >
            <p className="text-xs text-gray-400 mt-2">VIX indicator</p>
          </LiveCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartWidget
            title="Stock Index Performance"
            subtitle="S&P 500 real-time tracking"
            data={chartData}
            type="area"
            dataKey="sp500"
            xAxisKey="time"
            color="#10b981"
          />

          <ChartWidget
            title="Market Volatility"
            subtitle="VIX volatility index"
            data={chartData}
            type="line"
            dataKey="volatility"
            xAxisKey="time"
            color="#f59e0b"
          />
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Currency Exchange Rates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.currencyRates.map((currency, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-400">{currency.pair}</span>
                  <span className={`text-sm font-bold ${currency.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {currency.change > 0 ? '↑' : '↓'} {Math.abs(currency.change).toFixed(4)}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white">{currency.rate.toFixed(4)}</div>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
                  <div
                    className={`h-full rounded-full ${currency.change > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(Math.abs(currency.change) * 5000, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-amber-400" size={24} />
            <h3 className="text-lg font-semibold text-white">Market Analysis</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-2">Market Sentiment</h4>
              <p className="text-sm text-gray-400">
                Current volatility levels suggest {data.volatilityIndex > 20 ? 'heightened' : 'moderate'} market uncertainty.
                {data.volatilityIndex > 25 && ' Extreme caution advised for high-risk investments.'}
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-2">Trending Indicators</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.stockIndices.map((index, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      index.change > 0
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {index.name}: {index.change > 0 ? '+' : ''}{index.change.toFixed(2)}%
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
