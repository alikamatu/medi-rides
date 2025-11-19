'use client';

import { motion } from 'framer-motion';
import { MapPin, Car, Calendar, CheckCircle2 } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  steps: Array<{ id: number; title: string; icon: any }>;
}

export default function ProgressIndicator({ currentStep, steps }: ProgressIndicatorProps) {
  return (
    <div className="flex justify-center mb-12">
      <div className="flex items-center space-x-8">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted || isCurrent ? '#2563eb' : '#e5e7eb',
                  color: isCompleted || isCurrent ? 'white' : '#9ca3af',
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 ${
                  isCompleted ? 'bg-blue-600 text-white' : 
                  isCurrent ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 
                  'bg-gray-200 text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </motion.div>

              {/* Step Title */}
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  isCompleted || isCurrent ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-4 ${
                  step.id < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}