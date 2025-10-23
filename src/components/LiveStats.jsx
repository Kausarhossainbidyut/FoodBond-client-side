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
    <section className="py-12 bg-green-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            Live Impact Counter
          </h2>
          <p className="text-green-100">
            Watch our community grow in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Meals Shared */}
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-14 h-14 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FaUtensils className="text-white text-2xl" />
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-1 tabular-nums">
              {stats.meals.toLocaleString()}+
            </div>
            <p className="text-gray-600 font-semibold mb-2">Meals Shared</p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live</span>
            </div>
          </div>

          {/* Active Donors */}
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-14 h-14 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FaUsers className="text-white text-2xl" />
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-1 tabular-nums">
              {stats.donors.toLocaleString()}+
            </div>
            <p className="text-gray-600 font-semibold mb-2">Active Donors</p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live</span>
            </div>
          </div>

          {/* People Fed */}
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-14 h-14 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FaHandHoldingHeart className="text-white text-2xl" />
            </div>
            <div className="text-4xl font-bold text-gray-800 mb-1 tabular-nums">
              {stats.helped.toLocaleString()}+
            </div>
            <p className="text-gray-600 font-semibold mb-2">People Fed</p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">Live</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white text-lg font-semibold">
            Join thousands making a difference today!
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;
