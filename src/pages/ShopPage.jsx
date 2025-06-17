import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingContext } from '../context/ShoppingContext';
import ProductCard from '../components/product/ProductCard';
import FlowPrompts from '../components/common/FlowPrompts';
import { Filter, Grid3X3, List, Loader } from 'lucide-react';

const ShopPage = () => {
  const { products, loading } = useContext(ShoppingContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'Home', name: 'Home & Living' },
    { id: 'Electronics', name: 'Electronics' },
    { id: 'Clothing', name: 'Clothing & Accessories' }
  ];
  
  useEffect(() => {
    if (products.length > 0) {
      filterProducts(activeCategory);
    }
  }, [products, activeCategory, sortBy]);
  
  const filterProducts = (category) => {
    let filtered = category === 'all' 
      ? [...products] 
      : products.filter(product => product.category === category);
    
    // Apply sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'sustainability') {
      filtered.sort((a, b) => b.sustainability - a.sustainability);
    }
    
    setFilteredProducts(filtered);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mindful Shopping</h1>
        <p className="text-gray-600">
          Browse our curated collection of sustainable products. Each product includes a mindfulness check to help you make conscious purchasing decisions.
        </p>
      </div>
      
      {/* Flow Prompt */}
      <FlowPrompts currentPage="shop" />
      
      {/* Filters and controls */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 mr-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="flex mt-4 md:mt-0 items-center">
            <div className="mr-4">
              <label htmlFor="sort-by" className="sr-only">Sort by</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
              >
                <option value="default">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="sustainability">Sustainability Rating</option>
              </select>
            </div>
            
            <div className="flex border rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              >
                <Grid3X3 className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              >
                <List className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Filter className="h-4 w-4 mr-1" />
          <span>Showing {filteredProducts.length} products</span>
        </div>
      </div>
      
      {/* Product grid */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader className="h-8 w-8 text-teal-500 animate-spin" />
          <span className="ml-2 text-gray-600">Loading products...</span>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
            : "space-y-4"
          }
        >
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
          
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ShopPage;