import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { ShoppingContext } from '../../context/ShoppingContext';
import { ArrowRight, Heart, Recycle, Award, ShoppingBag } from 'lucide-react';

const FlowPrompts = ({ currentPage }) => {
  const { ecoPoints } = useContext(UserContext);
  const { wishlist } = useContext(ShoppingContext);

  const getPromptForPage = () => {
    switch (currentPage) {
      case 'shop':
        return {
          title: "Found something you like?",
          description: "Add it to your wishlist to start the mindful reflection process.",
          action: { label: "View Wishlist", link: "/wishlist", icon: <Heart className="h-4 w-4" /> },
          stats: wishlist.length > 0 ? `${wishlist.length} items in wishlist` : null
        };
      
      case 'wishlist':
        const completedReflections = wishlist.filter(item => item.reflectionAnswered).length;
        const activeTimers = wishlist.filter(item => new Date() < new Date(item.coolDownEnds)).length;
        
        return {
          title: activeTimers > 0 ? "Reflection in progress..." : "Ready to earn eco-points?",
          description: activeTimers > 0 
            ? "While you wait, why not recycle some items and earn eco-points?"
            : "Start recycling to earn points for sustainable rewards!",
          action: { label: "Start Recycling", link: "/recycle", icon: <Recycle className="h-4 w-4" /> },
          stats: `${ecoPoints} eco-points earned`
        };
      
      case 'recycle':
        return {
          title: "Great job recycling!",
          description: "Check your dashboard to see your impact and redeem rewards.",
          action: { label: "View Dashboard", link: "/dashboard", icon: <Award className="h-4 w-4" /> },
          stats: `${ecoPoints} eco-points available`
        };
      
      case 'dashboard':
        return {
          title: "Continue your sustainable journey",
          description: "Discover more eco-friendly products to add to your collection.",
          action: { label: "Browse Products", link: "/shop", icon: <ShoppingBag className="h-4 w-4" /> },
          stats: null
        };
      
      default:
        return null;
    }
  };

  const prompt = getPromptForPage();
  
  if (!prompt) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-teal-50 to-purple-50 border border-teal-100 rounded-lg p-4 mb-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">{prompt.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{prompt.description}</p>
          {prompt.stats && (
            <p className="text-xs text-teal-600 font-medium">{prompt.stats}</p>
          )}
        </div>
        <Link
          to={prompt.action.link}
          className="ml-4 flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
        >
          {prompt.action.icon}
          <span className="ml-2">{prompt.action.label}</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default FlowPrompts;