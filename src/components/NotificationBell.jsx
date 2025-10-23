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
        <Link to="/dashboard/received-requests" className="relative transition-transform duration-300 hover:scale-110">
          <FaInbox className="text-xl text-green-600 hover:text-green-700 transition" />
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
            {pendingRequestsCount > 9 ? '9+' : pendingRequestsCount}
          </span>
        </Link>
      )}
      
      {/* Notifications Indicator */}
      <Link to="/notifications" className="relative transition-transform duration-300 hover:scale-110">
        <FaBell className="text-xl text-green-600 hover:text-green-700 transition" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Link>
    </div>
  );
};

export default NotificationBell;