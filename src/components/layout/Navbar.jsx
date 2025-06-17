import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { ShoppingContext } from '../../context/ShoppingContext';
import { ShoppingBag, Heart, UserCircle, Recycle, BarChart2, Menu, X, Home, Search } from 'lucide-react';

const Navbar = () => {
  const { user, ecoPoints } = useContext(UserContext);
  const { cart, wishlist } = useContext(ShoppingContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => document.getElementById('search-input')?.focus(), 100);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    setSearchOpen(false);
  };
  
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Recycle className="h-8 w-8 text-teal-600 mr-2" />
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">NeedWise</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/' ? 'text-teal-600' : 'text-gray-700 hover:text-teal-500'}`}>
              <Home className="h-5 w-5 inline-block mr-1" />
              Home
            </Link>
            <Link to="/shop" className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/shop' ? 'text-teal-600' : 'text-gray-700 hover:text-teal-500'}`}>
              <ShoppingBag className="h-5 w-5 inline-block mr-1" />
              Shop
            </Link>
            <Link to="/recycle" className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/recycle' ? 'text-teal-600' : 'text-gray-700 hover:text-teal-500'}`}>
              <Recycle className="h-5 w-5 inline-block mr-1" />
              Recycle
            </Link>
            <Link to="/dashboard" className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/dashboard' ? 'text-teal-600' : 'text-gray-700 hover:text-teal-500'}`}>
              <BarChart2 className="h-5 w-5 inline-block mr-1" />
              Dashboard
            </Link>
            <button onClick={toggleSearch} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-teal-500">
              <Search className="h-5 w-5" />
            </button>
          </div>
          
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-4">
              {user && (
                <div className="px-3 py-1 rounded-full bg-teal-100 text-teal-800 flex items-center">
                  <Recycle className="h-4 w-4 mr-1" />
                  <span>{ecoPoints} points</span>
                </div>
              )}
              
              <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-gray-100">
                <Heart className="h-6 w-6 text-gray-700" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-purple-600 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              
              <Link to="/dashboard" className="p-2 rounded-full hover:bg-gray-100">
                <UserCircle className="h-6 w-6 text-gray-700" />
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button onClick={toggleSearch} className="p-2 rounded-full hover:bg-gray-100 mr-2">
              <Search className="h-6 w-6 text-gray-700" />
            </button>
            
            <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-gray-100 mr-2">
              <Heart className="h-6 w-6 text-gray-700" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-purple-600 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>
            
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/' ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5 inline-block mr-2" />
              Home
            </Link>
            <Link 
              to="/shop" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/shop' ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingBag className="h-5 w-5 inline-block mr-2" />
              Shop
            </Link>
            <Link 
              to="/recycle" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/recycle' ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Recycle className="h-5 w-5 inline-block mr-2" />
              Recycle
            </Link>
            <Link 
              to="/dashboard" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/dashboard' ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <BarChart2 className="h-5 w-5 inline-block mr-2" />
              Dashboard
            </Link>
            
            {user && (
              <div className="block px-3 py-2 text-base font-medium text-gray-700">
                <div className="flex items-center justify-between">
                  <span>Eco Points:</span>
                  <span className="px-2 py-1 rounded-full bg-teal-100 text-teal-800">
                    {ecoPoints}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute inset-0 bg-white z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative w-full">
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search for products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </form>
              <button onClick={toggleSearch} className="ml-4 p-2 rounded-full hover:bg-gray-100">
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;