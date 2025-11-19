"use client";

import { motion } from 'framer-motion';
import { User, Edit } from 'lucide-react';

interface ProfileHeaderProps {
  user: any;
  isEditing: boolean;
  onEditToggle: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  user, 
  isEditing, 
  onEditToggle 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6"
    >
      <div className="flex flex-col md:flex gap-2 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-[#F0F9FF] p-3">
            <User className="w-8 h-8 text-[#0077B6]" />
          </div>
          <div>
            <h1 className="text-sm md:text-xl font-semibold text-[#0A2342]">
              {user?.name || 'User Profile'}
            </h1>
            <p className="text-[#64748B] mt-1 text-xs">
              Manage your personal information and preferences
            </p>
          </div>
        </div>
        <button
          onClick={onEditToggle}
          className="text-sm md:text-lg flex items-center space-x-2 px-4 py-2 bg-[#0077B6] text-white font-medium hover:bg-[#005A8F] transition-colors duration-200"
        >
          <Edit className="w-4 h-4" />
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>
    </motion.div>
  );
};