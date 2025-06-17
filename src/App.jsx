import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ShoppingProvider } from './context/ShoppingContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import WishlistPage from './pages/WishlistPage';
import DashboardPage from './pages/DashboardPage';
import RecyclePage from './pages/RecyclePage';
import NotificationCenter from './components/common/NotificationCenter';

function App() {
  return (
    <Router>
      <NotificationProvider>
        <UserProvider>
          <ShoppingProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/recycle" element={<RecyclePage />} />
                </Routes>
              </div>
              <Footer />
              <NotificationCenter />
            </div>
          </ShoppingProvider>
        </UserProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;