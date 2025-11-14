'use client';

import { motion } from 'framer-motion';
import { Calendar, Car, DollarSign, TrendingUp, MapPin, Clock } from 'lucide-react';

interface DashboardHomeProps {
  userRole: 'CUSTOMER' | 'DRIVER' | 'ADMIN';
  stats: {
    totalRides: number;
    upcomingRides: number;
    completedRides: number;
    revenue?: number;
    rating?: number;
  };
  recentRides: Array<{
    id: number;
    pickup: string;
    dropoff: string;
    scheduledAt: string;
    status: string;
    serviceType: string;
  }>;
}

const DashboardHome = ({ userRole, stats, recentRides }: DashboardHomeProps) => {
  const getRoleSpecificContent = () => {
    switch (userRole) {
      case 'CUSTOMER':
        return {
          welcome: `Welcome back! Ready for your next ride?`,
          primaryAction: { label: 'Book New Ride', href: '#book-ride' },
          stats: [
            { label: 'Total Rides', value: stats.totalRides, icon: Car },
            { label: 'Upcoming Rides', value: stats.upcomingRides, icon: Calendar },
            { label: 'Completed', value: stats.completedRides, icon: TrendingUp },
          ]
        };
      case 'DRIVER':
        return {
          welcome: `Good day! Check your assigned rides.`,
          primaryAction: { label: 'View Assignments', href: '#assigned-rides' },
          stats: [
            { label: 'Assigned Rides', value: stats.upcomingRides, icon: Car },
            { label: 'Completed Today', value: stats.completedRides, icon: TrendingUp },
            { label: 'Your Rating', value: `${stats.rating}/5`, icon: TrendingUp },
          ]
        };
      case 'ADMIN':
        return {
          welcome: `System Overview`,
          primaryAction: { label: 'Manage Rides', href: '#ride-management' },
          stats: [
            { label: 'Total Rides', value: stats.totalRides, icon: Car },
            { label: 'Pending Assignments', value: stats.upcomingRides, icon: Calendar },
            { label: 'Revenue', value: `$${stats.revenue}`, icon: DollarSign },
          ]
        };
    }
  };

  const content = getRoleSpecificContent();

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      ASSIGNED: 'bg-blue-100 text-blue-800',
      IN_PROGRESS: 'bg-purple-100 text-purple-800',
      COMPLETED: 'bg-green-100 text-green-800',
      CANCELLED: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border border-[#E2E8F0] p-6 rounded-lg"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#0A2342]">
              {content.welcome}
            </h1>
            <p className="text-[#64748B] mt-1">
              {userRole === 'CUSTOMER' && 'Book your medical or general transportation with ease.'}
              {userRole === 'DRIVER' && 'Stay updated with your ride assignments and schedule.'}
              {userRole === 'ADMIN' && 'Monitor system performance and manage operations.'}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 sm:mt-0 bg-[#0077B6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005A8F] transition-colors duration-200"
          >
            {content.primaryAction.label}
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {content.stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-[#E2E8F0] p-6 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#64748B]">{stat.label}</p>
                <p className="text-2xl font-bold text-[#0A2342] mt-1">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-[#B0D6FF] rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-[#0A2342]" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Rides */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white border border-[#E2E8F0] rounded-lg"
      >
        <div className="p-6 border-b border-[#E2E8F0]">
          <h2 className="text-lg font-semibold text-[#0A2342]">
            {userRole === 'ADMIN' ? 'Recent Rides' : 'Your Recent Rides'}
          </h2>
        </div>
        
        <div className="p-6">
          {recentRides.length > 0 ? (
            <div className="space-y-4">
              {recentRides.map((ride, index) => (
                <motion.div
                  key={ride.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-[#E2E8F0] rounded-lg hover:border-[#B0D6FF] transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#F5F7FA] border border-[#E2E8F0] rounded-lg flex items-center justify-center">
                      <Car className="w-5 h-5 text-[#0A2342]" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-[#64748B]" />
                        <span className="font-medium text-[#0A2342]">
                          {ride.pickup} → {ride.dropoff}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-[#64748B]" />
                          <span className="text-sm text-[#64748B]">
                            {new Date(ride.scheduledAt).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="text-sm text-[#64748B] capitalize">
                          {ride.serviceType.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ride.status)}`}>
                      {ride.status.replace('_', ' ')}
                    </span>
                    {userRole === 'ADMIN' && (
                      <button className="text-[#0077B6] hover:text-[#005A8F] text-sm font-medium">
                        View Details
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Car className="w-12 h-12 text-[#E2E8F0] mx-auto mb-4" />
              <p className="text-[#64748B]">No rides found</p>
              <p className="text-sm text-[#64748B] mt-1">
                {userRole === 'CUSTOMER' && 'Book your first ride to get started!'}
                {userRole === 'DRIVER' && 'You have no assigned rides at the moment.'}
                {userRole === 'ADMIN' && 'No ride data available.'}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      {(userRole === 'CUSTOMER' || userRole === 'DRIVER') && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-[#E2E8F0] rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-[#0A2342] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userRole === 'CUSTOMER' && (
              <>
                <button className="flex items-center space-x-3 p-4 border border-[#E2E8F0] rounded-lg hover:border-[#B0D6FF] transition-colors duration-200">
                  <MapPin className="w-5 h-5 text-[#0077B6]" />
                  <span className="font-medium text-[#0A2342]">Update Address</span>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-[#E2E8F0] rounded-lg hover:border-[#B0D6FF] transition-colors duration-200">
                  <DollarSign className="w-5 h-5 text-[#0077B6]" />
                  <span className="font-medium text-[#0A2342]">Payment Methods</span>
                </button>
              </>
            )}
            {userRole === 'DRIVER' && (
              <>
                <button className="flex items-center space-x-3 p-4 border border-[#E2E8F0] rounded-lg hover:border-[#B0D6FF] transition-colors duration-200">
                  <Calendar className="w-5 h-5 text-[#0077B6]" />
                  <span className="font-medium text-[#0A2342]">Set Availability</span>
                </button>
                <button className="flex items-center space-x-3 p-4 border border-[#E2E8F0] rounded-lg hover:border-[#B0D6FF] transition-colors duration-200">
                  <TrendingUp className="w-5 h-5 text-[#0077B6]" />
                  <span className="font-medium text-[#0A2342]">View Earnings</span>
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardHome;