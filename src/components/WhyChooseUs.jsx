import React from 'react';
import { FaMobileAlt, FaLeaf, FaShieldAlt, FaHeart, FaClock, FaBell } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaLeaf className="text-xl" />,
      title: 'Reduce Food Waste',
      description: 'Share surplus food instead of throwing it away and help create a sustainable community.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: <FaHeart className="text-xl" />,
      title: 'Feed the Hungry',
      description: 'Help those in need by sharing your extra food and making a positive impact.',
      color: 'bg-orange-100 text-orange-500'
    },
    {
      icon: <FaMobileAlt className="text-xl" />,
      title: 'Easy to Use',
      description: 'Simple interface - share food in just a few clicks with our intuitive platform.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: <FaShieldAlt className="text-xl" />,
      title: 'Safe & Verified',
      description: 'All users are verified. Your safety and privacy are our top priorities.',
      color: 'bg-gray-100 text-gray-700'
    },
    {
      icon: <FaClock className="text-xl" />,
      title: 'Available 24/7',
      description: 'Share and request food anytime with our round-the-clock platform access.',
      color: 'bg-orange-100 text-orange-500'
    },
    {
      icon: <FaBell className="text-xl" />,
      title: 'Instant Notifications',
      description: 'Get notified when food is shared or requested to ensure timely connections.',
      color: 'bg-green-100 text-green-600'
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple yet powerful platform for sharing surplus food and helping your community thrive
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-green-50"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
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