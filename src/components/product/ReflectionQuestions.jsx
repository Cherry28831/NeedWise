import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, HelpCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

const REFLECTION_QUESTIONS = [
  {
    id: 'q1',
    question: 'How often will you use this item?',
    options: ['Daily', 'Weekly', 'Monthly', 'Rarely']
  },
  {
    id: 'q2',
    question: 'Do you already own something that serves the same purpose?',
    options: ['Yes', 'No', 'Not sure']
  },
  {
    id: 'q3',
    question: 'Is this purchase based on an immediate need or a long-term one?',
    options: ['Immediate need', 'Long-term need', 'Want, not need']
  },
  {
    id: 'q4',
    question: 'Would waiting 48 hours change your decision to buy this?',
    options: ['Likely yes', 'Likely no', 'Not sure']
  }
];

const ReflectionQuestions = ({ product, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  
  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    
    if (currentQuestion < REFLECTION_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
      // Wait a moment to show completion animation before closing
      setTimeout(() => {
        onComplete(newAnswers);
      }, 1500);
    }
  };
  
  const question = REFLECTION_QUESTIONS[currentQuestion];
  
  const getRecommendation = () => {
    // Simple logic to determine if the purchase is recommended
    // In a real app, this would be more sophisticated
    if (answers.q2 === 'Yes' || answers.q4 === 'Likely yes') {
      return {
        recommended: false,
        message: 'Based on your answers, we suggest reconsidering this purchase.'
      };
    }
    
    if (answers.q1 === 'Daily' && answers.q3 === 'Long-term need') {
      return {
        recommended: true,
        message: 'This seems like a mindful purchase that will get good use.'
      };
    }
    
    return {
      recommended: 'neutral',
      message: 'Consider if this item truly aligns with your needs and values.'
    };
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      {!isComplete ? (
        <div>
          <div className="flex items-center mb-6">
            <HelpCircle className="text-purple-600 h-6 w-6 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Mindful Purchase Reflection</h3>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">
              Question {currentQuestion + 1} of {REFLECTION_QUESTIONS.length}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-purple-600 h-1.5 rounded-full"
                style={{ width: `${((currentQuestion + 1) / REFLECTION_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-700 mb-4">{question.question}</h4>
            
            <div className="space-y-2">
              {question.options.map((option) => (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(question.id, option)}
                  className="w-full text-left px-4 py-3 rounded-lg border border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-colors"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
          
          <p className="text-sm text-gray-500 italic">
            Taking time to reflect can lead to more mindful consumption decisions.
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="mx-auto mb-4"
          >
            <CheckCircle2 className="h-16 w-16 text-teal-600 mx-auto" />
          </motion.div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Thank you for reflecting!
          </h3>
          
          <div className="mb-6 p-4 rounded-lg bg-gray-50">
            {getRecommendation().recommended === true && (
              <div className="flex items-center text-green-700 mb-2">
                <ThumbsUp className="h-5 w-5 mr-2" />
                <span className="font-medium">Recommended Purchase</span>
              </div>
            )}
            
            {getRecommendation().recommended === false && (
              <div className="flex items-center text-red-700 mb-2">
                <ThumbsDown className="h-5 w-5 mr-2" />
                <span className="font-medium">Consider Alternatives</span>
              </div>
            )}
            
            {getRecommendation().recommended === 'neutral' && (
              <div className="flex items-center text-amber-700 mb-2">
                <HelpCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Worth More Thought</span>
              </div>
            )}
            
            <p className="text-gray-700">{getRecommendation().message}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ReflectionQuestions;