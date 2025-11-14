'use client';

import { motion, Variants } from 'framer-motion';
import { MapPin, Hospital, Car, Navigation, Users, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const ServiceAreaMap = dynamic(() => import('./service-area-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-[#F5F7FA] border border-[#E6EAF0] flex items-center justify-center">
      <div className="text-center">
        <Navigation className="w-8 h-8 text-[#B0D6FF] mx-auto mb-2" />
        <p className="text-[#0A2342]">Loading map...</p>
      </div>
    </div>
  )
});

const ServiceAreaMapSection = () => {
  const serviceAreas = [
    {
      icon: MapPin,
      name: "Metro Area Coverage",
      description: "Full service throughout the metropolitan region",
      cities: ["Downtown", "Medical District", "Suburban Zones"]
    },
    {
      icon: Hospital,
      name: "Major Medical Centers",
      description: "Direct service to all major hospitals and clinics",
      facilities: ["General Hospital", "Medical Center", "Specialty Clinics"]
    },
    {
      icon: Car,
      name: "Extended Service Zone",
      description: "Coverage in surrounding communities",
      areas: ["North County", "South Region", "Eastern Suburbs"]
    }
  ];

  const stats = [
    { icon: Users, value: "25+", label: "Communities Served" },
    { icon: Hospital, value: "15+", label: "Medical Facilities" },
    { icon: Clock, value: "24/7", label: "Service Availability" }
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

        {/* Stats Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-[#F5F7FA] border border-[#E6EAF0] p-4 text-center"
              >
                <stat.icon className="w-6 h-6 text-[#B0D6FF] mx-auto mb-2" />
                <div className="text-xl font-bold text-[#0A2342] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#0A2342] text-opacity-70">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Map and Legend Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map Container - 3/4 width */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <div className="border border-[#E6EAF0] bg-white">
              <ServiceAreaMap />
            </div>
          </motion.div>

          {/* Legend Sidebar - 1/4 width */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <div className="border border-[#E6EAF0] bg-white p-6">
              <h3 className="text-lg font-semibold text-[#0A2342] mb-4">
                Service Zones
              </h3>
              
              <div className="space-y-6">
                {serviceAreas.map((area, index) => (
                  <motion.div
                    key={area.name}
                    variants={itemVariants}
                    className="border-0 border-l-4 border-[#B0D6FF] pl-4"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <area.icon className="w-5 h-5 text-[#0A2342]" />
                      <h4 className="font-semibold text-[#0A2342]">
                        {area.name}
                      </h4>
                    </div>
                    
                    <p className="text-sm text-[#0A2342] text-opacity-80 mb-3">
                      {area.description}
                    </p>

                    {/* Cities/Facilities List */}
                    <div className="space-y-1">
                      {(area.cities || area.facilities || area.areas)?.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-[#B0D6FF] flex-shrink-0" />
                          <span className="text-xs text-[#0A2342] text-opacity-70">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Coverage Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-6 pt-4 border-t border-[#E6EAF0]"
              >
                <p className="text-xs text-[#0A2342] text-opacity-70">
                  All service areas include wheelchair accessible vehicles and medical transport options.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ServiceAreaMapSection;