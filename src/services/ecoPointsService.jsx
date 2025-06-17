// Simulated eco-points and recycling service

// Recycling rates per material (points per kg)
const RECYCLING_RATES = {
  plastic: 10,
  paper: 5,
  glass: 8,
  metal: 15,
  electronics: 25
};

// Available rewards with Indian pricing
const REWARDS = [
  {
    id: 'r1',
    name: 'Metro/Bus Pass',
    description: 'A 1-day pass for Delhi Metro or local bus transportation.',
    pointsCost: 100,
    sustainability: 4.5,
    value: '₹60'
  },
  {
    id: 'r2',
    name: 'Eco-friendly Product Discount',
    description: '15% off your next purchase of sustainable products.',
    pointsCost: 150,
    sustainability: 4.2,
    value: '₹300 savings'
  },
  {
    id: 'r3',
    name: 'Tree Planting Donation',
    description: 'We\'ll plant a tree on your behalf in partnership with local NGOs.',
    pointsCost: 200,
    sustainability: 5.0,
    value: '1 Tree'
  },
  {
    id: 'r4',
    name: 'Reusable Grocery Kit',
    description: 'A set of reusable grocery bags and produce mesh bags.',
    pointsCost: 300,
    sustainability: 4.8,
    value: '₹500 kit'
  },
  {
    id: 'r5',
    name: 'Solar Power Bank',
    description: 'Eco-friendly portable charger powered by solar energy.',
    pointsCost: 500,
    sustainability: 4.6,
    value: '₹1200 device'
  },
  {
    id: 'r6',
    name: 'Organic Food Voucher',
    description: 'Voucher for organic groceries at partner stores.',
    pointsCost: 400,
    sustainability: 4.3,
    value: '₹800 voucher'
  }
];

// Simulated database of user recycling activities
const USER_RECYCLING = {};

export const ecoPointsService = {
  getRecyclingRates: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(RECYCLING_RATES);
      }, 200);
    });
  },
  
  getAvailableRewards: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(REWARDS);
      }, 300);
    });
  },
  
  recordRecycling: (userId, material, weight) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!USER_RECYCLING[userId]) {
          USER_RECYCLING[userId] = [];
        }
        
        const points = Math.round(RECYCLING_RATES[material.toLowerCase()] * weight);
        const record = {
          id: Date.now().toString(),
          userId,
          material,
          weight,
          points,
          timestamp: new Date()
        };
        
        USER_RECYCLING[userId].push(record);
        resolve(record);
      }, 500);
    });
  },
  
  getUserRecyclingHistory: (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(USER_RECYCLING[userId] || []);
      }, 300);
    });
  },
  
  redeemReward: (userId, rewardId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const reward = REWARDS.find(r => r.id === rewardId);
        
        if (!reward) {
          reject(new Error('Reward not found'));
          return;
        }
        
        // In a real app, we would check if user has enough points
        // For demo purposes, we'll just return success
        resolve({
          success: true,
          reward,
          redeemCode: `ECO-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        });
      }, 600);
    });
  },
  
  getCommunityImpact: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulated community impact data
        resolve({
          totalRecycled: {
            plastic: 1250, // kg
            paper: 980,
            glass: 760,
            metal: 540,
            electronics: 320
          },
          treesEquivalent: 124,
          co2Saved: 15800, // kg
          topCommunities: [
            { name: 'Koramangala Residents', points: 12500 },
            { name: 'HSR Layout Community', points: 10800 },
            { name: 'Indiranagar Green Group', points: 9200 }
          ]
        });
      }, 400);
    });
  }
};