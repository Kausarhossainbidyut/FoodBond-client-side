import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useNotifications, useMarkAsRead, useMarkAllAsRead, useDeleteNotification } from '../hooks/useNotifications';
import { FaBell, FaCheck, FaTrash, FaCheckDouble } from 'react-icons/fa';
import Swal from 'sweetalert2';
import LoadingSpinner from '../components/LoadingSpinner';

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const { data: notifications, isLoading } = useNotifications(user?.accessToken);
  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();
  const deleteNotification = useDeleteNotification();

  const handleMarkAsRead = (id) => {
    markAsRead.mutate({ id, token: user.accessToken });
  };

  const handleMarkAllAsRead = () => {
    Swal.fire({
      title: 'Mark all as read?',
      text: 'This will mark all notifications as read',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, mark all!'
    }).then((result) => {
      if (result.isConfirmed) {
        markAllAsRead.mutate(user.accessToken);
        Swal.fire('Done!', 'All notifications marked as read', 'success');
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete notification?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNotification.mutate({ id, token: user.accessToken });
        Swal.fire('Deleted!', 'Notification has been deleted', 'success');
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner size="large" message="Loading notifications..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <FaBell className="text-blue-600" />
            Notifications
          </h1>
          {notifications && notifications.length > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105 flex items-center gap-2 font-medium shadow-lg"
            >
              <FaCheckDouble />
              Mark All as Read
            </button>
          )}
        </div>

        {!notifications || notifications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="mb-6">
              <div className="inline-block p-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full">
                <FaBell className="text-blue-600 text-6xl" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No notifications yet</h2>
            <p className="text-gray-600 text-lg">You'll see updates here when someone requests your food 🍽️</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`bg-white rounded-xl shadow-md hover:shadow-xl p-5 flex items-start justify-between transition-all duration-300 transform hover:scale-[1.02] ${
                  !notification.isRead ? 'border-l-4 border-blue-600 bg-gradient-to-r from-blue-50 to-white' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        notification.type === 'food_requested'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {notification.type === 'food_requested' ? '🍽️ Food Request' : 'ℹ️ Info'}
                    </span>
                    {!notification.isRead && (
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                        ✨ New
                      </span>
                    )}
                  </div>
                  <p className="text-gray-800 mb-2 font-medium">{notification.message}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span>🕒</span>
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2 ml-4">
                  {!notification.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notification._id)}
                      className="text-green-600 hover:text-white hover:bg-green-600 p-2.5 rounded-lg transition transform hover:scale-110"
                      title="Mark as read"
                    >
                      <FaCheck size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notification._id)}
                    className="text-red-600 hover:text-white hover:bg-red-600 p-2.5 rounded-lg transition transform hover:scale-110"
                    title="Delete"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
