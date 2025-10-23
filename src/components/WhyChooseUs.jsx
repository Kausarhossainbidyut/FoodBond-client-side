import React from 'react';
import { FaMobileAlt, FaLeaf, FaShieldAlt, FaHeart, FaClock, FaBell } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaLeaf className="text-3xl" />,
      title: 'Reduce Food Waste',
      description: 'Share surplus food instead of throwing it away.',
      color: 'bg-green-600'
    },
    {
      icon: <FaHeart className="text-3xl" />,
      title: 'Feed the Hungry',
      description: 'Help those in need by sharing your extra food.',
      color: 'bg-orange-600'
    },
    {
      icon: <FaMobileAlt className="text-3xl" />,
      title: 'Easy to Use',
      description: 'Simple interface - share food in just a few clicks.',
      color: 'bg-green-600'
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: 'Safe & Verified',
      description: 'All users are verified. Your safety is our priority.',
      color: 'bg-gray-700'
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: 'Available 24/7',
      description: 'Share and request food anytime.',
      color: 'bg-orange-600'
    },
    {
      icon: <FaBell className="text-3xl" />,
      title: 'Instant Notifications',
      description: 'Get notified when food is shared or requested.',
      color: 'bg-green-600'
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-600 mb-3">
            Why Share Food?
          </h2>
          <p className="text-lg text-gray-600">
            A simple platform for sharing surplus food and helping your community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-lg flex items-center justify-center mb-4 shadow-sm`}>
                <span className="text-white">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
