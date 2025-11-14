'use client';

import { motion, Variants } from 'framer-motion';
import { 
  Shield, 
  Car, 
  Accessibility,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const FleetHorizontalGallery = () => {
  const features = [
    {
      icon: Accessibility,
      title: "Wheelchair Ramp Entry",
      description: "Low-floor ramps with anti-slip surfaces for safe boarding and exit",
      features: ["ADA Compliant", "Anti-slip Surface", "Wide Entry"],
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      icon: Car,
      title: "Fully Accessible Vans",
      description: "Spacious interiors with dedicated wheelchair securement areas",
      features: ["Spacious Interior", "Dedicated Spaces", "Easy Maneuvering"],
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      icon: Shield,
      title: "Secure Interior Seating",
      description: "Medical-grade seating with integrated safety restraint systems",
      features: ["Medical Grade", "Safety Restraints", "Comfort Focused"],
      image: "https://images.unsplash.com/photo-1581093458791-8a6b6d47d0b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      icon: Accessibility,
      title: "Mobility Equipment",
      description: "Advanced securement systems and mobility assistance tools",
      features: ["Advanced Systems", "Easy Operation", "Safety Certified"],
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
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
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="mb-12">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-[#0A2342] mb-4"
          >
            Fleet Accessibility Features
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-xl text-[#0A2342] max-w-3xl"
          >
            Our vehicles are designed for safe, comfortable, and fully accessible transportation for all mobility needs.
          </motion.p>
        </div>

        {/* Horizontal Gallery */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-[#E6EAF0]"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="bg-white border-0 border-r border-[#E6EAF0] last:border-r-0 group hover:bg-[#F8FAFC] transition-colors duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden border-b border-[#E6EAF0]">
                <motion.div
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="w-full h-48 bg-gray-100"
                >
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${feature.image})` }}
                  />
                </motion.div>
                
                {/* Icon Badge */}
                <div className="absolute top-3 left-3 bg-white p-2 border border-[#E6EAF0]">
                  <feature.icon className="w-4 h-4 text-[#0A2342]" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#0A2342] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#0A2342] text-opacity-80 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                {/* Feature List */}
                <div className="space-y-2 mb-4">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-[#B0D6FF] flex-shrink-0" />
                      <span className="text-xs text-[#0A2342] text-opacity-70">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Learn More Link */}
                <div className="flex items-center space-x-1 text-[#0A2342] text-opacity-70 group-hover:text-opacity-100 transition-colors duration-200">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Compliance Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mt-8 bg-[#F8FAFC] py-4 border border-[#E6EAF0]"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-[#0A2342] font-medium">
              All vehicles compliant with ADA standards and regularly inspected for safety
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FleetHorizontalGallery;