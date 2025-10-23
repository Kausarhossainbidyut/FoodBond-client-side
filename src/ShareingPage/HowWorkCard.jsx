import React from "react";
import { FaUtensils, FaHandshake, FaRecycle } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-white py-16">
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Sharing food is simple and rewarding. Follow these three easy steps to make a difference.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-green-50">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <FaUtensils className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Add a Food Listing</h3>
            <p className="text-gray-600">
              Have surplus food? Just snap a photo, add a few details, and list it for others to find.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-green-50">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <FaHandshake className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Connect with Neighbors</h3>
            <p className="text-gray-600">
              Browse available foods in your area and request what you need. Arrange a convenient pickup time.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-green-50">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <FaRecycle className="text-2xl text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Reduce Waste</h3>
            <p className="text-gray-600">
              Feel great knowing you've prevented food from going to waste and helped someone in your community.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;