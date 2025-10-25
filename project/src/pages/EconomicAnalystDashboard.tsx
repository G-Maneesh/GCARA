import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
// Link is assumed to come from a routing solution like react-router-dom, 
// but is used here as a placeholder for navigation.
const Link = ({ to, children, className }) => <a href={to} className={className}>{children}</a>; 
import { 
  BarChart3, FileText, Settings, 
  Download, Shield, Activity, Clock,
  ArrowLeft, RefreshCw, Filter, Search,
  TrendingUp, Wallet, DollarSign, Zap 
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';

// --- INITIAL MOCK DATA DEFINITION ---
// This data structure is now outside the component so it can be used for initialization.
const initialData = {
  sectorPerformance: [
    { month: 'Q1', growth: 5.2, investment: 4.8, efficiency: 93 },
    { month: 'Q2', growth: 4.8, investment: 4.5, efficiency: 92 },
    { month: 'Q3', growth: 6.1, investment: 5.7, efficiency: 95 },
    { month: 'Q4', growth: 7.3, investment: 6.9, efficiency: 95 },
  ],
  assetAllocation: [
    { name: 'Technology', value: 35, color: '#0EA5E9' }, // Cyan 500
    { name: 'Financials', value: 28, color: '#F59E0B' }, // Amber 500
    { name: 'Healthcare', value: 20, color: '#8B5CF6' }, // Violet 500
    { name: 'Energy', value: 17, color: '#DC2626' } // Red 600
  ],
  recentReports: [
    {
      id: 'RPT-2024-001',
      topic: 'Q4 Tech Sector Valuation',
      date: '2024-01-15',
      status: 'Published',
      score: 94,
      findings: 'Strong revenue growth, minor regulatory risk identified.',
      analyst: 'Dr. Sarah Chen'
    },
    {
      id: 'RPT-2024-002',
      topic: 'Global Supply Chain Forecast',
      date: '2024-01-12',
      status: 'Drafting',
      score: 89,
      findings: 'Shipping costs stabilized, inflation pressure pending review.',
      analyst: 'James Rodriguez'
    },
    {
      id: 'RPT-2024-003',
      topic: 'Emerging Markets Bond Analysis',
      date: '2024-01-08',
      status: 'Published',
      score: 97,
      findings: 'Outstanding yield performance in Asian bonds.',
      analyst: 'Dr. Lisa Kim'
    }
  ],
  keyFinancialMetrics: [
    { title: 'Index Volatility (VIX)', value: '18.45', change: '+1.02', color: 'text-red-400', icon: Zap }, 
    { title: 'Global Liquidity Ratio', value: '1.27', change: '-0.15', color: 'text-blue-400', icon: Wallet }, 
    { title: 'Active Markets (24h)', value: '2,847', change: '+156', color: 'text-purple-400', icon: Activity },
    { title: 'Forecast Accuracy (MA)', value: '91.2%', change: '+2.1%', color: 'text-green-400', icon: TrendingUp } 
  ],
  riskExposure: [
    { sector: 'Technology', exposure: 156, total: 200, percentage: 78 },
    { sector: 'Energy', exposure: 89, total: 120, percentage: 74 },
    { sector: 'Finance', exposure: 24, total: 30, percentage: 80 }, 
    { sector: 'Consumer Goods', exposure: 12, total: 15, percentage: 80 }
  ]
};

// --- DATA SIMULATION/GENERATION LOGIC ---
// Function to generate new mock data based on the old data structure
const generateNewData = (currentData) => {
  // Simulate slight fluctuations in metrics
  const newMetrics = currentData.keyFinancialMetrics.map(metric => {
    // Generate a small random change (-0.2 to +0.2)
    const changeFactor = (Math.random() * 0.4) - 0.2; 
    let currentVal = parseFloat(metric.value.replace(/[^0-9.-]/g, ''));
    let currentChange = parseFloat(metric.change.replace(/[^0-9.-]/g, ''));
    let newValue, newChange;

    if (metric.title.includes('VIX') || metric.title.includes('Liquidity')) {
      newValue = (currentVal + changeFactor).toFixed(2);
      newChange = (currentChange + changeFactor * 0.5).toFixed(2);
    } else if (metric.title.includes('Markets')) {
      newValue = (Math.floor(currentVal + changeFactor * 100)).toLocaleString();
      newChange = Math.floor(currentChange + changeFactor * 50);
    } else { // Forecast Accuracy (%)
      newValue = (currentVal + changeFactor * 0.5).toFixed(1) + '%';
      newChange = (currentChange + changeFactor * 0.1).toFixed(1) + '%';
    }
    
    // Format the change string
    const changeStr = (typeof newChange === 'number' && newChange >= 0) || (typeof newChange === 'string' && !newChange.startsWith('-'))
      ? `+${newChange}` : String(newChange);
    
    // Determine color based on the actual new value/change (simplified logic)
    const color = changeStr.startsWith('+') ? 'text-green-400' : 'text-red-400';

    return {
      ...metric,
      value: newValue,
      change: changeStr,
      color: color
    };
  });

  // For a real application, you would also update other data structures here.
  return {
    ...currentData,
    keyFinancialMetrics: newMetrics,
  };
};

const EconomicAnalystDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for the dashboard data and fetching status
  const [dashboardData, setDashboardData] = useState(initialData);
  const [isFetching, setIsFetching] = useState(false);
  
  // Polling interval: 30 seconds
  const POLLING_INTERVAL = 30000; 

  // Function to simulate API call and update state
  const fetchData = useCallback(async (isManual = false) => {
    // Prevent polling if a manual refresh is already in progress
    if (isFetching && !isManual) return; 

    // Use current state to derive the next state only if it's a manual fetch
    // For polling, we rely on the component closure's data state, 
    // but useCallback ensures the function definition is stable.
    setIsFetching(true);

    try {
      // Simulate network delay (1-2 seconds)
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));
      
      // Use the functional update form for setDashboardData to ensure we always use the latest state 
      // when calculating the next state, preventing issues with stale closures in polling.
      setDashboardData(prevData => generateNewData(prevData));
      
      if (isManual) {
        console.log(`Manual data refresh successful at ${new Date().toLocaleTimeString()}`);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsFetching(false);
    }
  }, [isFetching]); // Include isFetching to prevent concurrent manual fetches

  // Polling effect: runs once on mount
  useEffect(() => {
    // Initial fetch upon mounting
    fetchData(); 

    const intervalId = setInterval(() => {
      fetchData();
    }, POLLING_INTERVAL);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [fetchData]);

  // Destructure data for cleaner usage in the JSX
  const { 
    sectorPerformance, 
    assetAllocation, 
    recentReports, 
    keyFinancialMetrics, 
    riskExposure 
  } = dashboardData;


  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'text-green-400 bg-green-500/20';
      case 'Drafting': return 'text-yellow-400 bg-yellow-500/20';
      case 'Reviewing': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    // Apply Inter font globally and a dark, professional gradient background
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 font-[Inter,sans-serif]">
      
      {/* Header - Fixed layout and subtle blur for professionalism */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-md border-b border-white/20 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Link back, placeholder */}
            <Link to="#" className="text-gray-300 hover:text-white transition-colors">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Role Selection</span>
              </motion.button>
            </Link>
            
            {/* Title and Subtitle */}
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center space-x-3">
                <DollarSign className="w-8 h-8 text-green-400" />
                <span>Economic & Market Watch</span>
              </h1>
              <p className="text-gray-400">Global Financial Data & Market Health</p>
            </div>
          </div>

          {/* Controls and User Avatar */}
          <div className="flex items-center space-x-4">
            {/* Period Selector */}
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="7d" className="bg-gray-800">Last 7 Days</option>
              <option value="30d" className="bg-gray-800">Last 30 Days</option>
              <option value="90d" className="bg-gray-800">Last Quarter</option>
            </select>
            
            {/* Refresh Button - Now uses fetchData and shows loading state */}
            <motion.button
              onClick={() => fetchData(true)}
              disabled={isFetching}
              whileHover={{ scale: isFetching ? 1 : 1.05 }}
              className={`p-2 bg-white/10 rounded-full text-white transition-all ${isFetching ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}`}
            >
              <RefreshCw className={`w-5 h-5 ${isFetching ? 'animate-spin' : ''}`} />
            </motion.button>

            {/* User Avatar */}
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">EA</span> 
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 pb-0"
      >
        <div className="flex space-x-1 bg-white/5 backdrop-blur-sm rounded-xl p-1 overflow-x-auto border border-white/10">
          {[
            { id: 'overview', label: 'Market Overview', icon: TrendingUp }, 
            { id: 'audits', label: 'Sector Reports', icon: FileText },      
            { id: 'users', label: 'Risk Indicators', icon: Shield },       
            { id: 'settings', label: 'Data Configuration', icon: Settings } 
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-green-500/30 text-white border border-green-500/50 shadow-md' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="p-6 space-y-6">
        
        {/* Market Overview Tab (activeTab === 'overview') */}
        {activeTab === 'overview' && (
          <>
            {/* Key Financial Metrics Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {keyFinancialMetrics.map((metric, index) => {
                const Icon = metric.icon; 
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Icon className={`w-8 h-8 ${metric.color}`} />
                      <span className={`text-sm font-semibold ${
                        metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">{metric.value}</h3>
                    <p className="text-gray-400">{metric.title}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sector Performance Chart (Bar Chart) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg"
              >
                <h3 className="text-xl font-bold text-white flex items-center space-x-2 mb-6">
                  <BarChart3 className="w-6 h-6 text-green-400" />
                  <span>Sector Performance (Growth vs. Investment)</span>
                </h3>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sectorPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Bar dataKey="growth" fill="#34D399" name="Growth (%)" radius={[10, 10, 0, 0]} />
                      <Bar dataKey="investment" fill="#3B82F6" name="Investment (Ratio)" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Asset Allocation Distribution (Pie Chart) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg"
              >
                <h3 className="text-xl font-bold text-white flex items-center space-x-2 mb-6">
                  <DollarSign className="w-6 h-6 text-green-400" />
                  <span>Asset Allocation (QTD)</span>
                </h3>

                <div className="flex items-center justify-center h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={assetAllocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={50} // Added innerRadius for a donut chart look
                        outerRadius={100}
                        dataKey="value"
                        // Custom label only shows Name and value in percent
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false} // Hide connection lines
                      >
                        {assetAllocation.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            style={{ transition: 'fill 0.3s ease' }} 
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* Sector Reports Tab (activeTab === 'audits') */}
        {activeTab === 'audits' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Report Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <div className="relative flex-grow">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    className="pl-10 pr-4 py-2 w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all flex items-center space-x-2 min-w-max"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-all flex items-center space-x-2 shadow-lg min-w-max"
              >
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </motion.button>
            </div>

            {/* Report List */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <FileText className="w-6 h-6 text-green-400" />
                  <span>Recent Sector Reports</span>
                </h3>
                <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-sm font-semibold">
                  {recentReports.length} Published
                </span>
              </div>

              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                  >
                    <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-green-400 font-semibold text-sm sm:text-base">#{report.id}</span>
                        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                          {report.status}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {/* Score/Confidence */}
                        <span className={`text-xl font-bold ${getScoreColor(report.score)}`}>
                          {report.score}%
                        </span>
                        <div className='flex items-center text-gray-400 text-sm'>
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{report.date}</span>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-white font-semibold mb-2 text-lg">{report.topic}</h4>
                    <p className="text-gray-400 mb-3 text-sm">{report.findings}</p>
                    
                    <div className="flex flex-wrap items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-sm text-gray-300">
                        Analyst: <span className="text-blue-400 font-medium">{report.analyst}</span>
                      </span>
                      <div className="flex space-x-2 mt-2 sm:mt-0">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-all"
                        >
                          View Deep Dive
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 bg-teal-600 hover:bg-teal-700 rounded-lg text-white text-sm transition-all flex items-center space-x-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>Export</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Risk Indicators Tab (activeTab === 'users') */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Risk Exposure Overview */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2 mb-6">
                <Shield className="w-6 h-6 text-yellow-400" />
                <span>Risk Exposure by Sector</span>
              </h3>

              <div className="space-y-6">
                {riskExposure.map((sector, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 font-medium">{sector.sector}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-white text-sm">
                          {sector.exposure}/{sector.total} exposed
                        </span>
                        <span className="text-yellow-400 font-semibold min-w-[50px] text-right">
                          {sector.percentage}%
                        </span>
                      </div>
                    </div>
                    {/* Risk Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${sector.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Data Configuration Tab (activeTab === 'settings') */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2 mb-6">
                <Settings className="w-6 h-6 text-orange-400" />
                <span>Data Configuration</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 p-4 border border-white/10 rounded-xl bg-white/5">
                  <h4 className="text-lg font-semibold text-white">Watchlist Alerts</h4>
                  <div className="space-y-3">
                    {/* Checkbox item */}
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-green-500 bg-white/10 border-white/20 rounded focus:ring-green-500" 
                        defaultChecked 
                      />
                      <span className="text-gray-300">Real-time volatility spikes</span>
                    </label>
                    {/* Checkbox item */}
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-green-500 bg-white/10 border-white/20 rounded focus:ring-green-500" 
                        defaultChecked 
                      />
                      <span className="text-gray-300">Email summary reports</span>
                    </label>
                    {/* Checkbox item */}
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="form-checkbox h-5 w-5 text-green-500 bg-white/10 border-white/20 rounded focus:ring-green-500" 
                      />
                      <span className="text-gray-300">Critical price action alerts (SMS)</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4 p-4 border border-white/10 rounded-xl bg-white/5">
                  <h4 className="text-lg font-semibold text-white">Data Source Settings</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Market Data Lag (ms)</label>
                      <input 
                        type="number" 
                        defaultValue="500" 
                        min="100"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2 text-sm">Report History Retention (days)</label>
                      <input 
                        type="number" 
                        defaultValue="730" 
                        min="30"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-white transition-all shadow-md font-semibold"
                >
                  Save Settings
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EconomicAnalystDashboard;
