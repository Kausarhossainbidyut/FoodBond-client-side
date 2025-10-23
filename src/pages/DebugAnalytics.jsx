import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { API_URL } from '../config/api';
import { FaSync, FaChartBar, FaGlobe, FaUser, FaDatabase, FaBug } from 'react-icons/fa';

const DebugAnalytics = () => {
  const { user } = useContext(AuthContext);
  const [userAnalytics, setUserAnalytics] = useState(null);
  const [globalAnalytics, setGlobalAnalytics] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUserAnalytics = async () => {
    setLoading(true);
    try {
      console.log('Fetching user analytics...');
      console.log('Token:', user?.accessToken?.substring(0, 20) + '...');
      
      const response = await axios.get(`${API_URL}/analytics/user`, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`
        }
      });
      
      console.log('User Analytics Response:', response.data);
      setUserAnalytics(response.data);
      setErrors(prev => ({ ...prev, user: null }));
    } catch (error) {
      console.error('User Analytics Error:', error);
      setErrors(prev => ({ ...prev, user: error.message }));
    } finally {
      setLoading(false);
    }
  };

  const fetchGlobalAnalytics = async () => {
    setLoading(true);
    try {
      console.log('Fetching global analytics...');
      
      const response = await axios.get(`${API_URL}/analytics/global`);
      
      console.log('Global Analytics Response:', response.data);
      setGlobalAnalytics(response.data);
      setErrors(prev => ({ ...prev, global: null }));
    } catch (error) {
      console.error('Global Analytics Error:', error);
      setErrors(prev => ({ ...prev, global: error.message }));
    } finally {
      setLoading(false);
    }
  };

  const testAllEndpoints = async () => {
    await fetchUserAnalytics();
    await fetchGlobalAnalytics();
  };

  useEffect(() => {
    testAllEndpoints();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaBug className="text-green-600" />
            Analytics Debug Panel
          </h1>
          <p className="text-gray-600 mb-4">
            Debug tool to test analytics API endpoints
          </p>

          {/* API URL */}
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <FaServer className="text-gray-600" />
              Backend URL:
            </h3>
            <code className="text-sm text-green-600">{API_URL}</code>
          </div>

          {/* User Info */}
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <FaUser className="text-gray-600" />
              User Status:
            </h3>
            {user ? (
              <div className="text-sm">
                <p className="text-green-600 font-bold">Logged In</p>
                <p className="text-gray-600">Email: {user.email}</p>
                <p className="text-gray-600">Token: {user.accessToken ? 'Available' : 'Missing'}</p>
              </div>
            ) : (
              <p className="text-red-600 font-bold">Not logged in</p>
            )}
          </div>

          {/* Test Buttons */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <button
              onClick={fetchUserAnalytics}
              disabled={!user || loading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center gap-2"
            >
              <FaSync className={loading ? 'animate-spin' : ''} />
              {loading ? 'Testing...' : 'Test User Analytics'}
            </button>
            <button
              onClick={fetchGlobalAnalytics}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center gap-2"
            >
              <FaSync className={loading ? 'animate-spin' : ''} />
              {loading ? 'Testing...' : 'Test Global Analytics'}
            </button>
            <button
              onClick={testAllEndpoints}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center gap-2"
            >
              <FaSync className={loading ? 'animate-spin' : ''} />
              {loading ? 'Testing...' : 'Test All'}
            </button>
          </div>
        </div>

        {/* User Analytics Result */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaChartBar className="text-green-600" />
            User Analytics Result
          </h2>
          {errors.user ? (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-red-600 font-bold">Error:</p>
              <p className="text-red-500 text-sm">{errors.user}</p>
            </div>
          ) : userAnalytics ? (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-600 font-bold mb-3">Success!</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded border">
                  <p className="text-gray-600 text-sm">Total Donated</p>
                  <p className="text-3xl font-bold text-green-600">{userAnalytics.totalDonated}</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <p className="text-gray-600 text-sm">Total Requested</p>
                  <p className="text-3xl font-bold text-orange-600">{userAnalytics.totalRequested}</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <p className="text-gray-600 text-sm">Available Now</p>
                  <p className="text-3xl font-bold text-green-600">{userAnalytics.availableFoods}</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <p className="text-gray-600 text-sm">Pending Requests</p>
                  <p className="text-3xl font-bold text-orange-600">{userAnalytics.requestedFoods}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 font-bold mb-2">Raw JSON:</p>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                  {JSON.stringify(userAnalytics, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Click "Test User Analytics" to fetch data</p>
          )}
        </div>

        {/* Global Analytics Result */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaGlobe className="text-green-600" />
            Global Analytics Result
          </h2>
          {errors.global ? (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-red-600 font-bold">Error:</p>
              <p className="text-red-500 text-sm">{errors.global}</p>
            </div>
          ) : globalAnalytics ? (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-600 font-bold mb-3">Success!</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-4 rounded border">
                  <p className="text-gray-600 text-sm">Total Foods</p>
                  <p className="text-3xl font-bold text-green-600">{globalAnalytics.totalFoods}</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <p className="text-gray-600 text-sm">Available</p>
                  <p className="text-3xl font-bold text-green-600">{globalAnalytics.availableFoods}</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <p className="text-gray-600 text-sm">Requested</p>
                  <p className="text-3xl font-bold text-orange-600">{globalAnalytics.requestedFoods}</p>
                </div>
              </div>

              {/* Top Donors */}
              {globalAnalytics.topDonors && globalAnalytics.topDonors.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-800 font-bold mb-2">Top Donors:</p>
                  <div className="space-y-2">
                    {globalAnalytics.topDonors.map((donor, index) => (
                      <div key={index} className="bg-white p-3 rounded border flex justify-between items-center">
                        <div>
                          <span className="font-bold text-gray-400">#{index + 1}</span>
                          <span className="ml-3 text-gray-800">{donor.donorName || 'Anonymous'}</span>
                          <span className="ml-2 text-sm text-gray-500">({donor._id})</span>
                        </div>
                        <span className="text-xl font-bold text-green-600">{donor.totalDonations}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Foods by Location */}
              {globalAnalytics.foodsByLocation && globalAnalytics.foodsByLocation.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-800 font-bold mb-2">Foods by Location:</p>
                  <div className="space-y-2">
                    {globalAnalytics.foodsByLocation.map((location, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-800">{location._id || 'Unknown'}</span>
                          <span className="font-bold text-green-600">{location.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(location.count / globalAnalytics.totalFoods) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4">
                <p className="text-gray-600 font-bold mb-2">Raw JSON:</p>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                  {JSON.stringify(globalAnalytics, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Click "Test Global Analytics" to fetch data</p>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-orange-800 mb-2 flex items-center gap-2">
            <FaDatabase className="text-orange-600" />
            Instructions:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-orange-700">
            <li>Make sure you're logged in for user analytics</li>
            <li>Click "Test All" to test both endpoints</li>
            <li>Check the results above</li>
            <li>If you see errors, check browser console (F12)</li>
            <li>If data is empty (all zeros), add some food items first!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DebugAnalytics;