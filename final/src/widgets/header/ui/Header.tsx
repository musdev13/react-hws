import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/entities/user';
import { LogOut, FileText, PlusCircle } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/requests" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition">
            📋 Сервісні заявки
          </Link>
          <nav className="flex gap-4">
            <Link to="/requests" className="text-gray-600 hover:text-blue-600 transition flex items-center gap-1">
              <FileText className="w-4 h-4" /> Список
            </Link>
            {role === 'user' && (
              <Link to="/requests/new" className="text-gray-600 hover:text-blue-600 transition flex items-center gap-1">
                <PlusCircle className="w-4 h-4" /> Створити
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {user?.name} <span className="text-xs text-gray-400">({role})</span>
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" /> Вийти
          </button>
        </div>
      </div>
    </header>
  );
};