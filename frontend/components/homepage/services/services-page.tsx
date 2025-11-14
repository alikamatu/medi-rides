'use client';

import { motion } from 'framer-motion';
import PageHeader from './page-header';
import ServicesGrid from './services-grid';
import CTABanner from './cta-banner';

const ServicesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <PageHeader />
      <ServicesGrid />
      <CTABanner />
    </motion.div>
  );
};

export default ServicesPage;