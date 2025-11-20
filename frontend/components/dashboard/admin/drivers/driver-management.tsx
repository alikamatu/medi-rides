'use client';

import React, { useState, useEffect } from 'react';
import { 
  Driver, 
  DriverStats, 
  CreateDriverData, 
  UpdateDriverData 
} from '@/types/driver';
import { driverService } from '@/services/driver-service';
import DriverTable from './driver-table';
import DriverStatsCards from './driver-stats-cards';
import CreateDriverModal from './create-driver-modal';
import EditDriverModal from './edit-driver-modal';
import DriverDetailsModal from './driver-details-modal';
import AssignVehiclesModal from './assign-vehicles-modal';
import { toast } from 'react-hot-toast';

const DriverManagement: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [stats, setStats] = useState<DriverStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  useEffect(() => {
    loadDrivers();
    loadStats();
  }, [pagination.page, pagination.limit, searchQuery]);

  const loadDrivers = async () => {
    try {
      setLoading(true);
      const response = await driverService.getDrivers(
        pagination.page, 
        pagination.limit, 
        searchQuery
      );
      
      if (response.success) {
        setDrivers(response.data);
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
          totalPages: response.pagination.totalPages,
        }));
      }
    } catch (error) {
      toast.error('Failed to load drivers');
      console.error('Error loading drivers:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await driverService.getDriverStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleCreateDriver = async (data: CreateDriverData) => {
    try {
      const response = await driverService.createDriver(data);
      if (response.success) {
        toast.success('Driver created successfully');
        setShowCreateModal(false);
        loadDrivers();
        loadStats();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create driver');
    }
  };

  const handleUpdateDriver = async (id: number, data: UpdateDriverData) => {
    try {
      const response = await driverService.updateDriver(id, data);
      if (response.success) {
        toast.success('Driver updated successfully');
        setShowEditModal(false);
        setSelectedDriver(null);
        loadDrivers();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update driver');
    }
  };

  const handleDeleteDriver = async (id: number) => {
    if (!confirm('Are you sure you want to delete this driver?')) {
      return;
    }

    try {
      const response = await driverService.deleteDriver(id);
      if (response.success) {
        toast.success('Driver deleted successfully');
        loadDrivers();
        loadStats();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete driver');
    }
  };

  const handleAssignVehicles = async (driverId: number, vehicleIds: number[]) => {
    try {
      const response = await driverService.assignVehicles(driverId, vehicleIds);
      if (response.success) {
        toast.success('Vehicles assigned successfully');
        setShowAssignModal(false);
        setSelectedDriver(null);
        loadDrivers();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to assign vehicles');
    }
  };

  const handleStatusChange = async (driverId: number, isAvailable: boolean, reason?: string) => {
    try {
      const response = await driverService.updateDriverStatus(driverId, isAvailable, reason);
      if (response.success) {
        toast.success(`Driver ${isAvailable ? 'activated' : 'deactivated'} successfully`);
        loadDrivers();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update driver status');
    }
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Driver Management</h1>
          <p className="text-gray-600">Manage your fleet drivers and their assignments</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <span>+ Add Driver</span>
        </button>
      </div>

      {/* Statistics */}
      {stats && <DriverStatsCards stats={stats} />}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search drivers by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Drivers Table */}
      <DriverTable
        drivers={drivers}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onEdit={(driver) => {
          setSelectedDriver(driver);
          setShowEditModal(true);
        }}
        onView={(driver) => {
          setSelectedDriver(driver);
          setShowDetailsModal(true);
        }}
        onDelete={handleDeleteDriver}
        onAssignVehicles={(driver) => {
          setSelectedDriver(driver);
          setShowAssignModal(true);
        }}
        onStatusChange={handleStatusChange}
      />

      {/* Modals */}
      {showCreateModal && (
        <CreateDriverModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateDriver}
        />
      )}

      {showEditModal && selectedDriver && (
        <EditDriverModal
          driver={selectedDriver}
          onClose={() => {
            setShowEditModal(false);
            setSelectedDriver(null);
          }}
          onSubmit={(data) => handleUpdateDriver(selectedDriver.id, data)}
        />
      )}

      {showDetailsModal && selectedDriver && (
        <DriverDetailsModal
          driver={selectedDriver}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedDriver(null);
          }}
        />
      )}

      {showAssignModal && selectedDriver && (
        <AssignVehiclesModal
          driver={selectedDriver}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedDriver(null);
          }}
          onSubmit={(vehicleIds) => handleAssignVehicles(selectedDriver.id, vehicleIds)}
        />
      )}
    </div>
  );
};

export default DriverManagement;