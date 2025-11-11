import { Bell, Settings, User } from 'lucide-react';

interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="text-sm text-gray-400 mt-1">Real-time monitoring and analysis</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
            <Settings size={20} />
          </button>

          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
            <User size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
