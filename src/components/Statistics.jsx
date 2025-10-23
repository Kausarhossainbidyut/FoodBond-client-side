import React from 'react';
import { FaUsers, FaUtensils, FaHandHoldingHeart, FaGlobeAmericas } from 'react-icons/fa';

const Statistics = () => {
  const stats = [
    {
      icon: <FaUtensils className="text-2xl" />,
      number: '10,000+',
      label: 'Meals Shared',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: <FaUsers className="text-2xl" />,
      number: '5,000+',
      label: 'Active Donors',
      color: 'bg-orange-100 text-orange-500'
    },
    {
      icon: <FaHandHoldingHeart className="text-2xl" />,
      number: '8,500+',
      label: 'People Fed',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: <FaGlobeAmericas className="text-2xl" />,
      number: '50+',
      label: 'Communities',
      color: 'bg-orange-100 text-orange-500'
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Our Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Together we're reducing food waste and feeding those in need across Bangladesh
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-green-50"
            >
              <div className={`w-14 h-14 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white text-center shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Be Part of the Solution</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Every meal shared helps fight hunger and reduces food waste in our communities
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-xl font-bold">FREE</p>
              <p className="text-sm">Always Free</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-xl font-bold">SAFE</p>
              <p className="text-sm">Verified Donors</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-xl font-bold">EASY</p>
              <p className="text-sm">Simple Process</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;