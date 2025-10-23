import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useFeaturedFoods, useAvailableFoods } from '../hooks/useFoods';
import { useNotifications, useUserAnalytics, useGlobalAnalytics } from '../hooks/useNotifications';
import { FaCheckCircle, FaTimesCircle, FaDatabase, FaServer, FaCode, FaUtensils, FaClipboardList, FaBell, FaChartBar, FaUser, FaGlobe } from 'react-icons/fa';
import { API_URL } from '../config/api';

const ConnectionTest = () => {
  const { user } = useContext(AuthContext);
  
  // Test all data fetching
  const featuredFoods = useFeaturedFoods();
  const availableFoods = useAvailableFoods();
  const notifications = useNotifications(user?.accessToken);
  const userAnalytics = useUserAnalytics(user?.accessToken);
  const globalAnalytics = useGlobalAnalytics();

  const ConnectionStatus = ({ title, isLoading, isError, data, dataKey }) => {
    const count = data ? (Array.isArray(data) ? data.length : (dataKey ? data[dataKey] : 'N/A')) : 0;
    
    return (
      <div className={`p-4 rounded-lg border-2 ${
        isError ? 'border-red-600 bg-red-50' : 
        isLoading ? 'border-orange-600 bg-orange-50' : 
        'border-green-600 bg-green-50'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-800">{title}</h3>
          {isLoading ? (
            <span className="text-orange-600 animate-pulse">Loading...</span>
          ) : isError ? (
            <FaTimesCircle className="text-red-600 text-xl" />
          ) : (
            <FaCheckCircle className="text-green-600 text-xl" />
          )}
        </div>
        <div className="text-sm text-gray-600">
          {isError ? (
            <span className="text-red-600">Connection Failed</span>
          ) : isLoading ? (
            <span className="text-orange-600">Fetching data...</span>
          ) : (
            <span className="text-green-600">
              Connected - {Array.isArray(data) ? `${count} items` : `Data loaded`}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FaDatabase className="text-4xl text-green-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Database Connection Test
              </h1>
              <p className="text-gray-600">
                Testing all backend connections and data fetching
              </p>
            </div>
          </div>
          
          {/* Backend URL */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FaServer className="text-green-600" />
              <span className="font-bold">Backend URL:</span>
            </div>
            <code className="text-sm text-green-600">
              {API_URL}
            </code>
          </div>
        </div>

        {/* Connection Tests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ConnectionStatus
            title="Featured Foods"
            isLoading={featuredFoods.isLoading}
            isError={featuredFoods.isError}
            data={featuredFoods.data}
          />
          
          <ConnectionStatus
            title="Available Foods"
            isLoading={availableFoods.isLoading}
            isError={availableFoods.isError}
            data={availableFoods.data}
          />
          
          {user && (
            <>
              <ConnectionStatus
                title="Notifications"
                isLoading={notifications.isLoading}
                isError={notifications.isError}
                data={notifications.data}
              />
              
              <ConnectionStatus
                title="User Analytics"
                isLoading={userAnalytics.isLoading}
                isError={userAnalytics.isError}
                data={userAnalytics.data}
                dataKey="totalDonated"
              />
            </>
          )}
          
          <ConnectionStatus
            title="Global Analytics"
            isLoading={globalAnalytics.isLoading}
            isError={globalAnalytics.isError}
            data={globalAnalytics.data}
            dataKey="totalFoods"
          />
        </div>

        {/* Data Preview */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaCode className="text-green-600" />
            Live Data Preview
          </h2>
          
          {/* Featured Foods Preview */}
          {featuredFoods.data && featuredFoods.data.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2 text-green-600">
                Featured Foods Data ({featuredFoods.data.length} items)
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">
                  {JSON.stringify(featuredFoods.data.slice(0, 2), null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Available Foods Preview */}
          {availableFoods.data && availableFoods.data.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2 text-green-600">
                Available Foods Data ({availableFoods.data.length} items)
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">
                  {JSON.stringify(availableFoods.data.slice(0, 2), null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Global Analytics Preview */}
          {globalAnalytics.data && (
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2 text-green-600">
                Global Analytics Data
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">
                  {JSON.stringify(globalAnalytics.data, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* User Auth Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <FaUser className="text-gray-600" />
              User Authentication Status
            </h3>
            {user ? (
              <div className="text-sm">
                <p className="text-green-600 font-bold">User Logged In</p>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">Name: {user.displayName || 'N/A'}</p>
              </div>
            ) : (
              <p className="text-red-600 font-bold">No user logged in</p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaChartBar className="text-white" />
            Connection Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-3xl font-bold">
                {featuredFoods.data?.length || 0}
              </div>
              <div className="text-sm">Featured Foods</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-3xl font-bold">
                {availableFoods.data?.length || 0}
              </div>
              <div className="text-sm">Available Foods</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-3xl font-bold">
                {globalAnalytics.data?.totalFoods || 0}
              </div>
              <div className="text-sm">Total Foods in Database</div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg font-bold">
              {featuredFoods.data && availableFoods.data && globalAnalytics.data
                ? 'All connections working perfectly!'
                : 'Loading data...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionTest;