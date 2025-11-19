'use client';

import { motion } from 'framer-motion';
import { MapPin, Car, Calendar, Clock, Type, Navigation } from 'lucide-react';
import { BookingStepProps } from '@/types/booking.types';

export default function ReviewStep({ 
  formData, 
  updateFormData, 
  errors, 
  onBack, 
  isSubmitting,
  onSubmit
}: BookingStepProps & { onSubmit: () => void }) {
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Booking</h2>
        <p className="text-gray-600">Please review all details before submitting</p>
      </div>

      {/* Booking Summary */}
      <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Trip Summary</h3>
        
        <div className="space-y-4">
          {/* Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Pickup</p>
                <p className="text-sm text-gray-600">{formData.pickup?.address}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Drop-off</p>
                <p className="text-sm text-gray-600">{formData.dropoff?.address}</p>
              </div>
            </div>
          </div>

          {/* Service Type */}
          <div className="flex items-start space-x-3">
            <Car className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">Service Type</p>
              <p className="text-sm text-gray-600">{formData.serviceType}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">Date & Time</p>
              <p className="text-sm text-gray-600">
                {formatDate(formData.date)} at {formData.time}
              </p>
            </div>
          </div>

          {/* Distance & Time */}
          {formData.distanceKm && formData.estimatedTime && (
            <div className="flex items-start space-x-3">
              <Navigation className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">Trip Details</p>
                <p className="text-sm text-gray-600">
                  {formData.distanceKm} km • ~{formData.estimatedTime} minutes
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Additional Notes (Optional)
        </label>
        <textarea
          rows={4}
          value={formData.notes}
          onChange={(e) => updateFormData({ notes: e.target.value })}
          placeholder="Any special requirements, medical equipment, or notes for the driver..."
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
        />
      </div>

      {errors.submit && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-600 text-center"
        >
          {errors.submit}
        </motion.p>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <motion.button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 disabled:bg-gray-300 transition-colors duration-200"
        >
          Back
        </motion.button>
        
        <motion.button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-green-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              <Car className="w-5 h-5 mr-2" />
              Confirm Booking
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}