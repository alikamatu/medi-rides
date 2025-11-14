'use client';

import { motion } from 'framer-motion';
import { Phone, Calendar, MessageCircle, Clock } from 'lucide-react';

const ServicesCTASection = () => {
  return (
    <section className="w-full bg-white border-t border-b border-[#E6EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main CTA */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[#0A2342] mb-4"
          >
            Ready to Schedule Your Ride?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-[#0A2342] max-w-3xl mx-auto mb-8"
          >
            Experience the compassion and reliability that thousands of patients and families trust every day.
          </motion.p>
        </div>

        {/* CTA Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Phone Booking */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-[#E6EAF0] p-8 text-center hover:border-[#B0D6FF] transition-colors duration-300"
          >
            <div className="w-16 h-16 bg-[#B0D6FF] flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-[#0A2342]" />
            </div>
            <h3 className="text-xl font-semibold text-[#0A2342] mb-3">
              Call to Book
            </h3>
            <p className="text-[#0A2342] text-opacity-80 mb-4">
              Speak directly with our friendly dispatch team available 24/7
            </p>
            <div className="text-2xl font-bold text-[#0A2342] mb-4">
              (555) 123-4567
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[#B0D6FF] text-[#0A2342] py-3 font-semibold border-0 hover:bg-[#9BC9FF] transition-colors duration-200"
            >
              Call Now
            </motion.button>
          </motion.div>

          {/* Online Booking */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-[#E6EAF0] p-8 text-center hover:border-[#B0D6FF] transition-colors duration-300"
          >
            <div className="w-16 h-16 bg-[#B0D6FF] flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-[#0A2342]" />
            </div>
            <h3 className="text-xl font-semibold text-[#0A2342] mb-3">
              Book Online
            </h3>
            <p className="text-[#0A2342] text-opacity-80 mb-4">
              Schedule your ride in just a few clicks with our easy online system
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[#B0D6FF] text-[#0A2342] py-3 font-semibold border-0 hover:bg-[#9BC9FF] transition-colors duration-200"
            >
              Schedule Online
            </motion.button>
          </motion.div>

          {/* Get Quote */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border border-[#E6EAF0] p-8 text-center hover:border-[#B0D6FF] transition-colors duration-300"
          >
            <div className="w-16 h-16 bg-[#B0D6FF] flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-[#0A2342]" />
            </div>
            <h3 className="text-xl font-semibold text-[#0A2342] mb-3">
              Get a Quote
            </h3>
            <p className="text-[#0A2342] text-opacity-80 mb-4">
              Receive a detailed quote and insurance verification assistance
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[#B0D6FF] text-[#0A2342] py-3 font-semibold border-0 hover:bg-[#9BC9FF] transition-colors duration-200"
            >
              Request Quote
            </motion.button>
          </motion.div>
        </div>

        {/* Urgent Care */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#F5F7FA] border border-[#E6EAF0] p-8"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#B0D6FF] flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#0A2342]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#0A2342]">
                  Need Urgent Medical Transport?
                </h3>
                <p className="text-[#0A2342] text-opacity-80">
                  Same-day and emergency transportation available
                </p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#B0D6FF] text-[#0A2342] px-8 py-3 font-semibold border-0 hover:bg-[#9BC9FF] transition-colors duration-200 flex items-center space-x-2 whitespace-nowrap"
            >
              <Phone className="w-5 h-5" />
              <span>Call for Urgent Ride</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesCTASection;