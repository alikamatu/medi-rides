'use client';

import { motion } from 'framer-motion';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  Car, 
  User, 
  CreditCard, 
  Navigation,
  Phone,
  Mail,
  FileText
} from 'lucide-react';
import { RideHistory } from '@/types/ride-history.types';

interface RideDetailsModalProps {
  ride: RideHistory | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusConfig = {
  PENDING: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
  ASSIGNED: { color: 'bg-blue-100 text-blue-800', label: 'Assigned' },
  CONFIRMED: { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
  DRIVER_EN_ROUTE: { color: 'bg-purple-100 text-purple-800', label: 'Driver En Route' },
  PICKUP_ARRIVED: { color: 'bg-indigo-100 text-indigo-800', label: 'Arrived for Pickup' },
  IN_PROGRESS: { color: 'bg-orange-100 text-orange-800', label: 'In Progress' },
  COMPLETED: { color: 'bg-emerald-100 text-emerald-800', label: 'Completed' },
  CANCELLED: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
  NO_SHOW: { color: 'bg-gray-100 text-gray-800', label: 'No Show' },
};

export default function RideDetailsModal({ ride, isOpen, onClose }: RideDetailsModalProps) {
  if (!isOpen || !ride) return null;

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  };

  const { date, time } = formatDateTime(ride.scheduledAt);
  const status = statusConfig[ride.status] || statusConfig.PENDING;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Ride Details</h2>
            <p className="text-gray-600">Ride ID: #{ride.id.toString().padStart(6, '0')}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status and Service Type */}
          <div className="flex items-center space-x-4">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${status.color}`}>
              {status.label}
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {ride.serviceType === 'MEDICAL' ? '🏥 Medical' : '🚗 General'} Service
            </span>
          </div>

          {/* Route Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Navigation className="w-5 h-5 mr-2" />
              Route Details
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Pickup Location</p>
                  <p className="text-gray-600">{ride.pickup}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Drop-off Location</p>
                  <p className="text-gray-600">{ride.dropoff}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{time}</span>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Trip Details
              </h3>
              
              <div className="space-y-2">
                {ride.distance && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-medium">{ride.distance.toFixed(1)} miles</span>
                  </div>
                )}
                {ride.duration && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{ride.duration} minutes</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Driver Information */}
          {ride.driver && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Driver Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Driver Name:</span>
                  <span className="font-medium">{ride.driver.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Vehicle:</span>
                  <span className="font-medium">{ride.driver.vehicle}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <a 
                    href={`tel:${ride.driver.phone}`}
                    className="font-medium text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    {ride.driver.phone}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Payment Information */}
          {ride.payment && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Information
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-lg">
                    ${ride.payment.amount?.toFixed(2) || ride.finalPrice?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ride.payment.status === 'COMPLETED' 
                      ? 'bg-green-100 text-green-800'
                      : ride.payment.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {ride.payment.status.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors duration-200"
            >
              Close
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-medium transition-colors duration-200 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Print Receipt
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}