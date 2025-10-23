import React, { useState } from 'react';
import { FaFilter, FaSearch, FaTimes } from 'react-icons/fa';

const FoodFilters = ({ onSearch }) => {
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
    <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-200 transition-all duration-300 hover:shadow-lg">
      {/* Basic Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Food Name Search */}
        <div className="relative">
          <input
            type="text"
            name="foodName"
            placeholder="Search by food name..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-all duration-300 transform hover:-translate-y-0.5"
            value={filters.foodName}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          {filters.foodName && (
            <button
              onClick={() => handleInputChange({ target: { name: 'foodName', value: '' } })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>

        {/* Location Filter */}
        <div className="relative">
          <input
            type="text"
            name="location"
            placeholder="Filter by location..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-all duration-300 transform hover:-translate-y-0.5"
            value={filters.location}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          {filters.location && (
            <button
              onClick={() => handleInputChange({ target: { name: 'location', value: '' } })}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>

        {/* Sort By */}
        <div>
          <select
            name="sortBy"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAuNjY2NzQ4IDEuNUMwLjY2Njc0OCAxLjIyMzg2IDAuODg4NjMzIDEgMS4xNjI3NSAxSDkuODMwNzVDMTAuMTA0OSAxIDEwLjMyNjggMS4yMjM4NiAxMC4zMjY4IDEuNUMxMC4zMjY4IDEuNzIzODYgMTAuMTA0OSAxLjk5OTk5IDkuODMwNzUgMS45OTk5OUg4LjY2Njc1VjYuNUM4LjY2Njc1IDYuNzIzODYgOC40NDQ4NyA2Ljk5OTk5IDguMTcwNzUgNi45OTk5OUM3LjkwNjYzIDYuOTk5OTkgNy42ODQ3NSA2LjcyMzg2IDcuNjg0NzUgNi41VjEuOTk5OTlIMy4zMjY3NVY2LjVDMy4zMjY3NSA2LjcyMzg2IDMuMTA0ODcgNi45OTk5OSAyLjgzMDc1IDYuOTk5OTlDMi41NTY2MyA2Ljk5OTk5IDIuMzM0NzUgNi43MjM4NiAyLjMzNDc1IDYuNVYxLjk5OTk5SDEuMTYyNzVDMC44ODg2MzMgMS45OTk5OSAwLjY2Njc0OCAxLjcyMzg2IDAuNjY2NzQ4IDEuNVoiIGZpbGw9IiMxNmEzNGEiLz48L3N2Zz4=')] bg-no-repeat bg-[right_12px_center] transition-all duration-300 transform hover:-translate-y-0.5"
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
        className="text-green-600 hover:text-green-700 text-sm font-semibold mb-4 flex items-center gap-2 transition-colors"
      >
        <FaFilter />
        {showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
      </button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5 p-4 bg-green-50 rounded-lg border border-green-200 transition-all duration-300">
          {/* Quantity Range */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Min Quantity
            </label>
            <input
              type="number"
              name="minQuantity"
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-all duration-300 transform hover:-translate-y-0.5"
              value={filters.minQuantity}
              onChange={handleInputChange}
              min="0"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Max Quantity
            </label>
            <input
              type="number"
              name="maxQuantity"
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-all duration-300 transform hover:-translate-y-0.5"
              value={filters.maxQuantity}
              onChange={handleInputChange}
              min="0"
            />
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-all duration-300 transform hover:-translate-y-0.5"
              value={filters.startDate}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-all duration-300 transform hover:-translate-y-0.5"
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
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <FaSearch />
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FoodFilters;