import { AIInsight } from '../utils/api';
import { AlertTriangle, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface AIInsightCardProps {
  insight: AIInsight;
}

export default function AIInsightCard({ insight }: AIInsightCardProps) {
  const riskConfig = {
    low: {
      icon: CheckCircle,
      color: 'from-emerald-600 to-emerald-700',
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
    medium: {
      icon: TrendingUp,
      color: 'from-amber-600 to-amber-700',
      textColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10'
    },
    high: {
      icon: AlertTriangle,
      color: 'from-orange-600 to-orange-700',
      textColor: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
    critical: {
      icon: AlertCircle,
      color: 'from-red-600 to-red-700',
      textColor: 'text-red-400',
      bgColor: 'bg-red-500/10'
    }
  };

  const config = riskConfig[insight.riskLevel];
  const Icon = config.icon;

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all">
      <div className={`bg-gradient-to-r ${config.color} p-4`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-white/20 p-2 rounded-lg mt-1">
              <Icon size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-white/80 uppercase">{insight.domain}</span>
                <span className="text-xs text-white/60">•</span>
                <span className="text-xs text-white/80 uppercase">{insight.riskLevel} Risk</span>
              </div>
              <p className="text-white font-semibold text-sm leading-relaxed">{insight.prediction}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400 font-medium">Confidence Level</span>
              <span className={`text-sm font-bold ${config.textColor}`}>{insight.confidence}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${config.color} transition-all`}
                style={{ width: `${insight.confidence}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Recommended Actions</h4>
          <ul className="space-y-2">
            {insight.actions.map((action, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <span className={`mt-1 w-1.5 h-1.5 rounded-full ${config.bgColor} flex-shrink-0`}></span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
