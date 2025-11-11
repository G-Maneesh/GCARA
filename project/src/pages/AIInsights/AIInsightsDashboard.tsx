import { useState, useEffect } from 'react';
import { Brain, Sparkles, RefreshCw } from 'lucide-react';
import Navbar from '../../components/Navbar';
import AIInsightCard from '../../components/AIInsightCard';
import RefreshIndicator from '../../components/RefreshIndicator';
import { apiService, AIInsight } from '../../utils/api';

export default function AIInsightsDashboard() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [timestamp, setTimestamp] = useState(new Date().toISOString());

  const fetchInsights = async () => {
    setLoading(true);
    const data = await apiService.getAIInsights();
    setInsights(data);
    setTimestamp(new Date().toISOString());
    setLoading(false);
  };

  const generateNewInsights = async () => {
    setGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    await fetchInsights();
    setGenerating(false);
  };

  useEffect(() => {
    fetchInsights();
    const interval = setInterval(fetchInsights, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <Navbar title="AI Insights Center" />

      <div className="flex-1 overflow-auto p-6 bg-gray-950">
        <div className="mb-6 flex items-center justify-between">
          <RefreshIndicator lastUpdate={timestamp} onRefresh={fetchInsights} />

          <button
            onClick={generateNewInsights}
            disabled={generating}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Generate New Insights</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-600/10 to-emerald-600/10 border border-blue-500/30 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg">
              <Brain size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">AI-Powered Crisis Prediction</h2>
              <p className="text-gray-300 mb-4">
                Advanced machine learning models analyze real-time data across climate, finance, health, and energy domains
                to predict potential crises before they occur. The system uses LSTM networks for time-series forecasting,
                Prophet for trend analysis, and BERT for natural language processing of news and reports.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                  <div className="text-xs text-gray-400 mb-1">Model Accuracy</div>
                  <div className="text-xl font-bold text-white">87.3%</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                  <div className="text-xs text-gray-400 mb-1">Predictions Generated</div>
                  <div className="text-xl font-bold text-white">1,247</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                  <div className="text-xs text-gray-400 mb-1">Crisis Prevented</div>
                  <div className="text-xl font-bold text-white">43</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Active Predictions</h3>
          <p className="text-gray-400 text-sm mb-4">
            AI-generated insights based on current global conditions and historical patterns
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-400">Loading AI insights...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {insights.map((insight, index) => (
              <AIInsightCard key={index} insight={insight} />
            ))}
          </div>
        )}

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">AI Model Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="text-sm font-semibold text-white">LSTM Time-Series Model</div>
                  <div className="text-xs text-gray-400">Financial & Climate Forecasting</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="text-sm font-semibold text-white">Prophet Trend Analysis</div>
                  <div className="text-xs text-gray-400">Energy & Health Patterns</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <div>
                  <div className="text-sm font-semibold text-white">BERT NLP Processor</div>
                  <div className="text-xs text-gray-400">News & Report Analysis</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Integration Ready</h3>
          <p className="text-sm text-gray-400 mb-4">
            This AI Insights Center is ready for backend integration. Connect to your Spring Boot API to enable:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-2">API Endpoints</h4>
              <ul className="space-y-1 text-xs text-gray-400">
                <li className="font-mono">POST /api/predict/crisis</li>
                <li className="font-mono">GET /api/forecast/domain</li>
                <li className="font-mono">POST /api/recommend/actions</li>
              </ul>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-2">ML Model Pipeline</h4>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>TensorFlow / PyTorch models</li>
                <li>Real-time data processing</li>
                <li>Automated retraining system</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
