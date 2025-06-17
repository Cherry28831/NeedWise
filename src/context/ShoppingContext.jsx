import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { productService } from '../services/productService';
import { userService } from '../services/userService';
import { NotificationContext } from './NotificationContext';

export const ShoppingContext = createContext();

export const ShoppingProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState(null);
  
  const { addNotification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await productService.getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const [wishlistData, preferencesData] = await Promise.all([
            productService.getWishlist(user.id),
            userService.getCurrentUser()
          ]);
          setWishlist(wishlistData);
          setUserPreferences(preferencesData.preferences);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const addToWishlist = (product) => {
    if (wishlist.some(item => item.id === product.id)) {
      addNotification({
        type: 'info',
        message: 'This item is already in your wishlist.'
      });
      return;
    }

    const cooldownHours = userPreferences?.defaultCooldownHours || 24;
    const productWithReflection = {
      ...product,
      reflectionAnswered: false,
      addedAt: new Date(),
      coolDownEnds: new Date(Date.now() + cooldownHours * 60 * 60 * 1000),
    };

    const updatedWishlist = [...wishlist, productWithReflection];
    setWishlist(updatedWishlist);
    
    productService.addToWishlist(user?.id, productWithReflection);
    
    addNotification({
      type: 'success',
      message: `${product.name} has been added to your wishlist with a ${cooldownHours}-hour reflection period.`
    });
  };

  const updateCooldownTime = async (productId, newEndTime) => {
    try {
      await userService.updateCooldownTime(user.id, productId, newEndTime);
      
      const updatedWishlist = wishlist.map(item =>
        item.id === productId
          ? { ...item, coolDownEnds: newEndTime }
          : item
      );
      
      setWishlist(updatedWishlist);
      productService.updateWishlist(user.id, updatedWishlist);
      
      addNotification({
        type: 'success',
        message: 'Reflection period updated successfully.'
      });
    } catch (error) {
      console.error('Error updating cooldown time:', error);
      addNotification({
        type: 'error',
        message: 'Failed to update reflection period.'
      });
    }
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    
    productService.updateWishlist(user?.id, updatedWishlist);
    
    addNotification({
      type: 'info',
      message: 'Item removed from your wishlist.'
    });
  };

  const answerReflection = (productId, answers) => {
    const updatedWishlist = wishlist.map(item => 
      item.id === productId 
        ? { ...item, reflectionAnswered: true, reflectionAnswers: answers } 
        : item
    );
    
    setWishlist(updatedWishlist);
    productService.updateWishlist(user?.id, updatedWishlist);
    
    addNotification({
      type: 'success',
      message: 'Thank you for reflecting on your purchase intention!'
    });
  };

  const addToCart = (product) => {
    const wishlistItem = wishlist.find(item => item.id === product.id);
    
    if (wishlistItem && new Date() < new Date(wishlistItem.coolDownEnds)) {
      const remainingTime = Math.ceil((new Date(wishlistItem.coolDownEnds) - new Date()) / (1000 * 60 * 60));
      
      addNotification({
        type: 'warning',
        message: `Please wait ${remainingTime} more hours before purchasing this item.`
      });
      return;
    }
    
    if (wishlistItem && !wishlistItem.reflectionAnswered) {
      addNotification({
        type: 'warning',
        message: 'Please answer the reflection questions before adding to cart.'
      });
      return;
    }
    
    const existingItem = cart.find(item => item.id === product.id);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(updatedCart);
    
    addNotification({
      type: 'success',
      message: `${product.name} added to your cart.`
    });
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    
    addNotification({
      type: 'info',
      message: 'Item removed from your cart.'
    });
  };

  const updateCartItemQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    const updatedCart = cart.map(item => 
      item.id === productId 
        ? { ...item, quantity } 
        : item
    );
    
    setCart(updatedCart);
  };

  const value = {
    cart,
    wishlist,
    products,
    loading,
    userPreferences,
    addToWishlist,
    removeFromWishlist,
    answerReflection,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    updateCooldownTime
  };

  return <ShoppingContext.Provider value={value}>{children}</ShoppingContext.Provider>;
};