import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <Recycle className="h-8 w-8 text-teal-600 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">NeedWise</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Promoting mindful consumption and sustainable shopping habits with AI-powered guidance and eco-incentives.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-teal-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-teal-600">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-teal-600">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-teal-600 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-teal-600 text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/recycle" className="text-gray-600 hover:text-teal-600 text-sm">
                  Recycle
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-teal-600 text-sm">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 text-sm">
                  Sustainability Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 text-sm">
                  Eco-friendly Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 text-sm">
                  Community Impact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 text-sm">
                  Eco-Points Program
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600 text-sm">contact@needwise.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600 text-sm">
                  123 Eco Street, Sustainable City, SC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} NeedWise. All rights reserved. Promoting sustainable living and mindful consumption.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;