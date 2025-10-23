import React from 'react';
import { FaUsers, FaUtensils, FaHandHoldingHeart, FaGlobeAmericas } from 'react-icons/fa';

const Statistics = () => {
  const stats = [
    {
      icon: <FaUtensils className="text-4xl" />,
      number: '10,000+',
      label: 'Meals Shared',
      color: 'bg-green-600'
    },
    {
      icon: <FaUsers className="text-4xl" />,
      number: '5,000+',
      label: 'Active Donors',
      color: 'bg-orange-600'
    },
    {
      icon: <FaHandHoldingHeart className="text-4xl" />,
      number: '8,500+',
      label: 'People Fed',
      color: 'bg-green-600'
    },
    {
      icon: <FaGlobeAmericas className="text-4xl" />,
      number: '50+',
      label: 'Communities',
      color: 'bg-orange-600'
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-600 mb-3">
            Our Impact
          </h2>
          <p className="text-lg text-gray-600">
            Together we're reducing food waste and feeding those in need
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className={`w-16 h-16 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                <span className="text-white">{stat.icon}</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-green-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Be Part of the Solution</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Every meal shared helps fight hunger and reduces food waste
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 rounded-lg px-6 py-3">
              <p className="text-2xl font-bold">FREE</p>
              <p className="text-sm">Always Free</p>
            </div>
            <div className="bg-white/20 rounded-lg px-6 py-3">
              <p className="text-2xl font-bold">SAFE</p>
              <p className="text-sm">Verified</p>
            </div>
            <div className="bg-white/20 rounded-lg px-6 py-3">
              <p className="text-2xl font-bold">EASY</p>
              <p className="text-sm">Simple</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
