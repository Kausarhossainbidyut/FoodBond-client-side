import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const SuccessStories = () => {
  const stories = [
    {
      name: 'Sarah Johnson',
      role: 'Food Donor',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      story: 'FoodBond has transformed the way I share surplus food from my restaurant. Instead of throwing away perfectly good meals, I can now help people in need. It feels amazing!',
      rating: 5,
      location: 'New York, USA'
    },
    {
      name: 'Michael Chen',
      role: 'Community Member',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      story: 'As a student, FoodBond has been a lifesaver. I can access nutritious meals from local donors. This platform has helped me save money and eat healthier!',
      rating: 5,
      location: 'San Francisco, USA'
    },
    {
      name: 'Amina Hassan',
      role: 'Regular Donor',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      story: 'I love how easy it is to share food with FoodBond. The platform is user-friendly, and knowing that my donations are helping families brings me so much joy.',
      rating: 5,
      location: 'London, UK'
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Stories That Inspire Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from our community members who are making a difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <FaQuoteLeft className="text-4xl text-purple-200" />
              </div>

              {/* Profile */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-purple-100"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{story.name}</h3>
                  <p className="text-sm text-gray-600">{story.role}</p>
                  <p className="text-xs text-gray-500">{story.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(story.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              {/* Story */}
              <p className="text-gray-700 leading-relaxed italic">
                "{story.story}"
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <h3 className="text-3xl font-bold mb-4">Your Story Could Be Next!</h3>
            <p className="text-xl text-purple-100 mb-6 max-w-2xl mx-auto">
              Join thousands of people who are already making a positive impact in their communities
            </p>
            <button className="bg-white text-purple-600 font-bold px-8 py-4 rounded-lg hover:bg-purple-50 transition transform hover:scale-105 shadow-lg">
              Start Your Journey Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
