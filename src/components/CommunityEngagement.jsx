import React, { useState, useEffect } from 'react';
import { FaUsers, FaUtensils, FaHandsHelping, FaComments } from 'react-icons/fa';

const CommunityEngagement = () => {
  const [engagementData, setEngagementData] = useState({
    activeUsers: 1240,
    mealsShared: 3560,
    communityHelp: 890,
    discussions: 420
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, user: 'Ahmed Rahman', action: 'shared 5 meals', time: '2 min ago', type: 'donation' },
    { id: 2, user: 'Fatima Begum', action: 'requested food', time: '5 min ago', type: 'request' },
    { id: 3, user: 'Tanzil Ahmed', action: 'joined the community', time: '8 min ago', type: 'join' },
    { id: 4, user: 'Nazia Hassan', action: 'commented on a post', time: '12 min ago', type: 'comment' },
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEngagementData(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3),
        mealsShared: prev.mealsShared + Math.floor(Math.random() * 5),
        communityHelp: prev.communityHelp + Math.floor(Math.random() * 2),
        discussions: prev.discussions + Math.floor(Math.random() * 1)
      }));

      // Add new activity
      const newActivities = [
        { user: 'Rahim Uddin', action: 'shared 3 meals', time: 'Just now', type: 'donation' },
        { user: 'Sadia Islam', action: 'requested food', time: 'Just now', type: 'request' },
        { user: 'Karim Khan', action: 'joined the community', time: 'Just now', type: 'join' },
        { user: 'Tasnim Ara', action: 'commented on a post', time: 'Just now', type: 'comment' },
      ];

      setRecentActivity(prev => {
        const newActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
        const newId = prev.length > 0 ? prev[0].id + 1 : 1;
        return [
          { ...newActivity, id: newId },
          ...prev.slice(0, 3)
        ];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Community Engagement
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how our community is actively working together to reduce food waste
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Engagement Stats */}
          <div className="lg:col-span-1 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Live Stats</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaUsers className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Active Users</p>
                    <p className="text-2xl font-bold text-gray-800 tabular-nums">
                      {engagementData.activeUsers.toLocaleString()}+
                    </p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaUtensils className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Meals Shared</p>
                    <p className="text-2xl font-bold text-gray-800 tabular-nums">
                      {engagementData.mealsShared.toLocaleString()}+
                    </p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaHandsHelping className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Community Help</p>
                    <p className="text-2xl font-bold text-gray-800 tabular-nums">
                      {engagementData.communityHelp.toLocaleString()}+
                    </p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaComments className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Discussions</p>
                    <p className="text-2xl font-bold text-gray-800 tabular-nums">
                      {engagementData.discussions.toLocaleString()}+
                    </p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-green-600 rounded-xl text-white text-center">
              <p className="font-bold">Join our growing community!</p>
              <p className="text-sm text-green-100 mt-1">
                Be part of the solution to food waste
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-lg h-full">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="bg-white p-4 rounded-xl shadow-sm border border-green-100 animate-fade-in"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'donation' ? 'bg-green-100' :
                          activity.type === 'request' ? 'bg-orange-100' :
                          activity.type === 'join' ? 'bg-blue-100' : 'bg-purple-100'
                        }`}>
                          {activity.type === 'donation' ? (
                            <FaUtensils className={`${
                              activity.type === 'donation' ? 'text-green-600' :
                              activity.type === 'request' ? 'text-orange-600' :
                              activity.type === 'join' ? 'text-blue-600' : 'text-purple-600'
                            }`} />
                          ) : activity.type === 'request' ? (
                            <FaHandsHelping className={`${
                              activity.type === 'donation' ? 'text-green-600' :
                              activity.type === 'request' ? 'text-orange-600' :
                              activity.type === 'join' ? 'text-blue-600' : 'text-purple-600'
                            }`} />
                          ) : activity.type === 'join' ? (
                            <FaUsers className={`${
                              activity.type === 'donation' ? 'text-green-600' :
                              activity.type === 'request' ? 'text-orange-600' :
                              activity.type === 'join' ? 'text-blue-600' : 'text-purple-600'
                            }`} />
                          ) : (
                            <FaComments className={`${
                              activity.type === 'donation' ? 'text-green-600' :
                              activity.type === 'request' ? 'text-orange-600' :
                              activity.type === 'join' ? 'text-blue-600' : 'text-purple-600'
                            }`} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{activity.user}</p>
                          <p className="text-sm text-gray-600">{activity.action}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                  View All Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityEngagement;