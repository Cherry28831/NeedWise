// Simulated user database
const USERS = {
  '1': {
    id: '1',
    name: 'Arjun Sharma',
    email: 'arjun@needwise.com',
    ecoPoints: 250,
    joinDate: new Date('2023-01-15'),
    purchaseHistory: [],
    usageTracking: [],
    recyclingHistory: [
      { date: new Date('2023-05-10'), material: 'Plastic', points: 25 },
      { date: new Date('2023-05-17'), material: 'Paper', points: 15 },
      { date: new Date('2023-05-23'), material: 'Glass', points: 30 },
    ],
    impactStats: {
      carbonSaved: 45.2,
      wasteReduced: 6.8,
      moneySaved: 10280.50,
    },
    preferences: {
      defaultCooldownHours: 24,
      notifications: {
        email: true,
        push: true,
        cooldownReminders: true
      },
      sustainabilityGoals: {
        monthly: {
          recycling: 10,
          sustainablePurchases: 5
        }
      }
    }
  }
};

export const userService = {
  getCurrentUser: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Always return the demo user for this demo
        resolve(USERS['1']);
      }, 500);
    });
  },
  
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, any login attempts succeed
        if (email) {
          resolve(USERS['1']);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  },
  
  addEcoPoints: (userId, points) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (USERS[userId]) {
          USERS[userId].ecoPoints += points;
          
          // Add to recycling history
          USERS[userId].recyclingHistory.push({
            date: new Date(),
            material: 'Mixed Recyclables', 
            points
          });
          
          resolve(USERS[userId].ecoPoints);
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  },
  
  updateUserPreferences: (userId, preferences) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (USERS[userId]) {
          USERS[userId].preferences = {
            ...USERS[userId].preferences,
            ...preferences
          };
          resolve(USERS[userId].preferences);
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  },
  
  trackProductUsage: (userId, productId, usageCount) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (USERS[userId]) {
          const existingTracking = USERS[userId].usageTracking.find(
            item => item.productId === productId
          );
          
          if (existingTracking) {
            existingTracking.usageCount = usageCount;
            existingTracking.lastUpdated = new Date();
          } else {
            USERS[userId].usageTracking.push({
              productId,
              usageCount,
              startDate: new Date(),
              lastUpdated: new Date()
            });
          }
          
          resolve(USERS[userId].usageTracking);
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  },
  
  getImpactStats: (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (USERS[userId]) {
          resolve(USERS[userId].impactStats);
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  },
  
  updateCooldownTime: (userId, productId, newEndTime) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (USERS[userId]) {
          // In a real app, we would update the cooldown time in the database
          resolve({ success: true, newEndTime });
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  },
  
  getSustainabilityGoals: (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (USERS[userId]) {
          resolve(USERS[userId].preferences.sustainabilityGoals);
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  },
  
  updateSustainabilityGoals: (userId, goals) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (USERS[userId]) {
          USERS[userId].preferences.sustainabilityGoals = {
            ...USERS[userId].preferences.sustainabilityGoals,
            ...goals
          };
          resolve(USERS[userId].preferences.sustainabilityGoals);
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  }
};