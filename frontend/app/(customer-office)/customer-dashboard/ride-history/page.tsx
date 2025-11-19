'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, RefreshCw, AlertCircle, Search } from 'lucide-react';
import { useRideHistory } from '@/hooks/useRideHistory';
import RideHistoryItem from '@/components/dashboard/customer/ride-history/ride-history-item';
import RideHistoryFilters from '@/components/dashboard/customer/ride-history/ride-history-filters';
import RideDetailsModal from '@/components/dashboard/customer/ride-history/ride-details-modal';
import { RideHistory } from '@/types/ride-history.types';

export default function RideHistoryPage() {
  const {
    rides,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refetch,
    totalRides,
    filteredCount,
  } = useRideHistory();

  const [selectedRide, setSelectedRide] = useState<RideHistory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter rides by search query
  const filteredBySearch = rides.filter(ride =>
    ride.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.dropoff.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (ride.driver?.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    ride.id.toString().includes(searchQuery)
  );

  const handleViewDetails = (ride: RideHistory) => {
    setSelectedRide(ride);
  };

  const handleCloseModal = () => {
    setSelectedRide(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your ride history...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Ride History</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={refetch}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center mx-auto"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8"
        >
          <div className="flex items-center space-x-3 mb-4 lg:mb-0">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Car className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ride History</h1>
              <p className="text-gray-600">View and manage your past and upcoming rides</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative flex-1 lg:flex-none lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by location, driver, or ride ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>

            <button
              onClick={refetch}
              className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <RideHistoryFilters
          filters={filters}
          onFiltersChange={updateFilters}
          onClearFilters={clearFilters}
          totalCount={totalRides}
          filteredCount={filteredCount}
        />

        {/* Ride List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredBySearch.length === 0 ? (
            <div className="text-center py-12">
              <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchQuery ? 'No matching rides found' : 'No rides found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchQuery
                  ? 'Try adjusting your search terms or filters'
                  : 'You haven\'t taken any rides yet. Book your first ride to get started!'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    clearFilters();
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Clear Search & Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredBySearch.map((ride, index) => (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RideHistoryItem
                    ride={ride}
                    onViewDetails={handleViewDetails}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Ride Details Modal */}
        <AnimatePresence>
          <RideDetailsModal
            ride={selectedRide}
            isOpen={!!selectedRide}
            onClose={handleCloseModal}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}