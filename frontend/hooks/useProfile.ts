import { useState, useCallback } from 'react';
import { profileService } from '@/services/profile.service';
import { UpdateProfileData, ChangePasswordData, Address } from '@/types/profile.types';

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = useCallback(async (data: UpdateProfileData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await profileService.updateProfile(data);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      setLoading(false);
      throw err;
    }
  }, []);

  const changePassword = useCallback(async (data: ChangePasswordData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await profileService.changePassword(data);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password');
      setLoading(false);
      throw err;
    }
  }, []);

  const getAddresses = useCallback(async (): Promise<Address[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await profileService.getAddresses();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch addresses');
      setLoading(false);
      throw err;
    }
  }, []);

  const addAddress = useCallback(async (data: Omit<Address, 'id'>): Promise<Address> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await profileService.addAddress(data);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add address');
      setLoading(false);
      throw err;
    }
  }, []);

  const updateAddress = useCallback(async (id: number, data: Partial<Address>): Promise<Address> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await profileService.updateAddress(id, data);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update address');
      setLoading(false);
      throw err;
    }
  }, []);

  const deleteAddress = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await profileService.deleteAddress(id);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete address');
      setLoading(false);
      throw err;
    }
  }, []);

  return {
    loading,
    error,
    updateProfile,
    changePassword,
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
  };
};