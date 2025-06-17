import React, { createContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(({ type, message, duration = 5000 }) => {
    const id = uuidv4();
    
    setNotifications(prev => [
      ...prev,
      { id, type, message, duration }
    ]);

    // Auto-remove notification after duration
    if (duration) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
    
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const value = {
    notifications,
    addNotification,
    removeNotification
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};