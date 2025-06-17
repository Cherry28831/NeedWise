import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingContext } from '../context/ShoppingContext';
import { productService } from '../services/productService';
import SustainabilityBadge from '../components/product/SustainabilityBadge';
import ProductAlternatives from '../components/product/ProductAlternatives';
import ReflectionQuestions from '../components/product/ReflectionQuestions';
import { ChevronRight, Heart, ShoppingCart, ArrowLeft, HelpCircle, Info, X } from 'lucide-react';
import { NotificationContext } from '../context/NotificationContext';

const ProductPage = () => {
  const { id } = useParams();
  const { addToWishlist, addToCart, wishlist } = useContext(ShoppingContext);
  const { addNotification } = useContext(NotificationContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alternatives, setAlternatives] = useState([]);
  const [showReflection, setShowReflection] = useState(false);
  
  const isInWishlist = wishlist.some(item => item.id === id);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await productService.getProductById(id);
        setProduct(productData);
        
        const alternativesData = await productService.getProductAlternatives(id);
        setAlternatives(alternativesData);
      } catch (error) {
        console.error('Error fetching product:', error);
        addNotification({
          type: 'error',
          message: 'Error loading product. Please try again.'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, [id, addNotification]);
  
  const handleAddToWishlist = () => {
    if (isInWishlist) {
      addNotification({
        type: 'info',
        message: 'This item is already in your wishlist.'
      });
      return;
    }
    
    setShowReflection(true);
  };
  
  const handleReflectionComplete = (answers) => {
    setShowReflection(false);
    addToWishlist(product);
    
    // Check if the user's answers suggest they should reconsider
    if (answers.q2 === 'Yes' || answers.q4 === 'Likely yes') {
      addNotification({
        type: 'warning',
        message: 'Based on your answers, you might want to reconsider this purchase.'
      });
    }
  };

  const handleCloseReflection = () => {
    setShowReflection(false);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the product you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/shop" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex items-center text-sm text-gray-500">
          <Link to="/" className="hover:text-teal-600">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to="/shop" className="hover:text-teal-600">Shop</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-700">{product.name}</span>
        </nav>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Product Image */}
        <div className="mb-8 lg:mb-0">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <SustainabilityBadge rating={product.sustainability} />
          </div>
          
          <div className="mt-4">
            <span className="text-2xl font-semibold text-purple-700">₹{product.price.toLocaleString()}</span>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Sustainability Info</h3>
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-700">
                    This product has a sustainability rating of <strong>{product.sustainability.toFixed(1)}/5.0</strong>. Higher ratings indicate more eco-friendly products with lower environmental impact.
                  </p>
                  {product.sustainability < 3 && (
                    <p className="text-sm text-amber-700 mt-2">
                      Consider checking more sustainable alternatives below.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToWishlist}
              className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium ${
                isInWishlist
                  ? 'bg-purple-50 text-purple-700 border-purple-300'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              <Heart className="mr-2 h-5 w-5" fill={isInWishlist ? "currentColor" : "none"} />
              {isInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addToCart(product)}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium bg-teal-600 text-white hover:bg-teal-700"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </motion.button>
          </div>
          
          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex">
              <HelpCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-medium text-blue-800">Mindful Shopping Tip</p>
                <p>Adding to your wishlist starts a 24-hour reflection period, allowing you to make more intentional purchasing decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Alternatives */}
      <ProductAlternatives product={product} alternatives={alternatives} />
      
      {/* Reflection Questions Modal */}
      <AnimatePresence>
        {showReflection && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md relative"
            >
              <button
                onClick={handleCloseReflection}
                className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
              <ReflectionQuestions 
                product={product} 
                onComplete={handleReflectionComplete} 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;