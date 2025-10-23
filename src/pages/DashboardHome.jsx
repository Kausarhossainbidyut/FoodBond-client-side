import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { 
  FaUtensils, 
  FaListAlt, 
  FaShoppingCart, 
  FaBell,
  FaInbox,
  FaChartBar,
  FaArrowRight,
  FaHeart,
  FaUsers,
  FaTrophy
} from 'react-icons/fa';
import { useUserAnalytics, usePendingRequestsCount } from '../hooks/useNotifications';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const { data: analytics, isLoading: analyticsLoading } = useUserAnalytics(user?.accessToken);
  const { data: pendingRequests, isLoading: pendingLoading } = usePendingRequestsCount(user?.accessToken);

  const isLoading = analyticsLoading || pendingLoading;

  if (isLoading) {
    return <LoadingSpinner size="large" message="Loading dashboard..." />;
  }

  const stats = [
    {
      title: 'Foods Donated',
      value: analytics?.totalDonated || 0,
      icon: <FaUtensils className="text-3xl" />,
      color: 'from-green-500 to-green-600',
      link: '/dashboard/manage-foods'
    },
    {
      title: 'Foods Requested',
      value: analytics?.totalRequested || 0,
      icon: <FaShoppingCart className="text-3xl" />,
      color: 'from-blue-500 to-blue-600',
      link: '/dashboard/my-requests'
    },
    {
      title: 'Available Foods',
      value: analytics?.availableFoods || 0,
      icon: <FaListAlt className="text-3xl" />,
      color: 'from-purple-500 to-purple-600',
      link: '/dashboard/manage-foods'
    },
    {
      title: 'Pending Requests',
      value: pendingRequests?.count || 0,
      icon: <FaInbox className="text-3xl" />,
      color: 'from-orange-500 to-orange-600',
      link: '/dashboard/received-requests'
    },
  ];

  const quickActions = [
    {
      title: 'Add New Food',
      description: 'Share surplus food with the community',
      icon: <FaUtensils className="text-2xl" />,
      color: 'from-green-500 to-green-600',
      link: '/dashboard/add-food'
    },
    {
      title: 'Manage Foods',
      description: 'View and edit your food listings',
      icon: <FaListAlt className="text-2xl" />,
      color: 'from-blue-500 to-blue-600',
      link: '/dashboard/manage-foods'
    },
    {
      title: 'My Requests',
      description: 'Track your food requests',
      icon: <FaShoppingCart className="text-2xl" />,
      color: 'from-purple-500 to-purple-600',
      link: '/dashboard/my-requests'
    },
    {
      title: 'View Requests',
      description: 'Manage requests for your foods',
      icon: <FaInbox className="text-2xl" />,
      color: 'from-orange-500 to-orange-600',
      link: '/dashboard/received-requests'
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-700 to-gray-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            Welcome back, {user?.displayName || 'User'}!
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-medium">
            Here's what's happening with your food sharing journey today
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaChartBar className="text-green-600" />
          Your Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="group relative overflow-hidden"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 hover:border-transparent">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500 ${stat.color}"></div>
                <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <span className="text-white">{stat.icon}</span>
                </div>
                <h3 className="text-gray-600 text-sm font-semibold mb-2 uppercase tracking-wide">{stat.title}</h3>
                <p className="text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent">{stat.value}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaArrowRight className="text-green-600" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-200 hover:border-transparent"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              <div className="flex items-start gap-5 relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                  <span className="text-white">{action.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:bg-gradient-to-r group-hover:${action.color} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{action.description}</p>
                  <span className={`inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r ${action.color} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-300`}>
                    Get Started <FaArrowRight className="text-xs" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Impact Summary */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <FaTrophy className="text-yellow-500 text-4xl" />
            Your Impact Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <FaHeart className="text-4xl text-white" />
              </div>
              <p className="text-5xl font-bold text-white mb-2">{analytics?.totalDonated || 0}</p>
              <p className="text-gray-300 font-semibold text-lg">Meals Shared</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <FaUsers className="text-4xl text-white" />
              </div>
              <p className="text-5xl font-bold text-white mb-2">{analytics?.requestsReceived || 0}</p>
              <p className="text-gray-300 font-semibold text-lg">People Helped</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <FaChartBar className="text-4xl text-white" />
              </div>
              <p className="text-5xl font-bold text-white mb-2">{analytics?.totalQuantityDonated || 0}</p>
              <p className="text-gray-300 font-semibold text-lg">Total Portions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Get Started Section */}
      <div className="bg-white rounded-3xl p-8 shadow border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaUtensils className="text-green-600" />
          Getting Started Guide
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-2xl border-l-4 border-green-500 hover:shadow-lg transition-all duration-300 transform hover:translate-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <FaUtensils className="text-xl text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-lg">Share your first meal</p>
              <p className="text-sm text-gray-600">Help reduce food waste by sharing surplus food with your community</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-2xl border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300 transform hover:translate-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <FaShoppingCart className="text-xl text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-lg">Browse available food</p>
              <p className="text-sm text-gray-600">Discover and request meals shared by people in your neighborhood</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-2xl border-l-4 border-purple-500 hover:shadow-lg transition-all duration-300 transform hover:translate-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <FaChartBar className="text-xl text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-lg">Track your impact</p>
              <p className="text-sm text-gray-600">Monitor your contributions and see how you're making a difference</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;