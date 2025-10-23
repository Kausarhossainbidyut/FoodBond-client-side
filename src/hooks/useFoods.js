import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../config/api';

// Get featured foods
export const useFeaturedFoods = () => {
  return useQuery({
    queryKey: ['featuredFoods'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/featured-foods`);
      return data;
    },
  });
};

// Get available foods with search
export const useAvailableFoods = (searchTerm = '') => {
  return useQuery({
    queryKey: ['availableFoods', searchTerm],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/available-food`, {
        params: searchTerm ? { foodName: searchTerm } : {},
      });
      return data;
    },
  });
};

// Get food details
export const useFoodDetails = (foodId) => {
  return useQuery({
    queryKey: ['foodDetails', foodId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/food-details/${foodId}`);
      return data;
    },
    enabled: !!foodId,
  });
};

// Get my managed foods
export const useMyManagedFoods = (token) => {
  return useQuery({
    queryKey: ['myManagedFoods'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/manage-my-food`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token,
  });
};

// Get my food requests
export const useMyFoodRequests = (token) => {
  return useQuery({
    queryKey: ['myFoodRequests'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/my-food-request`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token,
  });
};

// Get received food requests (for food owners)
export const useReceivedFoodRequests = (token) => {
  return useQuery({
    queryKey: ['receivedFoodRequests'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/my-received-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token,
  });
};

// Add food mutation
export const useAddFood = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (foodData) => {
      const { data } = await axios.post(`${API_URL}/add-food`, foodData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availableFoods'] });
      queryClient.invalidateQueries({ queryKey: ['featuredFoods'] });
      queryClient.invalidateQueries({ queryKey: ['myManagedFoods'] });
    },
  });
};

// Request food mutation - UPDATED FOR QUANTITY-BASED REQUESTS
export const useRequestFood = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, userNotes, requestedQuantity, token }) => {
      const { data } = await axios.patch(
        `${API_URL}/request/${id}`,
        { userNotes, requestedQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availableFoods'] });
      queryClient.invalidateQueries({ queryKey: ['featuredFoods'] });
      queryClient.invalidateQueries({ queryKey: ['myFoodRequests'] });
      queryClient.invalidateQueries({ queryKey: ['myManagedFoods'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

// Cancel request mutation - UPDATED FOR QUANTITY-BASED REQUESTS
export const useCancelRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, token }) => {
      const { data } = await axios.patch(
        `${API_URL}/cancel-request/${id}`,
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
      queryClient.invalidateQueries({ queryKey: ['myFoodRequests'] });
      queryClient.invalidateQueries({ queryKey: ['availableFoods'] });
      queryClient.invalidateQueries({ queryKey: ['featuredFoods'] });
      queryClient.invalidateQueries({ queryKey: ['myManagedFoods'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

// Update request status mutation (accept/reject/complete)
export const useUpdateRequestStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status, token }) => {
      const { data } = await axios.patch(
        `${API_URL}/request-status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['receivedFoodRequests'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

// Delete food mutation
export const useDeleteFood = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(`${API_URL}/manage-my-food/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myManagedFoods'] });
      queryClient.invalidateQueries({ queryKey: ['availableFoods'] });
    },
  });
};