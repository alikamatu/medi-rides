'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Calendar, User, Car, Clock, DollarSign, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import { AdminRideRequest, Driver, Vehicle } from '@/types/admin.types';
import AssignDriverModal from './assign-driver-modal';

interface RideManagementProps {
  rideRequests: AdminRideRequest[];
  drivers: Driver[];
  vehicles: Vehicle[];
  search: string;
  onSearchChange: (search: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onApproveRide: (rideId: number) => void;
  onDeclineRide: (rideId: number) => void;
  onAssignDriverAndVehicle: (rideId: number, driverId: number, vehicleId: number) => void;
}

export default function RideManagement({
  rideRequests,
  drivers,
  vehicles,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onApproveRide,
  onDeclineRide,
  onAssignDriverAndVehicle
}: RideManagementProps) {
  const [selectedRide, setSelectedRide] = useState<AdminRideRequest | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'ASSIGNED':
        return 'bg-blue-100 text-blue-800';
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAssignDriver = (ride: AdminRideRequest) => {
    setSelectedRide(ride);
    setShowAssignModal(true);
    setActiveDropdown(null);
  };

  const handleAssignment = (driverId: number, vehicleId: number) => {
    if (selectedRide) {
      onAssignDriverAndVehicle(selectedRide.id, driverId, vehicleId);
      setShowAssignModal(false);
      setSelectedRide(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ride Management</h2>
          <p className="text-gray-600">Manage and assign ride requests</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm text-gray-600">
            {rideRequests.length} ride{rideRequests.length !== 1 ? 's' : ''} found
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
              placeholder="Search rides by customer, location, or ID..."
              value={search}
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
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="all">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ride Requests */}
      <div className="grid gap-6">
        {rideRequests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No rides found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          rideRequests.map((ride, index) => {
            const { date, time } = formatDateTime(ride.scheduledAt);
            const createdDate = formatDateTime(ride.createdAt).date;

            return (
              <motion.div
                key={ride.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  {/* Left Section - Ride Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ride.status)}`}>
                            {ride.status}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            ride.serviceType === 'MEDICAL' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {ride.serviceType}
                          </span>
                          <span className="text-sm text-gray-500">
                            ID: #{ride.id.toString().padStart(6, '0')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Created: {createdDate}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        {ride.status === 'PENDING' && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => onApproveRide(ride.id)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center text-sm"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => onDeclineRide(ride.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center text-sm"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Decline
                            </motion.button>
                          </>
                        )}

                        {ride.status === 'ASSIGNED' && !ride.driver && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAssignDriver(ride)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center text-sm"
                          >
                            <User className="w-4 h-4 mr-1" />
                            Assign Driver
                          </motion.button>
                        )}

                        <div className="relative">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === ride.id ? null : ride.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>

                          {activeDropdown === ride.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                              <div className="py-1">
                                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                  View Details
                                </button>
                                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                  Edit Ride
                                </button>
                                {ride.status !== 'CANCELLED' && (
                                  <button 
                                    onClick={() => onDeclineRide(ride.id)}
                                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                  >
                                    Cancel Ride
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{ride.customer.name}</span>
                        <span>•</span>
                        <span>{ride.customer.phone}</span>
                        <span>•</span>
                        <span>{ride.customer.email}</span>
                      </div>
                    </div>

                    {/* Route Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Pickup</p>
                          <p className="text-sm text-gray-600">{ride.pickup}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Drop-off</p>
                          <p className="text-sm text-gray-600">{ride.dropoff}</p>
                        </div>
                      </div>
                    </div>

                    {/* Schedule and Pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{date} at {time}</span>
                      </div>
                      {ride.distance && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{ride.distance} miles • {ride.duration} min</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>${ride.basePrice.toFixed(2)}</span>
                        {ride.finalPrice && (
                          <span className="font-medium">• Final: ${ride.finalPrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Driver Assignment */}
                  {ride.driver && ride.vehicle && (
                    <div className="mt-4 lg:mt-0 lg:ml-6 lg:w-64">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Assigned Resources</h4>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <User className="w-4 h-4 text-green-600" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{ride.driver.name}</p>
                              <p className="text-xs text-gray-500">{ride.driver.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Car className="w-4 h-4 text-blue-600" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {ride.vehicle.make} {ride.vehicle.model}
                              </p>
                              <p className="text-xs text-gray-500">{ride.vehicle.licensePlate}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Assign Driver Modal */}
      <AssignDriverModal
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedRide(null);
        }}
        ride={selectedRide}
        drivers={drivers}
        vehicles={vehicles}
        onAssign={handleAssignment}
      />
    </div>
  );
}