'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardWidget from './dashboard-widget';
import RideList from './ride-list';
import AnalyticsSection from './analytics-section';
import { DashboardStats, Ride } from '@/types/dashboard.types';

interface DashboardHomeProps {
  userRole: 'CUSTOMER' | 'DRIVER' | 'ADMIN';
  stats?: DashboardStats;
  recentRides?: Ride[];
}

// Default stats to prevent undefined errors
const defaultStats: DashboardStats = {
  totalRides: 0,
  upcomingRides: 0,
  completedRides: 0,
  todayRides: 0,
  totalRevenue: 0,
  ridesThisWeek: 0,
};

const defaultRecentRides: Ride[] = [];

export default function DashboardHome({ 
  userRole, 
  stats: initialStats,
  recentRides: initialRecentRides 
}: DashboardHomeProps) {
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'completed'>('today');
  const [stats, setStats] = useState<DashboardStats>(() => ({
    ...defaultStats,
    ...initialStats, // Merge with initialStats if provided
  }));
  const [recentRides, setRecentRides] = useState<Ride[]>(initialRecentRides || defaultRecentRides);
  const [loading, setLoading] = useState(false);

  // If stats prop changes, update state
  useEffect(() => {
    if (initialStats) {
      setStats(prev => ({
        ...prev,
        ...initialStats,
      }));
    }
  }, [initialStats]);

  // If recentRides prop changes, update state
  useEffect(() => {
    if (initialRecentRides) {
      setRecentRides(initialRecentRides);
    }
  }, [initialRecentRides]);

  // Optional: Fetch dashboard data if not provided
  useEffect(() => {
    const fetchDashboardData = async () => {
      // Only fetch if we don't have any data
      if (initialStats || initialRecentRides) return;
      
      try {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setStats({
              ...defaultStats,
              ...data.data.stats,
            });
            setRecentRides(data.data.recentRides || []);
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [initialStats, initialRecentRides]);

  // Safe value getter for stats
  const getStatValue = (key: keyof DashboardStats): string => {
    return stats[key]?.toString() || '0';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's an overview of your rides and activities.
          </p>
        </motion.div>

        {/* Stats Widgets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <DashboardWidget
            title="Today's Rides"
            value={getStatValue('todayRides')}
            change={userRole === 'ADMIN' ? '+2 from yesterday' : undefined}
            icon="today"
            color="blue"
          />
          
          <DashboardWidget
            title="Upcoming Rides"
            value={getStatValue('upcomingRides')}
            change={userRole === 'ADMIN' ? '3 scheduled this week' : undefined}
            icon="upcoming"
            color="green"
          />
          
          <DashboardWidget
            title="Completed Rides"
            value={getStatValue('completedRides')}
            change={userRole === 'ADMIN' ? '+12% this month' : undefined}
            icon="completed"
            color="purple"
          />
          
          {userRole === 'ADMIN' ? (
            <DashboardWidget
              title="Total Revenue"
              value={`$${stats.totalRevenue.toLocaleString()}`}
              change="+15% from last month"
              icon="revenue"
              color="amber"
            />
          ) : (
            <DashboardWidget
              title="Total Rides"
              value={getStatValue('totalRides')}
              change="All time total"
              icon="total"
              color="indigo"
            />
          )}
        </motion.div>

        {/* Analytics Section (Admin only or with role-specific data) */}
        {userRole === 'ADMIN' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <AnalyticsSection userRole={userRole} />
          </motion.div>
        )}

        {/* Ride Views Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200"
        >
          <div className="border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Ride Management</h2>
                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => setActiveTab('today')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      activeTab === 'today'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Today's Rides
                  </button>
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      activeTab === 'upcoming'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      activeTab === 'completed'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <RideList
              activeTab={activeTab}
              userRole={userRole}
              recentRides={recentRides}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}