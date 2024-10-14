import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

interface AnalyticsData {
  total_bookings: number;
  average_price: number | null;
  total_trips: number;
  average_duration: number | null;
  average_distance: number | null;
  revenue_data: { date: string; revenue: number }[];
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const bookingStats = await api.get('/logistics/admin/bookings/stats/');
      const tripStats = await api.get('/logistics/admin/trips/stats/');
      const revenueAnalytics = await api.get('/logistics/admin/analytics/revenue/');

      setAnalyticsData({
        ...bookingStats.data,
        ...tripStats.data,
        revenue_data: revenueAnalytics.data,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Failed to load analytics data');
    }
  };

  if (!analyticsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Booking Statistics</h3>
          <p>Total Bookings: {analyticsData.total_bookings}</p>
          <p>Average Price: {analyticsData.average_price ? `$${analyticsData.average_price.toFixed(2)}` : 'N/A'}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Trip Statistics</h3>
          <p>Total Trips: {analyticsData.total_trips}</p>
          <p>Average Duration: {analyticsData.average_duration ? `${analyticsData.average_duration.toFixed(2)} minutes` : 'N/A'}</p>
          <p>Average Distance: {analyticsData.average_distance ? `${analyticsData.average_distance.toFixed(2)} km` : 'N/A'}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Revenue Over Time</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {analyticsData.revenue_data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">${item.revenue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;