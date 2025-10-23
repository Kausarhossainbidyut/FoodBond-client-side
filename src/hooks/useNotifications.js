import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../config/api';

// Get notifications
export const useNotifications = (token) => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time feel
  });
};

// Get unread notification count
export const useUnreadCount = (token) => {
  return useQuery({
    queryKey: ['unreadCount'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/notifications/unread-count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token,
    refetchInterval: 30000,
  });
};

// Get pending requests count for food owners
export const usePendingRequestsCount = (token) => {
  return useQuery({
    queryKey: ['pendingRequestsCount'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/my-received-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Filter for pending requests only
      const pendingRequests = data.filter(request => request.status === 'pending');
      return { count: pendingRequests.length };
    },
    enabled: !!token,
    refetchInterval: 30000,
  });
};

// Mark notification as read
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, token }) => {
      const { data } = await axios.patch(
        `${API_URL}/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
    },
  });
};

// Mark all as read
export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (token) => {
      const { data } = await axios.patch(
        `${API_URL}/notifications/mark-all-read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
    },
  });
};

// Delete notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, token }) => {
      const { data } = await axios.delete(`${API_URL}/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadCount'] });
    },
  });
};

// Get user analytics
export const useUserAnalytics = (token) => {
  return useQuery({
    queryKey: ['userAnalytics'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/analytics/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token,
  });
};

// Get global analytics
export const useGlobalAnalytics = () => {
  return useQuery({
    queryKey: ['globalAnalytics'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/analytics/global`);
      return data;
    },
  });
};