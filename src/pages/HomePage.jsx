import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Recycle, BarChart2, ArrowRight, Heart, ShieldCheck, Play } from 'lucide-react';
import WorkflowGuide from '../components/common/WorkflowGuide';

const HomePage = () => {
  const [showWorkflowGuide, setShowWorkflowGuide] = useState(false);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-transparent to-teal-900/40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold leading-tight"
            >
              Shop mindfully, live sustainably with NeedWise
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-xl text-emerald-50"
            >
              The AI-powered platform that helps you make mindful purchasing decisions and rewards sustainable choices.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <button
                onClick={() => setShowWorkflowGuide(true)}
                className="px-6 py-3 bg-white text-emerald-600 rounded-lg shadow-md font-medium hover:bg-gray-50 transition-colors flex items-center"
              >
                <Play className="mr-2 h-5 w-5" />
                Take the Tour
              </button>
              <Link to="/shop" className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
                Start Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works - Enhanced Flow */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Journey to Mindful Living</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Follow our guided 4-step process to transform your consumption habits and earn rewards for sustainable choices.
            </p>
          </div>
          
          <div className="relative">
            {/* Flow Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 via-teal-200 to-green-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Step 1: Browse & Reflect */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md relative"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <ShoppingBag className="h-6 w-6 text-purple-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Browse & Add to Wishlist</h3>
                <p className="text-gray-600 text-center mb-4">
                  Discover sustainable products and add items you're considering to your wishlist for reflection.
                </p>
                <Link to="/shop" className="block w-full text-center py-2 px-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
                  Start Browsing
                </Link>
              </motion.div>
              
              {/* Step 2: Reflect & Wait */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md relative"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Heart className="h-6 w-6 text-amber-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Reflect & Cool-down</h3>
                <p className="text-gray-600 text-center mb-4">
                  Answer thoughtful questions and wait through a cooling-off period to ensure mindful decisions.
                </p>
                <Link to="/wishlist" className="block w-full text-center py-2 px-4 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors text-sm font-medium">
                  View Wishlist
                </Link>
              </motion.div>
              
              {/* Step 3: Recycle & Earn */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md relative"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Recycle className="h-6 w-6 text-teal-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Recycle & Earn Points</h3>
                <p className="text-gray-600 text-center mb-4">
                  Use our smart recycling system to properly dispose of waste and earn eco-points.
                </p>
                <Link to="/recycle" className="block w-full text-center py-2 px-4 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors text-sm font-medium">
                  Start Recycling
                </Link>
              </motion.div>
              
              {/* Step 4: Redeem Rewards */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md relative"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <BarChart2 className="h-6 w-6 text-green-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Track & Redeem</h3>
                <p className="text-gray-600 text-center mb-4">
                  Monitor your impact and redeem eco-points for sustainable rewards and discounts.
                </p>
                <Link to="/dashboard" className="block w-full text-center py-2 px-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                  View Dashboard
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-12 md:py-16 md:px-12">
              <div className="md:flex md:items-center md:justify-between">
                <div className="md:w-8/12">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Ready to start your mindful shopping journey?
                  </h2>
                  <p className="mt-3 text-emerald-100">
                    Join thousands of users making more sustainable choices and reducing waste.
                  </p>
                </div>
                <div className="mt-8 md:mt-0 flex space-x-4">
                  <button
                    onClick={() => setShowWorkflowGuide(true)}
                    className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-colors"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Take Tour
                  </button>
                  <Link to="/shop" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-emerald-700 bg-white hover:bg-emerald-50 transition-colors shadow-sm">
                    Start Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Community Impact</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Together, our users are making a significant difference in reducing waste and promoting sustainability.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">8,500+</div>
              <div className="text-gray-500 mt-1">Mindful Purchases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">15.2 tons</div>
              <div className="text-gray-500 mt-1">Waste Recycled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">$42,000</div>
              <div className="text-gray-500 mt-1">Money Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">1,200+</div>
              <div className="text-gray-500 mt-1">Trees Planted</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Navigation */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/shop" className="block group">
              <div className="flex items-center p-5 border border-gray-200 rounded-lg group-hover:border-emerald-300 group-hover:bg-emerald-50 transition-colors">
                <ShoppingBag className="h-8 w-8 text-emerald-500 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">Browse Shop</h3>
                  <p className="text-sm text-gray-600">Discover sustainable products</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 ml-auto transition-colors" />
              </div>
            </Link>
            
            <Link to="/recycle" className="block group">
              <div className="flex items-center p-5 border border-gray-200 rounded-lg group-hover:border-purple-300 group-hover:bg-purple-50 transition-colors">
                <Recycle className="h-8 w-8 text-purple-500 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">Recycle & Earn</h3>
                  <p className="text-sm text-gray-600">Convert waste to rewards</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 ml-auto transition-colors" />
              </div>
            </Link>
            
            <Link to="/dashboard" className="block group">
              <div className="flex items-center p-5 border border-gray-200 rounded-lg group-hover:border-amber-300 group-hover:bg-amber-50 transition-colors">
                <BarChart2 className="h-8 w-8 text-amber-500 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">Your Dashboard</h3>
                  <p className="text-sm text-gray-600">Track your sustainable impact</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-amber-600 ml-auto transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Workflow Guide Modal */}
      <WorkflowGuide 
        isOpen={showWorkflowGuide} 
        onClose={() => setShowWorkflowGuide(false)} 
      />
    </div>
  );
};

export default HomePage;