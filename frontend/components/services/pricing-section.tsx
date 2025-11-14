'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, Users, Car, Calculator } from 'lucide-react';

const PricingSection = () => {
  const pricingFactors = [
    {
      icon: MapPin,
      title: "Distance & Location",
      description: "Based on pickup and drop-off locations within our service area",
      details: ["Zone-based pricing", "No hidden fees", "Transparent quotes"]
    },
    {
      icon: Clock,
      title: "Trip Duration",
      description: "Consideration for wait times and round-trip requirements",
      details: ["Standard wait time included", "Extended wait options", "Round-trip discounts"]
    },
    {
      icon: Car,
      title: "Vehicle Type",
      description: "Different rates for standard, wheelchair accessible, and specialty vehicles",
      details: ["Standard sedan rates", "Wheelchair van pricing", "Companion seating"]
    },
    {
      icon: Users,
      title: "Passenger Needs",
      description: "Additional assistance requirements and special accommodations",
      details: ["Companion riders", "Medical equipment", "Special assistance"]
    }
  ];

  const pricingModels = [
    {
      type: "Flat Rate",
      description: "Fixed pricing for common routes and medical facilities",
      bestFor: "Regular appointments, known destinations"
    },
    {
      type: "Mileage Based",
      description: "Calculated based on actual distance traveled",
      bestFor: "Custom routes, personal destinations"
    },
    {
      type: "Hourly Rate",
      description: "For extended trips with multiple stops",
      bestFor: "Errand runs, multi-destination trips"
    }
  ];

  return (
    <section className="w-full bg-white border-t border-b border-[#E6EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-[#0A2342] mb-4"
          >
            Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-[#0A2342] max-w-3xl mx-auto"
          >
            Fair, straightforward pricing designed to be affordable while maintaining the highest quality of service.
          </motion.p>
        </div>

        {/* Pricing Factors */}
        <div className="mb-16">
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold text-[#0A2342] mb-8 text-center"
          >
            How Pricing is Determined
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricingFactors.map((factor, index) => (
              <motion.div
                key={factor.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-[#E6EAF0] p-6"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-[#F5F7FA] border border-[#E6EAF0] flex items-center justify-center">
                    <factor.icon className="w-6 h-6 text-[#0A2342]" />
                  </div>
                  <h4 className="text-xl font-semibold text-[#0A2342]">
                    {factor.title}
                  </h4>
                </div>

                <p className="text-[#0A2342] text-opacity-80 mb-4">
                  {factor.description}
                </p>

                <div className="space-y-2">
                  {factor.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#B0D6FF] flex-shrink-0" />
                      <span className="text-sm text-[#0A2342] text-opacity-70">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Models */}
        <div>
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold text-[#0A2342] mb-8 text-center"
          >
            Pricing Options
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingModels.map((model, index) => (
              <motion.div
                key={model.type}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-[#E6EAF0] p-6 text-center"
              >
                <div className="w-16 h-16 bg-[#B0D6FF] flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-[#0A2342]" />
                </div>
                
                <h4 className="text-xl font-semibold text-[#0A2342] mb-3">
                  {model.type}
                </h4>
                
                <p className="text-[#0A2342] text-opacity-80 mb-4">
                  {model.description}
                </p>
                
                <div className="bg-[#F5F7FA] border border-[#E6EAF0] p-3">
                  <p className="text-sm font-medium text-[#0A2342]">
                    Best for:
                  </p>
                  <p className="text-sm text-[#0A2342] text-opacity-70">
                    {model.bestFor}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-[#B0D6FF] py-8 text-center"
        >
          <p className="text-xl font-medium text-[#0A2342] mb-4">
            Get an exact quote for your specific needs
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#0A2342] px-8 py-3 font-semibold border-0 hover:bg-[#F5F7FA] transition-colors duration-200"
          >
            Request a Quote
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;