import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ShieldAlert, ShieldCheck, Settings } from 'lucide-react';

const CooldownTimer = ({ endTime, onComplete, onUpdateCooldown }) => {
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [selectedHours, setSelectedHours] = useState(24);
  
  const calculateTimeLeft = () => {
    const difference = new Date(endTime) - new Date();
    
    if (difference <= 0) {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0
      };
    }
    
    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
      
      if (updated.total <= 0) {
        onComplete && onComplete();
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [endTime, onComplete]);

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };
  
  const calculateProgress = () => {
    const fullDuration = selectedHours * 60 * 60 * 1000;
    const elapsed = fullDuration - timeLeft.total;
    return Math.min(100, Math.max(0, (elapsed / fullDuration) * 100));
  };
  
  const handleTimeUpdate = () => {
    const newEndTime = new Date(Date.now() + selectedHours * 60 * 60 * 1000);
    onUpdateCooldown && onUpdateCooldown(newEndTime);
    setIsEditingTime(false);
  };
  
  const progressPercentage = calculateProgress();
  
  if (timeLeft.total <= 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center"
      >
        <ShieldCheck className="h-6 w-6 text-green-600 mr-3" />
        <div>
          <h4 className="font-medium text-green-800">Reflection Period Complete</h4>
          <p className="text-sm text-green-600">
            You've completed the waiting period! You can now make a mindful decision.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-purple-50 border border-purple-100 rounded-lg p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <ShieldAlert className="h-6 w-6 text-purple-600 mr-2" />
          <h4 className="font-medium text-purple-800">Mindful Shopping Timer</h4>
        </div>
        <button
          onClick={() => setIsEditingTime(!isEditingTime)}
          className="p-2 rounded-full hover:bg-purple-100 transition-colors"
        >
          <Settings className="h-5 w-5 text-purple-600" />
        </button>
      </div>
      
      {isEditingTime ? (
        <div className="mb-4">
          <label className="block text-sm text-purple-700 mb-2">
            Adjust reflection period (hours):
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              min="1"
              max="72"
              value={selectedHours}
              onChange={(e) => setSelectedHours(Math.min(72, Math.max(1, parseInt(e.target.value) || 1)))}
              className="block w-24 px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleTimeUpdate}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Update
            </button>
          </div>
          <p className="text-xs text-purple-600 mt-1">
            You can set between 1 and 72 hours for reflection.
          </p>
        </div>
      ) : (
        <p className="text-sm text-purple-600 mb-3">
          Your cooling-off period helps prevent impulsive purchases. Wait a little longer to make a mindful decision.
        </p>
      )}
      
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-purple-500 mr-2" />
          <span className="text-lg font-semibold text-purple-800">
            {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
          </span>
        </div>
        <span className="text-sm text-purple-600">{progressPercentage.toFixed(0)}% complete</span>
      </div>
      
      <div className="w-full bg-purple-200 rounded-full h-2">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
          className="h-2 rounded-full bg-purple-600"
        ></motion.div>
      </div>
      
      <p className="mt-3 text-sm text-purple-500 italic">
        By waiting, you've already joined 70% of our users who made more sustainable choices!
      </p>
    </motion.div>
  );
};

export default CooldownTimer;