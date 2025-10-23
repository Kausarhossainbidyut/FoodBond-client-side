import React, { useState } from 'react';
import Card1 from '../ShareingPage/Card1';
import CardStyle2 from '../components/CardStyle2';
import { FaSearch, FaUtensils, FaThLarge, FaBars } from 'react-icons/fa';
import axios from 'axios';
import FoodFilters from '../components/FoodFilters';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../config/api';
import LoadingSpinner from '../components/LoadingSpinner';

const AvailableFood = () => {
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Use React Query for fetching foods with filters
  const { data: foods = [], isLoading, isError, error } = useQuery({
    queryKey: ['availableFoods', filters],
    queryFn: async () => {
      const params = {};
      if (filters.foodName) params.foodName = filters.foodName;
      if (filters.location) params.location = filters.location;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.minQuantity) params.minQuantity = filters.minQuantity;
      if (filters.maxQuantity) params.maxQuantity = filters.maxQuantity;
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;

      const { data } = await axios.get(`${API_URL}/available-food`, {
        params
      });
      return data;
    },
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const renderCard = (food) => {
    if (viewMode === 'list') {
      return <CardStyle2 food={food} key={food._id} />;
    }
    return <Card1 food={food} key={food._id} />;
  };

  if (isLoading) {
    return <LoadingSpinner size="large" message="Loading available foods..." />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-6 rounded-lg shadow-sm max-w-md border border-gray-200 animate-fadeIn">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaSearch className="text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Error Loading Foods</h3>
          <p className="text-gray-600 text-sm mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-block mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
              <FaUtensils className="text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Available Foods
          </h1>
          <p className="text-center text-gray-600 text-sm max-w-md mx-auto">
            Discover surplus food shared by your generous neighbors
          </p>
        </div>

        {/* Advanced Filters */}
        <div className="animate-fadeInUp">
          <FoodFilters onSearch={handleFilterChange} />
        </div>

        {/* View Controls and Results Count */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 animate-fadeInUp">
          <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
            <p className="text-gray-700 text-sm">
              Showing <span className="font-bold text-gray-800">{foods.length}</span> available food {foods.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex bg-white rounded-lg border border-gray-300 p-1 transition-all duration-300 hover:shadow-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all duration-300 transform hover:scale-110 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600'}`}
              title="Grid View"
            >
              <FaThLarge size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all duration-300 transform hover:scale-110 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600'}`}
              title="List View"
            >
              <FaBars size={16} />
            </button>
          </div>
        </div>

        {/* Food Cards */}
        {foods.length > 0 ? (
          <div className={
            viewMode === 'list' 
              ? 'space-y-5 animate-fadeInUp' 
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fadeInUp'
          }>
            {foods.map(renderCard)}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200 animate-fadeIn">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4 transition-all duration-300 hover:scale-110">
              <FaSearch className="text-4xl text-gray-400" />
            </div>
            <p className="text-lg font-bold text-gray-800 mb-2">No foods found</p>
            <p className="text-gray-600 mb-4">Try adjusting your filters to find available food items</p>
            <button
              onClick={() => {
                setFilters({});
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableFood;