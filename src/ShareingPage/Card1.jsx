import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { CiClock1 } from "react-icons/ci";
import { Link } from "react-router";

const Card1 = ({ food = {} }) => {
  const {
    _id,
    foodName,
    foodImage,
    quantity,
    expirationDate,
    location,
    donorName,
    donorImage,
    status,
  } = food;

  const fallbackFoodImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"; 
  const fallbackDonorImage = "https://ui-avatars.com/api/?name=User&background=random";

  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Parse quantity as integer
  const quantityNum = parseInt(quantity) || 0;
  const isAvailable = status === 'available' && quantityNum > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Food Image */}
      <div className="h-48 bg-gray-100 overflow-hidden relative">
        {!imageError ? (
          <img
            src={foodImage || fallbackFoodImage}
            alt={foodName || "Food"}
            onLoad={() => setLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                <CiClock1 className="text-gray-500 text-xl" />
              </div>
              <p className="text-gray-500 text-sm">Image not available</p>
            </div>
          </div>
        )}
        
        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
            isAvailable 
              ? quantityNum <= 3 
                ? 'bg-orange-100 text-orange-800 border border-orange-200' 
                : 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-gray-100 text-gray-500 border border-gray-200'
          }`}>
            {isAvailable 
              ? quantityNum <= 3 
                ? `${quantityNum} left` 
                : `${quantityNum}`
              : 'Unavailable'
            }
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Food Name */}
        <h3 className="text-base font-bold text-gray-800 mb-3 line-clamp-1">
          {foodName || "Unknown Food"}
        </h3>

        {/* Donor Info */}
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
          <img
            src={donorImage || fallbackDonorImage}
            alt={donorName || "Donor"}
            onError={(e) => (e.target.src = fallbackDonorImage)}
            className="w-10 h-10 rounded-full object-cover border-2 border-green-100 transition-transform duration-300 hover:scale-110"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {donorName || "Anonymous"}
            </p>
            <div className="flex items-center text-xs text-gray-500 mt-1">
              <IoLocationOutline size={12} className="mr-1 flex-shrink-0" />
              <span className="truncate">{location || "Unknown"}</span>
            </div>
          </div>
        </div>

        {/* Expiration Date */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <CiClock1 size={14} className="mr-2 text-gray-500 flex-shrink-0" />
          <span>Expires: {expirationDate || "N/A"}</span>
        </div>

        {/* View Details Button */}
        <Link to={`/food-details/${_id}`}>
          <button 
            disabled={!isAvailable}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
              isAvailable
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {!isAvailable ? 'Out of Stock' : 'View Details'}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card1;