'use client';

import { motion, Variants } from 'framer-motion';
import { MapPin, Hospital, Car } from 'lucide-react';

const ServiceAreaSimple = () => {
  const serviceAreas = [
    {
      icon: MapPin,
      name: "Primary Service Area",
      description: "Metropolitan region and immediate suburbs",
      coverage: "24/7 coverage",
      cities: ["Downtown", "Medical District", "Eastside", "West End", "North Hills"]
    },
    {
      icon: Car,
      name: "Extended Coverage",
      description: "Surrounding communities and regional destinations",
      coverage: "Scheduled service",
      cities: ["Springfield", "Oak Valley", "Riverbend", "Lakeview", "Mountain Ridge"]
    },
    {
      icon: Hospital,
      name: "Medical Facilities",
      description: "Major hospitals and medical centers served",
      coverage: "Priority service",
      cities: ["General Hospital", "Medical Center", "Specialty Clinic", "Rehab Center", "Urgent Care"]
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="w-full bg-white border-t border-b border-[#E6EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="mb-12">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-[#0A2342] mb-4"
          >
            Service Area Coverage
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-xl text-[#0A2342] max-w-3xl"
          >
            Explore the cities and communities we serve with reliable medical and non-medical transportation.
          </motion.p>
        </div>

        {/* Service Areas Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {serviceAreas.map((area, index) => (
            <motion.div
              key={area.name}
              variants={itemVariants}
              className="border border-[#E6EAF0] bg-white hover:border-[#B0D6FF] transition-colors duration-300"
            >
              {/* Header */}
              <div className="border-b border-[#E6EAF0] p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-[#F5F7FA] border border-[#E6EAF0] flex items-center justify-center">
                    <area.icon className="w-5 h-5 text-[#0A2342]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0A2342]">
                      {area.name}
                    </h3>
                    <p className="text-sm text-[#0A2342] text-opacity-70">
                      {area.coverage}
                    </p>
                  </div>
                </div>
                <p className="text-[#0A2342] text-opacity-80">
                  {area.description}
                </p>
              </div>

              {/* Cities List */}
              <div className="p-6">
                <div className="space-y-2">
                  {area.cities.map((city, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-[#B0D6FF] flex-shrink-0" />
                      <span className="text-sm text-[#0A2342]">{city}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Coverage Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-[#F5F7FA] border border-[#E6EAF0] p-6 text-center"
        >
          <p className="text-lg text-[#0A2342] font-medium">
            All service areas include wheelchair accessible vehicles and dedicated medical transport options
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default ServiceAreaSimple;