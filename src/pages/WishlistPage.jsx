import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingContext } from '../context/ShoppingContext';
import { UserContext } from '../context/UserContext';
import CooldownTimer from '../components/product/CooldownTimer';
import FlowPrompts from '../components/common/FlowPrompts';
import { Clock, Heart, ShoppingCart, Trash2, ArrowRight, ShoppingBag, Recycle } from 'lucide-react';
import SustainabilityBadge from '../components/product/SustainabilityBadge';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart, updateCooldownTime } = useContext(ShoppingContext);
  const { ecoPoints } = useContext(UserContext);
  
  const handleCooldownComplete = (productId) => {
    // Update the wishlist item to show that cooldown is complete
    console.log("Cooldown complete for product:", productId);
  };
  
  const handleUpdateCooldown = (productId, newEndTime) => {
    updateCooldownTime(productId, newEndTime);
  };
  
  const activeTimers = wishlist.filter(item => new Date() < new Date(item.coolDownEnds)).length;
  const completedReflections = wishlist.filter(item => item.reflectionAnswered).length;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600">
          Items you're considering. Take your time and make mindful decisions.
        </p>
        
        {/* Eco Points Display */}
        {wishlist.length > 0 && (
          <div className="mt-4 flex items-center justify-between bg-teal-50 border border-teal-100 rounded-lg p-4">
            <div className="flex items-center">
              <Recycle className="h-5 w-5 text-teal-600 mr-2" />
              <span className="text-sm text-teal-800">
                You have <strong>{ecoPoints} eco-points</strong> available for sustainable rewards
              </span>
            </div>
            <Link 
              to="/recycle" 
              className="text-sm font-medium text-teal-600 hover:text-teal-800 flex items-center"
            >
              Earn More Points
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
      
      {/* Flow Prompt */}
      <FlowPrompts currentPage="wishlist" />
      
      {wishlist.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-6">
            Add items to your wishlist to think about them before purchasing. This helps you make more mindful buying decisions.
          </p>
          <Link to="/shop" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          {/* Wishlist Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reflection Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{wishlist.length}</div>
                <div className="text-sm text-purple-700">Total Items</div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">{activeTimers}</div>
                <div className="text-sm text-amber-700">Active Timers</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{completedReflections}</div>
                <div className="text-sm text-green-700">Ready to Purchase</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence>
              {wishlist.map(item => {
                const cooldownActive = new Date() < new Date(item.coolDownEnds);
                const canAddToCart = !cooldownActive && item.reflectionAnswered;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="md:flex">
                      {/* Product Image */}
                      <div className="md:w-1/4 relative">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 md:h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <SustainabilityBadge rating={item.sustainability} />
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="md:w-3/4 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link to={`/product/${item.id}`} className="text-xl font-semibold text-gray-900 hover:text-teal-600">
                              {item.name}
                            </Link>
                            <p className="text-lg font-medium text-purple-700 mt-1">
                              ₹{item.price.toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-gray-400 hover:text-red-500 p-2"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <p className="text-gray-600 mt-2 mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        
                        {/* Cooldown Timer or Actions */}
                        <div className="mt-4">
                          {cooldownActive ? (
                            <CooldownTimer 
                              endTime={item.coolDownEnds} 
                              onComplete={() => handleCooldownComplete(item.id)}
                              onUpdateCooldown={(newEndTime) => handleUpdateCooldown(item.id, newEndTime)}
                            />
                          ) : (
                            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                              {!item.reflectionAnswered && (
                                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 md:w-2/3">
                                  <div className="flex items-start">
                                    <Clock className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <h4 className="font-medium text-amber-800">Reflection Needed</h4>
                                      <p className="text-sm text-amber-700">
                                        Please visit the product page to answer reflection questions.
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <Link to={`/product/${item.id}`} className="mt-2 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-800">
                                    Complete Reflection
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                  </Link>
                                </div>
                              )}
                              
                              <div className="flex md:w-1/3 space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => addToCart(item)}
                                  disabled={!canAddToCart}
                                  className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center ${
                                    canAddToCart
                                      ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                  }`}
                                >
                                  <ShoppingCart className="h-5 w-5 mr-1" />
                                  <span>Add to Cart</span>
                                </motion.button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage;