import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { UserContext } from '../../context/UserContext';
import { NotificationContext } from '../../context/NotificationContext';
import { ecoPointsService } from '../../services/ecoPointsService';
import { Recycle, Upload, Check } from 'lucide-react';

const WASTE_TYPES = [
  { id: 'plastic', name: 'Plastic', color: 'text-blue-500' },
  { id: 'paper', name: 'Paper', color: 'text-yellow-600' },
  { id: 'glass', name: 'Glass', color: 'text-green-500' },
  { id: 'metal', name: 'Metal', color: 'text-gray-500' },
  { id: 'electronics', name: 'Electronics', color: 'text-red-500' }
];

const SmartBinSimulator = () => {
  const [selectedWaste, setSelectedWaste] = useState(null);
  const [weight, setWeight] = useState(1);
  const [isDropping, setIsDropping] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [recyclingRates, setRecyclingRates] = useState({});
  
  const { user, addEcoPoints } = useContext(UserContext);
  const { addNotification } = useContext(NotificationContext);
  
  // Fetch recycling rates on mount
  React.useEffect(() => {
    ecoPointsService.getRecyclingRates()
      .then(rates => {
        setRecyclingRates(rates);
      })
      .catch(error => {
        console.error('Error fetching recycling rates:', error);
      });
  }, []);
  
  const handleRecycle = async () => {
    if (!selectedWaste) {
      addNotification({
        type: 'warning',
        message: 'Please select a waste type.'
      });
      return;
    }
    
    setIsDropping(true);
    
    // Simulate the recycling process
    setTimeout(async () => {
      try {
        const record = await ecoPointsService.recordRecycling(user.id, selectedWaste.id, weight);
        await addEcoPoints(record.points);
        
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setIsDropping(false);
          setSelectedWaste(null);
          setWeight(1);
        }, 2000);
        
        addNotification({
          type: 'success',
          message: `You've earned ${record.points} eco-points for recycling ${weight}kg of ${selectedWaste.name.toLowerCase()}!`
        });
      } catch (error) {
        console.error('Error recycling:', error);
        setIsDropping(false);
        addNotification({
          type: 'error',
          message: 'There was an error processing your recycling. Please try again.'
        });
      }
    }, 2000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
        <h3 className="text-white text-lg font-semibold flex items-center">
          <Recycle className="h-5 w-5 mr-2" />
          Smart Bin Simulator
        </h3>
        <p className="text-teal-100 text-sm">
          Recycle items to earn eco-points
        </p>
      </div>
      
      <div className="p-6">
        {!isDropping ? (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Waste Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {WASTE_TYPES.map(waste => (
                  <motion.button
                    key={waste.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`py-2 px-3 rounded-lg border transition-colors ${
                      selectedWaste?.id === waste.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedWaste(waste)}
                  >
                    <div className={`text-center ${waste.color}`}>
                      <Recycle className="h-6 w-6 mx-auto mb-1" />
                      <span className="text-sm font-medium text-gray-800">
                        {waste.name}
                      </span>
                      {recyclingRates[waste.id] && (
                        <div className="text-xs text-gray-500 mt-1">
                          {recyclingRates[waste.id]} pts/kg
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approximate Weight (kg)
              </label>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.1 kg</span>
                <span className="font-medium text-teal-600">{weight} kg</span>
                <span>10 kg</span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!selectedWaste}
                onClick={handleRecycle}
                className={`px-6 py-3 rounded-lg shadow-sm flex items-center justify-center ${
                  selectedWaste
                    ? 'bg-teal-600 hover:bg-teal-700 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Upload className="h-5 w-5 mr-2" />
                <span>Recycle Now</span>
              </motion.button>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>How it works:</strong> In real life, our smart bins use sensors to identify recyclable 
                materials. For this demo, simply select the type and weight of your recyclables.
              </p>
            </div>
          </>
        ) : (
          <div className="py-8">
            {!isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="relative mx-auto w-32 h-40 mb-6">
                  {/* Smart Bin */}
                  <div className="absolute inset-0 bg-gray-200 rounded-t-lg border-2 border-gray-300"></div>
                  <div className="absolute top-0 left-0 right-0 h-10 bg-teal-500 rounded-t-lg flex items-center justify-center">
                    <Recycle className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Recycling Animation */}
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ 
                      y: [
                        -50, // Start above
                        0,   // Move to top of bin
                        30   // Drop into bin
                      ],
                      opacity: [
                        1,   // Visible
                        1,   // Still visible
                        0    // Disappear as it drops in
                      ]
                    }}
                    transition={{ 
                      duration: 1.5,
                      times: [0, 0.4, 1]
                    }}
                    className={`absolute w-10 h-10 rounded-md left-11 flex items-center justify-center ${selectedWaste ? selectedWaste.color : 'text-blue-500'}`}
                  >
                    <Recycle className="h-6 w-6" />
                  </motion.div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Processing Recyclables...
                </h3>
                <p className="text-gray-600">
                  Our smart sensors are identifying your materials.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="mx-auto mb-4 bg-green-100 rounded-full p-4 w-20 h-20 flex items-center justify-center"
                >
                  <Check className="h-10 w-10 text-green-600" />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Recycling Successful!
                </h3>
                <p className="text-green-600 font-medium">
                  {Math.round(recyclingRates[selectedWaste.id] * weight)} eco-points added to your account.
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartBinSimulator;