'use client';

import { motion } from 'framer-motion';
import { Clock, Phone, Calendar, Shield, FerrisWheelIcon } from 'lucide-react';

const ScheduleRideBanner = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[#F0F9FF] via-[#E6F7FF] to-[#F0F9FF] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Headline */}
            <h1 className="text-4xl lg:text-5xl font-bold text-[#1E3A5F] leading-tight">
              Schedule Your Ride
            </h1>

            {/* Subtext */}
            <p className="text-xl text-[#1E3A5F] opacity-90 leading-relaxed">
              Quick and easy booking with same-day availability for urgent medical appointments. 
              Our 24/7 support team is always here to assist you.
            </p>

            {/* Feature Icons */}
            <div className="flex flex-wrap gap-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <FerrisWheelIcon className="w-6 h-6 text-[#0077B6]" />
                </div>
                <span className="text-[#1E3A5F] font-medium">Wheelchair Accessible</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#00B4D8]" />
                </div>
                <span className="text-[#1E3A5F] font-medium">24/7 Support</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#0077B6]" />
                </div>
                <span className="text-[#1E3A5F] font-medium">Same-Day Available</span>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 119, 182, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0077B6] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-[#005A8F] transition-all duration-300 flex items-center space-x-3"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Now</span>
            </motion.button>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm text-[#1E3A5F] opacity-80">ADA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-green-500" />
                <span className="text-sm text-[#1E3A5F] opacity-80">24/7 Dispatch</span>
              </div>
            </div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-full h-80 bg-gradient-to-br from-[#90E0EF] to-[#00B4D8] rounded-xl flex items-center justify-center">
                {/* Placeholder for accessible van illustration */}
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FerrisWheelIcon className="w-12 h-12" />
                  </div>
                  <p className="text-lg font-semibold">Accessible Medical Transport</p>
                  <p className="text-sm opacity-90 mt-2">Wheelchair-friendly vehicles</p>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3"
            >
              <Clock className="w-6 h-6 text-[#00B4D8]" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3"
            >
              <Phone className="w-6 h-6 text-[#0077B6]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleRideBanner;

// Mobile-specific adjustments
const ScheduleRideBannerMobile = () => {
  return (
    <section className="w-full bg-gradient-to-b from-[#F0F9FF] to-[#E6F7FF] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-8">
          
          {/* Text Content - Stacked on top */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 text-center"
          >
            {/* Headline */}
            <h1 className="text-3xl font-bold text-[#1E3A5F] leading-tight">
              Schedule Your Ride
            </h1>

            {/* Subtext */}
            <p className="text-lg text-[#1E3A5F] opacity-90 leading-relaxed px-4">
              Quick booking with same-day availability. 24/7 support always available.
            </p>

            {/* Feature Icons - Stacked */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <FerrisWheelIcon className="w-5 h-5 text-[#0077B6]" />
                </div>
                <span className="text-sm text-[#1E3A5F] font-medium text-center">Wheelchair Accessible</span>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#00B4D8]" />
                </div>
                <span className="text-sm text-[#1E3A5F] font-medium text-center">24/7 Support</span>
              </div>
            </div>

            {/* CTA Button - Full width */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[#0077B6] text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-[#005A8F] transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Now</span>
            </motion.button>
          </motion.div>

          {/* Image/Illustration - Below text */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="w-full h-64 bg-gradient-to-br from-[#90E0EF] to-[#00B4D8] rounded-xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <FerrisWheelIcon className="w-8 h-8" />
                  </div>
                  <p className="font-semibold">Accessible Transport</p>
                  <p className="text-xs opacity-90 mt-1">Wheelchair-friendly vehicles</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};