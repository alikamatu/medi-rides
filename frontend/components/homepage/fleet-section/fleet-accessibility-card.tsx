'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FleetAccessibilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  index: number;
  features?: string[];
}

const FleetAccessibilityCard = ({ 
  icon: Icon, 
  title, 
  description, 
  image, 
  index,
  features = []
}: FleetAccessibilityCardProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="bg-white border border-[#E6EAF0] group hover:border-[#B0D6FF] transition-colors duration-300"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden border-b border-[#E6EAF0]">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full h-64 bg-gray-100"
        >
          <div 
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url(${image})` }}
          />
        </motion.div>
        
        {/* Icon Overlay */}
        <div className="absolute top-4 left-4 bg-white p-2 border border-[#E6EAF0]">
          <Icon className="w-5 h-5 text-[#0A2342]" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#0A2342] mb-3">
          {title}
        </h3>
        <p className="text-[#0A2342] text-opacity-80 leading-relaxed mb-4">
          {description}
        </p>
        
        {/* Feature List */}
        {features.length > 0 && (
          <div className="space-y-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-sm">
                <div className="w-1.5 h-1.5 bg-[#B0D6FF] flex-shrink-0" />
                <span className="text-[#0A2342] text-opacity-70">{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FleetAccessibilityCard;