import React from "react";
import { FaUtensils, FaHandshake, FaRecycle } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="bg-green-50 py-[50px]">
      <section className="py-12 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 transition-colors duration-300 hover:text-green-600">How It Works</h2>
        <p className="text-gray-600 mb-10 max-w-xl mx-auto">
          Sharing food is simple and rewarding. Follow these three easy steps to make a difference.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center space-y-4 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="bg-green-100 rounded-full p-4 transition-all duration-300 hover:bg-green-200">
              <FaUtensils className="text-4xl text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">1. Add a Food Listing</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Have surplus food? Just snap a photo, add a few details, and list it for others to find.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center space-y-4 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="bg-green-100 rounded-full p-4 transition-all duration-300 hover:bg-green-200">
              <FaHandshake className="text-4xl text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">2. Connect with Neighbors</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Browse available foods in your area and request what you need. Arrange a convenient pickup time.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center space-y-4 transition-all duration-300 hover:transform hover:-translate-y-2">
            <div className="bg-green-100 rounded-full p-4 transition-all duration-300 hover:bg-green-200">
              <FaRecycle className="text-4xl text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">3. Reduce Waste</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Feel great knowing you've prevented food from going to waste and helped someone in your community.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;