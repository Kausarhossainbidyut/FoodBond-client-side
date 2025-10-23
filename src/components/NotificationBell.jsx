import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { useUnreadCount, usePendingRequestsCount } from '../hooks/useNotifications';
import { FaBell, FaInbox } from 'react-icons/fa';

const NotificationBell = () => {
  const { user } = useContext(AuthContext);
  const { data: notificationsData } = useUnreadCount(user?.accessToken);
  const { data: requestsData } = usePendingRequestsCount(user?.accessToken);
  
  const unreadCount = notificationsData?.count || 0;
  const pendingRequestsCount = requestsData?.count || 0;
  const totalUnread = unreadCount + pendingRequestsCount;
  
  const prevCountRef = useRef(totalUnread);
  
  // Play sound when new notifications arrive
  useEffect(() => {
    const prevCount = prevCountRef.current;
    if (totalUnread > prevCount && prevCount !== undefined) {
      // Play notification sound
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Audio play failed:', e));
    }
    prevCountRef.current = totalUnread;
  }, [totalUnread]);

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      {/* Requests Indicator */}
      {pendingRequestsCount > 0 && (
        <Link to="/dashboard/received-requests" className="relative">
          <FaInbox className="text-xl text-gray-700 hover:text-gray-900 transition" />
          <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center">
            {pendingRequestsCount > 9 ? '9+' : pendingRequestsCount}
          </span>
        </Link>
      )}
      
      {/* Notifications Indicator */}
      <Link to="/notifications" className="relative">
        <FaBell className="text-xl text-gray-700 hover:text-gray-900 transition" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gray-700 text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default NotificationBell;