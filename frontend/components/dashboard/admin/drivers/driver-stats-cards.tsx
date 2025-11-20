import React from 'react';
import { DriverStats } from '@/types/driver';

interface DriverStatsCardsProps {
  stats: DriverStats;
}

const DriverStatsCards: React.FC<DriverStatsCardsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Drivers',
      value: stats.totalDrivers,
      color: 'bg-blue-500',
      icon: '👥',
    },
    {
      title: 'Active Drivers',
      value: stats.activeDrivers,
      color: 'bg-green-500',
      icon: '✅',
    },
    {
      title: 'Available Now',
      value: stats.availableDrivers,
      color: 'bg-emerald-500',
      icon: '🟢',
    },
    {
      title: 'On Trip',
      value: stats.onTripDrivers,
      color: 'bg-purple-500',
      icon: '🚗',
    },
    {
      title: 'Avg Rating',
      value: stats.averageRating.toFixed(1),
      color: 'bg-yellow-500',
      icon: '⭐',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-6 border-l-4 border-l-blue-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className="text-2xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DriverStatsCards;