import React, { useState, useEffect } from 'react';
import { FaUtensils, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';

const LiveStats = () => {
  const [stats, setStats] = useState({
    meals: 10000,
    donors: 5000,
    helped: 8500
  });

  // Simulate live updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        meals: prev.meals + Math.floor(Math.random() * 3),
        donors: prev.donors + Math.floor(Math.random() * 2),
        helped: prev.helped + Math.floor(Math.random() * 3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-green-500 to-green-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Live Impact Counter
          </h2>
          <p className="text-green-100 text-lg">
            Watch our community grow in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Meals Shared */}
          <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUtensils className="text-green-600 text-2xl" />
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2 tabular-nums">
              {stats.meals.toLocaleString()}+
            </div>
            <p className="text-gray-600 font-semibold">Meals Shared</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live Update</span>
            </div>
          </div>

          {/* Active Donors */}
          <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUsers className="text-orange-500 text-2xl" />
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2 tabular-nums">
              {stats.donors.toLocaleString()}+
            </div>
            <p className="text-gray-600 font-semibold">Active Donors</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live Update</span>
            </div>
          </div>

          {/* People Fed */}
          <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHandHoldingHeart className="text-green-600 text-2xl" />
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-2 tabular-nums">
              {stats.helped.toLocaleString()}+
            </div>
            <p className="text-gray-600 font-semibold">People Fed</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live Update</span>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-white text-lg font-medium">
            Join thousands making a difference today!
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;