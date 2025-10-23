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
import Swal from 'sweetalert2';

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
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
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg shadow-lg transition-colors"
      >
        {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-80 bg-gray-800 text-white transform transition-all duration-300 ease-in-out shadow-xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full backdrop-blur-sm">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-white/10 bg-white/5">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shadow-md">
                <FaUtensils className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">FoodBond</h1>
                <p className="text-xs text-gray-300 font-medium">Dashboard</p>
              </div>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-700 bg-gray-700/30">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={user?.photoURL || 'https://ui-avatars.com/api/?name=User&background=random'}
                  alt={user?.displayName}
                  className="w-12 h-12 rounded-lg border-2 border-green-500 shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold truncate text-lg">{user?.displayName || 'User'}</p>
                <p className="text-xs text-gray-300 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <div className="mb-4 px-3">
              <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">Menu</p>
            </div>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center gap-4 px-5 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-green-600 text-white'
                          : 'hover:bg-gray-700 text-gray-100'
                      }`
                    }
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                    <span className="font-semibold text-sm">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>


        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-4 lg:p-8 min-h-full">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </div>
  );
};

export default Dashboard;