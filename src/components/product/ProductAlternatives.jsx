import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SustainabilityBadge from './SustainabilityBadge';

const ProductAlternatives = ({ product, alternatives }) => {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <div className="my-8">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Sustainable Alternatives</h3>
        <div className="flex-grow ml-3 border-t border-gray-200"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {alternatives.map((alt) => (
          <motion.div
            key={alt.id}
            whileHover={{ y: -5 }}
            className="relative bg-white overflow-hidden rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex md:flex-row flex-col h-full">
              <div className="w-full md:w-1/3 relative">
                <img 
                  src={alt.image} 
                  alt={alt.name} 
                  className="w-full h-full object-cover md:h-36 h-48"
                />
                <div className="absolute top-2 right-2">
                  <SustainabilityBadge rating={alt.sustainability} />
                </div>
              </div>
              
              <div className="p-4 flex flex-col flex-grow md:w-2/3">
                <div className="flex justify-between items-start">
                  <h4 className="text-md font-medium text-gray-900">{alt.name}</h4>
                  <span className="font-semibold text-purple-700">₹{alt.price.toLocaleString()}</span>
                </div>
                
                <p className="text-sm text-gray-600 mt-1 mb-2 flex-grow">
                  {alt.comparison}
                </p>
                
                <div className="mt-auto flex justify-end">
                  <Link to={`/product/${alt.id}`} className="flex items-center text-teal-600 text-sm font-medium hover:text-teal-800 transition-colors">
                    View Details
                    <ArrowRightCircle className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductAlternatives;