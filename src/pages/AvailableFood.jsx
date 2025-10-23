import React, { useState } from 'react';
import Card1 from '../ShareingPage/Card1';
import { FaSearch, FaUtensils } from 'react-icons/fa';
import axios from 'axios';
import FoodFilters from '../components/FoodFilters';
import { useQuery } from '@tanstack/react-query';

const AvailableFood = () => {
  const [filters, setFilters] = useState({});

  // Use React Query for fetching foods with filters
  const { data: foods = [], isLoading } = useQuery({
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

      const { data } = await axios.get('https://mission-scic-assignment.vercel.app/available-food', {
        params
      });
      return data;
    },
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <button className="btn btn-square loading"></button> 
        {/* DaisyUI loading spinner */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
              <FaUtensils className="text-4xl text-gray-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Available Foods
          </h1>
          <p className="text-center text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover surplus food shared by your generous neighbors
          </p>
        </div>

        {/* Advanced Filters */}
        <FoodFilters onSearch={handleFilterChange} />

        {/* Results Count */}
        <div className="mb-6">
          <div className="bg-white rounded-xl p-4 shadow border border-gray-200 inline-block">
            <p className="text-gray-700">
              Showing <span className="font-bold text-gray-800 text-xl">{foods.length}</span> available food items
            </p>
          </div>
        </div>

        {/* Food Cards */}
        {foods.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {foods.map(food => <Card1 food={food} key={food._id} />)}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow p-20 text-center border border-gray-200">
            <div className="inline-block p-8 bg-gray-100 rounded-full mb-6">
              <FaSearch className="text-6xl text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-3">No foods found</p>
            <p className="text-gray-500 text-lg">Try adjusting your filters to find available food items</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableFood;