import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useFoodDetails } from '../hooks/useFoods';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import { API_URL } from '../config/api';
import { FaUtensils, FaCamera, FaBox, FaCalendarAlt, FaMapMarkerAlt, FaStickyNote, FaEdit, FaArrowLeft } from 'react-icons/fa';

const EditFood = () => {
  const { foodId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: food, isLoading } = useFoodDetails(foodId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: '',
    quantity: '',
    expirationDate: '',
    location: '',
    notes: ''
  });

  useEffect(() => {
    if (food) {
      setFormData({
        foodName: food.foodName || '',
        foodImage: food.foodImage || '',
        quantity: food.quantity || '',
        expirationDate: food.expirationDate || '',
        location: food.location || '',
        notes: food.notes || ''
      });
    }
  }, [food]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `${API_URL}/update-food/${foodId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      if (response.data.modifiedCount > 0 || response.data.matchedCount > 0) {
        Swal.fire({
          title: 'Success!',
          text: 'Food updated successfully!',
          icon: 'success',
          confirmButtonColor: '#16a249',
        }).then(() => {
          navigate('/manage-my-food');
        });
      }
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update food. Please try again.',
        icon: 'error',
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="large" message="Loading food details..." />;
  }

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Food Not Found</h2>
          <button
            onClick={() => navigate('/manage-my-food')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Back to My Foods
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaEdit className="text-white text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-orange-600 mb-4">
            Edit Food Item
          </h1>
          <p className="text-gray-600 text-lg">Update your shared food details</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md space-y-6 border border-gray-200"
        >
          {/* Food Name */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <FaUtensils className="text-orange-600" />
              Food Name
            </label>
            <input
              type="text"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              placeholder="e.g., Vegetable Soup"
              className="w-full border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-lg px-4 py-3 text-sm transition outline-none group-hover:border-orange-300"
              required
            />
          </div>

          {/* Food Image */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <FaCamera className="text-orange-600" />
              Food Image URL
            </label>
            <input
              type="url"
              name="foodImage"
              value={formData.foodImage}
              onChange={handleChange}
              placeholder="Enter food image url..."
              className="w-full border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-lg px-4 py-3 text-sm transition outline-none group-hover:border-orange-300"
              required
            />
            {formData.foodImage && (
              <img
                src={formData.foodImage}
                alt="Preview"
                className="mt-4 w-40 h-40 object-cover rounded-xl border-4 border-orange-100 shadow-md"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>

          {/* Quantity & Expiration Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <FaBox className="text-orange-600" />
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                placeholder="e.g., 10"
                className="w-full border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-lg px-4 py-3 text-sm transition outline-none group-hover:border-orange-300"
                required
              />
            </div>

            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <FaCalendarAlt className="text-orange-600" />
                Expiration Date
              </label>
              <input
                type="date"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-lg px-4 py-3 text-sm transition outline-none group-hover:border-orange-300"
                required
              />
            </div>
          </div>

          {/* Pickup Location */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <FaMapMarkerAlt className="text-orange-600" />
              Pickup Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., 123 Main St, Dhaka"
              className="w-full border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-lg px-4 py-3 text-sm transition outline-none group-hover:border-orange-300"
              required
            />
          </div>

          {/* Notes */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <FaStickyNote className="text-orange-600" />
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Optional notes about the food..."
              rows="4"
              className="w-full border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-lg px-4 py-3 text-sm transition outline-none resize-none group-hover:border-orange-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/manage-my-food')}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg py-3 text-sm font-semibold transition-colors"
              disabled={isSubmitting}
            >
              <FaArrowLeft className="inline mr-2" /> Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg py-3 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Updating...
                </span>
              ) : (
                'Update Food'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFood;