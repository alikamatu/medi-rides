'use client';

import { motion } from 'framer-motion';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Car, 
  Star, 
  IdCard, 
  Calendar,
  Edit,
  Trash2,
  Ban,
  CheckCircle
} from 'lucide-react';
import { Rider } from '@/types/rider.types';

interface RiderDetailsModalProps {
  rider: Rider;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}

export default function RiderDetailsModal({
  rider,
  isOpen,
  onClose,
  onEdit,
  onToggleStatus,
  onDelete
}: RiderDetailsModalProps) {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
            <h2 className="text-2xl font-bold text-gray-900">Rider Details</h2>
            <p className="text-gray-600">Driver ID: #{rider.id.toString().padStart(6, '0')}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            {rider.avatar ? (
              <img
                src={rider.avatar}
                alt={rider.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{rider.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(rider.status)}`}>
                  {rider.status}
                </span>
                <div className="flex items-center space-x-1 text-yellow-600">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{rider.rating}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {rider.totalTrips} trips
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">{rider.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">{rider.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* License Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <IdCard className="w-5 h-5 mr-2" />
              Driver License
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">License Number</p>
                <p className="text-gray-600">{rider.licenseNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">State</p>
                <p className="text-gray-600">{rider.licenseState}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Expiry Date</p>
                <p className="text-gray-600">{formatDate(rider.licenseExpiry)}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          {rider.vehicle && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Vehicle Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Vehicle</p>
                  <p className="text-gray-600">{rider.vehicle.make} {rider.vehicle.model}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">License Plate</p>
                  <p className="text-gray-600">{rider.vehicle.licensePlate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Type</p>
                  <p className="text-gray-600">{rider.vehicle.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Capacity</p>
                  <p className="text-gray-600">{rider.vehicle.capacity} passengers</p>
                </div>
              </div>
            </div>
          )}

          {/* Account Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">Member Since</p>
                <p className="text-gray-600">{formatDate(rider.createdAt)}</p>
              </div>
              {rider.lastLoginAt && (
                <div>
                  <p className="text-sm font-medium text-gray-900">Last Login</p>
                  <p className="text-gray-600">{formatDate(rider.lastLoginAt)}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">Availability</p>
                <p className="text-gray-600">{rider.isAvailable ? 'Available' : 'Not Available'}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              onClick={onDelete}
              className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200 flex items-center text-sm"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
            <button
              onClick={onToggleStatus}
              className="px-4 py-2 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors duration-200 flex items-center text-sm"
            >
              {rider.status === 'ACTIVE' ? (
                <>
                  <Ban className="w-4 h-4 mr-2" />
                  Deactivate
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Activate
                </>
              )}
            </button>
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-200 flex items-center text-sm"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Rider
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}