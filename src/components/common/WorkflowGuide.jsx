import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserContext } from '../../context/UserContext';
import { ShoppingContext } from '../../context/ShoppingContext';
import { X, ArrowRight, ShoppingBag, Heart, Recycle, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkflowGuide = ({ isOpen, onClose, currentStep = 'welcome' }) => {
  const { user, ecoPoints } = useContext(UserContext);
  const { wishlist } = useContext(ShoppingContext);
  const [step, setStep] = useState(currentStep);

  const steps = {
    welcome: {
      title: "Welcome to NeedWise!",
      description: "Your journey to mindful consumption starts here. Let's explore how NeedWise helps you shop smart and live sustainably.",
      icon: <CheckCircle className="h-8 w-8 text-teal-600" />,
      actions: [
        { label: "Start Shopping Mindfully", action: () => setStep('shopping'), primary: true },
        { label: "Skip Tour", action: onClose }
      ]
    },
    shopping: {
      title: "Step 1: Mindful Shopping",
      description: "Browse our curated sustainable products. When you find something you like, add it to your wishlist for reflection.",
      icon: <ShoppingBag className="h-8 w-8 text-purple-600" />,
      actions: [
        { label: "Browse Products", link: "/shop", primary: true },
        { label: "Next: Reflection Process", action: () => setStep('reflection') }
      ]
    },
    reflection: {
      title: "Step 2: Reflection & Cool-down",
      description: "Answer thoughtful questions about your purchase intention. Then wait through a cool-down period to ensure it's a mindful decision.",
      icon: <Heart className="h-8 w-8 text-amber-600" />,
      actions: [
        { label: "View My Wishlist", link: "/wishlist", primary: true },
        { label: "Next: Earn Eco-Points", action: () => setStep('recycle') }
      ]
    },
    recycle: {
      title: "Step 3: Recycle & Earn",
      description: "After your purchases, use our smart recycling system to properly dispose of waste and earn eco-points for sustainable behavior.",
      icon: <Recycle className="h-8 w-8 text-green-600" />,
      actions: [
        { label: "Start Recycling", link: "/recycle", primary: true },
        { label: "Next: Rewards", action: () => setStep('rewards') }
      ]
    },
    rewards: {
      title: "Step 4: Redeem Rewards",
      description: "Use your earned eco-points to get discounts on sustainable products or donate to environmental causes.",
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      actions: [
        { label: "View Dashboard", link: "/dashboard", primary: true },
        { label: "Complete Tour", action: onClose }
      ]
    }
  };

  const currentStepData = steps[step];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            {currentStepData.icon}
            <h3 className="text-xl font-semibold text-gray-900 ml-3">
              {currentStepData.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          {currentStepData.description}
        </p>

        <div className="space-y-3">
          {currentStepData.actions.map((action, index) => (
            action.link ? (
              <Link
                key={index}
                to={action.link}
                onClick={onClose}
                className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium ${
                  action.primary
                    ? 'bg-teal-600 text-white hover:bg-teal-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {action.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            ) : (
              <button
                key={index}
                onClick={action.action}
                className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium ${
                  action.primary
                    ? 'bg-teal-600 text-white hover:bg-teal-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {action.label}
                {action.primary && <ArrowRight className="ml-2 h-4 w-4" />}
              </button>
            )
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-6 flex justify-center space-x-2">
          {Object.keys(steps).map((stepKey, index) => (
            <div
              key={stepKey}
              className={`w-2 h-2 rounded-full ${
                stepKey === step ? 'bg-teal-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WorkflowGuide;