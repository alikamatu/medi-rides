'use client';

import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  TrendingUp,
  Car,
  Users,
  Package
} from 'lucide-react';

interface DashboardWidgetProps {
  title: string;
  value: string;
  change?: string;
  icon: 'today' | 'upcoming' | 'completed' | 'revenue' | 'total' | 'users' | 'vehicles' | 'packages';
  color: 'blue' | 'green' | 'purple' | 'amber' | 'indigo' | 'red' | 'emerald';
}

const iconMap = {
  today: Calendar,
  upcoming: Clock,
  completed: CheckCircle,
  revenue: DollarSign,
  total: Car,
  users: Users,
  vehicles: Car,
  packages: Package,
};

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    changeColor: 'text-blue-600',
  },
  green: {
    bg: 'bg-green-50',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    changeColor: 'text-green-600',
  },
  purple: {
    bg: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    changeColor: 'text-purple-600',
  },
  amber: {
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    changeColor: 'text-amber-600',
  },
  indigo: {
    bg: 'bg-indigo-50',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    changeColor: 'text-indigo-600',
  },
  red: {
    bg: 'bg-red-50',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    changeColor: 'text-red-600',
  },
  emerald: {
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    changeColor: 'text-emerald-600',
  },
};

export default function DashboardWidget({ 
  title, 
  value, 
  change, 
  icon, 
  color 
}: DashboardWidgetProps) {
  const IconComponent = iconMap[icon];
  const colors = colorClasses[color];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${colors.bg} rounded-2xl p-6 border border-gray-200`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          
          {change && (
            <div className="flex items-center text-sm">
              <TrendingUp className={`w-4 h-4 mr-1 ${colors.changeColor}`} />
              <span className={colors.changeColor}>{change}</span>
            </div>
          )}
        </div>
        
        <div className={`${colors.iconBg} p-3 rounded-xl`}>
          <IconComponent className={`w-6 h-6 ${colors.iconColor}`} />
        </div>
      </div>
    </motion.div>
  );
}