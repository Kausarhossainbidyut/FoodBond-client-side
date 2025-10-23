import React, { useState } from 'react';
import { FaFilter, FaSearch, FaSortAmountDown } from 'react-icons/fa';

const FoodFilters = ({ onFilterChange, onSearch }) => {
  const [filters, setFilters] = useState({
    foodName: '',
    location: '',
    sortBy: 'expiry-nearest',
    minQuantity: '',
    maxQuantity: '',
    startDate: '',
    endDate: ''
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      foodName: '',
      location: '',
      sortBy: 'expiry-nearest',
      minQuantity: '',
      maxQuantity: '',
      startDate: '',
      endDate: ''
    };
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Basic Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Food Name Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Food
          </label>
          <input
            type="text"
            name="foodName"
            placeholder="Enter food name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.foodName}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="Enter location..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.location}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            name="sortBy"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.sortBy}
            onChange={handleInputChange}
          >
            <option value="expiry-nearest">Expiry (Nearest First)</option>
            <option value="expiry-farthest">Expiry (Farthest First)</option>
            <option value="quantity-high">Quantity (High to Low)</option>
            <option value="quantity-low">Quantity (Low to High)</option>
            <option value="name-asc">Name (A to Z)</option>
            <option value="name-desc">Name (Z to A)</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-blue-600 hover:text-blue-700 font-medium mb-3 flex items-center gap-2"
      >
        <FaFilter />
        {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
      </button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
          {/* Quantity Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Quantity
            </label>
            <input
              type="number"
              name="minQuantity"
              placeholder="Minimum quantity"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.minQuantity}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Quantity
            </label>
            <input
              type="number"
              name="maxQuantity"
              placeholder="Maximum quantity"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.maxQuantity}
              onChange={handleInputChange}
            />
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Start Date
            </label>
            <input
              type="date"
              name="startDate"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.startDate}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry End Date
            </label>
            <input
              type="date"
              name="endDate"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.endDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <FaSearch />
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FoodFilters;
