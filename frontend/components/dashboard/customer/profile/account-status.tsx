"use client";

import { motion } from 'framer-motion';
import { UserProfile } from '@/types/profile.types';

interface AccountStatusProps {
  user: UserProfile;
}

export const AccountStatus: React.FC<AccountStatusProps> = ({ user }) => {
  const statusItems = [
    {
      label: 'Email Verification',
      value: user.isVerified ? 'Verified' : 'Pending',
      status: user.isVerified ? 'verified' : 'pending',
    },
    {
      label: 'Account Status',
      value: user.isActive ? 'Active' : 'Inactive',
      status: user.isActive ? 'active' : 'inactive',
    },
    {
      label: 'Member Since',
      value: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
      status: 'info',
    },
    {
      label: 'Last Login',
      value: user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never',
      status: 'info',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'active':
        return 'bg-[#E6F7FF] text-[#0077B6]';
      case 'pending':
        return 'bg-[#FFF7E6] text-[#E67E22]';
      case 'inactive':
        return 'bg-[#FEF2F2] text-[#DC2626]';
      default:
        return 'bg-[#F8FAFC] text-[#64748B]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-[#F0F9FF] p-6"
    >
      <h2 className="text-lg font-semibold text-[#0A2342] mb-4">
        Account Status
      </h2>
      <div className="space-y-3">
        {statusItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <span className="text-[#0A2342]">{item.label}</span>
            <span className={`px-3 py-1 font-medium ${getStatusColor(item.status)}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};