import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface LiveCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  severity?: 'normal' | 'warning' | 'critical';
  children?: ReactNode;
}

export default function LiveCard({
  icon: Icon,
  title,
  value,
  subtitle,
  trend,
  trendValue,
  severity = 'normal',
  children
}: LiveCardProps) {
  const severityColors = {
    normal: 'from-emerald-600 to-emerald-700',
    warning: 'from-amber-600 to-amber-700',
    critical: 'from-red-600 to-red-700'
  };

  const trendColors = {
    up: 'text-emerald-400',
    down: 'text-red-400',
    neutral: 'text-gray-400'
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all">
      <div className={`bg-gradient-to-r ${severityColors[severity]} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Icon size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">{title}</h3>
              {subtitle && <p className="text-white/80 text-xs mt-0.5">{subtitle}</p>}
            </div>
          </div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-end justify-between mb-2">
          <span className="text-3xl font-bold text-white">{value}</span>
          {trend && trendValue && (
            <span className={`text-sm font-medium ${trendColors[trend]}`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </span>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
