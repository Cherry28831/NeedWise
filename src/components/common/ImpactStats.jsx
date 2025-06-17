import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Droplet, Wind, Trees as Tree } from 'lucide-react';

const ImpactStats = ({ stats }) => {
  if (!stats) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-teal-50 border-b border-teal-100">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <TrendingUp className="h-5 w-5 text-teal-500 mr-2" />
          Your Environmental Impact
        </h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-blue-50 rounded-lg p-4 text-center"
          >
            <Droplet className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {stats.waterSaved ? `${stats.waterSaved.toLocaleString()}L` : 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Water Saved</div>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gray-50 rounded-lg p-4 text-center"
          >
            <Wind className="h-8 w-8 text-gray-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {stats.carbonSaved ? `${stats.carbonSaved.toLocaleString()}kg` : 'N/A'}
            </div>
            <div className="text-sm text-gray-600">CO₂ Reduction</div>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-green-50 rounded-lg p-4 text-center"
          >
            <Tree className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {stats.treesEquivalent ? stats.treesEquivalent.toLocaleString() : 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Tree Equivalent</div>
          </motion.div>
        </div>
        
        <div className="mt-6 p-4 rounded-lg bg-gray-50 text-sm text-gray-600">
          <p>
            <strong>How we calculate this:</strong> These figures are based on your sustainable product choices
            and recycling activities compared to conventional alternatives. The more eco-friendly products you choose
            and the more you recycle, the greater your positive impact!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;