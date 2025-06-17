import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserContext } from '../context/UserContext';
import { ecoPointsService } from '../services/ecoPointsService';
import FlowPrompts from '../components/common/FlowPrompts';
import { BarChart2, ShoppingBag, Clock, Recycle, Gift, Loader, TrendingUp, Target, X, CheckCircle } from 'lucide-react';

const DashboardPage = () => {
  const { user, ecoPoints, addEcoPoints } = useContext(UserContext);
  const [rewards, setRewards] = useState([]);
  const [communityStats, setCommunityStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRewards, setShowRewards] = useState(false);
  const [showImpact, setShowImpact] = useState(false);
  const [redeemedReward, setRedeemedReward] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [rewardsData, communityData] = await Promise.all([
          ecoPointsService.getAvailableRewards(),
          ecoPointsService.getCommunityImpact()
        ]);
        
        setRewards(rewardsData);
        setCommunityStats(communityData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const handleRedeemReward = async (reward) => {
    if (ecoPoints < reward.pointsCost) {
      return;
    }

    try {
      const result = await ecoPointsService.redeemReward(user.id, reward.id);
      if (result.success) {
        // Deduct points (in a real app, this would be handled by the backend)
        await addEcoPoints(-reward.pointsCost);
        setRedeemedReward({ ...reward, code: result.redeemCode });
        setTimeout(() => setRedeemedReward(null), 5000);
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
    }
  };
  
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
        <p className="text-gray-600">
          You need to be signed in to view your dashboard.
        </p>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="h-8 w-8 text-teal-500 animate-spin" />
        <span className="ml-2 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Sustainability Dashboard</h1>
        <p className="text-gray-600">
          Track your impact, recycling history, and rewards.
        </p>
      </div>
      
      {/* Flow Prompt */}
      <FlowPrompts currentPage="dashboard" />
      
      {/* User Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <Recycle className="h-6 w-6 text-purple-600" />
          </div>
          <span className="text-2xl font-bold text-gray-900">{ecoPoints}</span>
          <span className="text-sm text-gray-600">Eco Points</span>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
            <ShoppingBag className="h-6 w-6 text-teal-600" />
          </div>
          <span className="text-2xl font-bold text-gray-900">{user.purchaseHistory?.length || 0}</span>
          <span className="text-sm text-gray-600">Mindful Purchases</span>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
          <span className="text-2xl font-bold text-gray-900">₹{user.impactStats?.moneySaved.toLocaleString()}</span>
          <span className="text-sm text-gray-600">Money Saved</span>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <BarChart2 className="h-6 w-6 text-green-600" />
          </div>
          <span className="text-2xl font-bold text-gray-900">{user.impactStats?.carbonSaved.toFixed(1)}kg</span>
          <span className="text-sm text-gray-600">CO₂ Saved</span>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="mb-8 flex flex-wrap gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowRewards(true)}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md font-medium hover:bg-purple-700 transition-colors flex items-center"
        >
          <Gift className="h-5 w-5 mr-2" />
          View Rewards
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowImpact(true)}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-md font-medium hover:bg-teal-700 transition-colors flex items-center"
        >
          <TrendingUp className="h-5 w-5 mr-2" />
          Track Impact
        </motion.button>
      </div>

      {/* Monthly Goals */}
      <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Target className="h-5 w-5 text-blue-600 mr-2" />
            Monthly Sustainability Goals
          </h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-teal-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">Recycling Goal</span>
                <span className="text-sm text-teal-600">7/10 items</span>
              </div>
              <div className="w-full bg-teal-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">3 more items to reach your monthly goal!</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">Sustainable Purchases</span>
                <span className="text-sm text-purple-600">3/5 items</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">2 more sustainable purchases to go!</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recycling History */}
      <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-teal-50 border-b border-teal-100">
          <h2 className="text-xl font-semibold text-gray-900">Recycling History</h2>
        </div>
        
        {user.recyclingHistory && user.recyclingHistory.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {user.recyclingHistory.map((record, index) => (
              <div key={index} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Recycle className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Recycled {record.material}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-teal-600">
                  +{record.points} points
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-8 text-center">
            <Recycle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Recycling Activity Yet</h3>
            <p className="text-gray-600 mb-4">
              Start recycling to earn eco-points and track your impact!
            </p>
          </div>
        )}
      </div>
      
      {/* Community Impact */}
      {communityStats && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <TrendingUp className="h-5 w-5 text-gray-600 mr-2" />
              Community Impact
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <span className="block text-2xl font-bold text-blue-700">
                  {(communityStats.totalRecycled.plastic + 
                    communityStats.totalRecycled.paper + 
                    communityStats.totalRecycled.glass +
                    communityStats.totalRecycled.metal + 
                    communityStats.totalRecycled.electronics).toLocaleString()} kg
                </span>
                <span className="text-sm text-blue-600">Total Waste Recycled</span>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <span className="block text-2xl font-bold text-green-700">
                  {communityStats.treesEquivalent.toLocaleString()}
                </span>
                <span className="text-sm text-green-600">Trees Saved</span>
              </div>
              
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <span className="block text-2xl font-bold text-amber-700">
                  {(communityStats.co2Saved / 1000).toFixed(1)} tons
                </span>
                <span className="text-sm text-amber-600">CO₂ Emissions Prevented</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Top Communities</h3>
              <div className="space-y-3">
                {communityStats.topCommunities.map((community, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">
                        {index + 1}. {community.name}
                      </span>
                      <span className="text-sm font-medium text-teal-600">
                        {community.points.toLocaleString()} points
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rewards Modal */}
      <AnimatePresence>
        {showRewards && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Available Rewards</h2>
                <button
                  onClick={() => setShowRewards(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-4 text-center">
                  <span className="text-lg font-medium text-gray-700">Your Balance: </span>
                  <span className="text-2xl font-bold text-purple-600">{ecoPoints} points</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rewards.map(reward => (
                    <div key={reward.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium text-gray-900">{reward.name}</h3>
                        <Gift className="h-5 w-5 text-purple-500" />
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 h-12">
                        {reward.description}
                      </p>
                      
                      <div className="mb-3">
                        <span className="text-xs text-green-600 font-medium">Value: {reward.value}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-purple-600">
                          {reward.pointsCost} points
                        </span>
                        
                        <button 
                          disabled={ecoPoints < reward.pointsCost}
                          onClick={() => handleRedeemReward(reward)}
                          className={`px-3 py-1.5 text-sm font-medium rounded ${
                            ecoPoints >= reward.pointsCost
                              ? 'bg-purple-600 text-white hover:bg-purple-700'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Redeem
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Impact Tracking Modal */}
      <AnimatePresence>
        {showImpact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full"
            >
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Your Environmental Impact</h2>
                <button
                  onClick={() => setShowImpact(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">
                      {user.impactStats?.carbonSaved.toFixed(1)}kg
                    </div>
                    <div className="text-sm text-blue-600">CO₂ Reduced</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">
                      {user.impactStats?.wasteReduced.toFixed(1)}kg
                    </div>
                    <div className="text-sm text-green-600">Waste Reduced</div>
                  </div>
                  
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-700">
                      ₹{user.impactStats?.moneySaved.toLocaleString()}
                    </div>
                    <div className="text-sm text-amber-600">Money Saved</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Impact Breakdown</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Your mindful shopping decisions have prevented {user.impactStats?.carbonSaved.toFixed(1)}kg of CO₂ emissions</p>
                    <p>• You've reduced waste by {user.impactStats?.wasteReduced.toFixed(1)}kg through conscious consumption</p>
                    <p>• Your sustainable choices have saved you ₹{user.impactStats?.moneySaved.toLocaleString()} compared to impulsive buying</p>
                    <p>• You've earned {ecoPoints} eco-points through recycling and sustainable actions</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reward Redeemed Notification */}
      <AnimatePresence>
        {redeemedReward && (
          <div className="fixed top-4 right-4 z-50">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-sm"
            >
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Reward Redeemed!</h4>
                  <p className="text-sm text-green-700 mt-1">
                    {redeemedReward.name} has been redeemed successfully.
                  </p>
                  <p className="text-xs text-green-600 mt-2 font-mono">
                    Code: {redeemedReward.code}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;