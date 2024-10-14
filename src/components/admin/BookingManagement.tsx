import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

interface Booking {
  id: number;
  user: number;
  driver: number | null;
  vehicle_type: string;
  pickup_location: string;
  dropoff_location: string;
  status: string;
  estimated_price: string;
  actual_price: string | null;
}

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/logistics/admin/bookings/');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load bookings');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Booking Management</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dropoff</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual Price</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.user}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.driver || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.vehicle_type}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.pickup_location}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.dropoff_location}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">${booking.estimated_price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.actual_price ? `$${booking.actual_price}` : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManagement;