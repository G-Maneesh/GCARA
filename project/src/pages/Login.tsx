import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, User, Lock, ArrowRight, AlertTriangle, TrendingUp } from 'lucide-react'; // Changed 'trendingUp' to 'TrendingUp' for clarity

const Login: React.FC = () => {
  // We initialize the state to the new 'economic-analyst' ID to ensure it is selected by default 
  // if 'admin' was previously the default, or use 'analyst' as a sensible default.
  const [userRole, setUserRole] = useState('analyst'); 
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // UPDATED: Use the new role ID and route
    const routes: { [key: string]: string } = {
      analyst: '/analyst',
      responder: '/responder',
      'economic-analyst': '/economic-analyst', // <-- NEW KEY and ROUTE
      trainer: '/trainer'
    };
    
    // Check the selected role and navigate
    navigate(routes[userRole]);
  };

  // INTERFACE CHANGES HERE:
  // 1. Label changed to 'Economic Analyst'
  // 2. ID changed to 'economic-analyst'
  // 3. Icon changed to 'TrendingUp'
  const roles = [
    { id: 'analyst', label: 'Crisis Analyst', icon: AlertTriangle, color: 'text-blue-400' },
    { id: 'responder', label: 'Emergency Responder', icon: Shield, color: 'text-red-400' },
    { 
        id: 'economic-analyst', 
        label: 'Economic Analyst', 
        icon: TrendingUp, // <-- New icon for visual change
        color: 'text-green-400' 
    }, 
    { id: 'trainer', label: 'Simulation Trainer', icon: User, color: 'text-purple-400' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/20"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">GCARA Login</h1>
          <p className="text-gray-300">Select your role and sign in</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-3">Select Role</label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <motion.button
                    key={role.id}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setUserRole(role.id)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      userRole === role.id 
                        ? 'border-blue-500 bg-blue-500/20' 
                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${role.color}`} />
                    <p className="text-xs text-gray-300">{role.label}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {/* Email Input Field */}
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Input Field */}
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Sign In <ArrowRight className="w-5 h-5" />
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
