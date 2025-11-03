import React from 'react';
import { Bell, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-dark-800 border-b border-dark-600 flex items-center justify-between px-6 z-40">
      <div>
        <h1 className="text-xl font-heading font-bold">Welcome Back</h1>
        <p className="text-sm text-gray-400">Here's what's happening today</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-dark-700 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;