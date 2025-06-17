import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const SustainabilityBadge = ({ rating }) => {
  // Determine color based on rating
  const getColor = () => {
    if (rating >= 4.5) return 'bg-green-100 text-green-800';
    if (rating >= 3.5) return 'bg-lime-100 text-lime-800';
    if (rating >= 2.5) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  const getLeafColor = () => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-lime-600';
    if (rating >= 2.5) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getColor()}`}
    >
      <Leaf className={`h-3 w-3 ${getLeafColor()}`} />
      <span className="text-xs font-medium">{rating.toFixed(1)}</span>
    </motion.div>
  );
};

export default SustainabilityBadge;