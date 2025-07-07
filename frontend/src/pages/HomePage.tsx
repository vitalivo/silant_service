import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { machineService } from '../services/api';

const HomePage: React.FC = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [machine, setMachine] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serialNumber.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await machineService.searchBySerial(serialNumber);
      setMachine(response.data);
    } catch (err) {
      setError('Машина с таким серийным номером не найдена');
      setMachine(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Проверьте комплектацию и технические характеристики техники Силант
        </h1>
        <p className="text-gray-600">
          Введите заводской номер машины для получения информации
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4 max-w-md mx-auto">
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="Заводской номер машины"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            <Search size={20} />
            {loading ? 'Поиск...' : 'Найти'}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {machine && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Информация о машине</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Заводской номер</h3>
              <p className="text-gray-900">{machine.serial_number}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Модель техники</h3>
              <p className="text-gray-900">{machine.technique_model?.name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Модель двигателя</h3>
              <p className="text-gray-900">{machine.engine_model?.name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Дата отгрузки</h3>
              <p className="text-gray-900">{machine.shipment_date && new Date(machine.shipment_date).toLocaleDateString('ru-RU')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;