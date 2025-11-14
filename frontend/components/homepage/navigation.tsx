'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Phone, Calendar, Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: null },
    { name: 'Services', href: '/services', icon: Calendar },
    { name: 'Medical Appointments', href: '#appointments', icon: Calendar },
    { name: 'Non-Medical Occasions', href: '#non-medical', icon: Car },
    { name: 'Contact', href: '#contact', icon: Phone },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-white'
      } border-b border-[#E6EAF0]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-[#B0D6FF] flex items-center justify-center">
                <Car className="w-5 h-5 text-[#0A2342]" />
              </div>
              <span className="text-xl font-semibold text-[#0A2342]">
                Compassionate Medi Rides
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-1.5 text-[#0A2342] hover:text-[#B0D6FF] transition-colors duration-200 font-medium"
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#B0D6FF] text-white px-6 py-2.5 font-semibold transition-colors duration-200 hover:bg-[#9BC9FF] border-0"
            >
              Book a Ride
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#0A2342] hover:bg-gray-50 border-0"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-[#E6EAF0]"
          >
            <div className="px-4 py-4 space-y-0">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 p-3 text-[#0A2342] hover:bg-gray-50 font-medium border-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#B0D6FF] text-white py-3 font-semibold mt-4 border-0"
              >
                Book a Ride
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;