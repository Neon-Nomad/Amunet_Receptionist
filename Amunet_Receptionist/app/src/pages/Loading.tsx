import React from 'react';
import { motion } from 'framer-motion';
import { BRAND } from '@/utils/constants';

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <img src={BRAND.logo} alt={BRAND.name} className="h-16 mx-auto mb-6" />
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading...</p>
      </motion.div>
    </div>
  );
};

export default Loading;