// components/dashboard/customer/profile/profile-form.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone } from 'lucide-react';
import { UpdateProfileData } from '@/types/profile.types';
import { profileValidation } from '@/utils/validation';

interface ProfileFormProps {
  user: any;
  onSubmit: (data: UpdateProfileData) => Promise<void>;
  onCancel: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ 
  user, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Only validate non-email fields to prevent unnecessary conflicts
  const validateField = (name: string, value: string) => {
    if (name === 'email' && value === user.email) {
      return null; // No validation needed if email hasn't changed
    }
    
    const validationFn = profileValidation[name as keyof typeof profileValidation];
    if (validationFn) {
      return validationFn(value);
    }
    return null;
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Only validate fields that have changed
    const newErrors: Record<string, string> = {};
    
    if (formData.name !== user.name) {
      const nameError = validateField('name', formData.name);
      if (nameError) newErrors.name = nameError;
    }
    
    if (formData.email !== user.email) {
      const emailError = validateField('email', formData.email);
      if (emailError) newErrors.email = emailError;
    }
    
    if (formData.phone !== user.phone) {
      const phoneError = validateField('phone', formData.phone);
      if (phoneError) newErrors.phone = phoneError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // Only send fields that have actually changed
      const updateData: UpdateProfileData = {};
      
      if (formData.name !== user.name) updateData.name = formData.name;
      if (formData.email !== user.email) updateData.email = formData.email;
      if (formData.phone !== user.phone) updateData.phone = formData.phone;

      // If no changes, just cancel
      if (Object.keys(updateData).length === 0) {
        onCancel();
        return;
      }

      await onSubmit(updateData);
    } catch (error) {
      // Error handling is done in the parent component
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      label: 'Full Name',
      value: formData.name,
      icon: User,
      key: 'name' as const,
      type: 'text',
      required: true,
    },
    {
      label: 'Email Address',
      value: formData.email,
      icon: Mail,
      key: 'email' as const,
      type: 'email',
      required: true,
      note: formData.email !== user.email ? 'Changing email will require verification' : undefined,
    },
    {
      label: 'Phone Number',
      value: formData.phone,
      icon: Phone,
      key: 'phone' as const,
      type: 'tel',
      required: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6"
    >
      <h2 className="text-lg font-semibold text-[#0A2342] mb-4">
        Personal Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="flex items-start space-x-4">
              <div className="text-[#64748B] mt-3">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#0A2342] mb-1">
                  {field.label} {field.required && '*'}
                </label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className={`w-full p-3 bg-[#F8FBFF] text-[#0A2342] focus:bg-[#F0F9FF] transition-colors duration-200 ${
                    errors[field.key] ? 'bg-[#FEF2F2]' : ''
                  }`}
                  disabled={loading}
                  placeholder={field.label}
                />
                {field.note && (
                  <p className="text-[#E67E22] text-sm mt-1">{field.note}</p>
                )}
                {errors[field.key] && (
                  <p className="text-[#DC2626] text-sm mt-1">{errors[field.key]}</p>
                )}
              </div>
            </div>
          );
        })}
        
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#0077B6] text-white font-medium hover:bg-[#005A8F] disabled:bg-[#64748B] disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? 'Saving...' : 'Save Changes'}
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