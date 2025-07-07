import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Силант</h1>
            <span className="text-sm opacity-75">Сервис по обслуживанию техники</span>
          </div>
          <nav className="flex space-x-6">
            <Link 
              to="/" 
              className="hover:text-blue-200 transition-colors"
            >
              Главная
            </Link>
            <Link 
              to="/machines" 
              className="hover:text-blue-200 transition-colors"
            >
              Машины
            </Link>
            <Link 
              to="/maintenance" 
              className="hover:text-blue-200 transition-colors"
            >
              ТО
            </Link>
            <Link 
              to="/complaints" 
              className="hover:text-blue-200 transition-colors"
            >
              Рекламации
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;