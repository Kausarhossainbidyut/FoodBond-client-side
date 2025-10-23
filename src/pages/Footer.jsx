import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 md:mt-[10px] pb-6 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div className="transition-all duration-300 hover:transform hover:scale-105">
          <div className="flex items-center">
            <img className="w-[60px] h-[60px]" src="https://i.ibb.co/YT4cqW4V/Whats-App-Image-2025-07-16-at-03-44-14-43bc9fb4-removebg-preview.png" alt="logo" />

              <NavLink to={'/'} className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors duration-300">Food<span className='text-orange-500'>Bond</span></NavLink>
          
          </div>
          <p className="text-sm leading-relaxed mt-2">
            Reducing food waste, one meal at a time.
            Join our community to share surplus food and help those in need.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-600">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-600 transition-colors duration-300">Available Foods</a></li>
            <li><a href="#" className="hover:text-green-600 transition-colors duration-300">Add Food</a></li>
            <li><a href="#" className="hover:text-green-600 transition-colors duration-300">About Us</a></li>
            <li><a href="#" className="hover:text-green-600 transition-colors duration-300">Contact</a></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-600">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-600 transition-colors duration-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-600 transition-colors duration-300">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-600">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-green-600 text-xl transition-all duration-300 transform hover:scale-110">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 text-xl transition-all duration-300 transform hover:scale-110">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 text-xl transition-all duration-300 transform hover:scale-110">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-200 pt-5 text-center text-sm text-gray-500">
        © 2025 FoodBond
        . All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;