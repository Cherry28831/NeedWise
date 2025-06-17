import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationContext } from '../../context/NotificationContext';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

const NotificationCenter = () => {
  const { notifications, removeNotification } = useContext(NotificationContext);

  if (!notifications.length) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-100';
      case 'error':
        return 'bg-red-50 border-red-100';
      case 'warning':
        return 'bg-amber-50 border-amber-100';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`${getBgColor(notification.type)} border shadow-sm rounded-lg p-4 flex items-start`}
          >
            <div className="flex-shrink-0">
              {getIcon(notification.type)}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-gray-800">
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-auto flex-shrink-0 flex p-1 text-gray-400 hover:text-gray-500"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;