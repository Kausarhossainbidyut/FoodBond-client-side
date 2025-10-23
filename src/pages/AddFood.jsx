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
          confirmButtonColor: "#16a249",
        });
        form.reset();
        setTimeout(() => navigate('/manage-my-food'), 1500);
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
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaUtensils className="text-white text-4xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            Share Surplus Food
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Help reduce food waste and feed those in need by sharing your surplus meals</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md space-y-6 border border-gray-200"
        >
          {/* Food Name */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <FaUtensils className="text-green-600" />
              Food Name
            </label>
            <input
              type="text"
              name="foodName"
              placeholder="e.g., Vegetable Soup, Chicken Curry"
              className="w-full border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 rounded-lg px-4 py-3 text-sm transition outline-none group-hover:border-green-300"
              required
            />
          </div>

          {/* Food Image */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <FaCamera className="text-green-600" />
              Food Image URL
            </label>
            <input
              type="url"
              name="foodImage"
              placeholder="Enter food image url..."
              className="w-full border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 rounded-lg px-4 py-3 text-sm transition outline-none group-hover:border-green-300"
              required
            />
          </div>

          {/* Quantity & Expiration Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <FaBox className="text-green-600" />
                Quantity (portions)
              </label>
              <input
                type="number"
                name="quantity"
                min="1"
                placeholder="e.g., 10"
                className="w-full border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 rounded-lg px-4 py-3 text-sm transition outline-none group-hover:border-green-300"
                required
              />
            </div>

            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <FaCalendarAlt className="text-green-600" />
                Expiration Date
              </label>
              <input
                type="date"
                name="expirationDate"
                className="w-full border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 rounded-lg px-4 py-3 text-sm transition outline-none group-hover:border-green-300"
                required
              />
            </div>
          </div>

          {/* Pickup Location */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <FaMapMarkerAlt className="text-green-600" />
              Pickup Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g., 123 Main St, Dhaka"
              className="w-full border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 rounded-lg px-4 py-3 text-sm transition outline-none group-hover:border-green-300"
              required
            />
          </div>

          {/* Notes */}
          <div className="group">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
              <FaStickyNote className="text-green-600" />
              Additional Notes
            </label>
            <textarea
              name="notes"
              placeholder="Optional notes about the food (allergens, storage instructions, etc.)"
              rows="4"
              className="w-full border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 rounded-lg px-4 py-3 text-sm transition outline-none resize-none group-hover:border-green-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 text-base font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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