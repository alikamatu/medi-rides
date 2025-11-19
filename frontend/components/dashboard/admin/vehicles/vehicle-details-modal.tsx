'use client';

import { motion } from 'framer-motion';
import { 
  X, 
  Car, 
  User, 
  Calendar,
  Users,
  FerrisWheelIcon,
  Heart,
  Edit,
  Trash2,
  CheckCircle,
  Ban
} from 'lucide-react';
import { Vehicle } from '@/types/vehicle.types';

interface VehicleDetailsModalProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onUpdateStatus: (status: 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE') => void;
  onDelete: () => void;
}

export default function VehicleDetailsModal({
  vehicle,
  isOpen,
  onClose,
  onEdit,
  onUpdateStatus,
  onDelete
}: VehicleDetailsModalProps) {
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
      case 'AVAILABLE':
        return 'bg-green-100 text-green-800';
      case 'IN_USE':
        return 'bg-blue-100 text-blue-800';
      case 'MAINTENANCE':
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
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vehicle Details</h2>
            <p className="text-gray-600">Vehicle ID: #{vehicle.id.toString().padStart(6, '0')}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Vehicle Images */}
          {vehicle.images && vehicle.images.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {vehicle.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${vehicle.make} ${vehicle.model} ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Car className="w-5 h-5 mr-2" />
                Vehicle Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Make & Model:</span>
                  <span className="font-medium">{vehicle.make} {vehicle.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year:</span>
                  <span className="font-medium">{vehicle.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Color:</span>
                  <span className="font-medium">{vehicle.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">License Plate:</span>
                  <span className="font-medium">{vehicle.licensePlate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{vehicle.type.toLowerCase().replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {vehicle.capacity} passengers
                  </span>
                </div>
                {vehicle.vin && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">VIN:</span>
                    <span className="font-medium">{vehicle.vin}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status & Assignment</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Special Features */}
          {(vehicle.hasWheelchairAccess || vehicle.hasOxygenSupport) && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vehicle.hasWheelchairAccess && (
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border">
                    <FerrisWheelIcon className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Wheelchair Accessible</p>
                      <p className="text-sm text-gray-500">Equipped with ramp/lift for wheelchair access</p>
                    </div>
                  </div>
                )}
                {vehicle.hasOxygenSupport && (
                  <div className="flex items-center space-x-3 p-4 bg-white rounded-lg border">
                    <Heart className="w-6 h-6 text-pink-600" />
                    <div>
                      <p className="font-medium text-gray-900">Oxygen Support</p>
                      <p className="text-sm text-gray-500">Equipped for oxygen tank storage and support</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Documents */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Document Expiry
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Insurance Expiry</p>
                <p className={`text-lg font-semibold ${
                  new Date(vehicle.insuranceExpiry) < new Date() ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {formatDate(vehicle.insuranceExpiry)}
                </p>
                {new Date(vehicle.insuranceExpiry) < new Date() && (
                  <p className="text-sm text-red-600 mt-1">Insurance has expired!</p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Registration Expiry</p>
                <p className={`text-lg font-semibold ${
                  new Date(vehicle.registrationExpiry) < new Date() ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {formatDate(vehicle.registrationExpiry)}
                </p>
                {new Date(vehicle.registrationExpiry) < new Date() && (
                  <p className="text-sm text-red-600 mt-1">Registration has expired!</p>
                )}
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
            
            {vehicle.status !== 'AVAILABLE' && (
              <button
                onClick={() => onUpdateStatus('AVAILABLE')}
                className="px-4 py-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 flex items-center text-sm"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Available
              </button>
            )}
            
            {vehicle.status !== 'IN_USE' && (
              <button
                onClick={() => onUpdateStatus('IN_USE')}
                className="px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 flex items-center text-sm"
              >
                <User className="w-4 h-4 mr-2" />
                Mark In Use
              </button>
            )}
            
            {vehicle.status !== 'MAINTENANCE' && (
              <button
                onClick={() => onUpdateStatus('MAINTENANCE')}
                className="px-4 py-2 text-yellow-600 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors duration-200 flex items-center text-sm"
              >
                <Ban className="w-4 h-4 mr-2" />
                Mark Maintenance
              </button>
            )}
            
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-200 flex items-center text-sm"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Vehicle
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}