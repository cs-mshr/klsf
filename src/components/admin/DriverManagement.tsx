import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

interface Driver {
  id: number;
  user: number;
  vehicle: string | null;
  license_number: string;
  current_location: string;
}

const DriverManagement: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await api.get('/logistics/admin/drivers/');
      setDrivers(response.data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      setError('Failed to load drivers');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Driver Management</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td className="px-6 py-4 whitespace-nowrap">{driver.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{driver.user}</td>
              <td className="px-6 py-4 whitespace-nowrap">{driver.license_number}</td>
              <td className="px-6 py-4 whitespace-nowrap">{driver.current_location}</td>
              <td className="px-6 py-4 whitespace-nowrap">{driver.vehicle || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverManagement;