import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, AlertTriangle, TrendingUp, Globe, 
  BarChart3, Map, Filter, Bell, 
  ArrowLeft, RefreshCw, Download 
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';

// --- INTERFACES FOR DYNAMIC DATA ---
interface RiskDataPoint {
  time: string;
  risk: number;
  natural: number;
  conflict: number;
  health: number;
}

interface Alert {
  id: number;
  type: 'critical' | 'high' | 'medium';
  category: string;
  title: string;
  location: string;
  probability: string;
  time: string;
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
}

interface Region {
  id: string;
  name: string;
  risk: number;
}

interface AnalystDashboardData {
  // Key Metrics
  globalRiskLevel: string;
  globalRiskChange: string;
  activeMonitoring: string;
  activeMonitoringChange: string;
  predictionsMade: string;
  predictionsMadeChange: string;
  accuracyRate: string;
  accuracyRateChange: string;

  // Chart Data
  riskData: RiskDataPoint[];

  // Regional Data
  regions: Region[];

  // Alerts
  alerts: Alert[];

  // Polling metadata
  lastUpdateTime: string; 
}

// Props interface to accept a navigation handler
interface AnalystDashboardProps {
    onBackClick: () => void; // Function to be called when "Back to Home" is pressed
}

const POLLING_INTERVAL = 30000; // 30 seconds

// --- MOCK DATA GENERATOR (Simulates API response) ---
const generateMockData = (): AnalystDashboardData => {
  // Helper to format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  // 1. Simulate risk data trend
  const newRiskData = [
    { time: '00:00', risk: 25, natural: 20, conflict: 15, health: 35 },
    { time: '04:00', risk: 28, natural: 25, conflict: 18, health: 32 },
    { time: '08:00', risk: 35, natural: 30, conflict: 25, health: 40 },
    { time: '12:00', risk: 42, natural: 35, conflict: 32, health: 45 },
    { time: '16:00', risk: 38, natural: 28, conflict: 35, health: 42 },
    { time: '20:00', risk: 45, natural: 40, conflict: 38, health: 48 },
    { time: '24:00', risk: 50, natural: 45, conflict: 42, health: 52 }
  ].map(d => ({
    ...d,
    risk: Math.min(65, d.risk + Math.floor(Math.random() * 5 - 2)),
    natural: Math.min(50, d.natural + Math.floor(Math.random() * 3 - 1)),
    conflict: Math.min(50, d.conflict + Math.floor(Math.random() * 3 - 1)),
    health: Math.min(60, d.health + Math.floor(Math.random() * 4 - 1))
  }));

  // 2. Simulate metrics
  const baseRisk = 30 + Math.floor(Math.random() * 30);
  const baseMonit = 100 + Math.floor(Math.random() * 100);
  const basePred = 2500 + Math.floor(Math.random() * 1000);
  const baseAcc = 90 + Math.random() * 5;

  // 3. Simulate regions
  const newRegions = [
    { id: 'global', name: 'Global', risk: baseRisk + Math.floor(Math.random() * 5) },
    { id: 'asia', name: 'Asia Pacific', risk: 38 + Math.floor(Math.random() * 10 - 5) },
    { id: 'europe', name: 'Europe', risk: 25 + Math.floor(Math.random() * 10 - 5) },
    { id: 'americas', name: 'Americas', risk: 35 + Math.floor(Math.random() * 10 - 5) },
    { id: 'africa', name: 'Africa', risk: 48 + Math.floor(Math.random() * 10 - 5) },
    { id: 'middle-east', name: 'Middle East', risk: 52 + Math.floor(Math.random() * 10 - 5) }
  ].map(r => ({ ...r, risk: Math.min(100, Math.max(10, r.risk)) }));

  // 4. Simulate alerts
  const newAlerts: Alert[] = [
    {
      id: 1,
      type: Math.random() < 0.3 ? 'critical' : 'high',
      category: 'Natural Disaster',
      title: 'Tectonic Shift Detected',
      location: ['Pacific Ring of Fire', 'Coastal Japan', 'Chilean Trench'][Math.floor(Math.random() * 3)],
      probability: `${(70 + Math.random() * 20).toFixed(0)}%`,
      time: `${Math.floor(Math.random() * 30)} minutes ago`,
      impact: 'High'
    },
    {
      id: 2,
      type: Math.random() < 0.2 ? 'critical' : 'medium',
      category: 'Health Emergency',
      title: 'Rapid Virus Strain Mutation',
      location: ['Central Africa', 'South East Asia', 'Amazon Basin'][Math.floor(Math.random() * 3)],
      probability: `${(50 + Math.random() * 20).toFixed(0)}%`,
      time: `${Math.floor(Math.random() * 5)} hours ago`,
      impact: 'Medium'
    },
    {
      id: 3,
      type: 'critical',
      category: 'Conflict',
      title: 'Unrest Index Surging',
      location: ['Eastern Europe', 'Balkan Peninsula', 'North Korea Border'][Math.floor(Math.random() * 3)],
      probability: `${(80 + Math.random() * 15).toFixed(0)}%`,
      time: `${Math.floor(Math.random() * 12)} hours ago`,
      impact: 'Critical'
    }
  ];

  return {
    globalRiskLevel: `${baseRisk}%`,
    globalRiskChange: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 3).toFixed(1)}%`,
    activeMonitoring: formatNumber(baseMonit + Math.floor(Math.random() * 20)),
    activeMonitoringChange: `${Math.random() > 0.5 ? '+' : '-'}${Math.floor(Math.random() * 5)}`,
    predictionsMade: formatNumber(basePred + Math.floor(Math.random() * 200)),
    predictionsMadeChange: `${Math.random() > 0.5 ? '+' : '-'}${Math.floor(Math.random() * 50)}`,
    accuracyRate: `${baseAcc.toFixed(1)}%`,
    accuracyRateChange: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 1).toFixed(1)}%`,
    riskData: newRiskData,
    regions: newRegions,
    alerts: newAlerts,
    lastUpdateTime: new Date().toLocaleTimeString(),
  };
};


const AnalystDashboard: React.FC<AnalystDashboardProps> = ({ onBackClick }) => {
  // State for data, loading, and error
  const [data, setData] = useState<AnalystDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Existing states for controls (kept static to comply with rule)
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [timeframe, setTimeframe] = useState('24h');

  // --- POLLING LOGIC ---
  const fetchData = async () => {
    // Only show spinner on initial load if data is null
    if (!data) setIsLoading(true);
    setError(null);
    try {
      // Simulate network delay and data fetching
      await new Promise(resolve => setTimeout(resolve, 500)); 
      
      const result = generateMockData();
      
      setData(result);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError("Failed to load real-time data. Check your network.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data fetch
    const intervalId = setInterval(fetchData, POLLING_INTERVAL); 
    
    // Cleanup function: clears the interval when the component unmounts
    return () => clearInterval(intervalId); 
  }, []); // Run only once on mount

  // --- LOADING / ERROR HANDLING (Integrated into existing UI structure) ---
  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center text-white">
        <div className="text-center p-10 bg-white/10 rounded-xl">
          <RefreshCw className="w-8 h-8 mx-auto mb-3 animate-spin text-blue-400" />
          <p className="text-xl">Establishing connection and loading dashboard data...</p>
        </div>
      </div>
    );
  }
  
  // Define data properties based on state (must be done outside the return block)
  const activeAlertsCount = data?.alerts.length ?? 0;
  
  // Metrics data for dynamic mapping
  const dynamicMetrics = data ? [
    { title: 'Global Risk Level', value: data.globalRiskLevel, change: data.globalRiskChange, color: 'text-orange-400', icon: AlertTriangle },
    { title: 'Active Monitoring', value: data.activeMonitoring, change: data.activeMonitoringChange, color: 'text-blue-400', icon: Globe },
    { title: 'Predictions Made', value: data.predictionsMade, change: data.predictionsMadeChange, color: 'text-green-400', icon: Brain },
    { title: 'Accuracy Rate', value: data.accuracyRate, change: data.accuracyRateChange, color: 'text-purple-400', icon: TrendingUp }
  ] : [];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-md border-b border-white/20 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* The Back to Home button now correctly uses the onBackClick prop */}
            <div 
              onClick={onBackClick} // THIS IS NOW PASSED FROM APP.TSX
              className="cursor-pointer"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </motion.button>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center space-x-3">
                <Brain className="w-8 h-8 text-blue-400" />
                <span>Crisis Analyst Dashboard</span>
              </h1>
              <p className="text-gray-400">AI-Powered Prediction & Risk Assessment</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {data && (
              <span className="text-xs text-gray-400 bg-white/10 rounded-full px-3 py-1">
                  Last Update: <span className='font-semibold text-yellow-300'>{data.lastUpdateTime}</span>
              </span>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all"
            >
              <Bell className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={fetchData} // Allow manual refresh
              className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all"
            >
              <RefreshCw className="w-5 h-5" />
            </motion.button>

            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        
        {/* Error Message Display */}
        {error && (
            <div className="p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-xl font-semibold">
                {error}
            </div>
        )}
        
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
        >
          <div className="flex items-center space-x-4">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              {data?.regions.map((region) => ( 
                <option key={region.id} value={region.id} className="bg-gray-800">
                  {region.name}
                </option>
              )) ?? ( 
                <option value="global" className="bg-gray-800">Global</option>
              )}
            </select>

            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="24h" className="bg-gray-800">Last 24 Hours</option>
              <option value="7d" className="bg-gray-800">Last 7 Days</option>
              <option value="30d" className="bg-gray-800">Last 30 Days</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-all flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {dynamicMetrics.map((metric, index) => { 
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${metric.color}`} />
                  <span className={`${metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'} text-sm font-semibold`}>{metric.change}</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{metric.value}</h3>
                <p className="text-gray-400">{metric.title}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Risk Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                <span>Risk Trend Analysis</span>
              </h3>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.riskData}> 
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Area type="monotone" dataKey="risk" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="natural" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="health" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Regional Risk Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <Map className="w-6 h-6 text-green-400" />
                <span>Regional Risk Assessment</span>
              </h3>
            </div>

            <div className="space-y-4">
              {data?.regions.map((region) => ( 
                <div key={region.id} className="flex items-center justify-between">
                  <span className="text-gray-300">{region.name}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          region.risk > 50 ? 'bg-red-500' :
                          region.risk > 30 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${region.risk}%` }}
                      />
                    </div>
                    <span className="text-white font-semibold w-12">{region.risk}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Active Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <span>Active Crisis Predictions</span>
            </h3>
            <span className="px-3 py-1 bg-red-500/20 rounded-full text-red-400 text-sm font-semibold">
              {activeAlertsCount} Active 
            </span>
          </div>

          <div className="space-y-4">
            {data?.alerts.map((alert) => ( 
              <motion.div
                key={alert.id}
                whileHover={{ scale: 1.01 }}
                className={`p-4 rounded-xl border-l-4 bg-white/5 ${
                  alert.type === 'critical' ? 'border-red-500' :
                  alert.type === 'high' ? 'border-orange-500' : 'border-yellow-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        alert.type === 'critical' ? 'bg-red-500/20 text-red-400' :
                        alert.type === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {alert.category}
                      </span>
                      <span className="text-gray-400 text-sm">{alert.time}</span>
                    </div>
                    
                    <h4 className="text-white font-semibold mb-1">{alert.title}</h4>
                    <p className="text-gray-400 text-sm mb-2">{alert.location}</p>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-300">
                        Probability: <span className="text-blue-400 font-semibold">{alert.probability}</span>
                      </span>
                      <span className="text-sm text-gray-300">
                        Impact: <span className={`font-semibold ${
                          alert.impact === 'Critical' ? 'text-red-400' :
                          alert.impact === 'High' ? 'text-orange-400' : 'text-yellow-400'
                        }`}>
                          {alert.impact}
                        </span>
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-all"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalystDashboard;
