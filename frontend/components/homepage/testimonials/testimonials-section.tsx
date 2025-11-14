'use client';

import { motion, Variants } from 'framer-motion';
import { Quote, Star, User, Heart, Shield, Clock } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      quote: "The drivers are incredibly professional and always on time. They make my weekly dialysis trips stress-free and comfortable.",
      name: "Robert Chen",
      role: "Dialysis Patient",
      rating: 5,
      icon: Heart
    },
    {
      id: 2,
      quote: "As a caregiver for my elderly mother, I rely on Compassionate Medi Rides for all her medical appointments. Their safety standards are exceptional.",
      name: "Sarah Johnson",
      role: "Family Caregiver",
      rating: 5,
      icon: User
    },
    {
      id: 3,
      quote: "The wheelchair accessibility is flawless. The ramps are smooth and the securement system makes me feel completely safe during every ride.",
      name: "Michael Torres",
      role: "Physical Therapy Patient",
      rating: 5,
      icon: Shield
    },
    {
      id: 4,
      quote: "I use their service for both medical appointments and personal errands. The reliability and punctuality are consistently excellent.",
      name: "Emily Watson",
      role: "Regular Client",
      rating: 4,
      icon: Clock
    },
    {
      id: 5,
      quote: "After my surgery, their drivers were incredibly patient and helpful. They truly understand medical transportation needs.",
      name: "James Wilson",
      role: "Post-Surgery Patient",
      rating: 5,
      icon: Heart
    },
    {
      id: 6,
      quote: "The peace of mind knowing my father is in safe hands is priceless. The communication and professionalism are outstanding.",
      name: "Lisa Martinez",
      role: "Family Member",
      rating: 5,
      icon: Shield
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? "text-[#B0D6FF] fill-current" 
            : "text-[#E6EAF0]"
        }`}
      />
    ));
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
            What Our Clients Say
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-xl text-[#0A2342] max-w-3xl"
          >
            Real feedback from patients, caregivers, and families who rely on our transportation services.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="bg-white border border-[#E6EAF0] p-6 hover:border-[#B0D6FF] transition-colors duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-6 h-6 text-[#B0D6FF]" />
              </div>

              {/* Testimonial Text */}
              <p className="text-[#0A2342] text-opacity-90 leading-relaxed mb-6">
                {testimonial.quote}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Client Info */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-[#F5F7FA] border border-[#E6EAF0] flex items-center justify-center">
                    <testimonial.icon className="w-5 h-5 text-[#0A2342]" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-[#0A2342]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[#0A2342] text-opacity-70">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicator Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mt-12 bg-[#F5F7FA] py-6 border border-[#E6EAF0]"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-[#0A2342] font-medium">
              Trusted by hundreds of patients and caregivers for safe, reliable medical transportation
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TestimonialsSection;