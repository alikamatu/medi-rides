'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { 
  Car, 
  Calendar, 
  History, 
  User, 
  CreditCard,
  MapPin,
  Clock
} from 'lucide-react';
import DashboardOverview from './dashboard-overview';
import BookRideForm from './book-ride-form';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Car },
    { id: 'book-ride', name: 'Book Ride', icon: Calendar },
    { id: 'ride-history', name: 'Ride History', icon: History },
    { id: 'invoices', name: 'Invoices', icon: CreditCard },
    { id: 'profile', name: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && <DashboardOverview />}
            {activeTab === 'book-ride' && <BookRideForm />}
            {/* {activeTab === 'ride-history' && <RideHistory />} */}
            {/* {activeTab === 'invoices' && <InvoicesList />} */}
            {/* {activeTab === 'profile' && <ProfileSection />} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;