'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface NonMedicalServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const NonMedicalServiceCard = ({ icon: Icon, title, description, index }: NonMedicalServiceCardProps) => {
  return (
    <motion.div
      initial={{ y: 14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="bg-white border-0 border-l-4 border-[#B0D6FF] hover:bg-[#F5F7FA] transition-colors duration-200 group"
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">
            <Icon className="w-6 h-6 text-[#0A2342] group-hover:text-[#B0D6FF] transition-colors duration-200" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#0A2342] mb-2">
              {title}
            </h3>
            <p className="text-[#0A2342] text-opacity-80 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NonMedicalServiceCard;