import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import { useAddFood } from '../hooks/useFoods';
import { useNavigate } from 'react-router';
import { FaUtensils, FaCamera, FaBox, FaCalendarAlt, FaMapMarkerAlt, FaStickyNote } from 'react-icons/fa';

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const addFood = useAddFood();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.donorEmail = user.email;
    data.donorName = user.displayName;
    data.donorImage = user.photoURL;
    data.status = "available";

    addFood.mutate(data, {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Food added successfully!",
          icon: "success",
          confirmButtonColor: "#16a34a",
        });
        form.reset();
        setTimeout(() => navigate('/dashboard/manage-foods'), 1500);
      },
      onError: (error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to add food. Please try again.",
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      },
      onSettled: () => {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block mb-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center transform transition-transform hover:scale-110">
              <FaUtensils className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2 transition-all duration-300 hover:text-green-600">
            Share Surplus Food
          </h1>
          <p className="text-gray-600 text-sm max-w-md mx-auto">Help reduce food waste and feed those in need by sharing your surplus meals</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-lg shadow-sm space-y-4 border border-gray-200 transition-all duration-300 hover:shadow-lg"
        >
          {/* Food Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FaUtensils className="text-green-600" size={14} />
              Food Name
            </label>
            <input
              type="text"
              name="foodName"
              placeholder="e.g., Vegetable Soup, Chicken Curry"
              className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 rounded-lg px-3 py-2 text-sm transition-all duration-300 transform hover:-translate-y-0.5"
              required
            />
          </div>

          {/* Food Image */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FaCamera className="text-green-600" size={14} />
              Food Image URL
            </label>
            <input
              type="url"
              name="foodImage"
              placeholder="Enter food image url..."
              className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 rounded-lg px-3 py-2 text-sm transition-all duration-300 transform hover:-translate-y-0.5"
              required
            />
          </div>

          {/* Quantity & Expiration Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FaBox className="text-green-600" size={14} />
                Quantity (portions)
              </label>
              <input
                type="number"
                name="quantity"
                min="1"
                placeholder="e.g., 10"
                className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 rounded-lg px-3 py-2 text-sm transition-all duration-300 transform hover:-translate-y-0.5"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="text-green-600" size={14} />
                Expiration Date
              </label>
              <input
                type="date"
                name="expirationDate"
                className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 rounded-lg px-3 py-2 text-sm transition-all duration-300 transform hover:-translate-y-0.5"
                required
              />
            </div>
          </div>

          {/* Pickup Location */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FaMapMarkerAlt className="text-green-600" size={14} />
              Pickup Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g., 123 Main St, Dhaka"
              className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 rounded-lg px-3 py-2 text-sm transition-all duration-300 transform hover:-translate-y-0.5"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FaStickyNote className="text-green-600" size={14} />
              Additional Notes
            </label>
            <textarea
              name="notes"
              placeholder="Optional notes about the food (allergens, storage instructions, etc.)"
              rows="3"
              className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 rounded-lg px-3 py-2 text-sm transition-all duration-300 resize-none transform hover:-translate-y-0.5"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-2.5 text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Adding Food...
              </span>
            ) : (
              'Add Food & Share Kindness'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;