// API Configuration
// Backend server URL - change this based on your environment

// For local development
export const API_URL = 'http://localhost:5000';

// For production (Vercel deployment)
// export const API_URL = 'https://mission-scic-assignment.vercel.app';

// API endpoints
export const API_ENDPOINTS = {
  // Food endpoints
  FEATURED_FOODS: '/featured-foods',
  AVAILABLE_FOOD: '/available-food',
  FOOD_DETAILS: '/food-details',
  MANAGE_MY_FOOD: '/manage-my-food',
  MY_FOOD_REQUEST: '/my-food-request',
  ADD_FOOD: '/add-food',
  REQUEST_FOOD: '/request',
  CANCEL_REQUEST: '/cancel-request',
  DELETE_FOOD: '/manage-my-food',
  
  // Notification endpoints
  NOTIFICATIONS: '/notifications',
  UNREAD_COUNT: '/notifications/unread-count',
  MARK_AS_READ: '/notifications',
  MARK_ALL_READ: '/notifications/mark-all-read',
  DELETE_NOTIFICATION: '/notifications',
  
  // Analytics endpoints
  USER_ANALYTICS: '/analytics/user',
  GLOBAL_ANALYTICS: '/analytics/global',
};

export default API_URL;
