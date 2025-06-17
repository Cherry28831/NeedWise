import { v4 as uuidv4 } from 'uuid';

// Simulated product database with Indian pricing
const PRODUCTS = [
  {
    id: '1',
    name: 'Eco-Friendly Water Bottle',
    price: 1999,
    category: 'Home',
    image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Reusable stainless steel water bottle with bamboo cap. Keeps drinks cold for 24 hours or hot for 12 hours.',
    sustainability: 4.5,
    alternatives: [
      {
        id: '1a',
        name: 'Glass Water Bottle',
        price: 1599,
        sustainability: 4.0,
        image: 'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg?auto=compress&cs=tinysrgb&w=600',
        comparison: 'More affordable, 100% recyclable but less durable'
      },
      {
        id: '1b',
        name: 'Bamboo Water Bottle',
        price: 1849,
        sustainability: 5.0,
        image: 'https://images.pexels.com/photos/4495756/pexels-photo-4495756.jpeg?auto=compress&cs=tinysrgb&w=600',
        comparison: 'Higher sustainability rating, fully biodegradable'
      }
    ]
  },
  {
    id: '2',
    name: 'Smart LED Desk Lamp',
    price: 4799,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Energy-efficient LED desk lamp with adjustable brightness and color temperature.',
    sustainability: 3.8,
    alternatives: [
      {
        id: '2a',
        name: 'Solar Powered Desk Lamp',
        price: 5199,
        sustainability: 4.7,
        image: 'https://images.pexels.com/photos/6758773/pexels-photo-6758773.jpeg?auto=compress&cs=tinysrgb&w=600',
        comparison: 'More sustainable with renewable energy source'
      }
    ]
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 2399,
    category: 'Clothing',
    image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Soft, breathable t-shirt made from 100% organic cotton. Fair trade certified.',
    sustainability: 4.2,
    alternatives: [
      {
        id: '3a',
        name: 'Recycled Polyester T-Shirt',
        price: 1999,
        sustainability: 3.9,
        image: 'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=600',
        comparison: 'More affordable, uses recycled materials but less biodegradable'
      },
      {
        id: '3b',
        name: 'Hemp Blend T-Shirt',
        price: 2649,
        sustainability: 4.8,
        image: 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=600',
        comparison: 'Higher sustainability rating, more durable but slightly more expensive'
      }
    ]
  },
  {
    id: '4',
    name: 'Wireless Earbuds',
    price: 7199,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Bluetooth wireless earbuds with noise cancellation and 6-hour battery life.',
    sustainability: 2.6,
    alternatives: [
      {
        id: '4a',
        name: 'Recyclable Wired Earphones',
        price: 3199,
        sustainability: 3.8,
        image: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=600',
        comparison: 'More sustainable, no battery waste, lower cost, longer lifespan'
      }
    ]
  },
  {
    id: '5',
    name: 'Bamboo Toothbrush Set',
    price: 1049,
    category: 'Home',
    image: 'https://images.pexels.com/photos/3737579/pexels-photo-3737579.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Set of 4 biodegradable bamboo toothbrushes with charcoal-infused bristles.',
    sustainability: 4.9,
    alternatives: [
      {
        id: '5a',
        name: 'Recycled Plastic Toothbrushes',
        price: 799,
        sustainability: 3.5,
        image: 'https://images.pexels.com/photos/5898312/pexels-photo-5898312.jpeg?auto=compress&cs=tinysrgb&w=600',
        comparison: 'More affordable, but less biodegradable'
      }
    ]
  },
  {
    id: '6',
    name: 'Smart Watch',
    price: 15999,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Fitness and health tracking smart watch with heart rate monitor and sleep tracking.',
    sustainability: 2.4,
    alternatives: [
      {
        id: '6a',
        name: 'Refurbished Smart Watch',
        price: 10399,
        sustainability: 3.7,
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
        comparison: 'More sustainable option through reuse, lower cost'
      }
    ]
  },
  {
    id: '7',
    name: 'Reusable Shopping Bags',
    price: 1279,
    category: 'Home',
    image: 'https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Set of 3 durable canvas shopping bags with reinforced handles.',
    sustainability: 4.7,
    alternatives: [
      {
        id: '7a',
        name: 'Mesh Produce Bags',
        price: 1039,
        sustainability: 4.3,
        image: 'https://images.pexels.com/photos/5029857/pexels-photo-5029857.jpeg?auto=compress&cs=tinysrgb&w=600',
        comparison: 'Lighter weight, perfect for fruits and vegetables'
      }
    ]
  },
  {
    id: '8',
    name: 'Solar Power Bank',
    price: 3679,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Portable solar-powered charger with 20,000mAh capacity and dual USB ports.',
    sustainability: 4.1,
    alternatives: [
      {
        id: '8a',
        name: 'Hand Crank Power Bank',
        price: 3199,
        sustainability: 4.5,
        image: 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=600',
        comparison: 'No solar dependency, works in any weather condition'
      }
    ]
  }
];

// Simulated user wishlists
const USER_WISHLISTS = {};

export const productService = {
  getAllProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(PRODUCTS);
      }, 500);
    });
  },
  
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = PRODUCTS.find(p => p.id === id);
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Product not found'));
        }
      }, 300);
    });
  },
  
  getProductAlternatives: (productId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
          resolve(product.alternatives || []);
        } else {
          reject(new Error('Product not found'));
        }
      }, 300);
    });
  },
  
  getWishlist: (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(USER_WISHLISTS[userId] || []);
      }, 300);
    });
  },
  
  addToWishlist: (userId, product) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!USER_WISHLISTS[userId]) {
          USER_WISHLISTS[userId] = [];
        }
        USER_WISHLISTS[userId].push(product);
        resolve(USER_WISHLISTS[userId]);
      }, 300);
    });
  },
  
  updateWishlist: (userId, wishlist) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        USER_WISHLISTS[userId] = wishlist;
        resolve(USER_WISHLISTS[userId]);
      }, 300);
    });
  },
  
  searchProducts: (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = PRODUCTS.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) || 
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 400);
    });
  },
  
  getProductsByCategory: (category) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = category 
          ? PRODUCTS.filter(product => product.category === category)
          : PRODUCTS;
        resolve(results);
      }, 300);
    });
  }
};