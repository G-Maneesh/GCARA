import { Link, useLocation } from 'react-router-dom';
import { CloudRain, DollarSign, Heart, Zap, Brain, Activity } from 'lucide-react';

const navItems = [
  { path: '/', icon: Activity, label: 'Overview' },
  { path: '/climate', icon: CloudRain, label: 'Climate' },
  { path: '/finance', icon: DollarSign, label: 'Finance' },
  { path: '/health', icon: Heart, label: 'Health' },
  { path: '/energy', icon: Zap, label: 'Energy' },
  { path: '/ai-insights', icon: Brain, label: 'AI Insights' }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-gray-900 min-h-screen border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          GCARA
        </h1>
        <p className="text-xs text-gray-400 mt-1">Global Crisis Anticipation</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">System Status</span>
          </div>
          <p className="text-sm text-white font-medium">All Systems Operational</p>
        </div>
      </div>
    </div>
  );
}
