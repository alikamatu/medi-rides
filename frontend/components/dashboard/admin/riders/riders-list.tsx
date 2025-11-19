'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  User, 
  Mail, 
  Phone, 
  Car, 
  Star, 
  MoreVertical,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Eye
} from 'lucide-react';
import { Rider } from '@/types/rider.types';

interface RidersListProps {
  riders: Rider[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: 'all' | 'ACTIVE' | 'INACTIVE';
  onStatusFilterChange: (status: 'all' | 'ACTIVE' | 'INACTIVE') => void;
  onEdit: (rider: Rider) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onViewDetails: (rider: Rider) => void;
  loading?: boolean;
}

export default function RidersList({
  riders,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onEdit,
  onDelete,
  onToggleStatus,
  onViewDetails,
  loading
}: RidersListProps) {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

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

  const getAvailabilityColor = (isAvailable: boolean) => {
    return isAvailable 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading riders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Riders</h2>
          <p className="text-gray-600">View and manage all drivers in the system</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm text-gray-600">
            {riders.length} rider{riders.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search riders by name, email, phone, or license..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-1" />
              Status Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value as 'all' | 'ACTIVE' | 'INACTIVE')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="all">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Riders Grid */}
      {riders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No riders found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {riders.map((rider, index) => (
            <motion.div
              key={rider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                {/* Left Section - Rider Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      {rider.avatar ? (
                        <img
                          src={rider.avatar}
                          alt={rider.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{rider.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rider.status)}`}>
                            {rider.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(rider.isAvailable)}`}>
                            {rider.isAvailable ? 'Available' : 'Busy'}
                          </span>
                          <div className="flex items-center space-x-1 text-yellow-600">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium">{rider.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onViewDetails(rider)}
                        className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center text-sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </motion.button>

                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === rider.id ? null : rider.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>

                        {activeDropdown === rider.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  onEdit(rider);
                                  setActiveDropdown(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Rider
                              </button>
                              <button
                                onClick={() => {
                                  onToggleStatus(rider.id);
                                  setActiveDropdown(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50"
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
                                onClick={() => {
                                  onDelete(rider.id);
                                  setActiveDropdown(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Rider
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{rider.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{rider.phone}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">License:</span> {rider.licenseNumber} ({rider.licenseState})
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Expires:</span> {formatDate(rider.licenseExpiry)}
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Information */}
                  {rider.vehicle && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                        <Car className="w-4 h-4 mr-2" />
                        Vehicle Information
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Vehicle:</span>
                          <p className="font-medium">{rider.vehicle.make} {rider.vehicle.model}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Plate:</span>
                          <p className="font-medium">{rider.vehicle.licensePlate}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <p className="font-medium">{rider.vehicle.type}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Capacity:</span>
                          <p className="font-medium">{rider.vehicle.capacity} passengers</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">{rider.totalTrips}</span> total trips
                    </div>
                    <div>
                      Joined {formatDate(rider.createdAt)}
                    </div>
                    {rider.lastLoginAt && (
                      <div>
                        Last login {formatDate(rider.lastLoginAt)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}