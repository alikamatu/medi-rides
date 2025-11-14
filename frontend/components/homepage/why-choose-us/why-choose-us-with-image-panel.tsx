'use client';

import { motion, Variants } from 'framer-motion';
import { Shield, Clock, UserCheck } from 'lucide-react';

const WhyChooseUsWithImagePanel = () => {
  const features = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Our vehicles undergo rigorous safety inspections and our drivers are trained in patient care and emergency procedures.",
      image: "https://images.unsplash.com/photo-1581093458791-8a6b6d47d0b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      icon: Clock,
      title: "Reliable & On Time",
      description: "We understand medical appointments can't be missed. Our punctuality record ensures you arrive stress-free and on schedule.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      icon: UserCheck,
      title: "Professional, Certified Drivers",
      description: "All our drivers are certified, background-checked, and trained in patient assistance and mobility support.",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants: Variants = {
    hidden: { scale: 1.05, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="w-full bg-white border-t border-b border-[#E6EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="mb-16">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold text-[#0A2342] mb-4"
          >
            Why Choose Us
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            className="text-lg md:text-xl text-[#0A2342] max-w-3xl"
          >
            Safety, reliability, and compassionate professionals dedicated to your care.
          </motion.p>
        </div>

        {/* Content with Image Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {/* Features Grid - 3/4 width */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="bg-white border border-[#E6EAF0] group hover:border-[#B0D6FF] transition-colors duration-300"
              >
                {/* Image */}
                <motion.div
                  variants={imageVariants}
                  className="w-full h-48 overflow-hidden border-b-2 border-white"
                >
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${feature.image})` }}
                  />
                </motion.div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-[#B0D6FF]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0A2342]">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-[#0A2342] text-opacity-80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Supporting Image Panel - 1/4 width */}
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="h-full border-2 border-white bg-gray-100">
              {/* Replace with actual medical transportation credibility image */}
              <div 
                className="w-full h-full min-h-[600px] bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Highlight Strip - Trust Statement */}
        <motion.div
          initial={{ scaleX: 0.95, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full bg-[#B0D6FF] py-8"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl font-medium text-[#0A2342]"
            >
              Thousands of safe, supported trips completed with compassion and care.
            </motion.p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUsWithImagePanel;