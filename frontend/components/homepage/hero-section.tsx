'use client';

import { motion } from 'framer-motion';

const HeroSection = () => {
  const features = [
    "Wheelchair accessible vehicles",
    "On-time guaranteed",
    "Professional medical drivers",
    "24/7 availability",
    "Insurance accepted",
    "Comfortable and safe"
  ];

  return (
    <section className="relative h-screen flex items-center justify-start overflow-hidden bg-[#0A2342]">
      {/* Background Image with Overlay */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        {/* Replace with actual accessible van image */}
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url("/photos/56475636.svg")'
          }}
        />
        <div className="absolute inset-0 bg-white opacity-15" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#fff] leading-tight mb-6"
          >
            Safe, Reliable Non-Emergency Medical Transportation
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-[#fff] mb-8 leading-relaxed"
          >
            Professional rides for medical appointments, therapy visits, airport transfers, and more.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0A2342] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-200 hover:bg-[#9BC9FF]"
            >
              Schedule a Ride
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;