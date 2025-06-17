import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingContext } from '../../context/ShoppingContext';
import { NotificationContext } from '../../context/NotificationContext';
import { Heart, ShoppingCart, Sparkles } from 'lucide-react';
import SustainabilityBadge from './SustainabilityBadge';

const ProductCard = ({ product }) => {
  const { addToWishlist, addToCart, wishlist } = useContext(ShoppingContext);
  const { addNotification } = useContext(NotificationContext);
  const isInWishlist = wishlist.some(item => item.id === product.id);
  
  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist) {
      addNotification({
        type: 'info',
        message: 'This item is already in your wishlist. Visit your wishlist to continue the reflection process.'
      });
      return;
    }
    
    addToWishlist(product);
  };
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-0 right-0 p-2">
            <SustainabilityBadge rating={product.sustainability} />
          </div>
          {product.sustainability >= 4.0 && (
            <div className="absolute top-2 left-2">
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                Eco Choice
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{product.name}</h3>
            <span className="font-semibold text-purple-700">₹{product.price.toLocaleString()}</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800">
              {product.category}
            </span>
            
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToWishlist}
                className={`p-2 rounded-full ${isInWishlist ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-500'}`}
                title={isInWishlist ? 'Already in wishlist' : 'Add to wishlist for reflection'}
              >
                <Heart className="h-4 w-4" fill={isInWishlist ? "currentColor" : "none"} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-500"
                title="Add to cart"
              >
                <ShoppingCart className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;