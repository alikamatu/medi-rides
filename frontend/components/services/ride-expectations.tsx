'use client';

import { motion } from 'framer-motion';
import { Clock, Phone, UserCheck, Car, Shield, MapPin } from 'lucide-react';

const RideExpectations = () => {
  const rideProcess = [
    {
      step: "1",
      icon: Phone,
      title: "Schedule Your Ride",
      description: "Book online or by phone with our 24/7 dispatch team",
      details: ["Provide pickup/drop-off details", "Share special requirements", "Receive confirmation"]
    },
    {
      step: "2",
      icon: Clock,
      title: "Vehicle Dispatch",
      description: "We assign the perfect vehicle for your needs",
      details: ["Appropriate vehicle selection", "Trained driver assignment", "ETA communication"]
    },
    {
      step: "3",
      icon: MapPin,
      title: "Pickup & Assistance",
      description: "Professional driver assistance at your location",
      details: ["On-time arrival", "Mobility assistance", "Vehicle preparation"]
    },
    {
      step: "4",
      icon: Car,
      title: "Safe Transportation",
      description: "Comfortable and secure ride to your destination",
      details: ["Smooth driving", "Safety protocols", "Clear communication"]
    },
    {
      step: "5",
      icon: UserCheck,
      title: "Destination Assistance",
      description: "Help upon arrival at your destination",
      details: ["Door-to-door service", "Check-in assistance", "Return trip coordination"]
    },
    {
      step: "6",
      icon: Shield,
      title: "Complete & Follow-up",
      description: "Service completion and feedback opportunity",
      details: ["Payment processing", "Service feedback", "Future booking setup"]
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
            What to Expect During Your Ride
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-[#0A2342] max-w-3xl mx-auto"
          >
            From booking to arrival, we ensure a smooth, comfortable, and professional transportation experience.
          </motion.p>
        </div>

        {/* Ride Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rideProcess.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-[#E6EAF0] p-6 hover:border-[#B0D6FF] transition-colors duration-300"
            >
              {/* Step Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-[#B0D6FF] flex items-center justify-center">
                  <span className="text-lg font-bold text-[#0A2342]">{step.step}</span>
                </div>
                <div className="w-12 h-12 bg-[#F5F7FA] border border-[#E6EAF0] flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-[#0A2342]" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-[#0A2342] mb-3">
                {step.title}
              </h3>

              <p className="text-[#0A2342] text-opacity-80 mb-4 leading-relaxed">
                {step.description}
              </p>

              <div className="space-y-2">
                {step.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-[#B0D6FF] flex-shrink-0" />
                    <span className="text-sm text-[#0A2342] text-opacity-70">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 bg-[#F5F7FA] border border-[#E6EAF0] p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-[#0A2342] mb-4">
                Your Comfort & Safety First
              </h3>
              <p className="text-[#0A2342] text-opacity-80 mb-4">
                Every aspect of our service is designed with your comfort and safety in mind. 
                Our drivers are trained professionals who understand the unique needs of medical transportation.
              </p>
              <ul className="space-y-2">
                {[
                  "CPR and First Aid certified drivers",
                  "Regular vehicle safety inspections",
                  "Sanitization between every ride",
                  "Temperature-controlled vehicles",
                  "Emergency protocols in place"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-[#B0D6FF] flex-shrink-0" />
                    <span className="text-[#0A2342]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-[#0A2342] mb-4">
                Preparation Tips
              </h3>
              <p className="text-[#0A2342] text-opacity-80 mb-4">
                Help us serve you better with these simple preparation tips for your ride.
              </p>
              <ul className="space-y-2">
                {[
                  "Have your insurance information ready",
                  "Notify us of any special equipment",
                  "Be ready 15 minutes before pickup time",
                  "Bring any necessary medications",
                  "Have emergency contact information available"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-[#B0D6FF] flex-shrink-0" />
                    <span className="text-[#0A2342]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RideExpectations;