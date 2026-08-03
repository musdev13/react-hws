import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Сторінку не знайдено</p>
      <Link to="/requests" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Перейти до заявок
      </Link>
    </div>
  );
};