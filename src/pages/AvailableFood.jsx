import React from 'react';
import Card1 from '../ShareingPage/Card1';

const AvailableFood = () => {
  return (
    <div className="bg-[#fef6f6] w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
          Available Foods
        </h1>
        <p className="text-center text-base md:text-lg text-gray-600 mb-10">
          Discover surplus food shared by your generous neighbors.
        </p>

        {/* Search Bar */}
        <div className="flex sm:mx-3.5 flex-row items-center justify-center gap-4 mb-12 w-full">
          <input
            type="text"
            placeholder="Search by food name..."
            className="w-full sm:w-[60%] md:w-[40%] h-10 px-4 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <button
            className="bg-green-600 text-white px-5 py-2 h-10 rounded-md hover:bg-green-700 cursor-pointer transition text-sm  md:w-[150px]"
          >
            Search
          </button>
        </div>

        {/* Cards */}
        <Card1 />
      </div>
    </div>
  );
};

export default AvailableFood;
