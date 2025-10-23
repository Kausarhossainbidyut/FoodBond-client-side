import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useUserAnalytics, useGlobalAnalytics, usePendingRequestsCount } from '../hooks/useNotifications';
import { FaChartBar, FaGift, FaHandHoldingHeart, FaCheckCircle, FaClock, FaTrophy, FaMapMarkerAlt, FaGlobe, FaUtensils, FaClipboardList, FaInbox } from 'react-icons/fa';

const Analytics = () => {
  const { user } = useContext(AuthContext);
  const { data: userStats, isLoading: userLoading } = useUserAnalytics(user?.accessToken);
  const { data: pendingRequests, isLoading: pendingLoading } = usePendingRequestsCount(user?.accessToken);
  const { data: globalStats, isLoading: globalLoading } = useGlobalAnalytics();

  const isLoading = userLoading || pendingLoading || globalLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <button className="btn btn-square loading"></button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3 mb-2 transition-colors duration-300 hover:text-green-600">
            <FaChartBar className="text-green-600" />
            Food Sharing Analytics
          </h1>
          <p className="text-gray-600">Track your impact and community contributions</p>
        </div>

        {/* User Statistics */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaHandHoldingHeart className="text-green-600" />
            Your Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Donated */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <FaGift className="text-4xl text-green-600" />
                <span className="text-3xl font-bold text-gray-800">{userStats?.totalDonated || 0}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Total Donated</h3>
              <p className="text-sm text-gray-500 mt-1">Food items you've shared</p>
            </div>

            {/* Total Requested */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <FaHandHoldingHeart className="text-4xl text-orange-500" />
                <span className="text-3xl font-bold text-gray-800">{userStats?.totalRequested || 0}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Total Requested</h3>
              <p className="text-sm text-gray-500 mt-1">Foods you've requested</p>
            </div>

            {/* Available Foods */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <FaCheckCircle className="text-4xl text-green-600" />
                <span className="text-3xl font-bold text-gray-800">{userStats?.availableFoods || 0}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Available Now</h3>
              <p className="text-sm text-gray-500 mt-1">Your active donations</p>
            </div>

            {/* Pending Requests */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <FaInbox className="text-4xl text-orange-500" />
                <span className="text-3xl font-bold text-gray-800">{pendingRequests?.count || 0}</span>
              </div>
              <h3 className="text-gray-600 font-medium">Pending Requests</h3>
              <p className="text-sm text-gray-500 mt-1">Requests for your foods</p>
            </div>
          </div>
        </div>

        {/* Global Statistics */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaGlobe className="text-green-600" />
            Global Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <FaUtensils className="text-4xl text-green-600" />
                <span className="text-4xl font-bold">{globalStats?.totalFoods || 0}</span>
              </div>
              <h3 className="text-lg font-medium">Total Foods Shared</h3>
              <p className="text-sm text-gray-500 mt-1">All time donations</p>
            </div>

            <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <FaCheckCircle className="text-4xl text-green-600" />
                <span className="text-4xl font-bold">{globalStats?.availableFoods || 0}</span>
              </div>
              <h3 className="text-lg font-medium">Available Now</h3>
              <p className="text-sm text-gray-500 mt-1">Ready to be claimed</p>
            </div>

            <div className="bg-white text-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-3">
                <FaClipboardList className="text-4xl text-orange-500" />
                <span className="text-4xl font-bold">{globalStats?.requestedFoods || 0}</span>
              </div>
              <h3 className="text-lg font-medium">Requested</h3>
              <p className="text-sm text-gray-500 mt-1">Being claimed</p>
            </div>
          </div>
        </div>

        {/* Top Donors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaTrophy className="text-orange-500" />
              Top Donors
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              {globalStats?.topDonors && globalStats.topDonors.length > 0 ? (
                <div className="space-y-3">
                  {globalStats.topDonors.map((donor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-green-600">#{index + 1}</span>
                        <div>
                          <p className="font-medium text-gray-800">{donor.donorName || 'Anonymous'}</p>
                          <p className="text-sm text-gray-500">{donor._id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{donor.totalDonations}</p>
                        <p className="text-xs text-gray-500">donations</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No donor data available yet</p>
              )}
            </div>
          </div>

          {/* Foods by Location */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-600" />
              Food Distribution by Location
            </h2>
            <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
              {globalStats?.foodsByLocation && globalStats.foodsByLocation.length > 0 ? (
                <div className="space-y-3">
                  {globalStats.foodsByLocation.map((location, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-800">{location._id || 'Unknown'}</p>
                        <span className="text-sm font-bold text-green-600">{location.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${(location.count / (globalStats?.totalFoods || 1)) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No location data available yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Impact Message */}
        <div className="mt-10 bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-8 text-white text-center transition-all duration-300 hover:shadow-xl">
          <h2 className="text-3xl font-bold mb-3">Together We Make a Difference!</h2>
          <p className="text-lg opacity-90">
            Every food shared is a step towards reducing waste and helping those in need.
          </p>
          <p className="text-xl font-bold mt-4">
            Keep sharing, keep caring!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;