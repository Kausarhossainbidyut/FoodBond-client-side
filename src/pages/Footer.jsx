import React from "react";
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-12 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-green-600 mb-3">NourishNet</h2>
          <p className="text-sm leading-relaxed">
            Reducing food waste, one meal at a time.
            Join our community to share surplus food and help those in need.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-600 transition">Available Foods</a></li>
            <li><a href="#" className="hover:text-green-600 transition">Add Food</a></li>
            <li><a href="#" className="hover:text-green-600 transition">About Us</a></li>
            <li><a href="#" className="hover:text-green-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-600 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-600 transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-green-600 text-xl transition">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 text-xl transition">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 text-xl transition">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t pt-5 text-center text-sm text-gray-500">
        © 2025 NourishNet. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
