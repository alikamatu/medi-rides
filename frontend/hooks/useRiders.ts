import { useState, useEffect, useCallback } from 'react';
import { Rider, CreateRiderData, UpdateRiderData } from '@/types/rider.types';
import { RidersService } from '@/services/riders.service';

export const useRiders = () => {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ACTIVE' | 'INACTIVE'>('all');

  const fetchRiders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await RidersService.getAllRiders();
      setRiders(data);
    } catch (err: any) {
      console.error('Error fetching riders:', err);
      setError(err.message || 'Failed to load riders');
    } finally {
      setLoading(false);
    }
  }, []);

  const createRider = useCallback(async (riderData: CreateRiderData) => {
    try {
      setError(null);
      const result = await RidersService.createRider(riderData);
      await fetchRiders(); // Refresh the list
      return result;
    } catch (err: any) {
      console.error('Error creating rider:', err);
      setError(err.message || 'Failed to create rider');
      throw err;
    }
  }, [fetchRiders]);

  const updateRider = useCallback(async (id: number, riderData: UpdateRiderData) => {
    try {
      setError(null);
      const result = await RidersService.updateRider(id, riderData);
      await fetchRiders(); // Refresh the list
      return result;
    } catch (err: any) {
      console.error('Error updating rider:', err);
      setError(err.message || 'Failed to update rider');
      throw err;
    }
  }, [fetchRiders]);

  const deleteRider = useCallback(async (id: number) => {
    try {
      setError(null);
      await RidersService.deleteRider(id);
      await fetchRiders(); // Refresh the list
    } catch (err: any) {
      console.error('Error deleting rider:', err);
      setError(err.message || 'Failed to delete rider');
      throw err;
    }
  }, [fetchRiders]);

  const toggleRiderStatus = useCallback(async (id: number) => {
    try {
      setError(null);
      const result = await RidersService.toggleRiderStatus(id);
      await fetchRiders(); // Refresh the list
      return result;
    } catch (err: any) {
      console.error('Error toggling rider status:', err);
      setError(err.message || 'Failed to update rider status');
      throw err;
    }
  }, [fetchRiders]);

  // Filter riders based on search and status
  const filteredRiders = riders.filter(rider => {
    const matchesSearch = 
      rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.phone.includes(searchTerm) ||
      rider.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rider.vehicle?.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || rider.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    fetchRiders();
  }, [fetchRiders]);

  return {
    // State
    riders: filteredRiders,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    
    // Actions
    createRider,
    updateRider,
    deleteRider,
    toggleRiderStatus,
    refetch: fetchRiders,
    
    // Stats
    totalRiders: riders.length,
    activeRiders: riders.filter(r => r.status === 'ACTIVE').length,
    inactiveRiders: riders.filter(r => r.status === 'INACTIVE').length,
  };
};