'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  Car, 
  Star, 
  CheckCircle, 
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useRiders } from '@/hooks/useRiders';
import { Rider } from '@/types/rider.types';
import RidersList from '@/components/dashboard/admin/riders/riders-list';
import AddRiderForm from '@/components/dashboard/admin/riders/add-rider-form';
import RiderDetailsModal from '@/components/dashboard/admin/riders/rider-details-modal';

export default function ManageRidersPage() {
  const {
    riders,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    createRider,
    updateRider,
    deleteRider,
    toggleRiderStatus,
    refetch,
    totalRiders,
    activeRiders,
    inactiveRiders,
  } = useRiders();

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [editingRider, setEditingRider] = useState<Rider | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const handleCreateRider = async (riderData: any) => {
    setActionLoading(true);
    try {
      await createRider(riderData);
      setShowAddForm(false);
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditRider = async (riderData: any) => {
    if (!editingRider) return;
    
    setActionLoading(true);
    try {
      await updateRider(editingRider.id, riderData);
      setEditingRider(null);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteRider = async (id: number) => {
    if (!confirm('Are you sure you want to delete this rider? This action cannot be undone.')) {
      return;
    }

    setActionLoading(true);
    try {
      await deleteRider(id);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (id: number) => {
    setActionLoading(true);
    try {
      await toggleRiderStatus(id);
    } finally {
      setActionLoading(false);
    }
  };

  const stats = [
    {
      title: 'Total Riders',
      value: totalRiders,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Riders',
      value: activeRiders,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'Inactive Riders',
      value: inactiveRiders,
      icon: XCircle,
      color: 'bg-red-500',
    },
    {
      title: 'Average Rating',
      value: riders.length > 0 
        ? (riders.reduce((sum, rider) => sum + rider.rating, 0) / riders.length).toFixed(1)
        : '0.0',
      icon: Star,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Riders</h1>
            <p className="text-gray-600 mt-2">
              Add, edit, and manage driver accounts in the system
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddForm(true)}
            disabled={showAddForm}
            className="mt-4 lg:mt-0 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200 flex items-center font-medium"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add New Rider
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4"
          >
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {showAddForm ? (
            <AddRiderForm
              onSubmit={handleCreateRider}
              onCancel={() => setShowAddForm(false)}
              loading={actionLoading}
            />
          ) : editingRider ? (
            <motion.div
              key="edit-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Edit form would go here - similar to AddRiderForm but with existing data */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <p className="text-center text-gray-600">Edit form implementation would go here</p>
                <div className="flex justify-center space-x-3 mt-4">
                  <button
                    onClick={() => setEditingRider(null)}
                    className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="riders-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <RidersList
                riders={riders}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                onEdit={setEditingRider}
                onDelete={handleDeleteRider}
                onToggleStatus={handleToggleStatus}
                onViewDetails={setSelectedRider}
                loading={loading}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rider Details Modal */}
        <AnimatePresence>
          {selectedRider && (
            <RiderDetailsModal
              rider={selectedRider}
              isOpen={!!selectedRider}
              onClose={() => setSelectedRider(null)}
              onEdit={() => {
                setEditingRider(selectedRider);
                setSelectedRider(null);
              }}
              onToggleStatus={() => {
                handleToggleStatus(selectedRider.id);
                setSelectedRider(null);
              }}
              onDelete={() => {
                handleDeleteRider(selectedRider.id);
                setSelectedRider(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}