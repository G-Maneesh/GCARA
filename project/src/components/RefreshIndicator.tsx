import { RefreshCw } from 'lucide-react';

interface RefreshIndicatorProps {
  lastUpdate: string;
  onRefresh?: () => void;
}

export default function RefreshIndicator({ lastUpdate, onRefresh }: RefreshIndicatorProps) {
  const getTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="flex items-center gap-3 text-sm text-gray-400">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <span>Last updated: {getTimeAgo(lastUpdate)}</span>
      </div>
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all"
        >
          <RefreshCw size={14} />
          <span>Refresh</span>
        </button>
      )}
    </div>
  );
}
