import React, { createContext, useState, useEffect } from 'react';
import { userService } from '../services/userService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      try {
        const userData = await userService.getCurrentUser();
        setUser(userData);
        setEcoPoints(userData.ecoPoints);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const addEcoPoints = async (points) => {
    if (!user) return;
    
    try {
      const updatedPoints = await userService.addEcoPoints(user.id, points);
      setEcoPoints(updatedPoints);
      return updatedPoints;
    } catch (error) {
      console.error('Error adding eco points:', error);
    }
  };

  const value = {
    user,
    setUser,
    ecoPoints,
    addEcoPoints,
    loading
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};