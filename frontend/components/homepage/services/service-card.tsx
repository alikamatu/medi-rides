'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  index: number;
}

const ServiceCard = ({ icon: Icon, title, description, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ y: 14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="bg-white border-0 border-l-4 border-[#B0D6FF] hover:bg-[#F5F7FA] transition-colors duration-200"
    >
      <div className="flex items-start space-x-4 p-6">
        <div className="flex-shrink-0">
          <Icon className="w-6 h-6 text-[#0A2342]" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#0A2342] mb-1">{title}</h3>
          {description && (
            <p className="text-[#0A2342] text-opacity-80">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;