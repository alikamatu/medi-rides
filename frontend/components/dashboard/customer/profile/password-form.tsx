"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { ChangePasswordData } from '@/types/profile.types';
import { profileValidation } from '@/utils/validation';

interface PasswordFormProps {
  onSubmit: (data: ChangePasswordData) => Promise<void>;
  onCancel: () => void;
}

export const PasswordForm: React.FC<PasswordFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    const passwordError = profileValidation.password(formData.newPassword);
    if (passwordError) {
      newErrors.newPassword = passwordError;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

// In password-form.tsx - Fix the handleSubmit function
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) return;

  setLoading(true);
  setErrors({}); // Clear previous errors
  
  try {
    // Only send the fields that the backend expects
    await onSubmit({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  } catch (error: any) {
    console.error('Password change error details:', error);
    
    // Handle specific error cases
    if (error.message.includes('current password')) {
      setErrors({ currentPassword: error.message });
    } else if (error.message.includes('session expired')) {
      setErrors({ currentPassword: 'Session expired. Please log in again.' });
    } else {
      setErrors({ newPassword: error.message });
    }
  } finally {
    setLoading(false);
  }
};

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const fields = [
    {
      key: 'currentPassword' as const,
      label: 'Current Password',
      type: showPasswords.current ? 'text' : 'password',
    },
    {
      key: 'newPassword' as const,
      label: 'New Password',
      type: showPasswords.new ? 'text' : 'password',
    },
    {
      key: 'confirmPassword' as const,
      label: 'Confirm New Password',
      type: showPasswords.confirm ? 'text' : 'password',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6"
    >
      <h2 className="text-lg font-semibold text-[#0A2342] mb-4">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.key} className="flex items-start space-x-4">
            <div className="text-[#64748B] mt-3">
              <Lock className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#0A2342] mb-1">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={field.type}
                  value={formData[field.key]}
                  onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                  className={`w-full p-3 bg-[#F8FBFF] text-[#0A2342] focus:bg-[#F0F9FF] transition-colors duration-200 pr-10 ${
                    errors[field.key] ? 'bg-[#FEF2F2]' : ''
                  }`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(field.key.replace('Password', '') as any)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748B] hover:text-[#0A2342]"
                >
                  {showPasswords[field.key.replace('Password', '') as keyof typeof showPasswords] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors[field.key] && (
                <p className="text-[#DC2626] text-sm mt-1">{errors[field.key]}</p>
              )}
            </div>
          </div>
        ))}
        
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#0077B6] text-white font-medium hover:bg-[#005A8F] disabled:bg-[#64748B] disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? 'Changing Password...' : 'Change Password'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-3 bg-[#F0F9FF] text-[#0A2342] font-medium hover:bg-[#E6F7FF] disabled:bg-[#F1F5F9] disabled:cursor-not-allowed transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};