'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Car, 
  DollarSign,
  ChevronRight,
  FileText
} from 'lucide-react';
import { Ride } from '@/types/dashboard.types';
import RideDetailsModal from './ride-details-modal';

interface RideListProps {
  activeTab: 'today' | 'upcoming' | 'completed';
  userRole: 'CUSTOMER' | 'DRIVER' | 'ADMIN';
  recentRides: Ride[];
}

// Mock data for demonstration - in real app, this would come from API
const mockRides = {
  today: [
    {
      id: 101,
      pickup: '123 Main St, New York',
      dropoff: 'Medical Center, Manhattan',
      scheduledAt: new Date().toISOString(),
      status: 'ASSIGNED',
      serviceType: 'MEDICAL',
      passengerName: 'John Smith',
      driverName: 'Michael Johnson',
      vehicle: 'Toyota Camry',
      estimatedPrice: 45.50,
    },
    {
      id: 102,
      pickup: '456 Park Ave, Brooklyn',
      dropoff: 'JFK Airport',
      scheduledAt: new Date().toISOString(),
      status: 'IN_PROGRESS',
      serviceType: 'GENERAL',
      passengerName: 'Sarah Wilson',
      driverName: 'Robert Brown',
      vehicle: 'Honda Accord',
      estimatedPrice: 65.75,
    },
  ],
  upcoming: [
    {
      id: 201,
      pickup: '789 Broadway, Queens',
      dropoff: 'Physical Therapy Clinic',
      scheduledAt: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      status: 'CONFIRMED',
      serviceType: 'MEDICAL',
      passengerName: 'David Lee',
      driverName: 'James Wilson',
      vehicle: 'Wheelchair Van',
      estimatedPrice: 85.00,
    },
    {
      id: 202,
      pickup: '321 Elm St, Bronx',
      dropoff: 'Shopping Mall',
      scheduledAt: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
      status: 'PENDING',
      serviceType: 'GENERAL',
      passengerName: 'Emma Davis',
      estimatedPrice: 35.25,
    },
  ],
  completed: [
    {
      id: 301,
      pickup: '555 Oak St, Staten Island',
      dropoff: 'Doctor\'s Office',
      scheduledAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      status: 'COMPLETED',
      serviceType: 'MEDICAL',
      passengerName: 'Michael Chen',
      driverName: 'Thomas Anderson',
      vehicle: 'Toyota Prius',
      finalPrice: 42.50,
      invoice: {
        id: 5001,
        pdfUrl: '/invoices/invoice-5001.pdf',
        invoiceNumber: 'INV-2024-5001'
      }
    },
    {
      id: 302,
      pickup: '777 Pine St, Manhattan',
      dropoff: 'Business District',
      scheduledAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      status: 'COMPLETED',
      serviceType: 'GENERAL',
      passengerName: 'Lisa Martinez',
      driverName: 'William Taylor',
      vehicle: 'Ford Transit',
      finalPrice: 55.00,
      invoice: {
        id: 5002,
        pdfUrl: '/invoices/invoice-5002.pdf',
        invoiceNumber: 'INV-2024-5002'
      }
    },
  ],
};

export default function RideList({ activeTab, userRole, recentRides }: RideListProps) {
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Use mock data for now - replace with actual data from props or API
  const rides = recentRides.length > 0 ? recentRides : mockRides[activeTab];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'ASSIGNED': return 'bg-purple-100 text-purple-800';
      case 'CONFIRMED': return 'bg-indigo-100 text-indigo-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (ride: Ride) => {
    setSelectedRide(ride);
    setShowDetails(true);
  };

  const handleDownloadInvoice = async (invoiceId: number, pdfUrl?: string) => {
    try {
      const token = localStorage.getItem('access_token');
      
      if (pdfUrl) {
        const fullUrl = pdfUrl.startsWith('http') 
          ? pdfUrl 
          : `${process.env.NEXT_PUBLIC_API_URL}${pdfUrl}`;
        window.open(fullUrl, '_blank');
        return;
      }
      
      // Generate invoice if not exists
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/invoices/${invoiceId}/regenerate-pdf`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.data.pdfUrl) {
          const fullUrl = data.data.pdfUrl.startsWith('http')
            ? data.data.pdfUrl
            : `${process.env.NEXT_PUBLIC_API_URL}${data.data.pdfUrl}`;
          window.open(fullUrl, '_blank');
        }
      }
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice. Please try again.');
    }
  };

  return (
    <>
      <div className="space-y-4">
        {rides.length === 0 ? (
          <div className="text-center py-12">
            <Car className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No rides found</h3>
            <p className="text-gray-600 mt-2">
              {activeTab === 'today' 
                ? 'No rides scheduled for today' 
                : activeTab === 'upcoming'
                ? 'No upcoming rides scheduled'
                : 'No completed rides yet'}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {rides.map((ride, index) => (
              <motion.div
                key={ride.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ride.status)}`}>
                        {ride.status.replace('_', ' ')}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">
                        {ride.serviceType}
                      </span>
                      <span className="text-xs text-gray-500">
                        Ride #{ride.id}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Route Information */}
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">From</p>
                            <p className="text-sm text-gray-600 truncate max-w-[200px]">
                              {ride.pickup}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">To</p>
                            <p className="text-sm text-gray-600 truncate max-w-[200px]">
                              {ride.dropoff}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Schedule and Passenger */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{formatDate(ride.scheduledAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{formatTime(ride.scheduledAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{ride.passengerName}</span>
                        </div>
                      </div>

                      {/* Driver and Price */}
                      <div className="space-y-2">
                        {ride.driverName && (
                          <div className="flex items-center space-x-2">
                            <Car className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-600">{ride.driverName}</p>
                              {ride.vehicle && (
                                <p className="text-xs text-gray-500">{ride.vehicle}</p>
                              )}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900">
                            ${((ride as any).finalPrice || (ride as any).estimatedPrice || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="ml-4 flex flex-col space-y-2">
                    <button
                      onClick={() => handleViewDetails(ride)}
                      className="flex items-center justify-center p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="View Details"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    {ride.status === 'COMPLETED' && (ride as any).invoice && (
                      <button
                        onClick={() => handleDownloadInvoice((ride as any).invoice!.id, (ride as any).invoice!.pdfUrl)}
                        className="flex items-center justify-center p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                        title="Download Invoice"
                      >
                        <FileText className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Ride Details Modal */}
      <AnimatePresence>
        {showDetails && selectedRide && (
          <RideDetailsModal
            ride={selectedRide}
            isOpen={showDetails}
            onClose={() => setShowDetails(false)}
            userRole={userRole}
          />
        )}
      </AnimatePresence>
    </>
  );
}