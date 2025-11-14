'use client';

import { motion } from 'framer-motion';
import { Shield, CreditCard, FileText, Heart, Building, CheckCircle } from 'lucide-react';

const InsuranceSection = () => {
  const insurancePartners = [
    {
      name: "Medicaid",
      description: "Coverage for eligible medical transportation needs",
      icon: Heart
    },
    {
      name: "Medicare",
      description: "Transportation benefits for qualified beneficiaries",
      icon: Shield
    },
    {
      name: "Private Insurance",
      description: "Direct billing with most major providers",
      icon: Building
    },
    {
      name: "VA Benefits",
      description: "Services for veterans and their families",
      icon: FileText
    }
  ];

  const paymentMethods = [
    { method: "Insurance Billing", description: "Direct billing to your insurance provider" },
    { method: "Credit/Debit Cards", description: "Visa, Mastercard, American Express" },
    { method: "Cash", description: "Exact change preferred" },
    { method: "Check", description: "Personal or cashier's checks accepted" },
    { method: "Payment Plans", description: "Flexible arrangements available" },
    { method: "Vouchers", description: "Accepted from approved organizations" }
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
            Insurance & Payment Options
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-[#0A2342] max-w-3xl mx-auto"
          >
            We work with most insurance providers and offer multiple payment options to make transportation accessible.
          </motion.p>
        </div>

        {/* Insurance Partners */}
        <div className="mb-16">
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold text-[#0A2342] mb-8 text-center"
          >
            Insurance We Accept
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {insurancePartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-[#E6EAF0] p-6 text-center hover:border-[#B0D6FF] transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-[#F5F7FA] border border-[#E6EAF0] flex items-center justify-center mx-auto mb-4">
                  <partner.icon className="w-8 h-8 text-[#0A2342]" />
                </div>
                
                <h4 className="text-xl font-semibold text-[#0A2342] mb-2">
                  {partner.name}
                </h4>
                
                <p className="text-[#0A2342] text-opacity-80">
                  {partner.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold text-[#0A2342] mb-8 text-center"
          >
            Payment Methods
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.method}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-[#E6EAF0] p-4 flex items-center space-x-4"
              >
                <CheckCircle className="w-5 h-5 text-[#B0D6FF] flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#0A2342]">{method.method}</p>
                  <p className="text-sm text-[#0A2342] text-opacity-70">{method.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Insurance Verification */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#F5F7FA] border border-[#E6EAF0] p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-[#0A2342] mb-4">
                Insurance Verification
              </h3>
              <p className="text-[#0A2342] text-opacity-80 mb-4">
                We'll help you verify your insurance coverage and understand your benefits. 
                Our team handles all the paperwork and communicates directly with your insurance provider.
              </p>
              <ul className="space-y-2">
                {[
                  "Free benefits verification",
                  "Pre-authorization assistance",
                  "Claims submission",
                  "Dedicated insurance specialist"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#B0D6FF] flex-shrink-0" />
                    <span className="text-[#0A2342]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#B0D6FF] flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-10 h-10 text-[#0A2342]" />
              </div>
              <p className="text-lg font-medium text-[#0A2342] mb-4">
                Need help with insurance?
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#B0D6FF] text-[#0A2342] px-6 py-3 font-semibold border-0 hover:bg-[#9BC9FF] transition-colors duration-200"
              >
                Contact Insurance Specialist
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InsuranceSection;