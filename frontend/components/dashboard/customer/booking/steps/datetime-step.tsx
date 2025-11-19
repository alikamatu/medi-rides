'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { BookingStepProps } from '@/types/booking.types';

export default function DateTimeStep({ 
  formData, 
  updateFormData, 
  errors, 
  onNext, 
  onBack 
}: BookingStepProps) {
  
  const handleDateChange = (date: string) => {
    updateFormData({ date });
  };

  const handleTimeChange = (time: string) => {
    updateFormData({ time });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">When do you need the ride?</h2>
        <p className="text-gray-600">Select your preferred date and time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
            Select Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleDateChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={`pl-10 w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-center ${
                errors.date ? 'border-red-500' : 'border-gray-200'
              }`}
            />
          </div>
          {errors.date && (
            <p className="mt-2 text-sm text-red-600 text-center">{errors.date}</p>
          )}
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
            Select Time *
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleTimeChange(e.target.value)}
              className={`pl-10 w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-center ${
                errors.time ? 'border-red-500' : 'border-gray-200'
              }`}
            />
          </div>
          {errors.time && (
            <p className="mt-2 text-sm text-red-600 text-center">{errors.time}</p>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-8">
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200"
        >
          Back
        </motion.button>
        
        <motion.button
          type="button"
          onClick={onNext}
          disabled={!formData.date || !formData.time}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-blue-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Continue to Review
        </motion.button>
      </div>
    </motion.div>
  );
}