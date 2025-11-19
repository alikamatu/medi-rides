import { useState, useEffect, useCallback } from 'react';
import { RideHistory, RideHistoryFilters } from '@/types/ride-history.types';
import { RidesService } from '@/services/rides.service';

export const useRideHistory = () => {
  const [rides, setRides] = useState<RideHistory[]>([]);
  const [filteredRides, setFilteredRides] = useState<RideHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<RideHistoryFilters>({
    status: 'all',
    dateRange: {
      start: '',
      end: '',
    },
    serviceType: 'all',
  });

  const fetchRides = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await RidesService.getUserRides();
      setRides(response.data);
      setFilteredRides(response.data);
    } catch (err: any) {
      console.error('Error fetching ride history:', err);
      setError(err.message || 'Failed to load ride history');
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...rides];

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(ride => ride.status === filters.status);
    }

    // Filter by service type
    if (filters.serviceType !== 'all') {
      filtered = filtered.filter(ride => ride.serviceType === filters.serviceType);
    }

    // Filter by date range
    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter(ride => {
        const rideDate = new Date(ride.scheduledAt);
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        endDate.setHours(23, 59, 59, 999); // Include entire end day
        
        return rideDate >= startDate && rideDate <= endDate;
      });
    }

    setFilteredRides(filtered);
  }, [rides, filters]);

  const updateFilters = useCallback((newFilters: Partial<RideHistoryFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      status: 'all',
      dateRange: {
        start: '',
        end: '',
      },
      serviceType: 'all',
    });
  }, []);

  useEffect(() => {
    fetchRides();
  }, [fetchRides]);

  return {
    rides: filteredRides,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refetch: fetchRides,
    totalRides: rides.length,
    filteredCount: filteredRides.length,
  };
};