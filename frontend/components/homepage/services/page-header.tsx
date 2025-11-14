'use client';

import { motion } from 'framer-motion';
import { Stethoscope, Car } from 'lucide-react';

const PageHeader = () => {
  return (
    <section className="w-full bg-[#B0D6FF] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center items-center space-x-4 mb-4"
        >
          <Stethoscope className="w-8 h-8 text-[#0A2342]" />
          <Car className="w-8 h-8 text-[#0A2342]" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-[#0A2342] mb-4"
        >
          Our Transportation Services
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-xl md:text-2xl text-[#0A2342] font-medium"
        >
          Medical & Non-Medical Transportation You Can Rely On
        </motion.p>
      </div>
    </section>
  );
};

export default PageHeader;