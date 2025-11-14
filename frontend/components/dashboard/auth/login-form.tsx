'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle login logic here
      console.log('Login data:', formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#0A2342] mb-2">
          Welcome Back
        </h2>
        <p className="text-[#64748B]">
          Sign in to your account to schedule rides and manage your transportation needs.
        </p>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#0A2342] mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-[#64748B]" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`block w-full pl-10 pr-3 py-3 border ${
              errors.email ? 'border-red-300' : 'border-[#E6EAF0]'
            } rounded-lg focus:ring-2 focus:ring-[#B0D6FF] focus:border-[#B0D6FF] transition-colors duration-200`}
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.email}
          </motion.p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#0A2342] mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-[#64748B]" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            className={`block w-full pl-10 pr-10 py-3 border ${
              errors.password ? 'border-red-300' : 'border-[#E6EAF0]'
            } rounded-lg focus:ring-2 focus:ring-[#B0D6FF] focus:border-[#B0D6FF] transition-colors duration-200`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-[#64748B] hover:text-[#0A2342]" />
            ) : (
              <Eye className="h-5 w-5 text-[#64748B] hover:text-[#0A2342]" />
            )}
          </button>
        </div>
        {errors.password && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {errors.password}
          </motion.p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 text-[#B0D6FF] focus:ring-[#B0D6FF] border-[#E6EAF0] rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-[#64748B]">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="/forgot-password" className="text-[#0077B6] hover:text-[#005A8F] font-medium">
            Forgot password?
          </a>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex justify-center items-center space-x-3 py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#0077B6] hover:bg-[#005A8F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B0D6FF] transition-colors duration-200"
      >
        <LogIn className="w-5 h-5" />
        <span className="font-semibold">Sign In</span>
      </motion.button>

      {/* Demo Account Hint */}
      <div className="mt-4 p-3 bg-[#F0F9FF] border border-[#B0D6FF] rounded-lg">
        <p className="text-sm text-[#0A2342] text-center">
          <strong>Demo Access:</strong> Use demo@compassionatemedi.com / demo123
        </p>
      </div>
    </form>
  );
};

export default LoginForm;