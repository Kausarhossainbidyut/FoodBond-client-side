import React, { useContext } from 'react';
import { Link, Outlet, NavLink } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { 
  FaHome, 
  FaUtensils, 
  FaListAlt, 
  FaShoppingCart, 
  FaBell, 
  FaChartBar, 
  FaUser,
  FaInbox,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useState } from 'react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: <FaHome />, label: 'Dashboard Home', end: true },
    { path: '/dashboard/add-food', icon: <FaUtensils />, label: 'Add Food' },
    { path: '/dashboard/manage-foods', icon: <FaListAlt />, label: 'Manage My Foods' },
    { path: '/dashboard/my-requests', icon: <FaShoppingCart />, label: 'My Requests' },
    { path: '/dashboard/received-requests', icon: <FaInbox />, label: 'Received Requests' },
    { path: '/dashboard/notifications', icon: <FaBell />, label: 'Notifications' },
    { path: '/dashboard/analytics', icon: <FaChartBar />, label: 'Analytics' },
    { path: '/dashboard/profile', icon: <FaUser />, label: 'Profile' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110"
      >
        {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white text-gray-800 transform transition-all duration-300 ease-in-out shadow-xl border-r border-gray-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-5 border-b border-gray-200">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110">
                <FaUtensils className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">FoodBond</h1>
                <p className="text-xs text-gray-500 font-medium">Dashboard</p>
              </div>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-5 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={user?.photoURL || 'https://ui-avatars.com/api/?name=User&background=random'}
                  alt={user?.displayName}
                  className="w-12 h-12 rounded-lg border-2 border-green-500 shadow-sm transition-transform duration-300 hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://ui-avatars.com/api/?name=User&background=random';
                  }}
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white transition-all duration-300"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate text-sm">{user?.displayName || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <div className="mb-3 px-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Menu</p>
            </div>
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
                        isActive
                          ? 'bg-green-100 text-green-700 font-semibold'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`
                    }
                  >
                    <span className="text-lg transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                    <span className="font-medium text-sm">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-6 min-h-full bg-gray-50">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
        />
      )}
    </div>
  );
};

export default Dashboard;