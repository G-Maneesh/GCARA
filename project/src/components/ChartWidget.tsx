import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ReactNode } from 'react';

interface ChartWidgetProps {
  title: string;
  subtitle?: string;
  data: any[];
  type: 'line' | 'area' | 'bar';
  dataKey: string;
  xAxisKey: string;
  color?: string;
  children?: ReactNode;
}

export default function ChartWidget({
  title,
  subtitle,
  data,
  type,
  dataKey,
  xAxisKey,
  color = '#3b82f6',
  children
}: ChartWidgetProps) {
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 5, left: 5, bottom: 5 }
    };

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey={xAxisKey} stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey={xAxisKey} stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey={dataKey} stroke={color} fill={color} fillOpacity={0.3} />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey={xAxisKey} stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey={dataKey} fill={color} />
          </BarChart>
        );
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 hover:border-gray-600 transition-all">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      </div>

      <ResponsiveContainer width="100%" height={250}>
        {renderChart()}
      </ResponsiveContainer>

      {children}
    </div>
  );
}
