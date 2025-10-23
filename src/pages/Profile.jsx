import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FaUser, FaEnvelope, FaCalendar, FaCheckCircle, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">My Profile</h1>
          <p className="text-green-100 text-lg">Manage your account information and preferences</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-3xl">
        <div className="relative h-40 bg-gradient-to-br from-green-500 via-green-600 to-green-700">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20"></div>
        </div>
        <div className="px-8 pb-8">
          <div className="relative -mt-20 mb-6">
            <div className="relative inline-block">
              <img
                src={user?.photoURL || 'https://ui-avatars.com/api/?name=User&background=random&size=128'}
                alt={user?.displayName}
                className="w-36 h-36 rounded-full border-4 border-white shadow-2xl ring-4 ring-green-100 transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
              <button className="absolute -bottom-1 -right-1 bg-gradient-to-br from-green-500 to-green-600 text-white p-3 rounded-full hover:scale-110 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5">
                <FaEdit className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Name */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <FaUser className="text-white w-4 h-4" />
                </div>
                Full Name
              </label>
              <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-5 border border-gray-200 group-hover:border-green-300 transition-all duration-300 transform hover:-translate-y-0.5">
                <p className="text-lg font-semibold text-gray-800">
                  {user?.displayName || 'Not provided'}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
                  <FaEnvelope className="text-white w-4 h-4" />
                </div>
                Email Address
              </label>
              <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-5 border border-gray-200 group-hover:border-green-300 transition-all duration-300 flex items-center justify-between transform hover:-translate-y-0.5">
                <p className="text-lg font-semibold text-gray-800">{user?.email}</p>
                {user?.emailVerified && (
                  <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    <FaCheckCircle />
                    Verified
                  </span>
                )}
              </div>
            </div>

            {/* Account Created */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <FaCalendar className="text-white w-4 h-4" />
                </div>
                Member Since
              </label>
              <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-5 border border-gray-200 group-hover:border-green-300 transition-all duration-300 transform hover:-translate-y-0.5">
                <p className="text-lg font-semibold text-gray-800">
                  {user?.metadata?.creationTime 
                    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'N/A'}
                </p>
              </div>
            </div>

            {/* Last Login */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
                  <FaCalendar className="text-white w-4 h-4" />
                </div>
                Last Login
              </label>
              <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-5 border border-gray-200 group-hover:border-green-300 transition-all duration-300 transform hover:-translate-y-0.5">
                <p className="text-lg font-semibold text-gray-800">
                  {user?.metadata?.lastSignInTime 
                    ? new Date(user.metadata.lastSignInTime).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Stats */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-green-100 to-green-50 rounded-3xl p-8 shadow-xl border border-green-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-200/20 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-8">Account Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-green-200">
            <p className="text-gray-500 text-sm mb-2 font-medium">Account Type</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">Free Member</p>
          </div>
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-green-200">
            <p className="text-gray-500 text-sm mb-2 font-medium">Account Status</p>
            <p className="text-2xl font-bold text-green-600">✓ Active</p>
          </div>
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-green-200">
            <p className="text-gray-500 text-sm mb-2 font-medium">Email Verified</p>
            <p className="text-2xl font-bold">
              {user?.emailVerified ? (
                <span className="text-green-600">✓ Verified</span>
              ) : (
                <span className="text-orange-500">⚠ Not Verified</span>
              )}
            </p>
          </div>
          <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-green-200">
            <p className="text-gray-500 text-sm mb-2 font-medium">Auth Provider</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent capitalize">
              {user?.providerData?.[0]?.providerId || 'Email'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;