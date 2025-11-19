'use client';

import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { VehicleStats as VehicleStatsType } from '@/types/vehicle.types';

interface VehicleStatsProps {
  stats: VehicleStatsType;
}

export default function VehicleStats({ stats }: VehicleStatsProps) {
  const typeColors = {
    SEDAN: 'bg-blue-500',
    SUV: 'bg-green-500',
    VAN: 'bg-purple-500',
    WHEELCHAIR_VAN: 'bg-orange-500',
    STRETCHER_VAN: 'bg-red-500',
  };

  const maxCount = Math.max(...Object.values(stats.byType));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Fleet Overview
        </h3>
        <div className="text-sm text-gray-500">
          Total: {stats.total} vehicles
        </div>
      </div>

      <div className="space-y-6">
        {/* Status Distribution */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Status Distribution</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.available}</div>
              <div className="text-sm text-green-700">Available</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{stats.inUse}</div>
              <div className="text-sm text-orange-700">In Use</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.maintenance}</div>
              <div className="text-sm text-red-700">Maintenance</div>
            </div>
          </div>
        </div>

        {/* Vehicle Types */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Vehicle Types</h4>
          <div className="space-y-3">
            {Object.entries(stats.byType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">
                  {type.toLowerCase().replace('_', ' ')}
                </span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / maxCount) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-2 rounded-full ${typeColors[type as keyof typeof typeColors] || 'bg-gray-500'}`}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}