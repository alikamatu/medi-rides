'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface WhyChooseUsFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  index: number;
}

const WhyChooseUsFeatureCard = ({ icon: Icon, title, description, image, index }: WhyChooseUsFeatureCardProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="bg-white border border-[#E6EAF0] group hover:border-[#B0D6FF] transition-colors duration-300"
    >
      {/* Image */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-48 overflow-hidden border-b-2 border-white"
      >
        <div 
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url(${image})` }}
        />
      </motion.div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-shrink-0">
            <Icon className="w-6 h-6 text-[#B0D6FF]" />
          </div>
          <h3 className="text-xl font-bold text-[#0A2342]">
            {title}
          </h3>
        </div>
        <p className="text-[#0A2342] text-opacity-80 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default WhyChooseUsFeatureCard;