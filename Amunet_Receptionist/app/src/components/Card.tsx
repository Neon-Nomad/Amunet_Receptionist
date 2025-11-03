import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  const Component = hover ? motion.div : 'div';
  
  return (
    <Component
      className={`bg-dark-800 border border-dark-600 rounded-xl p-6 ${className}`}
      {...(hover && {
        whileHover: { scale: 1.02 },
        transition: { duration: 0.2 }
      })}
    >
      {children}
    </Component>
  );
};