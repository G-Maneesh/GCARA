import React, { useState, useEffect } from 'react';
import { 
  Shield, MapPin, Users, Truck, 
  Phone, Clock, AlertTriangle, CheckCircle,
  ArrowLeft, RefreshCw, MessageSquare, Target
} from 'lucide-react';

const App = () => {
  // State for the last successful poll time
  const [lastPollTime, setLastPollTime] = useState(new Date());

  // Incident Data State
  const [activeIncidents, setActiveIncidents] = useState([
    {
      id: 'INC-001',
      type: 'Natural Disaster',
      title: 'Earthquake Response - Zone Alpha',
      location: 'San Andreas, CA',
      severity: 'Critical',
      status: 'Active',
      priority: 1,
      timeElapsed: '2h 34m',
      resourcesDeployed: 12,
      peopleAffected: 15000,
      lastUpdate: new Date().toLocaleTimeString(),
    },
    {
      id: 'INC-002',
      type: 'Health Emergency',
      title: 'Disease Outbreak Containment',
      location: 'Metro City Hospital District',
      severity: 'High',
      status: 'Monitoring',
      priority: 2,
      timeElapsed: '6h 12m',
      resourcesDeployed: 8,
      peopleAffected: 2500,
      lastUpdate: new Date().toLocaleTimeString(),
    },
    {
      id: 'INC-003',
      type: 'Conflict',
      title: 'Evacuation Operation - Sector 7',
      location: 'Border Region East',
      severity: 'Medium',
      status: 'Preparation',
      priority: 3,
      timeElapsed: '45m',
      resourcesDeployed: 5,
      peopleAffected: 800,
      lastUpdate: new Date().toLocaleTimeString(),
    }
  ]);

  // Resource Data (Static for simplicity)
  const resources = [
    { type: 'Medical Teams', available: 24, deployed: 12, total: 36, icon: Users, color: 'text-blue-400' },
    { type: 'Emergency Vehicles', available: 18, deployed: 8, total: 26, icon: Truck, color: 'text-green-400' },
    { type: 'Supply Stations', available: 15, deployed: 5, total: 20, icon: Target, color: 'text-purple-400' },
    { type: 'Coordination Centers', available: 6, deployed: 3, total: 9, icon: Shield, color: 'text-orange-400' }
  ];

  // Communications Data (Static for simplicity)
  const communications = [
    { 
      id: 1, 
      from: 'Command Center Alpha', 
      message: 'Medical team deployment confirmed at coordinates 34.0522°N',
      time: '2 min ago',
      priority: 'high'
    },
    { 
      id: 2, 
      from: 'Field Unit 7', 
      message: 'Evacuation route clear, proceeding with operation',
      time: '8 min ago',
      priority: 'normal'
    },
    { 
      id: 3, 
      from: 'NGO Partner - RedAid', 
      message: 'Additional medical supplies available for deployment',
      time: '15 min ago',
      priority: 'low'
    }
  ];

  /**
   * Simulates fetching new data and updating the state.
   * In a real app, this would be an API call (fetch or axios).
   */
  const simulateDataUpdate = () => {
    setActiveIncidents(prevIncidents => prevIncidents.map(inc => {
      // Simulate resource changes to demonstrate dynamic updates
      let newResources = inc.resourcesDeployed;
      if (inc.id === 'INC-001') {
        // Cycle resources deployed between 12 and 15
        newResources = inc.resourcesDeployed < 15 ? inc.resourcesDeployed + 1 : 12; 
      }

      return {
        ...inc,
        resourcesDeployed: newResources,
        // Update the last update time to the current time string
        lastUpdate: new Date().toLocaleTimeString(),
      };
    }));
    setLastPollTime(new Date()); // Update the last poll time
  };

  /**
   * Polling Strategy Implementation
   * Polls for new data every 10 seconds (10000ms).
   */
  useEffect(() => {
    // Perform initial update immediately
    simulateDataUpdate(); 

    // Set up the polling interval
    const POLL_INTERVAL = 10000; // 10 seconds
    const intervalId = setInterval(simulateDataUpdate, POLL_INTERVAL); 

    // Cleanup: Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this only runs once on mount

  // Utility functions for styling based on data
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'High': return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      default: return 'text-green-400 bg-green-500/20 border-green-500/50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-red-400';
      case 'Monitoring': return 'text-yellow-400';
      case 'Preparation': return 'text-blue-400';
      default: return 'text-green-400';
    }
  };

  // --- Component Structure ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-orange-900 font-inter">
      {/* Header (Simulating framer-motion opacity: 1) */}
      <header
        className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4 sm:p-6 transition-opacity duration-500"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-6">
            
            <a href="#" className="hidden sm:block">
              <button
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm sm:text-base">Dashboard View</span>
              </button>
            </a>
            
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-3">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
                <span>Emergency Responder Console</span>
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm">Real-time Incident Management & Coordination</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Emergency Mode Indicator */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-red-500/20 rounded-full border border-red-500/50">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 font-semibold text-sm">Emergency Mode</span>
            </div>
            
            {/* Last Poll Time Indicator */}
            <div className="flex items-center space-x-1 px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                <Clock className="w-3 h-3 text-green-400" />
                <span className="hidden md:inline">Last Poll:</span>
                <span>{lastPollTime.toLocaleTimeString()}</span>
            </div>

            {/* Refresh Button - now triggers immediate poll */}
            <button
              onClick={simulateDataUpdate}
              className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all duration-300 transform hover:rotate-90 hover:scale-105"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            {/* User Avatar */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm sm:text-base">R</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Status Overview */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {[
            { title: 'Active Incidents', value: activeIncidents.length, status: 'Critical', icon: AlertTriangle, color: 'text-red-400' },
            { title: 'Teams Deployed', value: '25', status: 'Operational', icon: Users, color: 'text-green-400' },
            { title: 'Response Time', value: '8.5min', status: 'Average', icon: Clock, color: 'text-blue-400' },
            { title: 'People Helped', value: '18,300', status: 'Total Today', icon: CheckCircle, color: 'text-purple-400' }
          ].map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 transition-all duration-300 hover:shadow-2xl hover:border-white/30 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${metric.color}`} />
                  <span className="text-gray-400 text-xs sm:text-sm px-2 py-1 rounded-full bg-white/5">{metric.status}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{metric.value}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{metric.title}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Active Incidents List */}
          <div
            className="xl:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <span>Active Crisis Responses</span>
              </h3>
              <div className="flex space-x-2">
                <button
                  className="px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  New Incident
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {activeIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/50 transition-all duration-300 transform hover:shadow-red-900/50 shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3">
                    <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </div>
                      <span className="text-gray-400 text-sm">#{incident.id}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(incident.status)} animate-pulse`}></div>
                      <span className={`text-sm font-semibold ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-white text-lg font-semibold mb-3">{incident.title}</h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-4 text-sm border-t border-white/10 pt-3">
                    <div className='flex items-center space-x-1'>
                      <MapPin className="w-4 h-4 text-red-400" />
                      <p className="text-gray-300 font-medium truncate">{incident.location}</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <p className="text-gray-300">{incident.timeElapsed}</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Truck className="w-4 h-4 text-green-400" />
                      <p className="text-gray-300">{incident.resourcesDeployed} Units</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Users className="w-4 h-4 text-purple-400" />
                      <p className="text-gray-300">{incident.peopleAffected.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 border-t border-white/10 pt-3">
                    {/* Displaying last update time from state */}
                    <span className="text-gray-400 text-xs sm:text-sm">Last update: {incident.lastUpdate}</span>
                    <div className="flex space-x-2">
                      <button
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-all duration-300 transform hover:scale-105"
                      >
                        Manage Details
                      </button>
                      <button
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm transition-all duration-300 transform hover:scale-105"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Panels: Resource Status & Communications */}
          <div className="space-y-6">
            
            {/* Resource Status */}
            <div
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white flex items-center space-x-2 mb-6">
                <Truck className="w-6 h-6 text-green-400" />
                <span>Resource Status</span>
              </h3>

              <div className="space-y-4">
                {resources.map((resource, index) => {
                  const Icon = resource.icon;
                  const utilization = (resource.deployed / resource.total) * 100;
                  return (
                    <div key={index} className="space-y-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon className={`w-5 h-5 ${resource.color}`} />
                          <span className="text-gray-300 font-medium">{resource.type}</span>
                        </div>
                        <span className="text-white font-semibold text-sm">
                          {resource.deployed} Deployed / {resource.available} Available
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            utilization > 80 ? 'bg-red-500' :
                            utilization > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${utilization}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Communications */}
            <div
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                  <span>Communications Log</span>
                </h3>
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-400 font-bold text-sm">
                  {communications.length} New
                </span>
              </div>

              <div className="space-y-3">
                {communications.map((comm) => (
                  <div 
                    key={comm.id} 
                    className="p-3 rounded-lg bg-white/5 border-l-4 border-blue-500 transition-shadow duration-300 shadow-md hover:shadow-xl hover:bg-white/10"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-blue-300 font-semibold text-sm">{comm.from}</span>
                      <span className="text-gray-400 text-xs">{comm.time}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{comm.message}</p>
                  </div>
                ))}
              </div>

              <button
                className="w-full mt-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-all duration-300 transform hover:scale-[1.01] shadow-md"
              >
                Open Communication Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
