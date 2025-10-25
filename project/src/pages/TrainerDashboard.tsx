import React, { useState, useEffect } from 'react';
// Note: Framer Motion and React Router DOM are removed as per single-file requirement.
// Animations are replaced with simple CSS transitions.
import { 
  Play, Users, BookOpen, Award, 
  Target, Clock, TrendingUp, Settings,
  ArrowLeft, RefreshCw, Plus, Eye
} from 'lucide-react';

// Define the static training programs outside the component as they don't change with polling
const trainingProgramsData = [
  {
    title: 'Crisis Leadership Certification',
    level: 'Advanced',
    modules: 8,
    duration: '40 hours',
    enrolled: 156,
    completion: 76,
    rating: 4.8
  },
  {
    title: 'Emergency Response Fundamentals',
    level: 'Beginner',
    modules: 6,
    duration: '24 hours',
    enrolled: 284,
    completion: 89,
    rating: 4.6
  },
  {
    title: 'Multi-Agency Coordination',
    level: 'Intermediate',
    modules: 10,
    duration: '50 hours',
    enrolled: 98,
    completion: 68,
    rating: 4.9
  }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('simulations');
  const [lastPollTime, setLastPollTime] = useState(new Date());

  // State for Overview Metrics
  const [metrics, setMetrics] = useState({
    activeSimulations: 12,
    totalParticipants: 847,
    avgScore: 89.5,
    completionRate: 84,
  });

  // State for Simulations
  const [simulations, setSimulations] = useState([
    {
      id: 'SIM-001',
      title: 'Earthquake Response Protocol',
      type: 'Natural Disaster',
      difficulty: 'Advanced',
      duration: '45 minutes',
      participants: 24,
      completionRate: 87,
      averageScore: 92.0,
      status: 'Active',
      description: 'Comprehensive earthquake response simulation with multi-agency coordination'
    },
    {
      id: 'SIM-002',
      title: 'Pandemic Response Coordination',
      type: 'Health Emergency',
      difficulty: 'Expert',
      duration: '60 minutes',
      participants: 18,
      completionRate: 78,
      averageScore: 88.0,
      status: 'Scheduled',
      description: 'Complex pandemic management scenario with resource allocation challenges'
    },
    {
      id: 'SIM-003',
      title: 'Flood Evacuation Exercise',
      type: 'Natural Disaster',
      difficulty: 'Intermediate',
      duration: '30 minutes',
      participants: 32,
      completionRate: 95,
      averageScore: 89.0,
      status: 'Completed',
      description: 'Large-scale evacuation coordination and logistics management'
    }
  ]);

  // State for Recent Sessions
  const [recentSessions, setRecentSessions] = useState([
    {
      participant: 'Alpha Team',
      simulation: 'Earthquake Response',
      score: 94,
      duration: '42 min',
      completed: new Date(Date.now() - 7200000).toLocaleTimeString(), // 2 hours ago
    },
    {
      participant: 'Bravo Squad',
      simulation: 'Flood Evacuation',
      score: 87,
      duration: '28 min',
      completed: new Date(Date.now() - 14400000).toLocaleTimeString(), // 4 hours ago
    },
    {
      participant: 'Charlie Unit',
      simulation: 'Health Crisis',
      score: 91,
      duration: '55 min',
      completed: new Date(Date.now() - 21600000).toLocaleTimeString(), // 6 hours ago
    }
  ]);

  /**
   * Simulates fetching new data and updating the state.
   */
  const simulateDataUpdate = () => {
    // 1. Update Metrics (simulated growth/fluctuation)
    setMetrics(prev => ({
        activeSimulations: prev.activeSimulations + (Math.random() > 0.8 ? 1 : 0),
        totalParticipants: prev.totalParticipants + Math.floor(Math.random() * 20),
        // Randomly adjust score by a small factor
        avgScore: parseFloat((prev.avgScore + (Math.random() * 0.5 - 0.2)).toFixed(1)), 
        completionRate: Math.min(99, prev.completionRate + (Math.random() > 0.7 ? 1 : 0)),
    }));

    // 2. Update Simulation Stats
    setSimulations(prevSims => prevSims.map(sim => ({
        ...sim,
        // Completion rate slowly increases for active/scheduled sims
        completionRate: sim.status !== 'Completed' ? Math.min(100, sim.completionRate + (Math.random() > 0.6 ? 1 : 0)) : sim.completionRate,
        averageScore: parseFloat((sim.averageScore + (Math.random() * 0.3 - 0.1)).toFixed(1)),
    })));

    // 3. Add a new Recent Session occasionally (60% chance)
    if (Math.random() > 0.4) {
        const newSession = {
            participant: ['Delta Squad', 'Echo Team', 'Foxtrot Unit', 'Zeta Force'][Math.floor(Math.random() * 4)],
            simulation: ['Fire Hazard Drill', 'Earthquake Response', 'Pandemic Response', 'Riot Control'][Math.floor(Math.random() * 4)],
            score: Math.floor(75 + Math.random() * 25), // 75-100
            duration: `${Math.floor(20 + Math.random() * 40)} min`,
            completed: new Date().toLocaleTimeString(),
        };
        // Keep only the 5 most recent sessions
        setRecentSessions(prevSessions => [newSession, ...prevSessions.slice(0, 4)]);
    }

    // 4. Update Poll Time
    setLastPollTime(new Date());
  };


  /**
   * Polling Implementation: Runs simulateDataUpdate every 8 seconds.
   */
  useEffect(() => {
    // Perform initial update immediately
    simulateDataUpdate(); 

    // Set up the polling interval (8000 milliseconds = 8 seconds)
    const POLL_INTERVAL = 8000;
    const intervalId = setInterval(simulateDataUpdate, POLL_INTERVAL); 

    // Cleanup: Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); 
  
  // Utility functions (moved outside the polling logic)
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'Advanced': return 'text-orange-400 bg-orange-500/20';
      case 'Expert': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400';
      case 'Scheduled': return 'text-yellow-400';
      case 'Completed': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  // --- Component Structure ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-teal-900 font-inter">
      {/* Header */}
      <header
        className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4 sm:p-6 transition-all duration-300"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Replaced Link with simple div */}
            <div className='hidden sm:block'>
              <button
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm sm:text-base">Back to Home</span>
              </button>
            </div>
            
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-3">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                <span>Training & Simulation Center</span>
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm">Crisis Response Training & Skill Development</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Last Poll Time Indicator */}
            <div className="flex items-center space-x-1 px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                <Clock className="w-3 h-3 text-green-400" />
                <span className="hidden md:inline">Last Update:</span>
                <span>{lastPollTime.toLocaleTimeString()}</span>
            </div>

            <button
              onClick={simulateDataUpdate}
              className="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span className='hidden sm:inline'>New Simulation</span>
            </button>
            
            <button
              onClick={simulateDataUpdate} // Manual refresh trigger
              className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all transform hover:rotate-45 hover:scale-105"
              aria-label="Refresh Data"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm sm:text-base">T</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div
        className="p-4 pt-2 sm:p-6 sm:pt-4 max-w-7xl mx-auto"
      >
        <div className="flex space-x-1 bg-white/5 backdrop-blur-sm rounded-lg p-1 overflow-x-auto whitespace-nowrap">
          {[
            { id: 'simulations', label: 'Active Simulations', icon: Play },
            { id: 'programs', label: 'Training Programs', icon: BookOpen },
            { id: 'performance', label: 'Performance Analytics', icon: TrendingUp },
            { id: 'settings', label: 'Simulation Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all text-sm sm:text-base ${
                  activeTab === tab.id 
                    ? 'bg-green-500/30 text-white border border-green-500/50 shadow-md' 
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 pt-0 max-w-7xl mx-auto space-y-6">
        
        {/* Overview Stats */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 transition-all duration-500"
        >
          {[
            { title: 'Active Sims', value: metrics.activeSimulations, icon: Play, color: 'text-green-400' },
            { title: 'Total Participants', value: metrics.totalParticipants, icon: Users, color: 'text-blue-400' },
            { title: 'Avg. Score', value: `${metrics.avgScore}%`, icon: Award, color: 'text-purple-400' },
            { title: 'Completion Rate', value: `${metrics.completionRate}%`, icon: Target, color: 'text-orange-400' }
          ].map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 transition-all duration-300 hover:shadow-2xl hover:border-white/30 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${metric.color}`} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{metric.value}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{metric.title}</p>
              </div>
            );
          })}
        </div>

        {/* Simulations Tab */}
        {activeTab === 'simulations' && (
          <div className="space-y-6 transition-opacity duration-300">
            {/* Active Simulations */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Play className="w-6 h-6 text-green-400" />
                  <span>Crisis Simulations</span>
                </h3>
                <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-sm font-semibold">
                  {simulations.length} Active
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {simulations.map((sim, index) => (
                  <div
                    key={sim.id}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:shadow-green-900/50 shadow-md"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(sim.difficulty)}`}>
                          {sim.difficulty}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(sim.status)} animate-pulse`}></div>
                      </div>
                      <span className={`text-sm font-semibold ${getStatusColor(sim.status)}`}>
                        {sim.status}
                      </span>
                    </div>

                    <h4 className="text-white font-semibold mb-2 text-lg">{sim.title}</h4>
                    <p className="text-gray-400 text-sm mb-4">{sim.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm border-t border-white/10 pt-4">
                      <div>
                        <p className="text-gray-400">Duration</p>
                        <p className="text-white flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-yellow-400" />
                          {sim.duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Participants</p>
                        <p className="text-white flex items-center">
                          <Users className="w-4 h-4 mr-1 text-blue-400" />
                          {sim.participants}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Completion Rate</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-700 rounded-full h-2">
                            <div
                              className="h-2 bg-green-500 rounded-full transition-all duration-700"
                              style={{ width: `${sim.completionRate}%` }}
                            />
                          </div>
                          <span className="text-green-400 text-sm font-semibold">{sim.completionRate}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">Avg. Score</p>
                        <p className="text-white font-semibold">{sim.averageScore}%</p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        className="flex-1 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-1 shadow-lg"
                      >
                        <Play className="w-4 h-4" />
                        <span>Launch</span>
                      </button>
                      <button
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm transition-all transform hover:scale-[1.02] shadow-lg"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Session Results (Polled data) */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 shadow-xl">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2 mb-6">
                <Award className="w-6 h-6 text-purple-400" />
                <span>Recent Session Results</span>
              </h3>

              <div className="space-y-4">
                {recentSessions.map((session, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 transition-all duration-300 hover:bg-white/10 transform hover:shadow-2xl"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-inner">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{session.participant}</h4>
                        <p className="text-gray-400 text-sm">{session.simulation}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-purple-400 font-semibold">{session.score}%</p>
                        <p className="text-gray-400 text-xs">Score</p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-blue-400 font-semibold">{session.duration}</p>
                        <p className="text-gray-400 text-xs">Duration</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-300 text-sm font-medium">{session.completed}</p>
                        <p className="text-gray-400 text-xs">Completed</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Training Programs Tab (Static) */}
        {activeTab === 'programs' && (
          <div className="space-y-6 transition-opacity duration-300">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  <span>Training Programs</span>
                </h3>
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-all transform hover:scale-[1.02] flex items-center space-x-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Program</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {trainingProgramsData.map((program, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:shadow-blue-900/50 shadow-md"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(program.level)}`}>
                        {program.level}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-semibold text-sm">{program.rating}</span>
                      </div>
                    </div>

                    <h4 className="text-white font-semibold mb-4 text-lg">{program.title}</h4>
                    
                    <div className="space-y-3 mb-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Modules</span>
                        <span className="text-white">{program.modules}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration</span>
                        <span className="text-white">{program.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Enrolled</span>
                        <span className="text-white">{program.enrolled}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400 text-sm">Completion</span>
                        <span className="text-green-400 text-sm font-semibold">{program.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                          style={{ width: `${program.completion}%` }}
                        />
                      </div>
                    </div>

                    <button
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-all transform hover:scale-[1.01] shadow-md"
                    >
                      Manage Program
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Performance Analytics Tab (Placeholder) */}
        {activeTab === 'performance' && (
          <div className="space-y-6 transition-opacity duration-300">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2 mb-6">
                <TrendingUp className="w-6 h-6 text-orange-400" />
                <span>Performance Analytics</span>
              </h3>
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Detailed **Performance Analytics** and reports coming soon...</p>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab (Placeholder) */}
        {activeTab === 'settings' && (
          <div className="space-y-6 transition-opacity duration-300">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2 mb-6">
                <Settings className="w-6 h-6 text-gray-400" />
                <span>Simulation Configuration</span>
              </h3>
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Simulation **settings** and configuration options coming soon...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
