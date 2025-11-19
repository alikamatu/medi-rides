'use client';

import { useAuth } from '@/hooks/useAuth';
import { Calendar, MapPin, Clock, Heart, Ambulance } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Book Medical Ride',
      description: 'Schedule transportation for medical appointments',
      icon: Heart,
      href: '/customer-dashboard/book-ride?type=medical',
      color: 'bg-[#E6F7FF]',
      textColor: 'text-[#0077B6]'
    },
    {
      title: 'Book General Ride',
      description: 'Schedule transportation for daily activities',
      icon: MapPin,
      href: '/customer-dashboard/book-ride?type=general',
      color: 'bg-[#F0F9FF]',
      textColor: 'text-[#0A2342]'
    },
    {
      title: 'View Ride History',
      description: 'Check your past and upcoming rides',
      icon: Clock,
      href: '/customer-dashboard/ride-history',
      color: 'bg-[#F0F9FF]',
      textColor: 'text-[#0A2342]'
    },
  ];

  const upcomingRides = [
    {
      id: 1,
      date: 'Today, 2:00 PM',
      from: '123 Main Street',
      to: 'General Hospital',
      type: 'Medical Appointment',
      status: 'Confirmed'
    },
    {
      id: 2,
      date: 'Tomorrow, 10:30 AM',
      from: 'Home',
      to: 'Physical Therapy Center',
      type: 'Therapy Session',
      status: 'Scheduled'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6"
      >
        <h1 className="text-2xl font-semibold text-[#0A2342] mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-[#64748B]">
          Ready for your next comfortable and reliable ride?
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={action.href}>
                <div className={`${action.color} p-6 cursor-pointer transition-colors duration-200 hover:bg-[#E6F7FF]`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 ${action.textColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className={`font-semibold ${action.textColor}`}>
                      {action.title}
                    </h3>
                  </div>
                  <p className="text-[#64748B] text-sm">
                    {action.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Upcoming Rides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#0A2342]">
            Upcoming Rides
          </h2>
          <Link 
            href="/customer-dashboard/ride-history"
            className="text-[#0077B6] hover:text-[#005A8F] font-medium"
          >
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {upcomingRides.map((ride) => (
            <div key={ride.id} className="bg-[#F8FBFF] p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#0077B6]" />
                  <span className="font-medium text-[#0A2342]">{ride.date}</span>
                </div>
                <span className={`px-3 py-1 text-sm font-medium ${
                  ride.status === 'Confirmed' 
                    ? 'bg-[#E6F7FF] text-[#0077B6]' 
                    : 'bg-[#F0F9FF] text-[#0A2342]'
                }`}>
                  {ride.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#0077B6]"></div>
                  <span className="text-[#0A2342]">{ride.from}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#B0D6FF]"></div>
                  <span className="text-[#0A2342]">{ride.to}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-3">
                <Ambulance className="w-4 h-4 text-[#64748B]" />
                <span className="text-sm text-[#64748B]">{ride.type}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Health Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#F0F9FF] p-6"
      >
        <h2 className="text-xl font-semibold text-[#0A2342] mb-4">
          Health & Safety Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4">
            <h3 className="font-medium text-[#0A2342] mb-2">
              Prepare for Your Appointment
            </h3>
            <p className="text-sm text-[#64748B]">
              Bring your medical cards, insurance information, and a list of current medications to your appointment.
            </p>
          </div>
          <div className="bg-white p-4">
            <h3 className="font-medium text-[#0A2342] mb-2">
              Comfort Matters
            </h3>
            <p className="text-sm text-[#64748B]">
              Wear comfortable clothing and bring any necessary mobility aids or comfort items for your journey.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}