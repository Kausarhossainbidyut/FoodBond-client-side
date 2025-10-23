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
      icon: <FaUtensils />,
      color: 'bg-green-100 text-green-700',
      link: '/dashboard/manage-foods'
    },
    {
      title: 'Foods Requested',
      value: analytics?.totalRequested || 0,
      icon: <FaShoppingCart />,
      color: 'bg-blue-100 text-blue-700',
      link: '/dashboard/my-requests'
    },
    {
      title: 'Available Foods',
      value: analytics?.availableFoods || 0,
      icon: <FaListAlt />,
      color: 'bg-purple-100 text-purple-700',
      link: '/dashboard/manage-foods'
    },
    {
      title: 'Pending Requests',
      value: pendingRequests?.count || 0,
      icon: <FaInbox />,
      color: 'bg-orange-100 text-orange-700',
      link: '/dashboard/received-requests'
    },
  ];

  const quickActions = [
    {
      title: 'Add New Food',
      description: 'Share surplus food with the community',
      icon: <FaUtensils />,
      color: 'bg-green-600',
      link: '/dashboard/add-food'
    },
    {
      title: 'Manage Foods',
      description: 'View and edit your food listings',
      icon: <FaListAlt />,
      color: 'bg-blue-600',
      link: '/dashboard/manage-foods'
    },
    {
      title: 'My Requests',
      description: 'Track your food requests',
      icon: <FaShoppingCart />,
      color: 'bg-purple-600',
      link: '/dashboard/my-requests'
    },
    {
      title: 'View Requests',
      description: 'Manage requests for your foods',
      icon: <FaInbox />,
      color: 'bg-orange-600',
      link: '/dashboard/received-requests'
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.displayName || 'User'}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your food sharing journey today
        </p>
      </div>

      {/* Statistics Cards */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaChartBar className="text-green-600" />
          Your Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.color} transition-all duration-300 transform hover:scale-110`}>
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaArrowRight className="text-green-600" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg text-white ${action.color} transition-all duration-300 transform hover:scale-110`}>
                  {action.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{action.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{action.description}</p>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    Get Started <FaArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Impact Summary */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaTrophy className="text-yellow-500" />
          Your Impact Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 hover:scale-110">
              <FaHeart className="text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{analytics?.totalDonated || 0}</p>
            <p className="text-gray-600 font-medium">Meals Shared</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 hover:scale-110">
              <FaUsers className="text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{analytics?.requestsReceived || 0}</p>
            <p className="text-gray-600 font-medium">People Helped</p>
          </div>
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 hover:scale-110">
              <FaChartBar className="text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{analytics?.totalQuantityDonated || 0}</p>
            <p className="text-gray-600 font-medium">Total Portions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;