import React from 'react';
import { Link } from 'react-router';

const FoodDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link to={'/available-food'}
          className="text-sm text-gray-500 flex items-center gap-1 mb-4 hover:text-green-600 transition"
        >
          ← Back to Available Foods
        </Link>

        {/* Food Item */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row transition hover:shadow-xl">
          {/* Food Image */}
          <div className="md:w-1/2">
            <img
              src="https://i.ibb.co/1GC8r7wD/chicken-skewers-with-slices-apples-chili.jpg"
              alt="Fresh Garden Salad"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Fresh Garden Salad
              </h1>
              <p className="text-sm text-gray-500 mb-4">
                Donated by <span className="font-semibold text-green-700">Alice Johnson</span>
              </p>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  🥗 <span className="font-medium">Quantity:</span> 15 servings
                </div>
                <div className="flex items-center gap-2">
                  📍 <span className="font-medium">Pickup Location:</span> Downtown Community Center
                </div>
                <div className="flex items-center gap-2">
                  ⏳ <span className="font-medium">Expires:</span> July 19, 2025
                </div>
              </div>

              <div className="mt-5">
                <h2 className="text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Mixed greens with cherry tomatoes, cucumbers, and a light vinaigrette.
                  Perfect for a healthy lunch or dinner.
                </p>
              </div>
            </div>

            <button className="mt-6 bg-green-600 hover:bg-green-700 transition text-white font-medium py-2 px-4 rounded-lg w-full md:w-auto">
              Request Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
