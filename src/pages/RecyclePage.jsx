import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserContext } from '../context/UserContext';
import { ecoPointsService } from '../services/ecoPointsService';
import SmartBinSimulator from '../components/recycle/SmartBinSimulator';
import FlowPrompts from '../components/common/FlowPrompts';
import { Recycle, Award, MapPin, User, Search, TrendingUp } from 'lucide-react';

const RecyclePage = () => {
  const { ecoPoints } = useContext(UserContext);
  const [communityStats, setCommunityStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const data = await ecoPointsService.getCommunityImpact();
        setCommunityStats(data);
      } catch (error) {
        console.error('Error fetching community data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCommunityData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recycle & Earn Rewards</h1>
        <p className="text-gray-600">
          Turn your waste into rewards with our smart recycling system. Proper disposal earns you eco-points!
        </p>
      </div>
      
      {/* Flow Prompt */}
      <FlowPrompts currentPage="recycle" />
      
      {/* User Points Summary */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="mb-4 sm:mb-0 sm:mr-8">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <Recycle className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-white">Your Eco Points Balance</h2>
              <p className="text-teal-100 mb-1">Keep recycling to earn more points and rewards!</p>
              <div className="text-4xl font-bold text-white">{ecoPoints} points</div>
            </div>
            
            <div className="mt-6 sm:mt-0 sm:ml-auto flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-white text-teal-700 rounded-lg shadow font-medium hover:bg-teal-50 transition-colors flex items-center"
              >
                <Award className="h-5 w-5 mr-2" />
                View Rewards
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors flex items-center"
              >
                <TrendingUp className="h-5 w-5 mr-2" />
                Track Impact
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recycling Simulator */}
        <div className="lg:col-span-2">
          <SmartBinSimulator />
        </div>
        
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Recycle Centers Near Me */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-purple-50 border-b border-purple-100">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 text-purple-500 mr-2" />
                Recycling Centers Near Me
              </h3>
            </div>
            
            <div className="p-6">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Enter your location..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                  <h4 className="font-medium text-gray-900">Green Valley Recycling Center</h4>
                  <p className="text-sm text-gray-600">123 MG Road, Koramangala, Bangalore</p>
                  <div className="mt-2 text-xs text-gray-500">3.7 km away</div>
                </div>
                
                <div className="p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                  <h4 className="font-medium text-gray-900">EcoDrop Collection Point</h4>
                  <p className="text-sm text-gray-600">456 HSR Layout, Sector 2, Bangalore</p>
                  <div className="mt-2 text-xs text-gray-500">6.1 km away</div>
                </div>
                
                <div className="p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                  <h4 className="font-medium text-gray-900">Swachh Bharat Depot</h4>
                  <p className="text-sm text-gray-600">789 Indiranagar, 100 Feet Road, Bangalore</p>
                  <div className="mt-2 text-xs text-gray-500">8.2 km away</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Community Stats */}
          {!loading && communityStats && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-amber-50 border-b border-amber-100">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <User className="h-5 w-5 text-amber-500 mr-2" />
                  Community Impact
                </h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Recycled</span>
                    <span className="font-semibold text-gray-900">
                      {(communityStats.totalRecycled.plastic + 
                        communityStats.totalRecycled.paper + 
                        communityStats.totalRecycled.glass +
                        communityStats.totalRecycled.metal + 
                        communityStats.totalRecycled.electronics).toLocaleString()} kg
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trees Saved</span>
                    <span className="font-semibold text-gray-900">
                      {communityStats.treesEquivalent.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">CO₂ Prevented</span>
                    <span className="font-semibold text-gray-900">
                      {(communityStats.co2Saved / 1000).toFixed(1)} tons
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Top Community</h4>
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">
                          {communityStats.topCommunities[0].name}
                        </span>
                        <span className="text-sm font-medium text-amber-600">
                          {communityStats.topCommunities[0].points.toLocaleString()} points
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecyclePage;