'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, FerrisWheelIcon, Shield } from 'lucide-react';

const ServicesHero = () => {
  return (
    <section className="w-full bg-white border-b border-[#E6EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#0A2342] leading-tight">
              Comprehensive Transportation Services
            </h1>
            
            <p className="text-xl text-[#0A2342] opacity-90 leading-relaxed">
              Safe, reliable medical and non-medical transportation designed for your comfort and peace of mind. 
              Serving patients, seniors, and individuals with mobility needs across our community.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#B0D6FF] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#0A2342]" />
                </div>
                <span className="text-[#0A2342] font-medium">Safe & Insured</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#B0D6FF] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#0A2342]" />
                </div>
                <span className="text-[#0A2342] font-medium">24/7 Service</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#B0D6FF] flex items-center justify-center">
                  <FerrisWheelIcon className="w-5 h-5 text-[#0A2342]" />
                </div>
                <span className="text-[#0A2342] font-medium">Wheelchair Accessible</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#B0D6FF] flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#0A2342]" />
                </div>
                <span className="text-[#0A2342] font-medium">Easy Booking</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#B0D6FF] text-[#0A2342] px-8 py-4 font-semibold text-lg border-0 hover:bg-[#9BC9FF] transition-colors duration-200 flex items-center space-x-3"
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule Your Ride</span>
            </motion.button>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="bg-[#F5F7FA] border border-[#E6EAF0] p-8">
              <div className="w-full h-80 bg-gradient-to-br from-[#B0D6FF] to-[#0A2342] flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                    <FerrisWheelIcon className="w-10 h-10" />
                  </div>
                  <p className="text-xl font-semibold">Compassionate Care</p>
                  <p className="text-sm opacity-90 mt-2">Professional Medical Transportation</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;